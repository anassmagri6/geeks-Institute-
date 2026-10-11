import { Link } from 'react-router-dom';

export default function Footer({ storyCount = 7 }) {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <Link className="brand" to="/">
            <span className="brand-mark">▣</span>
            <span>chapter.</span>
          </Link>
          <p>A place for fresh ideas, thoughtful stories,<br />and a little everyday inspiration.</p>
        </div>

        <div className="footer-links">
          <div>
            <strong>Explore</strong>
            <Link to="/#latest">All stories ({storyCount})</Link>
            <a href="/#design">Design &amp; creativity</a>
            <a href="/#travel">Places &amp; perspectives</a>
          </div>
          <div>
            <strong>Your chapter</strong>
            <Link to="/login">Reader &amp; editor access</Link>
            <Link to="/#top">Back to the top ↑</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Chapter. A classroom journal.</span>
        <span>Made for curious minds. Built with React.</span>
      </div>
    </footer>
  );
}
