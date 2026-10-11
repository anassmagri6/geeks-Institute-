import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../components/context/useAuth';
import { useArticle } from '../components/hooks/useArticles';
import { apiRequest } from '../components/lib/api';
import { recordId } from '../utils/articleUtils';

const emptyStory = {
  title: '',
  excerpt: '',
  body: '',
  category: 'Design',
  coverImage: '',
};
const categories = ['Design', 'Product', 'Development', 'Culture', 'Travel'];

function articleToForm(article) {
  return {
    title: article?.title || '',
    excerpt: article?.excerpt || article?.description || '',
    body: article?.body || article?.content || '',
    category: article?.category || 'Design',
    coverImage: article?.coverImage || article?.imageUrl || '',
  };
}

export default function EditorPage() {
  const { articleId } = useParams();
  const isNewArticle = articleId === 'new';
  const { user, loading } = useAuth();
  const { article } = useArticle(isNewArticle ? null : articleId);
  const navigate = useNavigate();
  const [editedStory, setEditedStory] = useState(null);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const story = editedStory || (isNewArticle ? emptyStory : articleToForm(article));

  function updateStory(field, value) {
    setEditedStory((current) => ({ ...(current || story), [field]: value }));
  }

  async function saveStory(event) {
    event.preventDefault();
    setError('');
    setIsSaving(true);

    const payload = {
      title: story.title,
      excerpt: story.excerpt,
      content: story.body,
      category: story.category,
      imageUrl: story.coverImage,
    };

    try {
      const method = isNewArticle ? 'POST' : 'PUT';
      const endpoint = isNewArticle ? '/articles' : `/articles/${articleId}`;
      const savedArticle = await apiRequest(endpoint, {
        method,
        body: JSON.stringify(payload),
      });
      navigate(`/articles/${recordId(savedArticle) || articleId}`);
    } catch (saveError) {
      setError(saveError.message || 'Could not save the story. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }

  if (loading) return <p className="empty-state">Checking your account…</p>;
  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== 'admin') {
    return (
      <>
        <Header />
        <main className="page-shell">
          <div className="empty-state">
            <h1>Editor access required</h1>
            <p>This page is available to admin accounts.</p>
            <Link to="/">Return to the journal</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!isNewArticle && !article) {
    return <><Header /><main className="page-shell"><p className="empty-state">Loading article…</p></main><Footer /></>;
  }

  return (
    <>
      <Header />
      <main className="page-shell editor-page">
        <Link className="back-link" to={isNewArticle ? '/' : `/articles/${articleId}`}>
          ← {isNewArticle ? 'Back to journal' : 'Back to article'}
        </Link>
        <span className="eyebrow">The editor’s desk</span>
        <h1>Refine your story.</h1>
        <p className="editor-subtitle">A fresh idea, a thoughtful image, and your point of view.</p>

        <form className="editor-form" onSubmit={saveStory}>
          <label htmlFor="title">Article title</label>
          <input id="title" required maxLength={120} value={story.title} onChange={(event) => updateStory('title', event.target.value)} />

          <label htmlFor="excerpt">Short description</label>
          <textarea id="excerpt" required maxLength={300} rows={3} value={story.excerpt} onChange={(event) => updateStory('excerpt', event.target.value)} />
          <small className="field-help">Appears on the article card. {story.excerpt.length}/300 characters.</small>

          <label htmlFor="body">Your story</label>
          <textarea id="body" className="story-input" required rows={16} value={story.body} onChange={(event) => updateStory('body', event.target.value)} />
          <small className="field-help">Plain text only. Add a blank line between paragraphs.</small>

          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="editor-buttons">
            <button className="button button-primary" type="submit" disabled={isSaving}>
              {isSaving ? 'Saving…' : 'Save changes'}
            </button>
            <Link className="button button-outline" to={isNewArticle ? '/' : `/articles/${articleId}`}>Cancel</Link>
          </div>

          <section className="finishing-card">
            <h2>The finishing touches</h2>
            <label htmlFor="category">Category</label>
            <select id="category" value={story.category} onChange={(event) => updateStory('category', event.target.value)}>
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
            <label htmlFor="coverImage">Cover image URL</label>
            <input id="coverImage" type="url" placeholder="https://images.unsplash.com/..." value={story.coverImage} onChange={(event) => updateStory('coverImage', event.target.value)} />
            <small className="field-help">Use a direct image link you have permission to use.</small>
            {story.coverImage && <img className="editor-preview" src={story.coverImage} alt="Cover preview" />}
            <div className="editor-advice">
              <strong>A little editorial advice</strong>
              <p>Keep the title clear, choose an inviting image, and give your paragraphs room to breathe.</p>
            </div>
          </section>
        </form>
      </main>
      <Footer />
    </>
  );
}
