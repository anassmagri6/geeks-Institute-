import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useArticles } from '../components/hooks/useArticles';
import { authorName, formatDate, initials, recordId } from '../utils/articleUtils';
import ArticleCard from './ArticleCard';

const categories = ['View all', 'Design', 'Product', 'Development', 'Culture', 'Travel'];

export default function HomePage() {
  const { articles, isLoading, isError } = useArticles();
  const [category, setCategory] = useState('View all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    function selectCategoryFromHash() {
      const hash = window.location.hash.slice(1).toLowerCase();
      const matchingCategory = categories.find((item) => item.toLowerCase() === hash);
      if (matchingCategory) setCategory(matchingCategory);
    }

    selectCategoryFromHash();
    window.addEventListener('hashchange', selectCategoryFromHash);
    return () => window.removeEventListener('hashchange', selectCategoryFromHash);
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory = category === 'View all' ||
        article.category?.toLowerCase() === category.toLowerCase();
      const articleText = `${article.title || ''} ${article.excerpt || article.description || ''}`;
      const matchesSearch = articleText.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, category, search]);

  const featuredArticle = articles[0];

  return (
    <>
      <Header />
      <main className="page-shell" id="top">
        <section className="home-intro">
          <span className="eyebrow eyebrow-pill"><i /> The Chapter Journal</span>
          <h1>A space for <span>curious minds.</span></h1>
          <p>
            Fresh perspectives on design, culture, and the way we live.
            <br className="desktop-break" /> Stories worth slowing down for.
          </p>
        </section>

        {featuredArticle && <FeaturedStory article={featuredArticle} />}

        <section className="latest-section" id="latest">
          <div className="section-heading">
            <div>
              <span className="eyebrow">The latest</span>
              <h2>Good stories. New perspectives.</h2>
              <p>A little inspiration for your next chapter.</p>
            </div>
            <label className="search-box">
              <span aria-hidden="true">⌕</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Find a story…"
                aria-label="Find a story"
              />
            </label>
          </div>

          <div className="category-tabs" role="tablist" aria-label="Filter stories by category">
            {categories.map((item) => (
              <button
                id={item.toLowerCase().replaceAll(' ', '-')}
                key={item}
                type="button"
                role="tab"
                aria-selected={category === item}
                className={category === item ? 'active' : ''}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <p className="story-count">
            {isLoading ? 'Loading stories…' : `${filteredArticles.length} ${filteredArticles.length === 1 ? 'story' : 'stories'}`}
          </p>
          {isError && <p className="notice">The article service is unavailable. Showing the journal preview.</p>}

          <div className="story-grid">
            {filteredArticles.map((article) => <ArticleCard key={article.id} article={article} />)}
          </div>
          {!isLoading && filteredArticles.length === 0 && (
            <p className="empty-state">No stories match that search. Try another phrase or category.</p>
          )}
        </section>

        <aside className="curiosity-banner">
          <span className="banner-icon" aria-hidden="true">▧</span>
          <div>
            <h2>Every great idea starts with a little curiosity.</h2>
            <p>Pick a topic. Follow a thought. Find your next perspective.</p>
          </div>
          <a className="button button-primary" href="/#culture">Explore culture <span>→</span></a>
        </aside>
      </main>
      <Footer storyCount={articles.length} />
    </>
  );
}

function FeaturedStory({ article }) {
  const image = article.coverImage || article.imageUrl || article.fallbackImage;

  return (
    <Link className="featured-story" to={`/articles/${recordId(article)}`}>
      <div className="featured-image"><img src={image} alt="" /></div>
      <div className="featured-copy">
        <div className="story-tags">
          <span>Editor's pick</span><span>•</span><span>{article.category || 'Journal'}</span>
        </div>
        <h2>{article.title}</h2>
        <p>{article.excerpt || article.description}</p>
        <div className="byline">
          <span className="avatar">{initials(article.author)}</span>
          <span>
            <strong>{authorName(article.author)}</strong>
            <small>{formatDate(article.createdAt || article.date)} · Featured story</small>
          </span>
        </div>
        <span className="read-link">Read the story ↗</span>
      </div>
    </Link>
  );
}

