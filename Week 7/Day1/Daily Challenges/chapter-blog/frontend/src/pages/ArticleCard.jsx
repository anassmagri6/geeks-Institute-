import { Link } from 'react-router-dom';
import { authorName, formatDate, recordId } from '../utils/articleUtils';

export default function ArticleCard({ article }) {
  const image = article.coverImage || article.imageUrl || article.fallbackImage;
  const articleUrl = `/articles/${recordId(article)}`;

  return (
    <article className="story-card">
      <Link className="card-image" to={articleUrl}>
        <img src={image} alt="" />
        <span className="image-meta">
          <span>{authorName(article.author)}<small>{formatDate(article.createdAt || article.date)}</small></span>
          <span>{article.category || 'Journal'}</span>
        </span>
      </Link>
      <h3><Link to={articleUrl}>{article.title || 'Untitled story'}</Link><span aria-hidden="true">↗</span></h3>
      <p>{article.excerpt || article.description || ''}</p>
      <Link className="read-link" to={articleUrl}>Read story ↗</Link>
    </article>
  );
}
