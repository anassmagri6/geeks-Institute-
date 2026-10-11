import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../components/context/useAuth';
import { seedArticles } from '../data/articles';

export default function LoginPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (isRegistering) {
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (error) {
      const cannotReachServer = error instanceof TypeError;
      setError(cannotReachServer
        ? 'The server is not available. Start the backend and check its database connection.'
        : error.message || 'Unable to continue. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function toggleForm() {
    setIsRegistering(!isRegistering);
    setError('');
  }

  return (
    <>
      <Header />
      <main className="login-layout">
        <Link className="back-link login-back" to="/">← Back to the journal</Link>

        <section
          className="login-visual"
          style={{ backgroundImage: `linear-gradient(0deg, rgba(13, 12, 19, .78), transparent 68%), url(${seedArticles[3].fallbackImage})` }}
        >
          <div className="login-visual-copy">
            <span className="large-book-icon">▧</span>
            <h1>A new perspective.<br />One story away.</h1>
            <p>Welcome to a community of curious readers and thoughtful storytellers. Your next chapter starts here.</p>
          </div>
        </section>

        <section className="login-panel">
          <form className="login-form" onSubmit={handleSubmit}>
            <span className="eyebrow">Your chapter starts here</span>
            <h2>{isRegistering ? 'Create your account.' : 'Welcome back.'}</h2>
            <p className="form-intro">
              {isRegistering ? 'Join the journal as a reader.' : 'Sign in to your reader or editor account.'}
            </p>

            {isRegistering && (
              <>
                <label htmlFor="name">Your name</label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  minLength={2}
                  maxLength={80}
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </>
            )}

            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete={isRegistering ? 'new-password' : 'current-password'}
              placeholder={isRegistering ? 'At least 8 characters' : 'Enter your password'}
              minLength={isRegistering ? 8 : undefined}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            {error && <p className="form-error" role="alert">{error}</p>}

            <button className="button button-primary submit-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Please wait…' : isRegistering ? 'Create account →' : 'Sign in →'}
            </button>

            {!isRegistering && <DemoAccounts />}

            <p className="browse-prompt">
              {isRegistering ? 'Already have an account?' : 'New to Chapter?'}{' '}
              <button className="text-button" type="button" onClick={toggleForm}>
                {isRegistering ? 'Sign in' : 'Create an account'}
              </button>
            </p>
            <p className="browse-prompt">Just here to read? <Link to="/">Explore without signing in.</Link></p>
          </form>
        </section>
      </main>
      <Footer storyCount={7} />
    </>
  );
}

function DemoAccounts() {
  return (
    <div className="demo-card">
      <strong>♧ &nbsp;Classroom demo accounts</strong>
      <p>These accounts are created by the backend seed script.</p>
      <div className="demo-roles">
        <div><strong>Reader</strong><span>user@example.com · user123</span></div>
        <div><strong>Admin</strong><span>admin@example.com · admin123</span></div>
      </div>
    </div>
  );
}
