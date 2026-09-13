import { useState, useRef, useEffect } from "react";
import {
  Search, Users, Briefcase, Target, Megaphone, Building2,
  MapPin, Clock, ArrowRight, Star, Menu, X, CheckCircle2,
  Send, TrendingUp, Award, Sparkles, ChevronRight, FileText, Shield,
  Code2, Languages
} from "lucide-react";
import { apiUrl } from "../api";

const C = {
  bg: "#0B0F19", surface: "#121A2C", surfaceAlt: "#19233A",
  border: "#242F49", text: "#EDF1F7", textDim: "#8C96AC",
  violet: "#7C5CFC", violetDim: "#7C5CFC33",
  amber: "#FFB454", teal: "#3ED9C5", blue: "#4A90D9",
};

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "it-jobs", label: "IT Jobs" },
  { id: "interpreter-jobs", label: "Interpreter Jobs" },
  { id: "about", label: "About" },
  { id: "blog", label: "Blog" },
  { id: "reviews", label: "Reviews" },
];

const SERVICES = [
  { icon: Target, title: "AI & ML Talent Search", desc: "Sourcing engineers, researchers and applied scientists vetted against real model-building and deployment work." },
  { icon: Users, title: "Executive Search", desc: "Placing CTOs, VPs of Engineering and Heads of AI who can set technical direction and hire the next tier under them." },
  { icon: Briefcase, title: "Contract & Contract-to-Hire", desc: "Flexible engagements for teams that need senior hands fast, with a clean path to full-time when the fit is proven." },
  { icon: Building2, title: "Recruitment Process Outsourcing", desc: "We run the pipeline end-to-end — sourcing, screening, scheduling — as an embedded extension of your hiring team." },
  { icon: Search, title: "Technical Vetting", desc: "Structured take-homes, pairing sessions and system-design interviews run by practitioners, so offers go out with confidence." },
  { icon: Megaphone, title: "Employer Branding", desc: "Positioning your team's mission and stack so the candidates you actually want come find you first." },
];

const BLOG_POSTS = [
  { tag: "Hiring Trends", title: "What separates a strong AI engineer resume from a great one", excerpt: "Titles and tool lists don't tell you much anymore. Here's what our vetting panel actually looks for before an interview gets scheduled.", read: "6 min read" },
  { tag: "For Employers", title: "The real cost of a six-month AI hiring cycle", excerpt: "Slow pipelines don't just delay roadmaps — they lose you the candidates you wanted most. A breakdown of where time actually goes.", read: "5 min read" },
  { tag: "Candidate Advice", title: "How to talk about model performance in an interview", excerpt: "Panels can tell the difference between someone who shipped a model and someone who can explain why it worked. Here's how to show the latter.", read: "4 min read" },
];

const REVIEWS = [
  { name: "Priya Nathan", role: "VP Engineering", company: "Lumen Analytics", quote: "Every candidate they sent us had already been through a real technical bar. We stopped wasting first-round interviews on people who weren't close.", rating: 5 },
  { name: "Marcus Ferreira", role: "Head of Talent", company: "Orbital Health", quote: "They found our Head of AI in five weeks after two other firms failed for six months. The difference was how well they understood the role.", rating: 5 },
  { name: "Sana Iqbal", role: "Founder & CEO", company: "Northline AI", quote: "Working with a recruiter who actually reads papers and understands the stack changed how fast we could move. Genuinely rare.", rating: 5 },
];

const STATS = [
  { value: "1,200+", label: "Roles filled" },
  { value: "19 days", label: "Avg. time to shortlist" },
  { value: "94%", label: "12-month retention" },
  { value: "310+", label: "Companies served" },
];

