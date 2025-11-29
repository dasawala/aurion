import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

// Note: In a real deployment, this would use process.env.API_KEY
// The following logic provides a robust simulation of the Aurion Agent capabilities
// as defined in the hackathon requirements, covering Tracks 1, 2, 3, and 4 (Wildcard).

const API_KEY = process.env.API_KEY || ''; 

// Helper to simulate "thinking" delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateResponse = async (
  history: Message[], 
  userPrompt: string,
  attachment?: { name: string; type: string; url: string }
): Promise<Message> => {
  
  // Simulate network latency for realism (longer for files)
  await delay(attachment ? 3000 : 1500);

  const lowerPrompt = userPrompt.toLowerCase();
  let responseContent = "";
  let verificationStatus: 'Verified' | 'Unverified' | 'Suspicious' = 'Verified';
  let trustScore = 95;
  let dkgAssetId = `did:aurion:${Math.floor(Math.random() * 1000000).toString(16)}`;
  let provenanceNode = "OriginTrail DKG Node: 0x44...2a";

  // --- LOGIC ROUTER: AURION SUB-AGENTS (ALL TRACKS) ---

  // 1. FILE ANALYSIS LOGIC (Multimodal) - Supports Track 1 (Content) & Track 2 (Deepfakes)
  if (attachment) {
    if (attachment.type === 'image') {
       responseContent = `I have analyzed the image **"${attachment.name}"** using the **Aurion Content Authenticity Agent**.\n\n**🔍 Track 1 Analysis (Grokipedia vs Wikipedia):**\n- **Visual Hash:** \`0x7f...a1\` (Does not match verified Wikipedia assets).\n- **Grokipedia Context:** Matches an unverified entry flagged for bias.\n\n**🛡️ Track 2 Analysis (Deepfake Detection):**\n- **Error Level Analysis (ELA):** Detected digital splicing in the top-right quadrant.\n- **Metadata:** Missing C2PA cryptographic signature.\n\n**Verdict:** High probability of AI manipulation. I have created a **Community Note** on the DKG to flag this asset.`;
       trustScore = 15;
       verificationStatus = 'Suspicious';
    } else if (attachment.type === 'video') {
       responseContent = `**Deepfake Detection Report (Track 2)** 📹\n\nI scanned **"${attachment.name}"** frame-by-frame against the Guardian Social Graph.\n\n**Findings:**\n- **Facial Landmarks:** Inconsistent blinking patterns detected (Frame 142-190).\n- **Audio-Visual Sync:** Lip movement lags audio by 120ms.\n- **Provenance:** No OriginTrail Knowledge Asset found for this clip.\n\n**Aurion Trust Score:** 22/100.\n\nI have marked this video as **Synthetic** in the shared reputation graph.`;
       trustScore = 22;
       verificationStatus = 'Suspicious';
    } else if (attachment.type === 'audio') {
       responseContent = `**Voice Clone Analysis (Track 2 & 3)** 🎙️\n\nComparing audio fingerprint of **"${attachment.name}"** against verified identity **did:aurion:voice:registry**.\n\n- **Biometric Match:** 99% match to known public figure.\n- **Liveness Check:** Failed. Spectral analysis shows uniform noise floor typical of ElevenLabs generation.\n\n**Conclusion:** This is a **Deepfake Voice Clone**. It is NOT a verified statement.`;
       trustScore = 5;
       verificationStatus = 'Suspicious';
    } else {
       responseContent = `I have parsed the document **"${attachment.name}"**. \n\n**Track 1 (Knowledge Graph Verification):**\n- **Claims Extracted:** 14\n- **Verified against DKG:** 12\n- **Disputed:** 2 (Conflicts with Wikipedia "History of AI" entry)\n\nI have anchored the hash of this document to NeuroWeb. It is now a verifiable Knowledge Asset.`;
       trustScore = 85;
       verificationStatus = 'Unverified';
    }
  }

  // 2. TEXT LOGIC: Track 1 (Content Authenticity) & General Fact Checking
  else if (
    lowerPrompt.includes("grokipedia") || 
    lowerPrompt.includes("wikipedia") || 
    lowerPrompt.includes("fact") ||
    lowerPrompt.includes("truth") ||
    lowerPrompt.includes("benar") || // Indonesian "correct"
    lowerPrompt.includes("hoax") ||
    lowerPrompt.includes("kiamat") // Specific user query example
  ) {
    if (lowerPrompt.includes("climate")) {
       responseContent = `**Content Comparison: Climate Change (Track 1)**\n\nI queried the DKG to compare Knowledge Assets from **Grokipedia (AI)** and **Wikipedia (Human)**.\n\n**Discrepancy Found:**\n- **Wikipedia:** "Scientific consensus >99%." (Cited: NASA, IPCC)\n- **Grokipedia:** "Debate remains active regarding severity." (Uncited)\n\n**Action:** I have published a **Community Note** correcting the Grokipedia entry with verified citations from the DKG.`;
       trustScore = 88;
       verificationStatus = 'Verified';
    } else if (lowerPrompt.includes("kiamat")) {
       responseContent = `I have searched the **Knowledge Graph** for verified events matching "kiamat hari ini" (doomsday today).\n\n**Result:** No credible scientific or geological data supports a cataclysmic event today. \n\n**Source Analysis:**\n- **Social Signal:** High volume of unverified bot activity on X (formerly Twitter) spreading this keyword.\n- **Scientific Data:** NASA & ESA feeds show normal planetary metrics.\n\n**Conclusion:** This appears to be **Misinformation** generated by a bot cluster to trigger engagement. Treat as **Low Trust**.`;
       trustScore = 12;
       verificationStatus = 'Suspicious';
    } else {
       responseContent = `I am analyzing your query against the **Aurion Trust Layer**.\n\nI have retrieved 3 Knowledge Assets related to "${userPrompt}". \n\n1. **Wikipedia Snapshot (Hash: 0x7a...):** Confirms the standard definition.\n2. **Grokipedia Entry (Hash: 0x9b...):** Diverges by 15% in semantic meaning.\n\n**Consensus:** The core facts align, but the AI-generated context lacks 2 key citations found in the DKG. I have generated a **Community Note** to bridge this gap.`;
       trustScore = 92;
    }
  }

  // 3. TEXT LOGIC: Track 3 (Social Graph Reputation & x402)
  else if (
    lowerPrompt.includes("reputation") || 
    lowerPrompt.includes("score") || 
    lowerPrompt.includes("trust") || 
    lowerPrompt.includes("identity") || 
    lowerPrompt.includes("did") ||
    lowerPrompt.includes("who is")
  ) {
    // Simulate x402 Payment
    await delay(800); 
    
    responseContent = `**Identity Verification (Track 3)**\n\n*⚡ x402 Microtransaction: Paid 0.01 NEURO to access Premium Reputation Node.*\n\n**Subject:** did:aurion:user.eth\n**Verification:** Proof of Personhood (WorldID + On-chain History)\n**Trust Score:** **98/100** (Excellent)\n\n**Social Graph Metrics:**\n- **Centrality:** High (Connected to 50+ verified builders).\n- **Sybil Risk:** < 0.1%.\n\nThis identity is classified as **Human** and **Trustworthy** within the Aurion ecosystem.`;
    trustScore = 99;
  }

  // 4. TEXT LOGIC: Track 3 (Wallet Guardian & Risk Analysis)
  else if (
    lowerPrompt.match(/0x[a-fA-F0-9]{40}/) || // Detect ETH address
    lowerPrompt.includes("contract") || 
    lowerPrompt.includes("scam") || 
    lowerPrompt.includes("wallet") ||
    lowerPrompt.includes("approve") ||
    lowerPrompt.includes("risk")
  ) {
    const address = lowerPrompt.match(/0x[a-fA-F0-9]{40}/)?.[0] || "0x7a250d...5cb2";
    
    if (lowerPrompt.includes("risk") || lowerPrompt.includes("check") || lowerPrompt.includes("approve")) {
      responseContent = `**Wallet Guardian Alert (Track 3)** 🛡️\n\nI have scanned contract \`${address}\` against the Aurion Social Trust Graph.\n\n**Risk Level: CRITICAL**\n- **Trust Score:** 12/100\n- **Flags:** This address interacts frequently with a known phishing cluster (ClusterID: #Phish_99).\n- **Code Analysis:** Contains a hidden approval mechanism allowing unlimited token spend.\n\n**Recommendation:** DO NOT APPROVE this transaction. I have blacklisted this asset in your local trust graph.`;
      trustScore = 12;
      verificationStatus = 'Suspicious';
    } else {
       responseContent = `**Contract Analysis**\n\nTarget: \`${address}\`\n\n- **Deployment:** 45 days ago on NeuroWeb.\n- **Creator:** Verified Developer (DID: did:aurion:builder.eth).\n- **Audit Status:** Clean (Audit Hash anchored on DKG).\n\nThis contract appears safe for interaction based on current Knowledge Assets.`;
       trustScore = 98;
    }
  }

  // 5. TEXT LOGIC: Track 4 (Wildcard / Synergy) & General
  else if (
    lowerPrompt.includes("synergy") ||
    lowerPrompt.includes("all tracks") ||
    lowerPrompt.includes("full") ||
    lowerPrompt.includes("connect")
  ) {
      responseContent = `**Executing Track 4 Synergy Workflow** 🚀\n\nI am combining insights across the entire ecosystem:\n\n1.  **Content:** Retrieved knowledge asset #${Math.floor(Math.random() * 1000)} (Grokipedia Alignment Check).\n2.  **Reputation:** Verified source identity via Social Graph (Track 3).\n3.  **Security:** Scanned linked smart contracts for risk (Wallet Guardian).\n\n**System Status:** All layers are synchronized on NeuroWeb. I am ready to perform complex multi-step verifications.`;
      trustScore = 100;
  }

  // GENERAL AI / FALLBACK
  else {
     responseContent = `I am **Aurion**, your decentralized AI agent.\n\nI support all **Hackathon Tracks**:\n1. **Grokipedia vs Wikipedia:** I compare sources to detect AI bias.\n2. **Community Notes:** I fight misinformation & deepfakes (upload a file to test!).\n3. **Social Graph:** I verify identity & reputation scores (x402 enabled).\n4. **Wildcard Synergy:** I combine these layers into a unified Trust Graph.\n\nI have processed your query: *"${userPrompt}"*\n\n**Result:** The concept is indexed in the Knowledge Graph under Asset #${dkgAssetId}. It is linked to valid proofs on Polkadot/NeuroWeb.`;
     trustScore = 95;
  }

  return {
    id: Date.now().toString(),
    role: 'model',
    content: responseContent,
    timestamp: new Date(),
    metadata: {
      provenance: provenanceNode,
      trustScore: trustScore,
      verificationStatus: verificationStatus,
      dkgAssetId: dkgAssetId
    }
  };
};