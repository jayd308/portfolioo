import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, FolderKanban, Wrench, Award, MessageSquare, Settings,
  LogOut, Menu, X, Plus, Pencil, Trash2, Save, Loader2,
  ChevronDown, ExternalLink, Eye, EyeOff, Mail,
  Phone, Instagram, Facebook, Linkedin, ArrowUp, ArrowDown,
  FileImage, ShieldCheck, Inbox, Clock,
} from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../utils/api'

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const SKILL_CATEGORIES = ['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Design', 'Other']

function Spinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
    </div>
  )
}

function EmptyState({ icon: Icon, message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
      <Icon className="w-12 h-12 mb-4 opacity-40" />
      <p className="text-sm">{message}</p>
    </div>
  )
}

function ConfirmDialog({ open, title, message, onConfirm, onCancel, loading }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative glass-card p-6 w-full max-w-sm">
        <h3 className="text-lg font-semibold text-gray-100 mb-2">{title}</h3>
        <p className="text-sm text-gray-400 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="btn-outline text-sm py-2 px-4">Cancel</button>
          <button onClick={onConfirm} disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-medium transition-colors disabled:opacity-50">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function Modal({ open, title, onClose, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative glass-card p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-200 transition-colors"><X className="w-5 h-5" /></button>
        </div>
        {children}
      </motion.div>
    </div>
  )
}

function InputField({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <input {...props} className="w-full px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-100 placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 focus:outline-none transition-all text-sm" />
    </div>
  )
}

function TextareaField({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <textarea {...props} className="w-full px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-100 placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 focus:outline-none transition-all text-sm resize-none" />
    </div>
  )
}

function FileField({ label, accept, fileName, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:border-primary-500/50 cursor-pointer transition-all text-sm">
        <FileImage className="w-4 h-4" />
        <span className="truncate">{fileName || 'Choose file...'}</span>
        <input type="file" accept={accept} onChange={onChange} className="hidden" />
      </label>
    </div>
  )
}

/* ── Profile ──────────────────────────────────────────────────────── */