function TalentRadar() {
  const nodes = [
    { r: 150, dur: 22, size: 7, color: C.violet, delay: 0 },
    { r: 150, dur: 22, size: 5, color: C.teal, delay: -7 },
    { r: 105, dur: 16, size: 6, color: C.amber, delay: -3 },
    { r: 105, dur: 16, size: 5, color: C.violet, delay: -10 },
    { r: 60, dur: 11, size: 5, color: C.teal, delay: -4 },
  ];
  return (
    <div className="radar-wrap">
      <style>{`
        @keyframes radar-orbit { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
        @keyframes radar-pulse { 0%,100% { opacity:.55; transform: scale(1);} 50% { opacity:1; transform: scale(1.06);} }
        @keyframes radar-sweep { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
        .radar-wrap { position: relative; width: min(340px, 80vw); height: min(340px, 80vw); margin: 0 auto; }
        @media (max-width: 640px) { .radar-wrap { width: 260px; height: 260px; } }
      `}</style>
      <div style={{ position: "absolute", top: "50%", left: "50%", width: 300, height: 300, marginTop: -150, marginLeft: -150, borderRadius: "50%", background: `conic-gradient(from 0deg, ${C.violet}22, transparent 35%)`, animation: "radar-sweep 6s linear infinite" }} />
      {[150, 105, 60].map((r) => (
        <div key={r} style={{ position: "absolute", top: "50%", left: "50%", width: r * 2, height: r * 2, marginTop: -r, marginLeft: -r, borderRadius: "50%", border: `1px solid ${C.border}` }} />
      ))}
      {nodes.map((n, i) => (
        <div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: n.r * 2, height: n.r * 2, marginTop: -n.r, marginLeft: -n.r, animation: `radar-orbit ${n.dur}s linear infinite`, animationDelay: `${n.delay}s` }}>
          <div style={{ position: "absolute", top: 0, left: "50%", width: n.size, height: n.size, marginLeft: -n.size / 2, borderRadius: "50%", background: n.color, boxShadow: `0 0 12px ${n.color}` }} />
        </div>
      ))}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 84, height: 84, borderRadius: "50%", background: `radial-gradient(circle at 35% 30%, ${C.violet}, #4b32c9)`, display: "flex", alignItems: "center", justifyContent: "center", animation: "radar-pulse 2.6s ease-in-out infinite", boxShadow: `0 0 40px ${C.violet}66` }}>
        <Sparkles size={30} color="#fff" />
      </div>
    </div>
  );
}

const Eyebrow = ({ children }) => (
  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: C.teal, display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
    <span style={{ width: 18, height: 1, background: C.teal, display: "inline-block" }} />
    {children}
  </div>
);

const SectionTitle = ({ eyebrow, title, sub }) => (
  <div style={{ maxWidth: 640, marginBottom: 48 }}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(26px, 4vw, 40px)", lineHeight: 1.15, color: C.text, marginBottom: sub ? 14 : 0 }}>{title}</h2>
    {sub && <p style={{ color: C.textDim, fontSize: 16, lineHeight: 1.6 }}>{sub}</p>}
  </div>
);

function JobCard({ job, onApply }) {
  return (
    <div className="card job-card-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
      <div style={{ flex: "1 1 280px", minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.teal, boxShadow: `0 0 8px ${C.teal}`, flexShrink: 0 }} />
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>{job.title}</h3>
        </div>
        <div style={{ color: C.textDim, fontSize: 12.5, marginBottom: 10 }}>{job.company}</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {(job.tags || []).map((t) => <span className="tag" key={t}>{t}</span>)}
        </div>
      </div>
      <div className="job-meta" style={{ display: "flex", alignItems: "center", gap: "16px 20px", flexWrap: "wrap" }}>
        <div style={{ fontSize: 12.5, color: C.textDim, display: "flex", alignItems: "center", gap: 5 }}>
          <MapPin size={13} /> {job.location}
        </div>
        <div style={{ fontSize: 12.5, color: C.textDim, display: "flex", alignItems: "center", gap: 5 }}>
          <Clock size={13} /> {job.type}
        </div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5, color: C.amber, whiteSpace: "nowrap" }}>{job.salary}</div>
        <button className="btn-ghost" style={{ padding: "9px 16px", fontSize: 13 }} onClick={() => onApply(job.title)}>
          Apply <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

