import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function Projects() {
  const [clients, setClients] = useState([])
  const [projects, setProjects] = useState([])
  const [clientName, setClientName] = useState('')
  const [projectName, setProjectName] = useState('')
  const [selectedClient, setSelectedClient] = useState('')

  const load = async () => {
    try {
      const cs = await api.listClients('')
      setClients(cs)
      const ps = await api.listProjects(selectedClient || undefined)
      setProjects(ps)
    } catch (e) { console.error(e) }
  }
  useEffect(() => { load() }, [selectedClient])

  const addClient = async () => {
    if (!clientName) return
    await api.createClient({ name: clientName })
    setClientName('')
    load()
  }
  const addProject = async () => {
    if (!projectName || !selectedClient) return
    await api.createProject({ name: projectName, client_id: selectedClient })
    setProjectName('')
    load()
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 text-white">
        <h3 className="text-lg font-semibold mb-3">Add Client</h3>
        <div className="flex gap-3">
          <input value={clientName} onChange={e=>setClientName(e.target.value)} placeholder="Client name" className="flex-1 bg-white/10 text-white border border-white/10 rounded-lg px-3 py-2" />
          <button onClick={addClient} className="bg-yellow-400 text-slate-900 font-semibold px-4 py-2 rounded-lg">Add</button>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 text-white">
        <h3 className="text-lg font-semibold mb-3">Add Project</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          <select value={selectedClient} onChange={e=>setSelectedClient(e.target.value)} className="bg-white/10 text-white border border-white/10 rounded-lg px-3 py-2">
            <option value="">Select client…</option>
            {clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <input value={projectName} onChange={e=>setProjectName(e.target.value)} placeholder="Project name" className="bg-white/10 text-white border border-white/10 rounded-lg px-3 py-2" />
          <button onClick={addProject} className="bg-yellow-400 text-slate-900 font-semibold px-4 py-2 rounded-lg">Add</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 text-white">
          <h3 className="text-lg font-semibold mb-3">Clients</h3>
          <ul className="space-y-2">
            {clients.map(c => <li key={c._id} className="px-3 py-2 bg-white/5 rounded-lg">{c.name}</li>)}
          </ul>
        </div>
        <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 text-white">
          <h3 className="text-lg font-semibold mb-3">Projects</h3>
          <ul className="space-y-2">
            {projects.map(p => <li key={p._id} className="px-3 py-2 bg-white/5 rounded-lg">{p.name}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}
