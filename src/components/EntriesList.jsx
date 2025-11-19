import { useEffect, useState } from 'react'
import { api } from '../lib/api'

function Minutes({ m }) {
  const h = Math.floor(m / 60)
  const mm = m % 60
  return <span>{h}h {mm}m</span>
}

export default function EntriesList() {
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0,7))
  const [clientId, setClientId] = useState('')
  const [entries, setEntries] = useState([])
  const [clients, setClients] = useState([])

  useEffect(() => { api.listClients('').then(setClients).catch(()=>setClients([])) }, [])
  useEffect(() => { load() }, [month, clientId])

  const load = async () => {
    try {
      const data = await api.listTimeEntries({ month, client_id: clientId || undefined })
      setEntries(data)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-sm text-white/90 mb-1">Month</label>
          <input type="month" value={month} onChange={e=>setMonth(e.target.value)} className="bg-white/10 text-white border border-white/10 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-white/90 mb-1">Client</label>
          <select value={clientId} onChange={e=>setClientId(e.target.value)} className="bg-white/10 text-white border border-white/10 rounded-lg px-3 py-2">
            <option value="">All</option>
            {clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-white/10 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-4 gap-4 px-4 py-3 text-white/70 text-sm border-b border-white/10">
          <div>Date</div>
          <div>Start → End</div>
          <div>Client</div>
          <div className="text-right">Worked</div>
        </div>
        {entries.length === 0 ? (
          <div className="p-6 text-white/50">No entries for this filter.</div>
        ) : entries.map(e => (
          <div key={e._id} className="grid grid-cols-4 gap-4 px-4 py-3 text-white/90 border-t border-white/5">
            <div>{new Date(e.start_time).toLocaleDateString()}</div>
            <div>{new Date(e.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – {e.end_time ? new Date(e.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Running'}</div>
            <div>{e.client_id}</div>
            <div className="text-right font-semibold"><Minutes m={e.worked_minutes || 0} /></div>
          </div>
        ))}
      </div>
    </div>
  )
}