function ProfileTab() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: '', title: '', description: '', email: '', phone: '', location: '',
    social: { instagram: '', facebook: '', linkedin: '', x: '', whatsapp: '', telegram: '' },
  })
  const [profileImageFile, setProfileImageFile] = useState(null)
  const [aboutImageFile, setAboutImageFile] = useState(null)

  useEffect(() => { fetchProfile() }, [])

  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/profile')
      const p = data.profile || data
      setForm({
        name: p.name || '', title: p.title || '', description: p.description || '',
        email: p.email || '', phone: p.phone || '', location: p.location || '',
        social: {
          instagram: p.social?.instagram || '', facebook: p.social?.facebook || '',
          linkedin: p.social?.linkedin || '', x: p.social?.x || '',
          whatsapp: p.social?.whatsapp || '', telegram: p.social?.telegram || '',
        },
      })
      setProfile(p)
    } catch { toast.error('Failed to load profile') }
    finally { setLoading(false) }
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSocial = (e) => setForm({ ...form, social: { ...form.social, [e.target.name]: e.target.value } })

  const handleSave = async () => {
    setSaving(true)
    try { await api.put('/profile', form); toast.success('Profile updated!') }
    catch (err) { toast.error(err.message || 'Failed to update profile') }
    finally { setSaving(false) }
  }

  const handleImageUpload = async (type, file) => {
    if (!file) return
    const fd = new FormData()
    fd.append(type === 'profile' ? 'profileImage' : 'aboutImage', file)
    try {
      await api.post('/profile', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      toast.success(type === 'profile' ? 'Profile image uploaded!' : 'About image uploaded!')
      fetchProfile()
    } catch (err) { toast.error(err.message || 'Upload failed') }
  }

  if (loading) return <Spinner />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-bold text-gray-100">Profile Information</h2>
        <button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2 px-5 disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span className="ml-1">{saving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="glass-card p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" />
          <InputField label="Title" name="title" value={form.title} onChange={handleChange} placeholder="Software Developer" />
        </div>
        <TextareaField label="Description" name="description" value={form.description} onChange={handleChange} rows={3} placeholder="A short bio about yourself..." />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Email" name="email" value={form.email} onChange={handleChange} type="email" placeholder="you@example.com" />
          <InputField label="Phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+1234567890" />
        </div>
        <InputField label="Location" name="location" value={form.location} onChange={handleChange} placeholder="City, Country" />
      </div>

      <div className="glass-card p-6 space-y-4">
        <h3 className="text-base font-semibold text-gray-200">Social Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <Instagram className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input name="instagram" value={form.social.instagram} onChange={handleSocial} placeholder="Instagram URL" className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-100 placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 focus:outline-none transition-all text-sm" />
          </div>
          <div className="relative">
            <Facebook className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input name="facebook" value={form.social.facebook} onChange={handleSocial} placeholder="Facebook URL" className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-100 placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 focus:outline-none transition-all text-sm" />
          </div>
          <div className="relative">
            <Linkedin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input name="linkedin" value={form.social.linkedin} onChange={handleSocial} placeholder="LinkedIn URL" className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-100 placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 focus:outline-none transition-all text-sm" />
          </div>
          <InputField label="X / Twitter" name="x" value={form.social.x} onChange={handleSocial} placeholder="X URL" />
          <InputField label="WhatsApp" name="whatsapp" value={form.social.whatsapp} onChange={handleSocial} placeholder="https://wa.me/250795452115" />
          <InputField label="Telegram" name="telegram" value={form.social.telegram} onChange={handleSocial} placeholder="https://t.me/jayd3_12" />
        </div>
      </div>

      <div className="glass-card p-6 space-y-4">
        <h3 className="text-base font-semibold text-gray-200">Images</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            {profile?.profileImage && <img src={profile.profileImage} alt="Profile" className="w-24 h-24 rounded-xl object-cover border border-gray-700/50" />}
            <FileField label="Profile Image" accept="image/*" fileName={profileImageFile?.name} onChange={(e) => { setProfileImageFile(e.target.files[0]); handleImageUpload('profile', e.target.files[0]) }} />
          </div>
          <div className="space-y-3">
            {profile?.aboutImage && <img src={profile.aboutImage} alt="About" className="w-24 h-24 rounded-xl object-cover border border-gray-700/50" />}
            <FileField label="About Image" accept="image/*" fileName={aboutImageFile?.name} onChange={(e) => { setAboutImageFile(e.target.files[0]); handleImageUpload('about', e.target.files[0]) }} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Projects ─────────────────────────────────────────────────────── */

function ProjectsTab() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '', featured: false })
  const [imageFile, setImageFile] = useState(null)

  const fetchData = useCallback(async () => {
    try { const { data } = await api.get('/projects'); setProjects(data.projects || data || []) }
    catch { toast.error('Failed to load projects') }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const openAdd = () => {
    setEditId(null)
    setForm({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '', featured: false })
    setImageFile(null)
    setModalOpen(true)
  }

  const openEdit = (p) => {
    setEditId(p._id)
    setForm({
      title: p.title || '', description: p.description || '',
      technologies: Array.isArray(p.technologies) ? p.technologies.join(', ') : p.technologies || '',
      githubUrl: p.githubUrl || p.github || '', liveUrl: p.liveUrl || p.live || '',
      featured: p.featured || false,
    })
    setImageFile(null)
    setModalOpen(true)
  }

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error('Title is required'); return }
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('title', form.title)
      fd.append('description', form.description)
      fd.append('technologies', form.technologies)
      fd.append('githubUrl', form.githubUrl)
      fd.append('liveUrl', form.liveUrl)
      fd.append('featured', String(form.featured))
      if (imageFile) fd.append('image', imageFile)
      const headers = { 'Content-Type': 'multipart/form-data' }
      if (editId) {
        await api.put(`/projects/${editId}`, fd, { headers }); toast.success('Project updated!')
      } else {
        await api.post('/projects', fd, { headers }); toast.success('Project created!')
      }
      setModalOpen(false); fetchData()
    } catch (err) { toast.error(err.message || 'Failed to save project') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!confirmDelete) return
    setDeleting(true)
    try { await api.delete(`/projects/${confirmDelete}`); toast.success('Project deleted!'); setConfirmDelete(null); fetchData() }
    catch (err) { toast.error(err.message || 'Failed to delete project') }
    finally { setDeleting(false) }
  }

  const moveProject = (index, direction) => {
    const arr = [...projects]
    const sw = index + direction
    if (sw < 0 || sw >= arr.length) return
    ;[arr[index], arr[sw]] = [arr[sw], arr[index]]
    setProjects(arr)
  }

  if (loading) return <Spinner />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-100">Projects</h2>
        <button onClick={openAdd} className="btn-primary text-sm py-2 px-4"><Plus className="w-4 h-4" /> Add Project</button>
      </div>

      {projects.length === 0 ? <EmptyState icon={FolderKanban} message="No projects yet. Add your first project!" /> : (
        <div className="space-y-3">
          {projects.map((project, idx) => (
            <motion.div key={project._id} layout className="glass-card p-4 flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <button onClick={() => moveProject(idx, -1)} disabled={idx === 0} className="p-1 text-gray-500 hover:text-primary-400 disabled:opacity-20 transition-colors"><ArrowUp className="w-3.5 h-3.5" /></button>
                <button onClick={() => moveProject(idx, 1)} disabled={idx === projects.length - 1} className="p-1 text-gray-500 hover:text-primary-400 disabled:opacity-20 transition-colors"><ArrowDown className="w-3.5 h-3.5" /></button>
              </div>
              {project.image && <img src={project.image} alt="" className="w-14 h-14 rounded-lg object-cover border border-gray-700/50 hidden sm:block" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-gray-100 text-sm">{project.title}</h4>
                  {project.featured && <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-300 font-medium">Featured</span>}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {(Array.isArray(project.technologies) ? project.technologies : (project.technologies || '').split(',').map(s => s.trim()).filter(Boolean)).slice(0, 5).map((t, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-accent-500/10 text-accent-300 border border-accent-500/20">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-primary-300 transition-colors"><ExternalLink className="w-4 h-4" /></a>}
                <button onClick={() => openEdit(project)} className="p-2 text-gray-400 hover:text-primary-300 transition-colors"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => setConfirmDelete(project._id)} className="p-2 text-gray-400 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} title={editId ? 'Edit Project' : 'Add Project'} onClose={() => setModalOpen(false)}>
        <div className="space-y-4">
          <InputField label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Project name" />
          <TextareaField label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Describe your project..." />
          <InputField label="Technologies (comma-separated)" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} placeholder="React, Node.js, MongoDB" />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="GitHub URL" value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} placeholder="https://..." />
            <InputField label="Live URL" value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} placeholder="https://..." />
          </div>
          <FileField label="Image" accept="image/*" fileName={imageFile?.name} onChange={(e) => setImageFile(e.target.files[0])} />
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 rounded bg-gray-800 border-gray-600 text-primary-500 focus:ring-primary-500 focus:ring-offset-0" />
            <span className="text-sm text-gray-300">Featured project</span>
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setModalOpen(false)} className="btn-outline text-sm py-2 px-4">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2 px-5 disabled:opacity-50">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span className="ml-1">{saving ? 'Saving...' : 'Save'}</span>
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!confirmDelete} title="Delete Project" message="Are you sure you want to delete this project? This action cannot be undone." onConfirm={handleDelete} onCancel={() => setConfirmDelete(null)} loading={deleting} />
    </div>
  )
}

