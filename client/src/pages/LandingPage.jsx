import { useNavigate } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard.jsx';
import '../styles/landing.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <span className="landing-logo">⚡ NxtBuild</span>
        <button className="landing-nav-btn" onClick={() => navigate('/login')}>
          Get Started
        </button>
      </nav>

      <section className="landing-hero">
        <h1 className="landing-title">Build Web Apps with AI</h1>
        <p className="landing-subtitle">
          Describe what you want in plain English and get a working web app in seconds.
        </p>
        <button className="landing-cta" onClick={() => navigate('/login')}>
          Start Building Free
        </button>
        <div className="landing-prompt-box">
          <span className="landing-prompt-label">Try saying:</span>
          <p className="landing-prompt-text">"Build me a landing page for a coffee shop with a menu and contact form"</p>
        </div>
      </section>

      <section className="landing-features">
        <h2 className="landing-features-title">How It Works</h2>
        <div className="landing-features-grid">
          <FeatureCard
            icon="1"
            title="Describe Your App"
            description="Tell the AI what you want to build in plain English. No technical knowledge required."
          />
          <FeatureCard
            icon="2"
            title="AI Generates Code"
            description="Gemini AI instantly creates complete HTML, CSS, and JavaScript for your app."
          />
          <FeatureCard
            icon="3"
            title="Preview & Download"
            description="See your app live instantly, iterate through chat, and download the code."
          />
        </div>
      </section>

      <footer className="landing-footer">
        <p>Built with React, Express, MongoDB & Gemini AI</p>
      </footer>
    </div>
  );
}

export default LandingPage;