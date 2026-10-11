import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../components/context/useAuth';
import { useArticle, useArticles } from '../components/hooks/useArticles';
import { apiRequest } from '../components/lib/api';
import { authorName, formatDate, initials, recordId } from '../utils/articleUtils';
import ArticleCard from './ArticleCard';

export default function ArticlePage() {
  const { articleId } = useParams();
  const { article: serverArticle, isLoading } = useArticle(articleId);
  const { articles } = useArticles();
  const { user } = useAuth();
  const navigate = useNavigate();

  const article = serverArticle || articles.find((item) => String(recordId(item)) === articleId);
  const relatedArticles = articles
    .filter((item) => recordId(item) !== recordId(article))
    .slice(0, 3);

  async function deleteArticle() {
    const shouldDelete = window.confirm('Delete this article? This action cannot be undone.');
    if (!shouldDelete) return;

    try {
      await apiRequest(`/articles/${recordId(article)}`, { method: 'DELETE' });
      navigate('/');
    } catch (error) {
      window.alert(error.message || 'Unable to delete this article.');
    }
  }

  if (!article && isLoading) {
    return <><Header /><main className="page-shell"><p className="empty-state">Loading story…</p></main><Footer /></>;
  }

  if (!article) {
    return (
      <>
        <Header />
        <main className="page-shell">
          <p className="empty-state">This story could not be found. <Link to="/">Return to the journal</Link>.</p>
        </main>
        <Footer />
      </>
    );
  }

  const body = article.body || article.content || article.text || '';
  const coverImage = article.coverImage || article.imageUrl || article.fallbackImage;

  return (
    <>
      <Header />
      <main className="page-shell article-page">
        <Link className="back-link" to="/">← All stories</Link>

        <header className="article-heading">
          <span className="eyebrow eyebrow-pill">{article.category || 'Journal'}</span>
          <h1>{article.title}</h1>
          <p className="article-deck">{article.excerpt || article.description}</p>
          <p className="article-meta">
            <strong>{authorName(article.author)}</strong>
            <span>·</span>
            {formatDate(article.createdAt || article.date)}
            <span>·</span>
            ◷ &nbsp;{readingTime(body)} min read
          </p>

          {user?.role === 'admin' && (
            <div className="admin-actions">
              <Link className="button button-outline" to={`/admin/articles/${recordId(article)}/edit`}>Edit article</Link>
              <button className="button button-danger" type="button" onClick={deleteArticle}>Delete</button>
            </div>
          )}
        </header>

        <img className="article-cover" src={coverImage} alt="" />

        <article className="article-body">
          <span className="eyebrow">A chapter worth reading</span>
          {body.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => (
            isSectionHeading(paragraph)
              ? <h2 key={index}>{paragraph}</h2>
              : <p key={index}>{paragraph}</p>
          ))}

          <div className="author-box">
            <span className="avatar">{initials(article.author)}</span>
            <div>
              <small>Written by</small>
              <strong>{authorName(article.author)}</strong>
              <span>Sharing ideas, one chapter at a time.</span>
            </div>
          </div>
        </article>

        <section className="related-section">
          <div className="section-heading">
            <div><span className="eyebrow">Keep exploring</span><h2>Your next good read.</h2></div>
            <Link className="read-link" to="/">View all stories ↗</Link>
          </div>
          <div className="story-grid">
            {relatedArticles.map((item) => <ArticleCard key={recordId(item)} article={item} />)}
          </div>
        </section>
      </main>
      <Footer storyCount={articles.length} />
    </>
  );
}

function readingTime(text) {
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 220));
}

function isSectionHeading(text) {
  return text.length <= 60 && !/[.!?]$/.test(text);
}
