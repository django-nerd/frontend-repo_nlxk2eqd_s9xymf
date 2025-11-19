import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function SettingsPage() {
  const [form, setForm] = useState({ theme: 'system', timezone: 'UTC', language: 'en', date_format: 'yyyy-MM-dd' })
  const [status, setStatus] = useState('')

  useEffect(() => { api.getSettings().then(setForm).catch(()=>{}) }, [])

  const save = async () => {
    try {
      await api.updateSettings(form)
      setStatus('Saved!')
      setTimeout(() => setStatus(''), 1500)
    } catch (e) { alert(e.message) }
  }

  return (
    <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 text-white space-y-4">
      <h3 className="text-lg font-semibold">Settings</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1 text-white/90">Theme</label>
          <select value={form.theme} onChange={e=>setForm({ ...form, theme: e.target.value })} className="w-full bg-white/10 text-white border border-white/10 rounded-lg px-3 py-2">
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1 text-white/90">Timezone</label>
          <input value={form.timezone} onChange={e=>setForm({ ...form, timezone: e.target.value })} className="w-full bg-white/10 text-white border border-white/10 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1 text-white/90">Language</label>
          <select value={form.language} onChange={e=>setForm({ ...form, language: e.target.value })} className="w-full bg-white/10 text-white border border-white/10 rounded-lg px-3 py-2">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1 text-white/90">Date format</label>
          <input value={form.date_format} onChange={e=>setForm({ ...form, date_format: e.target.value })} className="w-full bg-white/10 text-white border border-white/10 rounded-lg px-3 py-2" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={save} className="bg-yellow-400 text-slate-900 font-semibold px-4 py-2 rounded-lg">Save</button>
        <span className="text-white/70 text-sm">{status}</span>
      </div>
    </div>
  )
}
