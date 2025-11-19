import BottomNav from './BottomNav'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-slate-950 relative pb-24">
      {children}
      <BottomNav />
    </div>
  )
}
