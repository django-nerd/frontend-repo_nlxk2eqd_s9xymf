import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden">
      <Spline scene="https://prod.spline.design/qMOKV671Z1CM9yS7/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-yellow-300 drop-shadow-lg tracking-tight">Jo's Time Tracker</h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-white/90">A simple, cheerful way to track your client work. Punch in, log time, and get clear summaries at a glance.</p>
        </div>
      </div>
    </section>
  )
}