/* ── Skills ───────────────────────────────────────────────────────── */

function SkillsTab() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: '', category: 'Frontend', level: 50 })

  const fetchData = useCallback(async () => {
    try { const { data } = await api.get('/skills'); setSkills(data.skills || data || []) }
    catch { toast.error('Failed to load skills') }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const grouped = skills.reduce((acc, s) => { const c = s.category || 'Other'; (acc[c] = acc[c] || []).push(s); return acc }, {})

  const openAdd = () => { setEditId(null); setForm({ name: '', category: 'Frontend', level: 50 }); setModalOpen(true) }
  const openEdit = (s) => { setEditId(s._id); setForm({ name: s.name || '', category: s.category || 'Frontend', level: s.level || 50 }); setModalOpen(true) }

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error('Skill name is required'); return }
    setSaving(true)
    try {
      if (editId) { await api.put(`/skills/${editId}`, form); toast.success('Skill updated!') }
      else { await api.post('/skills', form); toast.success('Skill added!') }
      setModalOpen(false); fetchData()
    } catch (err) { toast.error(err.message || 'Failed to save skill') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!confirmDelete) return
    setDeleting(true)
    try { await api.delete(`/skills/${confirmDelete}`); toast.success('Skill deleted!'); setConfirmDelete(null); fetchData() }
    catch (err) { toast.error(err.message || 'Failed to delete skill') }
    finally { setDeleting(false) }
  }

  if (loading) return <Spinner />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-100">Skills</h2>
        <button onClick={openAdd} className="btn-primary text-sm py-2 px-4"><Plus className="w-4 h-4" /> Add Skill</button>
      </div>

      {skills.length === 0 ? <EmptyState icon={Wrench} message="No skills yet. Add your first skill!" /> : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat}>
              <h3 className="text-sm font-semibold text-primary-300 uppercase tracking-wider mb-3">{cat}</h3>
              <div className="space-y-2">
                {items.map((skill) => (
                  <motion.div key={skill._id} layout className="glass-card p-4 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-100 text-sm">{skill.name}</span>
                        <span className="text-xs text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-800/50 overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${skill.level}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => openEdit(skill)} className="p-2 text-gray-400 hover:text-primary-300 transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => setConfirmDelete(skill._id)} className="p-2 text-gray-400 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} title={editId ? 'Edit Skill' : 'Add Skill'} onClose={() => setModalOpen(false)}>
        <div className="space-y-4">
          <InputField label="Skill Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. React, Node.js" />
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-100 focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 focus:outline-none transition-all text-sm">
              {SKILL_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Level: {form.level}%</label>
            <input type="range" min="0" max="100" value={form.level} onChange={(e) => setForm({ ...form, level: Number(e.target.value) })} className="w-full h-2 rounded-full bg-gray-800/50 appearance-none cursor-pointer accent-primary-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setModalOpen(false)} className="btn-outline text-sm py-2 px-4">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2 px-5 disabled:opacity-50">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span className="ml-1">{saving ? 'Saving...' : 'Save'}</span>
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!confirmDelete} title="Delete Skill" message="Are you sure you want to delete this skill?" onConfirm={handleDelete} onCancel={() => setConfirmDelete(null)} loading={deleting} />
    </div>
  )
}

