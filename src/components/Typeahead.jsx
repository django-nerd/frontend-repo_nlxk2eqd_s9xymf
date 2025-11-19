import { useEffect, useMemo, useState } from 'react'

export default function Typeahead({ label, placeholder, fetchOptions, value, onChange }) {
  const [query, setQuery] = useState('')
  const [options, setOptions] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let active = true
    const run = async () => {
      try {
        const res = await fetchOptions(query)
        if (active) setOptions(res)
      } catch (e) {
        if (active) setOptions([])
      }
    }
    run()
    return () => { active = false }
  }, [query, fetchOptions])

  const selectedLabel = useMemo(() => {
    if (!value) return ''
    const found = options.find(o => o._id === value)
    return found?.name || ''
  }, [options, value])

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-white/90 mb-1">{label}</label>
      <input
        className="w-full bg-white/10 text-white placeholder-white/50 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        placeholder={placeholder}
        value={open ? query : (selectedLabel || query)}
        onChange={e => { setQuery(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {open && options.length > 0 && (
        <div className="absolute z-20 mt-1 w-full bg-slate-900 border border-white/10 rounded-lg shadow-xl max-h-56 overflow-auto">
          {options.map(opt => (
            <button
              key={opt._id}
              className="w-full text-left px-3 py-2 hover:bg-white/10 text-white"
              onMouseDown={(e) => { e.preventDefault(); onChange(opt._id); setQuery(opt.name); setOpen(false) }}
            >
              {opt.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
