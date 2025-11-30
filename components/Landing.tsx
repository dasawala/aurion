import React from 'react';
import { ArrowRight, ShieldCheck, Share2, BrainCircuit, Database, Lock, Fingerprint, Layers, Globe } from 'lucide-react';
import { NetworkNode } from './Visuals';

export const Landing: React.FC<{ onLaunch: () => void }> = ({ onLaunch }) => {
  return (
    <div className="min-h-screen bg-aurion-dark text-white overflow-x-hidden font-sans selection:bg-aurion-primary selection:text-white">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-aurion-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-display font-bold tracking-widest text-white">
            AURION
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#architecture" className="hover:text-white transition">Architecture</a>
            <a href="#impact" className="hover:text-white transition">Impact</a>
          </div>
          <button 
            onClick={onLaunch}
            className="px-6 py-2 bg-white text-aurion-dark font-bold rounded-full hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            Launch App
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-aurion-primary/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-aurion-purple/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              
              {/* Badge Removed Here */}
              
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
                Decentralized <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurion-accent via-aurion-primary to-aurion-purple">AI Identity</span> <br />
                & Trust Graph
              </h1>
              
              <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                Empower AI Agents with a verifiable memory. Aurion tackles hallucinations, validates identity, and scales trust using a 3-layer decentralized architecture covering all key hackathon tracks.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={onLaunch}
                  className="px-8 py-4 bg-aurion-primary text-white font-semibold rounded-lg hover:bg-indigo-600 transition flex items-center justify-center space-x-2 group"
                >
                  <span>Connect Wallet</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-transparent border border-white/10 text-white font-semibold rounded-lg hover:bg-white/5 transition">
                  Read Whitepaper
                </button>
              </div>
            </div>

            <div className="relative h-[400px] w-full hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-aurion-panel to-transparent rounded-2xl border border-white/5 backdrop-blur-sm p-6 flex flex-col items-center justify-center shadow-2xl animate-float">
                 <NetworkNode />
                 <div className="absolute bottom-8 bg-aurion-surface/80 backdrop-blur border border-white/10 px-6 py-3 rounded-xl flex items-center space-x-4 shadow-lg">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-aurion-surface"></div>
                      <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-aurion-surface"></div>
                      <div className="w-8 h-8 rounded-full bg-cyan-500 border-2 border-aurion-surface"></div>
                    </div>
                    <div className="text-sm">
                      <div className="font-bold text-white">Trust Score Verified</div>
                      <div className="text-aurion-accent text-xs">98.5% Accuracy</div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-aurion-panel relative">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">The Trust Crisis in AI</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                AI hallucinations and deepfakes are eroding digital trust. Aurion leverages the OriginTrail DKG to provide a source of immutable truth across 3 core tracks.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Database size={32} className="text-aurion-accent" />,
                  title: "Grokipedia vs Wikipedia",
                  desc: "Track 1: Aurion compares AI-generated entries against human-curated knowledge assets to detect bias and factual errors in real-time."
                },
                {
                  icon: <Fingerprint size={32} className="text-aurion-purple" />,
                  title: "Decentralized Notes",
                  desc: "Track 2: Combat deepfakes and misinformation. Upload media to the Aurion Agent to verify authenticity against the DKG."
                },
                {
                  icon: <ShieldCheck size={32} className="text-aurion-primary" />,
                  title: "Social Reputation",
                  desc: "Track 3: Identity verification and Social Graph Analysis. Uses x402 micropayments to validate high-trust data."
                }
              ].map((card, idx) => (
                <div key={idx} className="bg-aurion-dark border border-white/5 p-8 rounded-2xl hover:border-aurion-primary/50 transition duration-300 group">
                  <div className="mb-6 bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="py-24 bg-aurion-dark">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
               <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Three-Layer Architecture</h2>
               <div className="space-y-8">
                 <div className="flex gap-4">
                   <div className="mt-1"><BrainCircuit className="text-aurion-accent" /></div>
                   <div>
                     <h4 className="text-lg font-bold text-white">1. Agent Layer</h4>
                     <p className="text-slate-400 text-sm mt-1">
                       Autonomous Aurion Agents act as guardians, executing verified actions and queries via the Model Context Protocol (MCP).
                     </p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="mt-1"><Layers className="text-aurion-primary" /></div>
                   <div>
                     <h4 className="text-lg font-bold text-white">2. Knowledge Layer</h4>
                     <p className="text-slate-400 text-sm mt-1">
                       Built on OriginTrail DKG & NeuroWeb. A decentralized graph of connected Knowledge Assets.
                     </p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="mt-1"><Lock className="text-aurion-purple" /></div>
                   <div>
                     <h4 className="text-lg font-bold text-white">3. Trust Layer</h4>
                     <p className="text-slate-400 text-sm mt-1">
                       Tokenomics and x402 payment protocols ensure economic alignment and reputation validity.
                     </p>
                   </div>
                 </div>
               </div>
             </div>
             
             {/* Visual representation of stack */}
             <div className="relative">
                <div className="space-y-4">
                  <div className="h-24 bg-gradient-to-r from-slate-900 to-slate-800 border border-aurion-accent/30 rounded-lg flex items-center justify-center text-aurion-accent font-mono text-sm relative z-30 transform translate-x-4">
                    Aurion Agent (Application)
                  </div>
                  <div className="h-24 bg-gradient-to-r from-slate-900 to-slate-800 border border-aurion-primary/30 rounded-lg flex items-center justify-center text-aurion-primary font-mono text-sm relative z-20 transform translate-x-0">
                    OriginTrail DKG (Knowledge Graph)
                  </div>
                  <div className="h-24 bg-gradient-to-r from-slate-900 to-slate-800 border border-aurion-purple/30 rounded-lg flex items-center justify-center text-aurion-purple font-mono text-sm relative z-10 transform translate-x-4">
                    Polkadot / NeuroWeb (Consensus)
                  </div>
                </div>
                {/* Connecting lines */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-full bg-gradient-to-b from-aurion-accent via-aurion-primary to-aurion-purple -z-10 opacity-50 blur-sm"></div>
             </div>
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-aurion-primary/5"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to verify the future?</h2>
          <p className="text-slate-400 mb-10 text-lg">Join the decentralized identity revolution. Secure your DID and start building your trust graph today.</p>
          <button 
            onClick={onLaunch}
            className="px-10 py-4 bg-white text-black font-bold text-lg rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            Launch Aurion Agent
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-aurion-panel py-12 border-t border-white/5 text-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-display font-bold text-white mb-4">AURION</div>
            <p className="text-slate-500">Decentralized Trust for the AI Era.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-slate-500">
              <li><a href="#" className="hover:text-aurion-accent">Agent</a></li>
              <li><a href="#" className="hover:text-aurion-accent">Explorer</a></li>
              <li><a href="#" className="hover:text-aurion-accent">Docs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Ecosystem</h4>
            <ul className="space-y-2 text-slate-500">
              <li><a href="#" className="hover:text-aurion-accent">OriginTrail</a></li>
              <li><a href="#" className="hover:text-aurion-accent">Polkadot</a></li>
              <li><a href="#" className="hover:text-aurion-accent">Knowledge Assets</a></li>
            </ul>
          </div>
          <div>
             <h4 className="text-white font-bold mb-4">Connect</h4>
             <div className="flex space-x-4 text-slate-500">
               <Share2 size={20} className="hover:text-white cursor-pointer" />
               <Globe size={20} className="hover:text-white cursor-pointer" />
             </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-slate-600">
          © 2025 Aurion Project. Built for the Scaling Trust Hackathon.
        </div>
      </footer>
    </div>
  );
};