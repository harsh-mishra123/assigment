import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf9f8]">
      {/* Simple Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-light tracking-tight text-gray-900">
                Welcome
              </span>
              <span className="text-xs text-gray-300 font-mono mt-1"></span>
            </div>
            <Link 
              href="/login" 
              className="text-sm text-gray-500 hover:text-gray-900 border-b border-transparent hover:border-gray-300 pb-0.5 transition-all"
            >
              sign in →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Top Badge */}
        <div className="mb-8">
          <span className="text-xs font-mono tracking-widest text-gray-400 bg-white px-3 py-1.5 border border-gray-200">
            internal communications
          </span>
        </div>

        {/* Headline */}
        <div className="max-w-3xl space-y-4">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 leading-tight">
            Share updates
            <span className="block text-gray-300 text-3xl mt-2 font-normal">
              with your entire organization
            </span>
          </h1>
          
          <p className="text-base text-gray-500 max-w-xl leading-relaxed pt-4">
            A simple space for admins to share important messages — 
            whether it's for everyone or just the right people.
          </p>

          <div className="pt-6">
            <Link 
              href="/login" 
              className="inline-block px-8 py-3 bg-gray-900 text-white text-sm tracking-wide hover:bg-gray-800 transition-colors"
            >
              enter platform →
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-32 grid md:grid-cols-3 gap-12 border-t border-gray-200 pt-16">
          <div className="space-y-3">
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wide">real-time</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Messages appear instantly for everyone, no refresh needed
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wide">targeted</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Send to specific users or broadcast to your whole team
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wide">secure</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Role-based access keeps everything organized and safe
            </p>
          </div>
        </div>

        {/* Simple Footer */}
        <footer className="mt-32 pt-8 border-t border-gray-100">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span className="font-mono">© {new Date().getFullYear()}</span>
            <span className="font-mono">internal · v1.0</span>
          </div>
        </footer>
      </main>
    </div>
  );
}