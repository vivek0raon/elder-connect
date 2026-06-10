import "./home.css";

/* BRAND & HERO */
import logo from "../assets/logo.png";
import heroImage from "../assets/hero.png";

/* TRUST SECTION IMAGES */
import verifiedImg from "../assets/verified.png";
import emergencyImg from "../assets/emergency.png";
import paymentImg from "../assets/payment.png";

/* REVIEW AVATARS */
import family1 from "../assets/family1.png";
import family2 from "../assets/family2.jpg";
import family3 from "../assets/family3.jpg";
import caretaker1 from "../assets/caretaker1.jpg";
import caretaker2 from "../assets/caretaker2.jpg";

function Home() {
  return (
    <div className="home">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        <div className="nav-left">
          <img src={logo} alt="ElderCare Connect" className="logo" />
        </div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="#how">How It Works</a>
          <a href="#reviews">Reviews</a>
          <a href="/login" className="login-btn">Login</a>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-text">
          <h1>Finding Trusted Care For Your Loved Ones</h1>
          <p>
            Easily connect with verified caretakers, manage emergencies,
            and ensure safe elder care with Nest Life:CURA.
          </p>

          <div className="hero-actions">
            <a href="/register" className="btn-primary">Get Started</a>
            
          </div>
        </div>

        <div className="hero-image">
          <img
            src={heroImage}
            alt="Elder care support"
            className="hero-img"
          />
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="how" id="how">
        <h2>How Nest Life:CURA Works</h2>
        <p>Connect with professional and verified caregivers in 3 simple steps</p>

        <div className="card-grid">
          <div className="step-card">
            <span>1</span>
            <h3>Create an Account</h3>
            <p>Sign up as a family member or caretaker in minutes.</p>
          </div>

          <div className="step-card">
            <span>2</span>
            <h3>Choose a Caretaker</h3>
            <p>Browse verified caregiver profiles based on your needs.</p>
          </div>

          <div className="step-card">
            <span>3</span>
            <h3>Track & Manage</h3>
            <p>Manage schedules, emergencies, and communication.</p>
          </div>
        </div>
      </section>

      {/* ================= WHY TRUST ================= */}
      <section className="trust">
        <h2>Why Families Trust ElderCare Connect</h2>

        <div className="card-grid">

          <div className="trust-card">
            <img src={verifiedImg} alt="Verified caretakers" className="trust-img" />
            <h3>Verified Caretakers</h3>
            <p>
              All caregivers are background checked and verified
              to ensure complete peace of mind.
            </p>
          </div>

          <div className="trust-card">
            <img src={emergencyImg} alt="Emergency alerts" className="trust-img" />
            <h3>Emergency Alerts</h3>
            <p>
              Instant notifications are sent to family members
              during urgent situations.
            </p>
          </div>

          <div className="trust-card">
            <img src={paymentImg} alt="Secure payments" className="trust-img" />
            <h3>Secure Payments</h3>
            <p>
              Safe, transparent, and reliable payment system
              with full transaction history.
            </p>
          </div>

        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section className="reviews" id="reviews">
        <h2>What People Are Saying</h2>

        {/* FAMILY REVIEWS */}
        <h3 className="review-subtitle">Families</h3>
        <div className="review-grid">

          <div className="review-card">
            <img src={family1} alt="Family review" className="review-avatar" />
            <p>
              “ElderCare Connect gave us peace of mind when we
              couldn’t be physically present.”
            </p>
            <strong>— Sarah M.</strong>
          </div>

          <div className="review-card">
            <img src={family2} alt="Family review" className="review-avatar" />
            <p>
              “Emergency alerts helped us respond instantly.
              This platform truly cares.”
            </p>
            <strong>— Rahul K.</strong>
          </div>

          <div className="review-card">
            <img src={family3} alt="Family review" className="review-avatar" />
            <p>
              “Finding a verified caretaker was quick and simple.
              Highly recommended.”
            </p>
            <strong>— Anita S.</strong>
          </div>

        </div>

        {/* CARETAKER REVIEWS */}
        <h3 className="review-subtitle">Caretakers</h3>
        <div className="review-grid">

          <div className="review-card">
            <img src={caretaker1} alt="Caretaker review" className="review-avatar" />
            <p>
              “Clear responsibilities and transparent payments
              make this platform professional.”
            </p>
            <strong>— Priya V.</strong>
          </div>

          <div className="review-card">
            <img src={caretaker2} alt="Caretaker review" className="review-avatar" />
            <p>
              “Role-based access helps me manage my work
              efficiently.”
            </p>
            <strong>— Suresh P.</strong>
          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta">
        <h2>Get Started with Trusted Elder Care Today</h2>
        <p>
          Join thousands of families who trust Nest Life:CURA
          for safe and reliable elder care.
        </p>
        <a href="/register" className="btn-primary">Create Free Account</a>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        © 2026 Nest Life:CURA. All rights reserved.
      </footer>

    </div>
  );
}

export default Home;