/* ── Certificates ─────────────────────────────────────────────────── */

function CertificatesTab() {
  const [certs, setCerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ title: '', issuer: '', date: '', description: '' })
  const [imageFile, setImageFile] = useState(null)

  const fetchData = useCallback(async () => {
    try { const { data } = await api.get('/certificates'); setCerts(data.certificates || data || []) }
    catch { toast.error('Failed to load certificates') }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const openAdd = () => { setForm({ title: '', issuer: '', date: '', description: '' }); setImageFile(null); setModalOpen(true) }

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error('Title is required'); return }
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('title', form.title)
      fd.append('issuer', form.issuer)
      fd.append('date', form.date)
      fd.append('description', form.description)
      if (imageFile) fd.append('image', imageFile)
      await api.post('/certificates', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      toast.success('Certificate added!'); setModalOpen(false); fetchData()
    } catch (err) { toast.error(err.message || 'Failed to save certificate') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!confirmDelete) return
    setDeleting(true)
    try { await api.delete(`/certificates/${confirmDelete}`); toast.success('Certificate deleted!'); setConfirmDelete(null); fetchData() }
    catch (err) { toast.error(err.message || 'Failed to delete certificate') }
    finally { setDeleting(false) }
  }

  if (loading) return <Spinner />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-100">Certificates</h2>
        <button onClick={openAdd} className="btn-primary text-sm py-2 px-4"><Plus className="w-4 h-4" /> Add Certificate</button>
      </div>

      {certs.length === 0 ? <EmptyState icon={Award} message="No certificates yet." /> : (
        <div className="space-y-3">
          {certs.map((cert) => (
            <motion.div key={cert._id} layout className="glass-card p-4 flex items-center gap-4">
              {cert.image && <img src={cert.image} alt="" className="w-14 h-14 rounded-lg object-cover border border-gray-700/50 hidden sm:block" />}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-100 text-sm">{cert.title}</h4>
                <p className="text-xs text-gray-400 mt-0.5">{cert.issuer}{cert.date ? ` - ${new Date(cert.date).toLocaleDateString()}` : ''}</p>
                {cert.description && <p className="text-xs text-gray-500 mt-1 line-clamp-1">{cert.description}</p>}
              </div>
              <button onClick={() => setConfirmDelete(cert._id)} className="p-2 text-gray-400 hover:text-red-400 transition-colors shrink-0"><Trash2 className="w-4 h-4" /></button>
            </motion.div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} title="Add Certificate" onClose={() => setModalOpen(false)}>
        <div className="space-y-4">
          <InputField label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Certificate title" />
          <InputField label="Issuer" value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} placeholder="Issuing organization" />
          <InputField label="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <TextareaField label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Brief description..." />
          <FileField label="Image" accept="image/*" fileName={imageFile?.name} onChange={(e) => setImageFile(e.target.files[0])} />
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setModalOpen(false)} className="btn-outline text-sm py-2 px-4">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2 px-5 disabled:opacity-50">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span className="ml-1">{saving ? 'Saving...' : 'Save'}</span>
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!confirmDelete} title="Delete Certificate" message="Are you sure you want to delete this certificate?" onConfirm={handleDelete} onCancel={() => setConfirmDelete(null)} loading={deleting} />
    </div>
  )
}

