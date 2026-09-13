import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, ArrowLeft, FileText, Code2, Languages } from 'lucide-react';
import { apiUrl } from '../api';

const C = {
  bg: "#0B0F19", surface: "#121A2C", surfaceAlt: "#19233A",
  border: "#242F49", text: "#EDF1F7", textDim: "#8C96AC",
  violet: "#7C5CFC", violetDim: "#7C5CFC33", teal: "#3ED9C5", amber: "#FFB454",
};

export default function AdminPanel({ onLogout, onBack }) {
  const [mainTab, setMainTab] = useState('jobs');
  const [jobCategory, setJobCategory] = useState('IT');
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '', company: '', location: '', type: 'Full-time', salary: '', category: 'IT', tags: '', active: true
  });
  const token = localStorage.getItem('adminToken');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [jobsRes, appsRes] = await Promise.all([
        fetch(apiUrl('/api/jobs/all'), { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(apiUrl('/api/applications'), { headers: { 'Authorization': `Bearer ${token}` } })
      ]);
      if (jobsRes.ok) {
        const jobsData = await jobsRes.json();
        setJobs(Array.isArray(jobsData) ? jobsData : []);
      }
      if (appsRes.ok) {
        const appsData = await appsRes.json();
        setApplications(Array.isArray(appsData) ? appsData : []);
      }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleSaveJob = async (e) => {
    e.preventDefault();
    const payload = { ...formData, tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean) };
    const url = editingJob ? apiUrl(`/api/jobs/${editingJob._id}`) : apiUrl('/api/jobs');
    const method = editingJob ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setShowForm(false); setEditingJob(null);
        setFormData({ title: '', company: '', location: '', type: 'Full-time', salary: '', category: 'IT', tags: '', active: true });
        fetchData();
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.message || 'Error saving job');
      }
    } catch (err) { alert('Error saving job'); }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm('Delete this job?')) return;
    try {
      await fetch(apiUrl(`/api/jobs/${id}`), { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      fetchData();
    } catch (err) { alert('Error deleting job'); }
  };

  const handleDeleteApp = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    try {
      await fetch(apiUrl(`/api/applications/${id}`), { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      fetchData();
    } catch (err) { alert('Error deleting application'); }
  };

  const startEdit = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title, company: job.company, location: job.location,
      type: job.type, salary: job.salary, category: job.category || 'IT',
      tags: (job.tags || []).join(', '), active: job.active
    });
    setShowForm(true);
  };

  const cvHref = (cvPath) => {
    if (!cvPath) return '#';
    const normalized = String(cvPath).replace(/\\/g, '/').replace(/^\/+/, '');
    return apiUrl(`/${normalized}`);
  };

  const filteredJobs = jobs.filter(j => j.category === jobCategory);
  const itCount = jobs.filter(j => j.category === 'IT').length;
  const interpCount = jobs.filter(j => j.category === 'Interpreters').length;

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'Inter', sans-serif", minHeight: '100vh' }}>
      {/* HEADER */}
      <header style={{ borderBottom: `1px solid ${C.border}`, background: `${C.bg}E6`, backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={onBack} style={{ background: 'none', border: 'none', color: C.textDim, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <ArrowLeft size={18} /> Back
            </button>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16 }}>Admin Dashboard</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setMainTab('jobs')} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: mainTab === 'jobs' ? C.violet : C.surfaceAlt, color: '#fff', fontSize: 13, fontWeight: 600 }}>
              Jobs
            </button>
            <button onClick={() => setMainTab('apps')} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: mainTab === 'apps' ? C.violet : C.surfaceAlt, color: '#fff', fontSize: 13, fontWeight: 600 }}>
              Applications ({applications.length})
            </button>
            <button onClick={onLogout} style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid ${C.border}`, background: 'transparent', color: C.textDim, cursor: 'pointer', fontSize: 13 }}>Logout</button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
        {loading && <div style={{ textAlign: 'center', padding: 48, color: C.textDim }}>Loading...</div>}

        {/* JOBS TAB */}
        {!loading && mainTab === 'jobs' && (
          <>
            {/* Category Swipe Tabs */}
            <div style={{ display: 'flex', gap: 0, marginBottom: 24, background: C.surfaceAlt, borderRadius: 12, padding: 4, overflow: 'hidden' }}>
              <button onClick={() => { setJobCategory('IT'); setShowForm(false); }} style={{
                flex: 1, padding: '12px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
                background: jobCategory === 'IT' ? C.violet : 'transparent', color: '#fff',
                fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all .2s'
              }}>
                <Code2 size={18} /> IT & Technology <span style={{ opacity: 0.7, fontSize: 12, marginLeft: 4 }}>({itCount})</span>
              </button>
              <button onClick={() => { setJobCategory('Interpreters'); setShowForm(false); }} style={{
                flex: 1, padding: '12px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
                background: jobCategory === 'Interpreters' ? C.teal : 'transparent', color: '#fff',
                fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all .2s'
              }}>
                <Languages size={18} /> Interpreters <span style={{ opacity: 0.7, fontSize: 12, marginLeft: 4 }}>({interpCount})</span>
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700 }}>
                {jobCategory === 'IT' ? 'IT & Technology Jobs' : 'Interpreter & Language Jobs'}
              </h2>
              <button onClick={() => { setEditingJob(null); setFormData({ title: '', company: '', location: '', type: 'Full-time', salary: '', category: jobCategory, tags: '', active: true }); setShowForm(true); }} style={{
                background: jobCategory === 'IT' ? C.violet : C.teal, color: '#fff', border: 'none', borderRadius: 8,
                padding: '10px 18px', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
              }}>
                <Plus size={16} /> Add {jobCategory} Job
              </button>
            </div>

            {/* Job Form */}
            {showForm && (
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24, marginBottom: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>{editingJob ? 'Edit Job' : `New ${jobCategory} Job`}</h3>
                <form onSubmit={handleSaveJob} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                  {['title','company','location','salary'].map(field => (
                    <div key={field}>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.textDim, marginBottom: 6, textTransform: 'capitalize' }}>{field}</label>
                      <input required value={formData[field]} onChange={e => setFormData({...formData, [field]: e.target.value})}
                        style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 12px', color: C.text, fontSize: 13, outline: 'none' }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.textDim, marginBottom: 6 }}>Type</label>
                    <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}
                      style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 12px', color: C.text, fontSize: 13, outline: 'none' }}>
                      <option>Full-time</option><option>Contract</option><option>Part-time</option><option>Internship</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.textDim, marginBottom: 6 }}>Category</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                      style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 12px', color: C.text, fontSize: 13, outline: 'none' }}>
                      <option value="IT">IT & Technology</option>
                      <option value="Interpreters">Interpreters & Languages</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.textDim, marginBottom: 6 }}>Tags (comma separated)</label>
                    <input value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})}
                      style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 12px', color: C.text, fontSize: 13, outline: 'none' }} placeholder="React, Node.js, Remote" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input type="checkbox" id="active" checked={formData.active} onChange={e => setFormData({...formData, active: e.target.checked})} />
                    <label htmlFor="active" style={{ fontSize: 13, color: C.textDim }}>Active</label>
                  </div>
                  <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                    <button type="button" onClick={() => setShowForm(false)} style={{ padding: '10px 18px', borderRadius: 8, border: `1px solid ${C.border}`, background: 'transparent', color: C.text, cursor: 'pointer', fontSize: 13 }}>Cancel</button>
                    <button type="submit" style={{ padding: '10px 22px', borderRadius: 8, border: 'none', background: jobCategory === 'IT' ? C.violet : C.teal, color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Save size={14} /> Save Job
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Jobs List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filteredJobs.map(job => (
                <div key={job._id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, opacity: job.active ? 1 : 0.5 }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '2px 8px', borderRadius: 4, background: job.category === 'IT' ? `${C.violet}33` : `${C.teal}33`, color: job.category === 'IT' ? C.violet : C.teal }}>
                        {job.category}
                      </span>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{job.title}</div>
                    </div>
                    <div style={{ color: C.textDim, fontSize: 12, marginBottom: 6 }}>{job.company} • {job.location}</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {(job.tags || []).map(t => <span key={t} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 999, background: C.surfaceAlt, color: C.textDim, border: `1px solid ${C.border}` }}>{t}</span>)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 12, color: C.amber, fontFamily: "'IBM Plex Mono', monospace" }}>{job.salary}</span>
                    <button onClick={() => startEdit(job)} style={{ background: 'none', border: 'none', color: C.violet, cursor: 'pointer', padding: 6 }}><Edit2 size={15} /></button>
                    <button onClick={() => handleDeleteJob(job._id)} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', padding: 6 }}><Trash2 size={15} /></button>
                  </div>
                </div>
              ))}
              {filteredJobs.length === 0 && (
                <div style={{ textAlign: 'center', padding: 48, color: C.textDim }}>
                  No {jobCategory} jobs yet. Add your first one above.
                </div>
              )}
            </div>
          </>
        )}

        {/* APPLICATIONS TAB */}
        {!loading && mainTab === 'apps' && (
          <>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Applications</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {applications.map(app => (
                <div key={app._id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{app.name}</div>
                      <div style={{ color: C.textDim, fontSize: 12 }}>{app.email} {app.phone && `• ${app.phone}`}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <a href={cvHref(app.cvPath)} target="_blank" rel="noreferrer" style={{
                        display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: C.teal,
                        textDecoration: 'none', padding: '6px 10px', borderRadius: 6, background: `${C.teal}11`, border: `1px solid ${C.teal}33`
                      }}>
                        <FileText size={13} /> CV
                      </a>
                      <button onClick={() => handleDeleteApp(app._id)} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', padding: 6 }}><Trash2 size={15} /></button>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: C.amber, marginBottom: 6 }}>Applied for: {app.role}</div>
                  {app.message && <p style={{ color: C.textDim, fontSize: 13, lineHeight: 1.5 }}>{app.message}</p>}
                  <div style={{ fontSize: 11, color: C.textDim, marginTop: 8 }}>{new Date(app.createdAt).toLocaleString()}</div>
                </div>
              ))}
              {applications.length === 0 && <div style={{ textAlign: 'center', padding: 48, color: C.textDim }}>No applications yet.</div>}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
