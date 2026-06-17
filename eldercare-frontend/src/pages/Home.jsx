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
  const navLink = "text-[0.96rem] font-semibold text-[#3f5147] no-underline transition hover:text-[#407a57]";
  const section = "px-5 py-[clamp(58px,7vw,92px)] text-center md:px-[clamp(20px,5vw,72px)]";
  const sectionTitle = "m-0 text-[clamp(2rem,3vw,2.85rem)] leading-[1.12] tracking-normal text-[#1f2f27]";
  const kicker = "mb-3.5 inline-flex w-fit items-center text-xs font-extrabold uppercase tracking-[0.08em] text-[#2f6244] before:mr-2.5 before:h-0.5 before:w-7 before:rounded-full before:bg-[#c77d4c] before:content-['']";
  const primaryButton = "inline-flex min-h-12 items-center justify-center rounded-full border border-[#407a57] bg-[#407a57] px-[22px] font-bold text-white no-underline shadow-[0_12px_26px_rgba(47,98,68,0.22)] transition hover:-translate-y-0.5 hover:bg-[#2f6244]";
  const secondaryButton = "inline-flex min-h-12 items-center justify-center rounded-full border border-[#dde7df] bg-white/70 px-[22px] font-bold text-[#2f6244] no-underline transition hover:-translate-y-0.5 hover:border-[#c9d8ce] hover:bg-white";
  const infoCard = "rounded-lg border border-[#dde7df] bg-white p-7 text-left shadow-[0_14px_38px_rgba(31,47,39,0.07)] transition hover:-translate-y-1 hover:border-[#c9d8ce] hover:shadow-[0_18px_44px_rgba(31,47,39,0.1)]";
  const cardGrid = "mx-auto mt-[34px] grid max-w-[1120px] grid-cols-1 gap-[22px] md:grid-cols-2 lg:grid-cols-3";
  const reviewCard = "rounded-lg border border-[#dde7df] bg-white p-[26px] text-left shadow-[0_14px_38px_rgba(31,47,39,0.07)] transition hover:-translate-y-1 hover:border-[#c9d8ce] hover:shadow-[0_18px_44px_rgba(31,47,39,0.1)]";

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fbfcfa] font-sans text-[#1f2f27]">

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-10 flex items-center justify-between gap-7 border-b border-[#dde7df]/85 bg-white/90 px-[clamp(18px,5vw,72px)] py-2 backdrop-blur-[14px] max-lg:flex-col max-lg:items-start">
        <div className="flex items-center">
          <img src={logo} alt="ElderCare Connect" className="block h-14 w-auto max-w-[180px] object-contain max-sm:h-12" />
        </div>

        <div className="flex items-center gap-[clamp(14px,2vw,28px)] max-lg:w-full max-lg:justify-between max-lg:overflow-x-auto max-sm:justify-start max-sm:gap-3">
          <a href="/" className={navLink}>Home</a>
          <a href="#how" className={navLink}>How It Works</a>
          <a href="#reviews" className={navLink}>Reviews</a>
          <a href="/login" className={`${navLink} rounded-full border border-[#dde7df] bg-white px-[18px] py-2.5 text-[#2f6244] hover:bg-[#f5f8f4]`}>Login</a>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="grid grid-cols-1 items-center gap-[clamp(36px,6vw,80px)] bg-[radial-gradient(circle_at_12%_22%,rgba(64,122,87,0.12),transparent_30%),linear-gradient(135deg,#f4f8f3_0%,#fbfcfa_58%,#fff7f0_100%)] px-[clamp(20px,6vw,92px)] pb-[clamp(44px,6vw,76px)] pt-[clamp(54px,8vw,104px)] lg:grid-cols-[minmax(0,1.02fr)_minmax(320px,0.98fr)]">
        <div className="max-w-[620px]">
          <span className={kicker}>Trusted home care coordination</span>
          <h1 className="m-0 mb-[18px] max-w-[680px] text-[clamp(2.45rem,5vw,4.85rem)] leading-[1.03] tracking-normal text-[#1f2f27]">Finding Trusted Care For Your Loved Ones</h1>
          <p className="m-0 max-w-[570px] text-[clamp(1rem,1.45vw,1.14rem)] leading-[1.8] text-[#5f6f67]">
            Easily connect with verified caretakers, manage emergencies,
            and ensure safe elder care with Nest Life:CURA.
          </p>

          <div className="mt-[30px] flex flex-wrap gap-3.5">
            <a href="/register" className={primaryButton}>Get Started</a>
            <a href="#how" className={secondaryButton}>See how it works</a>
          </div>

          <div className="mt-[34px] grid max-w-[560px] grid-cols-1 gap-3 sm:grid-cols-3" aria-label="Platform highlights">
            <div className="rounded-lg border border-[#dde7df]/80 bg-white/70 p-4">
              <strong className="block text-[1.35rem] text-[#2f6244]">24/7</strong>
              <span className="mt-1 block text-sm leading-snug text-[#5f6f67]">Emergency updates</span>
            </div>
            <div className="rounded-lg border border-[#dde7df]/80 bg-white/70 p-4">
              <strong className="block text-[1.35rem] text-[#2f6244]">100%</strong>
              <span className="mt-1 block text-sm leading-snug text-[#5f6f67]">Verified caregivers</span>
            </div>
            <div className="rounded-lg border border-[#dde7df]/80 bg-white/70 p-4">
              <strong className="block text-[1.35rem] text-[#2f6244]">3 min</strong>
              <span className="mt-1 block text-sm leading-snug text-[#5f6f67]">Simple setup</span>
            </div>
          </div>
        </div>

        <div className="relative max-w-[720px]">
          <div className="absolute -right-[18px] -bottom-[18px] z-0 h-[42%] w-[58%] rounded-lg bg-[#e9f1eb] max-sm:hidden" />
          <img
            src={heroImage}
            alt="Elder care support"
            className="relative z-[1] max-h-[560px] min-h-[360px] w-full rounded-lg object-cover shadow-[0_24px_60px_rgba(31,47,39,0.16)] max-sm:min-h-[260px]"
          />
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className={`${section} bg-[#fbfcfa]`} id="how">
        <h2 className={sectionTitle}>How Nest Life:CURA Works</h2>
        <p className="mx-auto mt-3.5 max-w-[620px] text-base leading-[1.7] text-[#5f6f67]">Connect with professional and verified caregivers in 3 simple steps</p>

        <div className={cardGrid}>
          <div className={infoCard}>
            <span className="mb-5 grid h-[42px] w-[42px] place-items-center rounded-full bg-[#e8f1eb] font-extrabold text-[#2f6244]">1</span>
            <h3 className="m-0 mb-2.5 text-[1.18rem] text-[#1f2f27]">Create an Account</h3>
            <p className="m-0 leading-[1.65] text-[#5f6f67]">Sign up as a family member or caretaker in minutes.</p>
          </div>

          <div className={infoCard}>
            <span className="mb-5 grid h-[42px] w-[42px] place-items-center rounded-full bg-[#e8f1eb] font-extrabold text-[#2f6244]">2</span>
            <h3 className="m-0 mb-2.5 text-[1.18rem] text-[#1f2f27]">Choose a Caretaker</h3>
            <p className="m-0 leading-[1.65] text-[#5f6f67]">Browse verified caregiver profiles based on your needs.</p>
          </div>

          <div className={infoCard}>
            <span className="mb-5 grid h-[42px] w-[42px] place-items-center rounded-full bg-[#e8f1eb] font-extrabold text-[#2f6244]">3</span>
            <h3 className="m-0 mb-2.5 text-[1.18rem] text-[#1f2f27]">Track & Manage</h3>
            <p className="m-0 leading-[1.65] text-[#5f6f67]">Manage schedules, emergencies, and communication.</p>
          </div>
        </div>
      </section>

      {/* ================= WHY TRUST ================= */}
      <section className={`${section} bg-[#f5f8f4]`}>
        <span className={kicker}>Care with accountability</span>
        <h2 className={sectionTitle}>Why Families Trust ElderCare Connect</h2>

        <div className={cardGrid}>

          <div className={infoCard}>
            <img src={verifiedImg} alt="Verified caretakers" className="mb-[18px] h-[58px] w-[58px] object-contain" />
            <h3 className="m-0 mb-2.5 text-[1.18rem] text-[#1f2f27]">Verified Caretakers</h3>
            <p className="m-0 leading-[1.65] text-[#5f6f67]">
              All caregivers are background checked and verified
              to ensure complete peace of mind.
            </p>
          </div>

          <div className={infoCard}>
            <img src={emergencyImg} alt="Emergency alerts" className="mb-[18px] h-[58px] w-[58px] object-contain" />
            <h3 className="m-0 mb-2.5 text-[1.18rem] text-[#1f2f27]">Emergency Alerts</h3>
            <p className="m-0 leading-[1.65] text-[#5f6f67]">
              Instant notifications are sent to family members
              during urgent situations.
            </p>
          </div>

          <div className={infoCard}>
            <img src={paymentImg} alt="Secure payments" className="mb-[18px] h-[58px] w-[58px] object-contain" />
            <h3 className="m-0 mb-2.5 text-[1.18rem] text-[#1f2f27]">Secure Payments</h3>
            <p className="m-0 leading-[1.65] text-[#5f6f67]">
              Safe, transparent, and reliable payment system
              with full transaction history.
            </p>
          </div>

        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section className={`${section} bg-[#fbfcfa]`} id="reviews">
        <span className={kicker}>Shared by real users</span>
        <h2 className={sectionTitle}>What People Are Saying</h2>

        {/* FAMILY REVIEWS */}
        <h3 className="mx-auto mb-4 mt-[38px] max-w-[1120px] text-left text-[1.2rem] text-[#2f6244]">Families</h3>
        <div className="mx-auto mt-0 grid max-w-[1120px] grid-cols-1 gap-[22px] md:grid-cols-2 lg:grid-cols-3">

          <div className={reviewCard}>
            <img src={family1} alt="Family review" className="h-[58px] w-[58px] rounded-full object-cover" />
            <p className="my-4 min-h-[76px] text-[0.98rem] leading-[1.65] text-[#48564f]">
              “ElderCare Connect gave us peace of mind when we
              couldn’t be physically present.”
            </p>
            <strong className="text-[#1f2f27]">— Sarah M.</strong>
          </div>

          <div className={reviewCard}>
            <img src={family2} alt="Family review" className="h-[58px] w-[58px] rounded-full object-cover" />
            <p className="my-4 min-h-[76px] text-[0.98rem] leading-[1.65] text-[#48564f]">
              “Emergency alerts helped us respond instantly.
              This platform truly cares.”
            </p>
            <strong className="text-[#1f2f27]">— Rahul K.</strong>
          </div>

          <div className={reviewCard}>
            <img src={family3} alt="Family review" className="h-[58px] w-[58px] rounded-full object-cover" />
            <p className="my-4 min-h-[76px] text-[0.98rem] leading-[1.65] text-[#48564f]">
              “Finding a verified caretaker was quick and simple.
              Highly recommended.”
            </p>
            <strong className="text-[#1f2f27]">— Anita S.</strong>
          </div>

        </div>

        {/* CARETAKER REVIEWS */}
        <h3 className="mx-auto mb-4 mt-[38px] max-w-[1120px] text-left text-[1.2rem] text-[#2f6244]">Caretakers</h3>
        <div className="mx-auto mt-0 grid max-w-[1120px] grid-cols-1 gap-[22px] md:grid-cols-2 lg:grid-cols-3">

          <div className={reviewCard}>
            <img src={caretaker1} alt="Caretaker review" className="h-[58px] w-[58px] rounded-full object-cover" />
            <p className="my-4 min-h-[76px] text-[0.98rem] leading-[1.65] text-[#48564f]">
              “Clear responsibilities and transparent payments
              make this platform professional.”
            </p>
            <strong className="text-[#1f2f27]">— Priya V.</strong>
          </div>

          <div className={reviewCard}>
            <img src={caretaker2} alt="Caretaker review" className="h-[58px] w-[58px] rounded-full object-cover" />
            <p className="my-4 min-h-[76px] text-[0.98rem] leading-[1.65] text-[#48564f]">
              “Role-based access helps me manage my work
              efficiently.”
            </p>
            <strong className="text-[#1f2f27]">— Suresh P.</strong>
          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className={`${section} bg-[#315f44] text-white`}>
        <h2 className="m-0 text-[clamp(2rem,3vw,2.85rem)] leading-[1.12] tracking-normal text-white">Get Started with Trusted Elder Care Today</h2>
        <p className="mx-auto mb-7 mt-3.5 max-w-[620px] text-base leading-[1.7] text-white/80">
          Join thousands of families who trust Nest Life:CURA
          for safe and reliable elder care.
        </p>
        <a href="/register" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white bg-white px-[22px] font-bold text-[#2f6244] no-underline transition hover:-translate-y-0.5 hover:bg-[#f4f8f3]">Create Free Account</a>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#1f2f27] px-5 py-6 text-center text-[0.92rem] text-[#d7e1d9]">
        © 2026 Nest Life:CURA. All rights reserved.
      </footer>

    </div>
  );
}

export default Home;
