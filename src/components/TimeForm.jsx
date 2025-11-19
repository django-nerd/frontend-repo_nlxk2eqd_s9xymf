import { useEffect, useMemo, useState } from 'react'
import { api } from '../lib/api'
import Typeahead from './Typeahead'

export default function TimeForm({ onCreated }) {
  const [clientId, setClientId] = useState('')
  const [projectId, setProjectId] = useState('')
  const [start, setStart] = useState(() => new Date().toISOString().slice(0,16))
  const [end, setEnd] = useState(() => new Date().toISOString().slice(0,16))
  const [breakMin, setBreakMin] = useState(0)
  const [rate, setRate] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchClients = (q) => api.listClients(q)
  const fetchProjects = (q) => api.listProjects(clientId || undefined, q)

  const submit = async (e) => {
    e.preventDefault()
    if (!clientId) return
    setLoading(true)
    try {
      const payload = {
        client_id: clientId,
        project_id: projectId || undefined,
        start_time: new Date(start).toISOString(),
        end_time: end ? new Date(end).toISOString() : null,
        break_minutes: Number(breakMin) || 0,
        hourly_rate: rate ? Number(rate) : undefined,
        notes,
      }
      await api.createTimeEntry(payload)
      setNotes(''); setBreakMin(0)
      if (onCreated) onCreated()
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <Typeahead label="Client" placeholder="Start typing…" fetchOptions={fetchClients} value={clientId} onChange={setClientId} />
      <Typeahead label="Project (optional)" placeholder="Start typing…" fetchOptions={fetchProjects} value={projectId} onChange={setProjectId} />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white/90 mb-1">Start</label>
          <input type="datetime-local" value={start} onChange={e=>setStart(e.target.value)} className="w-full bg-white/10 text-white border border-white/10 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/90 mb-1">End</label>
          <input type="datetime-local" value={end} onChange={e=>setEnd(e.target.value)} className="w-full bg-white/10 text-white border border-white/10 rounded-lg px-3 py-2" />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-white/90 mb-1">Break (min)</label>
          <input type="number" min="0" value={breakMin} onChange={e=>setBreakMin(e.target.value)} className="w-full bg-white/10 text-white border border-white/10 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/90 mb-1">Hourly rate</label>
          <input type="number" min="0" step="0.01" value={rate} onChange={e=>setRate(e.target.value)} className="w-full bg-white/10 text-white border border-white/10 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/90 mb-1">Notes</label>
          <input value={notes} onChange={e=>setNotes(e.target.value)} className="w-full bg-white/10 text-white border border-white/10 rounded-lg px-3 py-2" />
        </div>
      </div>

      <div className="flex gap-3">
        <button disabled={loading || !clientId} className="bg-yellow-400 text-slate-900 font-semibold px-4 py-2 rounded-lg disabled:opacity-50">Save Entry</button>
        <button type="button" disabled={loading || !clientId} onClick={async()=>{ try{ await api.punchStart({ client_id: clientId, project_id: projectId || undefined, notes }) ; if(onCreated) onCreated()}catch(e){alert(e.message)} }} className="bg-white/10 text-white px-4 py-2 rounded-lg border border-white/10">Punch In</button>
        <button type="button" disabled={loading} onClick={async()=>{ try{ await api.punchStop(); if(onCreated) onCreated()}catch(e){alert(e.message)} }} className="bg-white/10 text-white px-4 py-2 rounded-lg border border-white/10">Punch Out</button>
      </div>
    </form>
  )
}
