import React, { useState, useRef, useEffect } from 'react';
import { Send, Cpu, AlertTriangle, CheckCircle, Database, Plus, MessageSquare, Menu, X, Paperclip, File, Image as ImageIcon, Video, Mic, XCircle } from 'lucide-react';
import { Message, TrustMetric } from '../types';
import { generateResponse } from '../services/geminiService';
import { TrustRadar } from './Visuals';

const INITIAL_METRICS: TrustMetric[] = [
  { subject: 'Identity', A: 95, fullMark: 100 },
  { subject: 'Social', A: 88, fullMark: 100 },
  { subject: 'Content', A: 92, fullMark: 100 },
  { subject: 'On-Chain', A: 98, fullMark: 100 },
  { subject: 'Risk', A: 100, fullMark: 100 }, // Inverted: 100 means Low Risk/Safe
];

const LOADING_STATES = [
  "Connecting to OriginTrail DKG...",
  "Verifying Identity on NeuroWeb...",
  "Scanning Social Trust Graph...",
  "Analyzing Content Authenticity...",
  "Finalizing Trust Score..."
];

export const AgentApp: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: 'I am Aurion. I am connected to the OriginTrail Decentralized Knowledge Graph.\n\nI cover **All Hackathon Tracks**:\n\n**1. Content Authenticity:** Grokipedia vs Wikipedia fact-checking.\n**2. Anti-Misinformation:** Deepfake & Community Notes creation.\n**3. Social Reputation:** Identity Verification & x402 Micropayments.\n**4. Wildcard Synergy:** Unified cross-chain logic.\n\n**Multimodal Capable:** Upload an image, video, or audio file to start a **Deepfake Analysis**.',
      timestamp: new Date(),
      metadata: { verificationStatus: 'Verified', trustScore: 100 }
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loadingText, setLoadingText] = useState(LOADING_STATES[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{file: File, type: 'image' | 'video' | 'audio' | 'document', previewUrl: string} | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Rotate loading text
  useEffect(() => {
    if (isTyping) {
      const interval = setInterval(() => {
        setLoadingText(prev => {
          const currentIndex = LOADING_STATES.indexOf(prev);
          return LOADING_STATES[(currentIndex + 1) % LOADING_STATES.length];
        });
      }, 800);
      return () => clearInterval(interval);
    } else {
      setLoadingText(LOADING_STATES[0]);
    }
  }, [isTyping]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileType = file.type.startsWith('image/') ? 'image' 
                    : file.type.startsWith('video/') ? 'video'
                    : file.type.startsWith('audio/') ? 'audio'
                    : 'document';
      
      const previewUrl = URL.createObjectURL(file);
      setSelectedFile({ file, type: fileType, previewUrl });
    }
  };

  const clearFile = () => {
    if (selectedFile) {
        URL.revokeObjectURL(selectedFile.previewUrl);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSend = async () => {
    if (!input.trim() && !selectedFile) return;

    const attachmentData = selectedFile ? {
        name: selectedFile.file.name,
        type: selectedFile.type,
        url: selectedFile.previewUrl
    } : undefined;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      attachment: attachmentData
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    // Clear file selection from UI but keep it for processing
    setSelectedFile(null); 
    if (fileInputRef.current) fileInputRef.current.value = '';
    
    setIsTyping(true);

    try {
      const response = await generateResponse(messages, userMsg.content, attachmentData);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
        {
          id: Date.now().toString(),
          role: 'model',
          content: 'Session reset. Aurion Agent is ready. Upload media for deepfake analysis or ask me to verify a claim across any track.',
          timestamp: new Date(),
          metadata: { verificationStatus: 'Verified', trustScore: 100 }
        }
    ]);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#0B0C15] overflow-hidden font-sans text-white">
      {/* Sidebar - Mobile Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed md:relative z-50 w-72 h-full bg-[#151725] border-r border-white/5 flex flex-col transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        {/* Header / Logo */}
        <div className="p-6 cursor-pointer hover:bg-white/5 transition" onClick={onBack}>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-aurion-primary to-aurion-purple rounded-lg flex items-center justify-center">
              <Cpu size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold tracking-wider text-white">AURION</h1>
              <span className="text-[10px] text-aurion-accent tracking-[0.2em] uppercase">Trust Layer</span>
            </div>
          </div>
        </div>
        
        {/* New Chat Button */}
        <div className="px-4 pb-4">
            <button 
                onClick={handleNewChat}
                className="w-full flex items-center gap-3 px-4 py-3 bg-aurion-surface border border-white/10 rounded-xl hover:bg-white/10 transition-all text-sm font-medium text-slate-200 group"
            >
                <Plus size={16} className="text-aurion-accent group-hover:rotate-90 transition-transform" />
                <span>New Verification</span>
            </button>
        </div>

        {/* History / Sessions */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-2">Today</div>
          <div className="space-y-1">
             <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-slate-300 truncate transition flex items-center gap-2">
                <MessageSquare size={14} className="text-slate-500" />
                Deepfake: Elon Video...
             </button>
             <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-slate-300 truncate transition flex items-center gap-2">
                <MessageSquare size={14} className="text-slate-500" />
                Contract Risk 0x88...
             </button>
             <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-slate-300 truncate transition flex items-center gap-2">
                <MessageSquare size={14} className="text-slate-500" />
                Grokipedia Climate...
             </button>
          </div>
          
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-2 mt-6">Previous 7 Days</div>
          <div className="space-y-1">
             <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-slate-300 truncate transition flex items-center gap-2">
                <MessageSquare size={14} className="text-slate-500" />
                Voice Clone Analysis...
             </button>
             <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-slate-300 truncate transition flex items-center gap-2">
                <MessageSquare size={14} className="text-slate-500" />
                Identity verification...
             </button>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-white/5 bg-black/20">
           <div className="flex items-center space-x-3">
             <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 border border-white/20"></div>
             <div className="flex-1 min-w-0">
               <div className="text-sm font-medium text-white truncate">Builder.eth</div>
               <div className="text-xs text-aurion-accent flex items-center gap-1">
                 <CheckCircle size={10} /> DID Verified
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative w-full">
        {/* Mobile Header */}
        <div className="md:hidden h-16 bg-[#151725] border-b border-white/5 flex items-center justify-between px-4 sticky top-0 z-30">
           <div className="flex items-center gap-3">
             <button onClick={() => setIsSidebarOpen(true)} className="text-slate-400 hover:text-white">
                <Menu size={24} />
             </button>
             <span className="font-display font-bold text-white tracking-widest">AURION</span>
           </div>
           <button onClick={onBack} className="text-xs font-medium text-slate-400 bg-white/5 px-3 py-1.5 rounded-full">Exit App</button>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto p-4 md:p-0">
          <div className="max-w-3xl mx-auto py-8 space-y-8">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-300`}>
                <div className={`flex gap-4 max-w-[90%] md:max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border ${msg.role === 'user' ? 'bg-slate-800 border-slate-700' : 'bg-aurion-primary/20 border-aurion-primary text-aurion-primary shadow-[0_0_15px_rgba(99,102,241,0.3)]'}`}>
                    {msg.role === 'user' ? <span className="text-xs font-bold text-slate-400">You</span> : <Cpu size={16} />}
                    </div>
                    
                    {/* Message Bubble */}
                    <div className={`flex flex-col space-y-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`prose prose-invert max-w-none text-sm md:text-[15px] leading-7 p-0 ${msg.role === 'user' ? 'text-slate-200' : 'text-slate-200'}`}>
                         
                        <div className={`px-5 py-3.5 rounded-2xl ${
                            msg.role === 'user' 
                            ? 'bg-aurion-surface border border-white/5 text-white' 
                            : 'bg-transparent'
                        }`}>
                            {/* Attachment Rendering */}
                            {msg.attachment && (
                                <div className="mb-3 rounded-lg overflow-hidden border border-white/10 bg-black/20">
                                    {msg.attachment.type === 'image' && (
                                        <img src={msg.attachment.url} alt="Uploaded content" className="max-h-60 w-auto object-cover" />
                                    )}
                                    {msg.attachment.type === 'video' && (
                                        <div className="h-40 w-60 bg-black flex items-center justify-center relative">
                                            <Video className="text-slate-500" size={32} />
                                            <span className="absolute bottom-2 right-2 text-[10px] text-slate-400">{msg.attachment.name}</span>
                                        </div>
                                    )}
                                    {msg.attachment.type === 'audio' && (
                                        <div className="p-4 flex items-center gap-3 w-60">
                                            <Mic className="text-aurion-accent" />
                                            <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                                                <div className="h-full w-2/3 bg-aurion-accent"></div>
                                            </div>
                                        </div>
                                    )}
                                    {msg.attachment.type === 'document' && (
                                        <div className="p-3 flex items-center gap-3">
                                            <File className="text-slate-400" />
                                            <span className="text-xs underline">{msg.attachment.name}</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="whitespace-pre-wrap font-light tracking-wide">{msg.content}</div>
                        </div>
                    </div>

                    {/* Trust Metadata for Agent Responses */}
                    {msg.role === 'model' && msg.metadata && (
                        <div className="flex flex-wrap items-center gap-2 mt-1 ml-1">
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border ${
                            msg.metadata.verificationStatus === 'Verified' 
                            ? 'bg-aurion-accent/10 border-aurion-accent/20 text-aurion-accent' 
                            : msg.metadata.verificationStatus === 'Suspicious'
                            ? 'bg-red-500/10 border-red-500/20 text-red-400'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}>
                            {msg.metadata.verificationStatus === 'Verified' ? <CheckCircle size={10} /> : <AlertTriangle size={10} />}
                            {msg.metadata.verificationStatus}
                        </div>
                        
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-aurion-surface border border-white/5 text-slate-400">
                            <Database size={10} /> 
                            <span className="truncate max-w-[150px]">{msg.metadata.provenance}</span>
                        </div>

                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-aurion-surface border border-white/5 text-slate-400">
                            Trust Score: <span className={msg.metadata.trustScore > 80 ? 'text-green-400' : 'text-red-400'}>{msg.metadata.trustScore}/100</span>
                        </div>
                        </div>
                    )}
                    </div>
                </div>
                </div>
            ))}
            
            {isTyping && (
                <div className="flex justify-start animate-in fade-in duration-300">
                <div className="flex items-center gap-4 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-aurion-primary/20 border border-aurion-primary flex items-center justify-center">
                        <Cpu size={16} className="text-aurion-primary animate-pulse" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="text-xs text-aurion-accent font-mono animate-pulse">{loadingText}</div>
                        <div className="flex space-x-1 h-2 items-center mt-1">
                            <div className="w-1 h-1 bg-slate-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-1 h-1 bg-slate-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-1 h-1 bg-slate-600 rounded-full animate-bounce"></div>
                        </div>
                    </div>
                </div>
                </div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-[#0B0C15]/90 backdrop-blur-lg border-t border-white/5 absolute bottom-0 w-full z-20">
          <div className="max-w-3xl mx-auto relative group">
            
            {/* File Preview */}
            {selectedFile && (
                <div className="absolute -top-16 left-0 bg-[#151725] border border-white/10 rounded-xl p-2 flex items-center gap-3 shadow-xl animate-in fade-in slide-in-from-bottom-2 z-30">
                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden">
                        {selectedFile.type === 'image' ? <img src={selectedFile.previewUrl} className="w-full h-full object-cover" /> :
                         selectedFile.type === 'video' ? <Video size={20} className="text-slate-400" /> :
                         selectedFile.type === 'audio' ? <Mic size={20} className="text-slate-400" /> :
                         <File size={20} className="text-slate-400" />}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-white max-w-[150px] truncate">{selectedFile.file.name}</span>
                        <span className="text-[10px] text-slate-500 uppercase">{selectedFile.type}</span>
                    </div>
                    <button onClick={clearFile} className="p-1 hover:bg-white/10 rounded-full text-slate-400 hover:text-white">
                        <XCircle size={16} />
                    </button>
                </div>
            )}

            <div className="absolute -inset-0.5 bg-gradient-to-r from-aurion-primary to-aurion-purple rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
            <div className="relative flex items-center bg-[#151725] rounded-2xl border border-white/10 shadow-2xl z-20">
                
                {/* File Input Trigger */}
                <input 
                    type="file" 
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileSelect}
                    accept="image/*,video/*,audio/*,.pdf,.txt"
                />
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="ml-4 p-2 text-slate-400 hover:text-aurion-accent transition-colors hover:bg-white/5 rounded-full"
                    title="Upload media for Deepfake analysis"
                >
                    <Paperclip size={20} />
                </button>

                <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={selectedFile ? "Add context to your upload..." : "Ask Aurion to verify identity, contracts, or facts..."}
                className="w-full bg-transparent text-white placeholder-slate-500 text-sm md:text-base px-4 py-4 focus:outline-none"
                />
                <button 
                onClick={handleSend}
                disabled={(!input.trim() && !selectedFile) || isTyping}
                className="p-2 mr-2 bg-white/5 hover:bg-aurion-primary text-slate-400 hover:text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                <Send size={20} />
                </button>
            </div>
            <div className="text-center mt-3">
               <p className="text-[10px] text-slate-500 flex items-center justify-center gap-2">
                 <ShieldCheckIcon /> Protected by OriginTrail DKG • NeuroWeb Parachain
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Icon component for the footer
const ShieldCheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-aurion-accent">
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);