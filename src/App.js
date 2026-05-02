import React, { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import AppIcon from "./assets/AppIcon.png";
import heroShot from "./assets/screenshot1.jpg";
import detailShot from "./assets/screenshot2.jpg";

const features = [
  {
    icon: "⚡",
    title: "Create Invoices in Seconds",
    description: "Generate, scan and send professional invoices in under a minute with our intuitive interface.",
  },
  {
    icon: "📈",
    title: "Track Payments & Clients",
    description: "Never lose track of a receipt. Easily track what was paid and how much was spent monthly.",
  },
  {
    icon: "🧾",
    title: "Professional Templates",
    description: "Look professional with beautifully designed, customizable invoice templates.",
  },
  {
    icon: "📱",
    title: "Manage On-the-Go",
    description: "Run your business from anywhere. All your data is synced across your devices.",
  },
];

const glimpses = [
  {
    label: "Dashboard",
    text: "Your business at a glance",
    image: heroShot,
  },
  {
    label: "Create Invoice",
    text: "Effortless invoice creation",
    image: detailShot,
  },
];

const getNextLaunchDate = () => {
  const now = new Date();
  let target = new Date(now.getFullYear(), 12, 1, 0, 0, 0);
  if (target < now) {
    target = new Date(now.getFullYear() + 1, 11, 1, 0, 0, 0);
  }
  return target;
};

const launchDate = getNextLaunchDate();

function HomePage() {
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    mins: "00",
    secs: "00",
  });
  const [hasLaunched, setHasLaunched] = useState(false);
  const [showNotifyForm, setShowNotifyForm] = useState(false);
  const [notifySubmitted, setNotifySubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [notifyError, setNotifyError] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = Math.max(launchDate.getTime() - now.getTime(), 0);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      setCountdown({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        mins: String(mins).padStart(2, "0"),
        secs: String(secs).padStart(2, "0"),
      });
      setHasLaunched(diff === 0);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app">
      <section className="hero container">
        <div className="hero-icon">
          <img src={AppIcon} alt="My Fiş App Logo" />
        </div>
        <h1>My Fiş App: Invoicing Made Simple</h1>
        <p>
          The simplest way for freelancers and small businesses to create professional invoices, track
          payments, and manage clients on the go.
        </p>

        <div className="countdown">
          <div className="countdown-box">
            <span className="countdown-value">{countdown.days}</span>
            <span className="countdown-label">DAYS</span>
          </div>
          <div className="countdown-box">
            <span className="countdown-value">{countdown.hours}</span>
            <span className="countdown-label">HOURS</span>
          </div>
          <div className="countdown-box">
            <span className="countdown-value">{countdown.mins}</span>
            <span className="countdown-label">MINS</span>
          </div>
          <div className="countdown-box">
            <span className="countdown-value">{countdown.secs}</span>
            <span className="countdown-label">SECS</span>
          </div>
        </div>

        {notifySubmitted ? (
          <div className="notify-success">Your email is added to notify list</div>
        ) : (
          <>
            <Button
              className="notify-btn"
              onClick={() => {
                setShowNotifyForm(true);
                setNotifyError("");
              }}
            >
              Notify Me
            </Button>
            {showNotifyForm && (
              <div className="notify-form">
                <input
                  type="email"
                  className="notify-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  className="send-btn"
                  onClick={() => {
                    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
                    if (!isValidEmail) {
                      setNotifyError("Please enter a valid email address.");
                      return;
                    }
                    setNotifySubmitted(true);
                    setNotifyError("");
                  }}
                >
                  Send
                </Button>
                {notifyError && <div className="notify-error">{notifyError}</div>}
              </div>
            )}
            <span className="hero-note">Be the first to know when we launch.</span>
          </>
        )}

        <div className="hero-shot">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvcgW2tFAxk4o2sVZDJgmBLi-83rAbqVGlV6tBq_zLEEow2uUmC93AThQZBgPUmaUY_aRbhipeAOhsEzuHmuyi7iBvZNywbWjBp_hHCJiuO1e6TOmz5hTNMUEUSWc6kIMNNGqm-epc_Uztz5vsIEnECwRrJSZfRulR_J8tyQB7WU5Xa4IRzKChL6RLuFlN3iJMtyq4ZucUwubeKvsWKluiJpQhk5YzomFM4HAdLlC01Y5VeIw4z8t1-MGg0libEJ4WOWtrltaz2Q" alt="My Fiş App preview" />
        </div>
      </section>

      <section className="features container">
        <h2>Everything you need, nothing you don’t.</h2>
        <p>
          Our app is packed with powerful features designed to save you time and help you get paid faster.
        </p>

        <div className="feature-list">
          {features.map((feature) => (
            <div className="feature-card" key={feature.title}>
              <span className="feature-icon" aria-hidden="true">
                {feature.icon}
              </span>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glimpse container">
        <p className="glimpse-kicker">A GLIMPSE INSIDE</p>
        <div className="glimpse-grid">
          {glimpses.map((item) => (
            <div className="glimpse-card" key={item.label}>
              <img src={item.image} alt={item.label} />
              <div className="glimpse-content">
                <h4>{item.label}</h4>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta container">
        <h2>Ready to Simplify Your Invoicing?</h2>
        <p>
          Download the app today and spend less time on paperwork and more time on what you do best.
        </p>
        <Button className="download-btn" disabled={!hasLaunched}>
          Download Now for Free
        </Button>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} My Fiş App, All rights reserved.</p>
        <div className="footer-links">
          <a href="mailto:info@teamsoft.com.tr">Contact Us for Support</a>
          <a href={`${process.env.PUBLIC_URL}/privacy.html`}>Privacy Policy</a>
        </div>
        
        {/* <div className="footer-social">
          <a href="#tw" aria-label="Twitter">
            <span>Twitter</span>
          </a>
          <a href="#ln" aria-label="LinkedIn">
            <span>LinkedIn</span>
          </a>
        </div> */}
      </footer>
    </div>
  );
}

function App() {
  return <HomePage />;
}

export default App;