/* ── Messages ─────────────────────────────────────────────────────── */

function MessagesTab() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const fetchData = useCallback(async () => {
    try { const { data } = await api.get('/messages'); setMessages(data.messages || data || []) }
    catch { toast.error('Failed to load messages') }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const markAsRead = async (msg) => {
    if (msg.read) return
    try { await api.put(`/messages/${msg._id}/read`); fetchData() }
    catch { toast.error('Failed to mark as read') }
  }

  const handleDelete = async () => {
    if (!confirmDelete) return
    setDeleting(true)
    try { await api.delete(`/messages/${confirmDelete}`); toast.success('Message deleted!'); setConfirmDelete(null); fetchData() }
    catch (err) { toast.error(err.message || 'Failed to delete message') }
    finally { setDeleting(false) }
  }

  const toggleExpand = (msg) => {
    const newId = expandedId === msg._id ? null : msg._id
    setExpandedId(newId)
    if (newId) markAsRead(msg)
  }

  if (loading) return <Spinner />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-100">Messages</h2>
        <span className="text-sm text-gray-400">{messages.filter((m) => !m.read).length} unread</span>
      </div>

      {messages.length === 0 ? <EmptyState icon={Inbox} message="No messages yet." /> : (
        <div className="space-y-2">
          {messages.map((msg) => (
            <motion.div key={msg._id} layout className={`glass-card overflow-hidden transition-all ${!msg.read ? 'border-primary-500/30 bg-primary-500/5' : ''}`}>
              <button onClick={() => toggleExpand(msg)} className="w-full p-4 flex items-center gap-4 text-left">
                <div className={`w-2 h-2 rounded-full shrink-0 ${!msg.read ? 'bg-primary-400' : 'bg-gray-600'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-gray-100 text-sm">{msg.name}</span>
                    <span className="text-xs text-gray-500">{msg.email}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{msg.message || msg.subject || ''}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-gray-500 hidden sm:inline">{new Date(msg.createdAt || msg.date).toLocaleDateString()}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedId === msg._id ? 'rotate-180' : ''}`} />
                </div>
              </button>

              <AnimatePresence>
                {expandedId === msg._id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                    <div className="px-4 pb-4 border-t border-gray-700/30 pt-3">
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {msg.email}</span>
                        {msg.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {msg.phone}</span>}
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(msg.createdAt || msg.date).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray-300 whitespace-pre-wrap">{msg.message}</p>
                      <div className="flex justify-end mt-3">
                        <button onClick={() => setConfirmDelete(msg._id)} className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}

      <ConfirmDialog open={!!confirmDelete} title="Delete Message" message="Are you sure you want to delete this message?" onConfirm={handleDelete} onCancel={() => setConfirmDelete(null)} loading={deleting} />
    </div>
  )
}

/* ── Settings ─────────────────────────────────────────────────────── */

function SettingsTab() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [saving, setSaving] = useState(false)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    if (!form.currentPassword || !form.newPassword) { toast.error('Please fill in all fields'); return }
    if (form.newPassword !== form.confirmPassword) { toast.error('New passwords do not match'); return }
    if (form.newPassword.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setSaving(true)
    try {
      await api.put('/auth/password', { currentPassword: form.currentPassword, newPassword: form.newPassword })
      toast.success('Password changed successfully!')
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) { toast.error(err.message || 'Failed to change password') }
    finally { setSaving(false) }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    toast.success('Logged out')
    navigate('/admin')
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-100">Settings</h2>

      <div className="glass-card p-6 space-y-2">
        <h3 className="text-base font-semibold text-gray-200 mb-3">Account Information</h3>
        <div className="flex items-center gap-3 text-sm">
          <Mail className="w-4 h-4 text-gray-500" />
          <span className="text-gray-400">Logged in as admin</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <ShieldCheck className="w-4 h-4 text-gray-500" />
          <span className="text-gray-400">Role: Administrator</span>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-base font-semibold text-gray-200 mb-4">Change Password</h3>
        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Current Password</label>
            <div className="relative">
              <input type={showCurrent ? 'text' : 'password'} name="currentPassword" value={form.currentPassword} onChange={handleChange} placeholder="••••••••" className="w-full px-4 py-2.5 pr-10 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-100 placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 focus:outline-none transition-all text-sm" />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
            <div className="relative">
              <input type={showNew ? 'text' : 'password'} name="newPassword" value={form.newPassword} onChange={handleChange} placeholder="••••••••" className="w-full px-4 py-2.5 pr-10 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-100 placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 focus:outline-none transition-all text-sm" />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Confirm New Password</label>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-100 placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 focus:outline-none transition-all text-sm" />
          </div>
          <button type="submit" disabled={saving} className="btn-primary text-sm py-2 px-5 disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span className="ml-1">{saving ? 'Updating...' : 'Update Password'}</span>
          </button>
        </form>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-base font-semibold text-gray-200 mb-4">Session</h3>
        <button onClick={handleLogout} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600/10 border border-red-500/30 text-red-400 hover:bg-red-600/20 hover:text-red-300 transition-all text-sm font-medium">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </div>
  )
}

/* ── Dashboard ────────────────────────────────────────────────────── */

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) navigate('/admin')
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    toast.success('Logged out')
    navigate('/admin')
  }

  const switchTab = (id) => { setActiveTab(id); setSidebarOpen(false) }

  const tabContent = {
    profile: <ProfileTab />,
    projects: <ProjectsTab />,
    skills: <SkillsTab />,
    certificates: <CertificatesTab />,
    messages: <MessagesTab />,
    settings: <SettingsTab />,
  }

  return (
    <div className="min-h-screen flex">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
      </AnimatePresence>

      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-[250px] shrink-0 glass border-r border-white/5 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-white/5">
          <h1 className="text-lg font-bold text-gradient">Admin Dashboard</h1>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon
            return (
              <button key={tab.id} onClick={() => switchTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-primary-500/15 text-primary-300 border border-primary-500/20' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}>
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
        <div className="p-3 border-t border-white/5">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 glass border-b border-white/5 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 text-gray-400 hover:text-gray-200 transition-colors rounded-lg hover:bg-white/5">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="text-sm font-semibold text-gray-200 capitalize">{activeTab}</h2>
          </div>
          <button onClick={handleLogout} className="hidden sm:flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              {tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