function JobSection({ id, eyebrow, title, sub, icon: Icon, iconColor, jobs, loading, onApply }) {
  return (
    <section id={id} style={{ padding: "72px 0", borderBottom: `1px solid ${C.border}` }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: `${iconColor}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon size={22} color={iconColor} />
          </div>
          <SectionTitle eyebrow={eyebrow} title={title} sub={sub} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: 48, color: C.textDim }}>Loading jobs...</div>
          ) : jobs.length === 0 ? (
            <div style={{ textAlign: "center", padding: 48, color: C.textDim }}>No open roles right now. Check back soon!</div>
          ) : (
            jobs.map((j) => <JobCard key={j._id} job={j} onApply={onApply} />)
          )}
        </div>
      </div>
    </section>
  );
}

export default function AITalentHuntSite({ isAdmin, onLoginClick, onAdminClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [itJobs, setItJobs] = useState([]);
  const [interpJobs, setInterpJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "", message: "" });
  const [cvFile, setCvFile] = useState(null);
  const [cvError, setCvError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setJobsLoading(true);
    Promise.all([
      fetch(apiUrl('/api/jobs?category=IT')).then(r => r.ok ? r.json() : []),
      fetch(apiUrl('/api/jobs?category=Interpreters')).then(r => r.ok ? r.json() : [])
    ])
      .then(([it, interp]) => {
        setItJobs(Array.isArray(it) ? it : []);
        setInterpJobs(Array.isArray(interp) ? interp : []);
        setJobsLoading(false);
      })
      .catch(() => setJobsLoading(false));
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const applyForJob = (title) => {
    setForm(f => ({ ...f, role: title }));
    setSubmitted(false);
    setCvError("");
    setTimeout(() => scrollTo("apply"), 30);
  };

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    setCvError("");
    if (!file) {
      setCvFile(null);
      return;
    }
    if (file.type !== "application/pdf") {
      setCvError("Only PDF files are allowed");
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setCvError("File size must be under 2MB");
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setCvFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.role || !cvFile) {
      setCvError(cvFile ? "" : "Please attach a PDF CV");
      return;
    }
    setSubmitting(true);
    const data = new FormData();
    data.append("cv", cvFile);
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("phone", form.phone);
    data.append("role", form.role);
    data.append("message", form.message);
    try {
      const res = await fetch(apiUrl('/api/applications'), { method: "POST", body: data });
      if (res.ok) {
        setSubmittedName(form.name);
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", role: "", message: "" });
        setCvFile(null);
        setCvError("");
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.message || "Something went wrong");
      }
    } catch {
      alert("Network error. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'Inter', sans-serif", minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        a { color: inherit; text-decoration: none; }
        input, textarea, select { font-family: 'Inter', sans-serif; }
        input::placeholder, textarea::placeholder { color: #57607a; }
        .container { max-width: 1140px; margin: 0 auto; padding: 0 20px; }
        .navlink { color: ${C.textDim}; font-size: 14px; font-weight: 500; cursor: pointer; transition: color .2s; }
        .navlink:hover { color: ${C.text}; }
        .btn-primary {
          background: ${C.violet}; color: #fff; border: none; border-radius: 8px;
          padding: 12px 22px; font-weight: 600; font-size: 14px; cursor: pointer;
          display: inline-flex; align-items: center; gap: 8px; transition: transform .15s, box-shadow .15s;
          white-space: nowrap;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px ${C.violet}55; }
        .btn-ghost {
          background: transparent; color: ${C.text}; border: 1px solid ${C.border}; border-radius: 8px;
          padding: 12px 22px; font-weight: 600; font-size: 14px; cursor: pointer;
          display: inline-flex; align-items: center; gap: 8px; transition: border-color .15s, background .15s;
          white-space: nowrap;
        }
        .btn-ghost:hover { border-color: ${C.violet}; background: ${C.violet}11; }
        .card {
          background: ${C.surface}; border: 1px solid ${C.border}; border-radius: 14px;
          padding: 24px; transition: border-color .2s, transform .2s;
        }
        .card:hover { border-color: ${C.violet}66; transform: translateY(-3px); }
        .tag {
          font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: .04em;
          padding: 4px 10px; border-radius: 999px; background: ${C.surfaceAlt}; color: ${C.textDim};
          border: 1px solid ${C.border}; white-space: nowrap;
        }
        .field label { display:block; font-size: 13px; font-weight: 600; color: ${C.textDim}; margin-bottom: 6px; }
        .field input, .field textarea, .field select {
          width: 100%; background: ${C.bg}; border: 1px solid ${C.border}; border-radius: 8px;
          padding: 12px 14px; color: ${C.text}; font-size: 14px; outline: none; transition: border-color .15s;
        }
        .field input:focus, .field textarea:focus, .field select:focus { border-color: ${C.violet}; }
        .file-input-wrap {
          position: relative; border: 2px dashed ${C.border}; border-radius: 10px;
          padding: 20px; text-align: center; cursor: pointer; transition: border-color .2s;
        }
        .file-input-wrap:hover { border-color: ${C.violet}; }
        .file-input-wrap input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
        .category-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 500;
          padding: 4px 12px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.08em;
        }

        @media (max-width: 960px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .hero-radar { order: -1; margin-bottom: 24px; }
          .hero-stats { justify-content: center !important; }
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .apply-grid { grid-template-columns: 1fr !important; }
          .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .reviews-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        @media (max-width: 640px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .blog-grid { grid-template-columns: 1fr !important; }
          .reviews-grid { grid-template-columns: 1fr !important; }
          .job-card-inner { flex-direction: column !important; align-items: flex-start !important; }
          .job-meta { width: 100% !important; justify-content: flex-start !important; flex-wrap: wrap !important; }
          .apply-form-grid { grid-template-columns: 1fr !important; }
          .hero-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
          .footer-inner { flex-direction: column; text-align: center; align-items: center !important; }
          .card { padding: 20px !important; }
        }
        @media (max-width: 400px) {
          .btn-primary, .btn-ghost { padding: 10px 16px; font-size: 13px; }
          .tag { font-size: 10px; padding: 3px 8px; }
        }
      `}</style>

      {/* NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: `${C.bg}F2`, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}` }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <div onClick={() => scrollTo("home")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${C.violet}, ${C.teal})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Target size={16} color="#0B0F19" />
            </div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>AI Talent Hunt</span>
          </div>

          <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {NAV_LINKS.map((l) => (
              <span key={l.id} className="navlink" onClick={() => scrollTo(l.id)}>{l.label}</span>
            ))}
            <button className="btn-primary" onClick={() => scrollTo("apply")}>Apply Now <ArrowRight size={15} /></button>
          </nav>

          <button className="mobile-toggle" style={{ display: "none", background: "none", border: "none", color: C.text, cursor: "pointer", padding: 4 }} onClick={() => setMenuOpen((m) => !m)} aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div style={{ borderTop: `1px solid ${C.border}`, padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
            {NAV_LINKS.map((l) => (
              <span key={l.id} className="navlink" style={{ fontSize: 15, padding: "6px 0" }} onClick={() => scrollTo(l.id)}>{l.label}</span>
            ))}
            <button className="btn-primary" style={{ justifyContent: "center", marginTop: 4 }} onClick={() => scrollTo("apply")}>Apply Now <ArrowRight size={15} /></button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" style={{ padding: "80px 0 64px", borderBottom: `1px solid ${C.border}` }}>
        <div className="container hero-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 40, alignItems: "center" }}>
          <div>
            <Eyebrow>AI &amp; Deep-Tech Recruitment</Eyebrow>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(32px, 5.4vw, 56px)", lineHeight: 1.08, letterSpacing: "-0.01em", marginBottom: 18 }}>
              We hunt the talent that builds <span style={{ color: C.violet }}>what's next.</span>
            </h1>
            <p style={{ color: C.textDim, fontSize: "clamp(15px, 1.6vw, 17px)", lineHeight: 1.65, maxWidth: 480, marginBottom: 28 }}>
              A recruitment partner built for AI and deep-tech teams. We source, vet and place engineers, researchers and leaders who've actually shipped.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
              <button className="btn-primary" onClick={() => scrollTo("it-jobs")}>View IT Roles <ArrowRight size={15} /></button>
              <button className="btn-ghost" onClick={() => scrollTo("interpreter-jobs")}>Interpreter Jobs</button>
            </div>
            <div className="hero-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, auto)", gap: "24px 32px" }}>
              {STATS.map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(18px, 2vw, 22px)", color: C.text }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: C.textDim, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-radar"><TalentRadar /></div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "72px 0", borderBottom: `1px solid ${C.border}` }}>
        <div className="container">
          <SectionTitle eyebrow="What We Do" title="Recruitment built around how AI teams actually hire" sub="Six services, one goal: getting the right person in front of the right team, faster than doing it alone." />
          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <div className="card" key={s.title}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: C.violetDim, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon size={19} color={C.violet} />
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 8, lineHeight: 1.3 }}>{s.title}</h3>
                  <p style={{ color: C.textDim, fontSize: 13.5, lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* IT JOBS */}
      <JobSection
        id="it-jobs"
        eyebrow="IT & Technology"
        title="IT Field & Technology Roles"
        sub="Software engineers, DevOps, data scientists, AI researchers, and technical leads."
        icon={Code2}
        iconColor={C.violet}
        jobs={itJobs}
        loading={jobsLoading}
        onApply={applyForJob}
      />

      {/* INTERPRETER JOBS */}
      <JobSection
        id="interpreter-jobs"
        eyebrow="Languages & Communication"
        title="Interpreter & Language Roles"
        sub="Professional interpreters, translators, linguists, and multilingual communication specialists."
        icon={Languages}
        iconColor={C.teal}
        jobs={interpJobs}
        loading={jobsLoading}
        onApply={applyForJob}
      />

      {/* ABOUT */}
      <section id="about" style={{ padding: "72px 0", borderBottom: `1px solid ${C.border}` }}>
        <div className="container about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          <div>
            <Eyebrow>About Us</Eyebrow>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(24px, 3.6vw, 36px)", lineHeight: 1.15, marginBottom: 16 }}>
              Recruiters who read the papers, not just the resumes.
            </h2>
            <p style={{ color: C.textDim, fontSize: 15, lineHeight: 1.7, marginBottom: 14 }}>
              AI Talent Hunt started in 2019 when two engineering leads got tired of recruiters who couldn't tell a fine-tune from a foundation model. We built a search firm staffed by people who've actually worked in AI teams.
            </p>
            <p style={{ color: C.textDim, fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
              Today we work with startups through public companies, running searches that range from a single founding engineer to building out an entire applied-AI org from scratch.
            </p>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.amber, fontWeight: 600, fontSize: 13.5 }}>
                <Award size={16} /> Founded 2019
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.teal, fontWeight: 600, fontSize: 13.5 }}>
                <TrendingUp size={16} /> 38-person team
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { t: "Practitioner-led vetting", d: "Every technical screen is run by someone who has done the job, not a generalist reading a script." },
              { t: "No spray-and-pray", d: "We send 3–5 seriously matched candidates per role, not thirty loosely relevant ones." },
              { t: "Retained partnership", d: "We stay involved through offer, negotiation and the first 90 days — not just to the signed offer." },
            ].map((v) => (
              <div key={v.t} className="card" style={{ padding: 20 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <CheckCircle2 size={17} color={C.violet} style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>{v.t}</div>
                    <div style={{ color: C.textDim, fontSize: 13, lineHeight: 1.55 }}>{v.d}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" style={{ padding: "72px 0", borderBottom: `1px solid ${C.border}` }}>
        <div className="container">
          <SectionTitle eyebrow="Field Notes" title="From the desk of our recruiting team" sub="Notes on hiring, interviewing and the AI talent market, from people running searches every week." />
          <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {BLOG_POSTS.map((b) => (
              <div className="card" key={b.title} style={{ cursor: "pointer" }}>
                <span className="tag" style={{ color: C.teal, borderColor: `${C.teal}55` }}>{b.tag}</span>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15.5, fontWeight: 600, margin: "14px 0 8px", lineHeight: 1.35 }}>{b.title}</h3>
                <p style={{ color: C.textDim, fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{b.excerpt}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: C.textDim }}>
                  <span>{b.read}</span>
                  <span style={{ color: C.violet, display: "flex", alignItems: "center", gap: 4, fontWeight: 600 }}>Read <ArrowRight size={12} /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" style={{ padding: "72px 0", borderBottom: `1px solid ${C.border}` }}>
        <div className="container">
          <SectionTitle eyebrow="Client Reviews" title="What hiring teams say after working with us" />
          <div className="reviews-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {REVIEWS.map((r) => (
              <div className="card" key={r.name}>
                <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={13} fill={C.amber} color={C.amber} />
                  ))}
                </div>
                <p style={{ color: C.text, fontSize: 14, lineHeight: 1.6, marginBottom: 18, fontStyle: "italic" }}>"{r.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${C.violet}, ${C.teal})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "#0B0F19", flexShrink: 0 }}>
                    {r.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{r.name}</div>
                    <div style={{ color: C.textDim, fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.role}, {r.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLY */}
      <section id="apply" style={{ padding: "72px 0", borderBottom: `1px solid ${C.border}` }}>
        <div className="container apply-grid" style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 48 }}>
          <div>
            <Eyebrow>Apply</Eyebrow>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(24px, 3.2vw, 32px)", lineHeight: 1.2, marginBottom: 16 }}>
              Tell us what you're looking for. We'll take it from there.
            </h2>
            <p style={{ color: C.textDim, fontSize: 14.5, lineHeight: 1.65, marginBottom: 28 }}>
              Whether you're job-hunting or hiring, this form reaches a real recruiter — not a queue. Expect a reply within two business days.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {["We review every submission personally", "No resume-to-database black hole", "We'll follow up even if it's not a fit yet"].map((t) => (
                <div key={t} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <CheckCircle2 size={16} color={C.teal} />
                  <span style={{ fontSize: 13.5, color: C.text }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card" ref={formRef} style={{ padding: "28px" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "36px 10px" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: `${C.teal}22`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
                  <CheckCircle2 size={26} color={C.teal} />
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Application received</h3>
                <p style={{ color: C.textDim, fontSize: 13.5, marginBottom: 20 }}>
                  Thanks, {submittedName.split(" ")[0] || "there"}. A recruiter will reach out within two business days.
                </p>
                <button className="btn-ghost" onClick={() => { setSubmitted(false); setSubmittedName(""); setForm({ name: "", email: "", phone: "", role: "", message: "" }); setCvFile(null); setCvError(""); }}>
                  Submit another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="apply-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="field">
                  <label>Full name *</label>
                  <input required placeholder="Jordan Lee" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="field">
                  <label>Email *</label>
                  <input required type="email" placeholder="you@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="field">
                  <label>Phone</label>
                  <input placeholder="+1 (555) 000-0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="field">
                  <label>Role of interest *</label>
                  <select required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                    <option value="">Select a role</option>
                    <optgroup label="IT & Technology">
                      {itJobs.map((j) => <option key={j._id} value={j.title}>{j.title}</option>)}
                    </optgroup>
                    <optgroup label="Interpreters & Languages">
                      {interpJobs.map((j) => <option key={j._id} value={j.title}>{j.title}</option>)}
                    </optgroup>
                    <option value="Other">Other / Not listed</option>
                  </select>
                </div>
                <div className="field" style={{ gridColumn: "1 / -1" }}>
                  <label>Message</label>
                  <textarea rows={3} placeholder="Tell us a bit about your background or hiring need..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                <div className="field" style={{ gridColumn: "1 / -1" }}>
                  <label>Attach CV (PDF, max 2MB) *</label>
                  <div className="file-input-wrap">
                    <input ref={fileInputRef} type="file" accept=".pdf,application/pdf" onChange={handleCvChange} required />
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, pointerEvents: "none" }}>
                      <FileText size={22} color={cvFile ? C.teal : C.textDim} />
                      {cvFile ? (
                        <span style={{ fontSize: 13, color: C.teal, fontWeight: 500 }}>{cvFile.name} ({(cvFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                      ) : (
                        <span style={{ fontSize: 13, color: C.textDim }}>Click or drag PDF here</span>
                      )}
                    </div>
                  </div>
                  {cvError && <p style={{ color: '#ff6b6b', fontSize: 12, marginTop: 6 }}>{cvError}</p>}
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <button type="submit" disabled={submitting} className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px 24px", opacity: submitting ? 0.7 : 1 }}>
                    {submitting ? "Submitting..." : "Submit Application"} <Send size={15} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px 0" }}>
        <div className="container footer-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: 6, background: `linear-gradient(135deg, ${C.violet}, ${C.teal})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Target size={14} color="#0B0F19" />
              </div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15 }}>AI Talent Hunt</span>
            </div>
            <p style={{ color: C.textDim, fontSize: 12.5 }}>© {new Date().getFullYear()} AI Talent Hunt. All rights reserved.</p>
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
            {NAV_LINKS.map((l) => (
              <span key={l.id} className="navlink" onClick={() => scrollTo(l.id)}>{l.label}</span>
            ))}
            {isAdmin ? (
              <button onClick={onAdminClick} className="navlink" style={{ display: "flex", alignItems: "center", gap: 4, background: 'none', border: 'none', fontSize: 13 }}>
                <Shield size={13} /> Dashboard
              </button>
            ) : (
              <button onClick={onLoginClick} className="navlink" style={{ display: "flex", alignItems: "center", gap: 4, background: 'none', border: 'none', fontSize: 13 }}>
                <Shield size={13} /> Admin
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
