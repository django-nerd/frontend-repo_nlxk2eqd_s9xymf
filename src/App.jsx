import Hero from './components/Hero'
import Overview from './components/Overview'
import Layout from './components/Layout'
import EntriesList from './components/EntriesList'
import Projects from './components/Projects'
import TimeForm from './components/TimeForm'
import SettingsPage from './components/SettingsPage'
import { Routes, Route } from 'react-router-dom'

function Home() {
  return (
    <Layout>
      <Hero />
      <div className="max-w-5xl mx-auto px-6">
        <Overview />
        <section className="mt-10 space-y-6">
          <h2 className="text-white text-2xl font-bold">Quick Log</h2>
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-5">
            <TimeForm onCreated={() => { /* could refresh lists via events */ }} />
          </div>
          <h2 className="text-white text-2xl font-bold">Recent Entries</h2>
          <EntriesList />
        </section>
      </div>
    </Layout>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Layout><div className="max-w-5xl mx-auto px-6 py-8 text-white space-y-6"><h2 className='text-2xl font-bold'>Projects & Clients</h2><Projects /></div></Layout>} />
      <Route path="/log" element={<Layout><div className="max-w-3xl mx-auto px-6 py-8 text-white space-y-6"><h2 className='text-2xl font-bold'>Time Card</h2><TimeForm /></div></Layout>} />
      <Route path="/timesheets" element={<Layout><div className="max-w-5xl mx-auto px-6 py-8 text-white space-y-6"><h2 className='text-2xl font-bold'>Time Sheets</h2><EntriesList /></div></Layout>} />
      <Route path="/settings" element={<Layout><div className="max-w-3xl mx-auto px-6 py-8 text-white space-y-6"><h2 className='text-2xl font-bold'>Settings</h2><SettingsPage /></div></Layout>} />
    </Routes>
  )
}

export default App
