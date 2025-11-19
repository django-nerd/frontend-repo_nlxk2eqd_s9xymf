import { useEffect, useState } from 'react'
import { api } from '../lib/api'

function Minutes({ m }) {
  const h = Math.floor(m / 60)
  const mm = m % 60
  return <span>{h}h {mm}m</span>
}

export default function Overview() {
  const [summary, setSummary] = useState({ today: 0, week: 0, month: 0, prev_month: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const s = await api.summary()
        setSummary(s)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section className="relative -mt-24 z-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Today', key: 'today' },
            { label: 'This Week', key: 'week' },
            { label: 'This Month', key: 'month' },
            { label: 'Last Month', key: 'prev_month' },
          ].map(card => (
            <div key={card.key} className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 text-white">
              <div className="text-white/70 text-sm">{card.label}</div>
              <div className="text-2xl font-bold mt-1">{loading ? '—' : <Minutes m={summary[card.key] || 0} />}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
