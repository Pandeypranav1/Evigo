import React from "react";
import Link from "next/link";


export const metadata = {
  title: "Services - Evigo",
  description: "Explore the services offered by Evigo.",
};

const services = [
  {
    title: "Electrician",
    icon: "⚡",
    desc: "Expert wiring, repairs, and appliance installations.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "Plumber",
    icon: "🚰",
    desc: "Leak repairs, pipe installations, and drainage solutions.",
    color: "from-blue-400 to-cyan-500",
  },
  {
    title: "Carpenter",
    icon: "🪚",
    desc: "Custom furniture, repairs, and woodwork.",
    color: "from-amber-600 to-orange-700",
  },
  {
    title: "Appliance Repair",
    icon: "❄️",
    desc: "AC, Fridge, Washing Machine maintenance and repair.",
    color: "from-teal-400 to-emerald-500",
  },
  {
    title: "Painter",
    icon: "🎨",
    desc: "Interior and exterior painting, wall finishing.",
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Cleaning",
    icon: "🧹",
    desc: "Deep cleaning for homes and offices.",
    color: "from-indigo-400 to-violet-500",
  },
];

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#05030f] text-white selection:bg-violet-500/30 relative">

      
      {/* Background gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/10 blur-[120px]" />
      </div>

      <main className="flex-1 relative z-10 py-32 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">
            Our Services
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Professional, reliable, and verified experts for all your home and business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="group bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]">
              <div className={`h-16 w-16 rounded-2xl flex items-center justify-center text-3xl mb-6 bg-gradient-to-br ${s.color} bg-opacity-20 backdrop-blur-md border border-white/20 shadow-lg`}>
                {s.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
              <p className="text-white/60 mb-6">{s.desc}</p>
              <Link href="/explore" className="inline-flex items-center gap-2 text-sm font-bold text-violet-400 hover:text-violet-300 transition-colors">
                Book Now 
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
           <Link href="/explore" className="inline-flex items-center justify-center rounded-full bg-white text-[#05030f] px-8 py-4 font-bold text-lg shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.5)]">
             Explore All Services
           </Link>
        </div>
      </main>


    </div>
  );
}
