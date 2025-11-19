import { Home, Folder, Clock, List, Settings } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'Overview', Icon: Home },
  { to: '/projects', label: 'Projects', Icon: Folder },
  { to: '/log', label: 'Time Card', Icon: Clock },
  { to: '/timesheets', label: 'Time Sheets', Icon: List },
  { to: '/settings', label: 'Settings', Icon: Settings },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-2xl rounded-full px-3 py-2 flex gap-1">
        {items.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `group flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${isActive ? 'bg-yellow-400 text-slate-900' : 'text-white/80 hover:bg-white/10'}`}
          >
            <Icon className="w-5 h-5" />
            <span className="hidden sm:block text-sm font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
