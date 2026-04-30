import React from "react";
import Link from "next/link";


export const metadata = {
  title: "Contact Us - Evigo",
  description: "Get in touch with the Evigo team.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#05030f] text-white selection:bg-violet-500/30 relative">

      
      {/* Background gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/10 blur-[120px]" />
      </div>

      <main className="flex-1 relative z-10 flex flex-col items-center justify-center py-20 px-4">
        <div className="max-w-3xl w-full text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">
            Get in Touch
          </h1>
          <p className="text-xl text-white/60">
            We'd love to hear from you. Reach out to the Evigo team for support, partnerships, or any inquiries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0">
                  <svg className="h-5 w-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <div className="font-bold mb-1">Phone</div>
                  <div className="text-white/60">+91 7808807340</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                  <svg className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <div className="font-bold mb-1">Location</div>
                  <div className="text-white/60">Samastipur, Bihar<br />India</div>
                </div>
              </div>
            </div>
          </div>
          
          <form className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-2">Send a Message</h2>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1">Name</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1">Email</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1">Message</label>
              <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors h-24 resize-none" placeholder="How can we help you?"></textarea>
            </div>
            <button className="w-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold rounded-xl py-3 mt-2 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all">
              Send Message
            </button>
          </form>
        </div>
      </main>


    </div>
  );
}
