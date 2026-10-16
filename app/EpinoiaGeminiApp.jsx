import React, { useState, useEffect, useRef } from 'react';

// ============================================================================
// EPI-GEMINI: SOVEREIGN FLEET WORKSPACE
// Authentic Gemini Architecture | Strict Neutral Monochrome Styling
// Epinoia Horizon Tier-0 Autonomous Governance
// ============================================================================

// --- STRICT NEUTRAL MONOCHROME ICONOGRAPHY (#9AA0A6, #70757A, #C4C7C5, #FFFFFF) ---
const Icons = {
  Spark: ({ size = 18, color = "#C4C7C5" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" opacity="0.3" />
      <path d="m12 3 2.8 6.2L21 12l-6.2 2.8L12 21l-2.8-6.2L3 12l6.2-2.8z" fill={color} fillOpacity="0.15" />
    </svg>
  ),
  Merlin: ({ size = 18, color = "#E3E3E3" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
      <line x1="12" y1="22" x2="12" y2="12" />
      <polyline points="2 8.5 12 12 22 8.5" />
      <circle cx="12" cy="12" r="2.5" fill={color} />
    </svg>
  ),
  Codex: ({ size = 18, color = "#C4C7C5" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="10" y1="20" x2="14" y2="4" />
    </svg>
  ),
  Jie: ({ size = 18, color = "#9AA0A6" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Menu: ({ size = 18, color = "#9AA0A6" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  Plus: ({ size = 16, color = "#C4C7C5" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Search: ({ size = 16, color = "#9AA0A6" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Globe: ({ size = 16, color = "#9AA0A6" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Mic: ({ size = 16, color = "#9AA0A6" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  ),
  ArrowUp: ({ size = 16, color = "#131314" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  ),
  Paperclip: ({ size = 16, color = "#9AA0A6" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l7.88-7.88" />
    </svg>
  ),
  ChevronDown: ({ size = 14, color = "#9AA0A6" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  ChevronRight: ({ size = 14, color = "#9AA0A6" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Sliders: ({ size = 16, color = "#9AA0A6" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  ),
  Shield: ({ size = 16, color = "#C4C7C5" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Copy: ({ size = 14, color = "#9AA0A6" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  Check: ({ size = 14, color = "#FFFFFF" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Brain: ({ size = 16, color = "#C4C7C5" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z" />
    </svg>
  ),
  Activity: ({ size = 16, color = "#9AA0A6" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  Layers: ({ size = 16, color = "#9AA0A6" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  X: ({ size = 16, color = "#9AA0A6" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Trash: ({ size = 14, color = "#70757A" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  Lock: ({ size = 14, color = "#C4C7C5" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
};

// --- PROPRIETARY FLEET ARCHITECTURE SPECIFICATIONS ---
const FLEET_MODELS = {
  merlin: {
    id: 'merlin',
    name: 'Merlin',
    role: 'Tier-0 Frontier Sovereign Harness Governor & Strategic Reasoning',
    tag: 'Governor · Tier-0',
    icon: Icons.Merlin,
    latency: '142ms TTFT',
    context: '1,048,576 tokens',
    arch: 'Hybrid SSM-Transformer + Runic Speculative Gate',
    thinkingDefault: 'High',
    color: '#E3E3E3'
  },
  nxelle: {
    id: 'nxelle',
    name: 'Nxelle Codex',
    role: 'Systems Architecture, Shaders & 3D Math Engine',
    tag: 'Systems & Shaders',
    icon: Icons.Codex,
    latency: '88ms TTFT',
    context: '524,288 tokens',
    arch: 'Sparse Mixture of Kernels (SMoK) + AST Verification',
    thinkingDefault: 'Mid',
    color: '#C4C7C5'
  },
  jie: {
    id: 'jie',
    name: 'Jie',
    role: 'Ultra-Fast Stream Telemetry & Reflex Dispatch',
    tag: 'Reflex · Telemetry',
    icon: Icons.Jie,
    latency: '21ms TTFT',
    context: '131,072 tokens',
    arch: 'Pure Selective SSM Scan with Fused Linear Recurrence',
    thinkingDefault: 'Low',
    color: '#9AA0A6'
  }
};

// --- INITIAL PROMPT RECOMMENDATIONS ---
const STARTER_PROMPTS = [
  {
    title: "Audit Tier-3 Cognitive Pulse",
    desc: "Verify input-dependent selectivity gates (Δ, B, C) in sovereign SSM architecture.",
    model: "merlin",
    prompt: "Lakukan Tier-3 cognitive pulse audit pada layer x_proj dan dt_proj untuk adaptasi dynamic reasoning style."
  },
  {
    title: "Synthesize GLSL Raymarching Shader",
    desc: "Generate production raymarched volumetric SDF shader with analytic normals.",
    model: "nxelle",
    prompt: "Generate a production GLSL raymarching shader for an analytical gyroid SDF with screen-space soft shadows."
  },
  {
    title: "Stream Realtime Shard Telemetry",
    desc: "Trace token velocity, memory cache footprint, and active VPC node status.",
    model: "jie",
    prompt: "Tampilkan audit telemetri aktif untuk fleet sharding us-east-01 dan status KV-cache recurrence."
  },
  {
    title: "Air-Gapped Hermes Daemon Deployment",
    desc: "Validate zero-telemetry daemon isolation and cryptographic append-only journal.",
    model: "merlin",
    prompt: "Susun arsitektur isolasi hermes daemon untuk relay air-gapped dengan zero external egress policy."
  }
];

export default function EpinoiaGeminiApp() {
  // Navigation & View
  const [currentView, setCurrentView] = useState('chat'); // 'chat' | 'overview'
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedModel, setSelectedModel] = useState('merlin');
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);

  // Gemini Thinking Features
  const [thinkingBudget, setThinkingBudget] = useState('high'); // 'low' | 'mid' | 'high'
  const [thinkingPopoverOpen, setThinkingPopoverOpen] = useState(false);
  const [expandedThoughts, setExpandedThoughts] = useState({ 'm2': true });

  // Drawers & Modals
  const [telemetryOpen, setTelemetryOpen] = useState(false);
  const [clearanceModalOpen, setClearanceModalOpen] = useState(false);
  const [clearanceLevel, setClearanceLevel] = useState('Tier-0 Sovereign');
  const [clearanceKey, setClearanceKey] = useState('EPI-SOV-8829-ALPHA-T0');

  // Input & Tools
  const [inputPrompt, setInputPrompt] = useState('');
  const [deepSearchActive, setDeepSearchActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const textareaRef = useRef(null);
  const chatBottomRef = useRef(null);

  // Conversations State
  const [conversations, setConversations] = useState([
    {
      id: 'conv-1',
      title: 'Cognitive Pulse SSM Architecture',
      date: 'Today',
      messages: [
        {
          id: 'm1',
          role: 'user',
          content: 'Lakukan audit Tier-3 pada mekanisme gate selektif SSM. Bagaimana bypass computational bottleneck pada scan sequence panjang?',
          timestamp: '14:20'
        },
        {
          id: 'm2',
          role: 'assistant',
          model: 'merlin',
          content: `### Tier-3 Architecture Audit: Input-Dependent Selectivity Injection

Untuk meloloskan scan sequence panjang tanpa degradasi memory throughput, kita langsung melakukan intervensi bedah pada gate proyeksi input:

State equation recurrence:
h_t = A_bar * h_{t-1} + B_bar * x_t
y_t = C * h_t

1. Selective Gate Surgery (x_proj -> Δ, B, C):
- Menghindari standard dense layer. Terapkan rank-16 low-rank factorization langsung di jalur Δ projection.
- Inject fused hardware scan (torch.addcmul level kernel) untuk memotong kompleksitas scan dari O(L) menjadi O(log L) via parallel associative scan.

\`\`\`python
# Merlin Tier-3 Fused SSM Kernel Injection
import torch
import torch.nn as nn

class SovereignCognitivePulse(nn.Module):
    def __init__(self, d_model=2048, d_state=64, dt_rank=32):
        super().__init__()
        self.d_model = d_model
        self.d_state = d_state
        # Direct surgical targeting of selectivity gates (Delta, B, C)
        self.x_proj = nn.Linear(d_model, dt_rank + d_state * 2, bias=False)
        self.dt_proj = nn.Linear(dt_rank, d_model, bias=True)
        
    @torch.compile(mode="max-autotune")
    def forward(self, u):
        # Hardware-aware fused associative recurrence
        B, L, D = u.shape
        pulse = self.x_proj(u)
        delta, B_gate, C_gate = torch.split(pulse, [32, self.d_state, self.d_state], dim=-1)
        dt = torch.nn.functional.softplus(self.dt_proj(delta))
        return dt, B_gate, C_gate
\`\`\`

2. Invariance & Air-Gap Guarantee:
Append-only cryptographic hash diikatkan pada setiap recurrence state. Egress jaringan dinonaktifkan secara kernel-level pada seluruh node cluster.`,
          thought: {
            duration: '4.8s',
            steps: [
              { name: 'Query AST Parsing', time: '120ms', status: 'complete', detail: 'Decomposed mathematical recurrence tensors & selective projection matrix.' },
              { name: 'Sovereign Gate Clearance', time: '210ms', status: 'complete', detail: 'Verified Tier-0 security policy; verified zero external telemetry egress.' },
              { name: 'Selective SSM Kernel Synthesis', time: '3,840ms', status: 'complete', detail: 'Compiled Kogge-Stone fused scan AST with torch.compile max-autotune.' },
              { name: 'Anti-Hallucination Matrix Audit', time: '630ms', status: 'complete', detail: 'Checked numerical stability under BF16 mixed-precision envelope.' }
            ]
          },
          timestamp: '14:21'
        }
      ]
    }
  ]);
  const [activeConvId, setActiveConvId] = useState('conv-1');

  // Auto-scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, isStreaming]);

  // Active conversation helper
  const activeConversation = conversations.find(c => c.id === activeConvId) || conversations[0];

  // Auto-resize textarea
  const handleInputChange = (e) => {
    setInputPrompt(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  };

  // Create new chat
  const handleNewChat = () => {
    const newId = `conv-${Date.now()}`;
    const newConv = {
      id: newId,
      title: 'New Sovereign Thread',
      date: 'Just now',
      messages: []
    };
    setConversations([newConv, ...conversations]);
    setActiveConvId(newId);
    setInputPrompt('');
  };

  // Toggle thought accordion
  const toggleThought = (msgId) => {
    setExpandedThoughts(prev => ({
      ...prev,
      [msgId]: !prev[msgId]
    }));
  };

  // Copy helper
  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Parse and render formatted markdown blocks cleanly
  const renderFormattedMessage = (content, msgId) => {
    const parts = [];
    const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', text: content.slice(lastIndex, match.index) });
      }
      parts.push({ type: 'code', lang: match[1] || 'code', code: match[2].trim() });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < content.length) {
      parts.push({ type: 'text', text: content.slice(lastIndex) });
    }

    return parts.map((part, pIdx) => {
      if (part.type === 'code') {
        const codeKey = `${msgId}-code-${pIdx}`;
        return (
          <div key={pIdx} className="code-block-wrap">
            <div className="code-block-header">
              <span>{part.lang}</span>
              <button className="btn-copy-code" onClick={() => handleCopy(codeKey, part.code)}>
                {copiedId === codeKey ? <Icons.Check size={13} /> : <Icons.Copy size={13} />}
                <span>{copiedId === codeKey ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="code-pre"><code>{part.code}</code></pre>
          </div>
        );
      }

      // Format text paragraphs
      const paragraphs = part.text.split('\n\n').filter(p => p.trim());
      return (
        <div key={pIdx} className="text-paragraphs-group">
          {paragraphs.map((para, paraIdx) => {
            if (para.startsWith('### ')) {
              return <h3 key={paraIdx} className="md-h3">{para.replace('### ', '')}</h3>;
            }
            if (para.startsWith('## ')) {
              return <h2 key={paraIdx} className="md-h2">{para.replace('## ', '')}</h2>;
            }
            const lines = para.split('\n');
            return (
              <div key={paraIdx} className="md-p">
                {lines.map((line, lineIdx) => (
                  <div key={lineIdx} style={{ marginBottom: line.startsWith('-') || line.match(/^\d+\./) ? '4px' : '6px' }}>
                    {line}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      );
    });
  };

  // Simulated Dispatch & Streaming Response
  const handleSendPrompt = (overrideText = null) => {
    const textToSend = overrideText || inputPrompt;
    if (!textToSend.trim() || isStreaming) return;

    const userMsgId = `usr-${Date.now()}`;
    const assistantMsgId = `ast-${Date.now()}`;
    const activeModelObj = FLEET_MODELS[selectedModel];

    const newUserMsg = {
      id: userMsgId,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === activeConvId) {
        const title = conv.messages.length === 0 ? textToSend.slice(0, 32) + '...' : conv.title;
        return {
          ...conv,
          title,
          messages: [...conv.messages, newUserMsg]
        };
      }
      return conv;
    }));

    setInputPrompt('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setIsStreaming(true);

    const thoughtDur = thinkingBudget === 'high' ? '5.4s' : thinkingBudget === 'mid' ? '2.8s' : '0.9s';
    const mockSteps = [
      { name: 'Query Tokenization & AST', time: thinkingBudget === 'high' ? '180ms' : '45ms', status: 'complete', detail: 'Parsed syntax tree and dispatch vectors.' },
      { name: 'Sovereign Fleet Alignment', time: thinkingBudget === 'high' ? '320ms' : '90ms', status: 'complete', detail: `Routed to ${activeModelObj.name} with ${activeModelObj.latency}.` },
      { name: 'Multi-Pass State Synthesis', time: thinkingBudget === 'high' ? '4,200ms' : '1,800ms', status: 'complete', detail: 'Compiled responses against deterministic cache.' },
      { name: 'Invariant Verification', time: thinkingBudget === 'high' ? '700ms' : '210ms', status: 'complete', detail: 'Zero-hallucination check verified.' }
    ];

    let targetResponse = "";
    if (selectedModel === 'merlin') {
      targetResponse = `### Merlin Sovereign Strategic Response\n\nAnalisis tereksekusi pada level **Tier-3 Governance**. Parameter invariant divalidasi penuh:\n\n1. Hardware-Aware Kernel Execution:\n- Resource sharding dipetakan ke node air-gapped lokal.\n- Memory bandwidth dioptimalkan dengan zero external API dependency.\n\n\`\`\`bash\n# Merlin Daemon Verification\nmerlin daemon status --shard="us-east-sovereign-01" --clearance="Tier-0"\n[OK] Cryptographic ledger synced. 0 egress anomalies detected.\n\`\`\`\n\n2. Status: Deployment siap dipancarkan langsung ke cluster produksi.`;
    } else if (selectedModel === 'nxelle') {
      targetResponse = `### Nxelle Codex: GLSL / Shading Kernel Synthesis\n\nBerikut implementasi analytic surface shader dengan zero compilation overhead:\n\n\`\`\`glsl\n// Nxelle Analytic SDF Normal Estimator\nvec3 calcNormal(in vec3 pos) {\n    const float eps = 0.0005;\n    const vec2 h = vec2(eps, 0.0);\n    return normalize(vec3(\n        mapSDF(pos + h.xyy) - mapSDF(pos - h.xyy),\n        mapSDF(pos + h.yxy) - mapSDF(pos - h.yxy),\n        mapSDF(pos + h.yyx) - mapSDF(pos - h.yyx)\n    ));\n}\n\`\`\`\n\nOptimasi register occupancy: 100% compute tile efficiency tercapai.`;
    } else {
      targetResponse = `### Jie Reflex Dispatch Log\n\nTelemetri instan terpindai:\n- Latency: 18ms TTFT\n- KV-Cache Footprint: 41.8% (Linear Recurrence)\n- Active Workers: 16/16 Threads Synchronous\n\n\`\`\`json\n{\n  "dispatch_id": "jie-stream-9941",\n  "status": "NOMINAL",\n  "telemetry_egress": "LOCKED_ZERO"\n}\n\`\`\``;
    }

    const placeholderAstMsg = {
      id: assistantMsgId,
      role: 'assistant',
      model: selectedModel,
      content: '',
      thought: {
        duration: thoughtDur,
        steps: mockSteps
      },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isStreaming: true
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === activeConvId) {
        return {
          ...conv,
          messages: [...conv.messages, placeholderAstMsg]
        };
      }
      return conv;
    }));

    setExpandedThoughts(prev => ({ ...prev, [assistantMsgId]: true }));

    let charIndex = 0;
    const streamInterval = setInterval(() => {
      charIndex += 16;
      if (charIndex >= targetResponse.length) {
        clearInterval(streamInterval);
        setIsStreaming(false);
        setConversations(prev => prev.map(conv => {
          if (conv.id === activeConvId) {
            return {
              ...conv,
              messages: conv.messages.map(m => m.id === assistantMsgId ? { ...m, content: targetResponse, isStreaming: false } : m)
            };
          }
          return conv;
        }));
      } else {
        setConversations(prev => prev.map(conv => {
          if (conv.id === activeConvId) {
            return {
              ...conv,
              messages: conv.messages.map(m => m.id === assistantMsgId ? { ...m, content: targetResponse.slice(0, charIndex) } : m)
            };
          }
          return conv;
        }));
      }
    }, 28);
  };

  return (
    <div className="epi-app-root">
      <style>{`
        /* --- GEMINI AUTHENTIC DESIGN TOKENS --- */
        :root {
          --bg-base: #131314;
          --bg-surface: #1E1F20;
          --bg-elevated: #282A2C;
          --bg-hover: #333538;
          --border-subtle: #2A2B2D;
          --border-medium: #3C4043;
          --border-focus: #70757A;
          --text-primary: #E3E3E3;
          --text-secondary: #C4C7C5;
          --text-muted: #9AA0A6;
          --text-dim: #70757A;
          --radius-pill: 9999px;
          --radius-card: 18px;
          --radius-sm: 8px;
          --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          --font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body, html {
          background-color: var(--bg-base);
          color: var(--text-primary);
          font-family: var(--font-sans);
          height: 100%;
          overflow: hidden;
          -webkit-font-smoothing: antialiased;
        }

        .epi-app-root {
          display: flex;
          height: 100vh;
          width: 100vw;
          background-color: var(--bg-base);
          color: var(--text-primary);
          overflow: hidden;
          position: relative;
        }

        /* --- SIDEBAR (AUTHENTIC COLLAPSIBLE GEMINI DRAWER) --- */
        .epi-sidebar {
          width: 280px;
          min-width: 280px;
          background-color: var(--bg-surface);
          display: flex;
          flex-direction: column;
          border-right: 1px solid var(--border-subtle);
          transition: margin-left 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 40;
        }

        .epi-sidebar.collapsed {
          margin-left: -280px;
        }

        .sidebar-header {
          padding: 18px 20px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand-cluster {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .brand-title {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--text-primary);
          text-transform: uppercase;
        }

        .brand-sub {
          font-size: 10px;
          font-family: var(--font-mono);
          color: var(--text-dim);
          letter-spacing: 0.1em;
        }

        .btn-icon-ghost {
          background: transparent;
          border: none;
          color: var(--text-muted);
          width: 34px;
          height: 34px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.18s ease, color 0.18s ease;
        }

        .btn-icon-ghost:hover {
          background: var(--bg-hover);
          color: var(--text-primary);
        }

        .sidebar-new-chat-wrap {
          padding: 0 16px 16px;
        }

        .btn-new-chat {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 16px;
          background-color: var(--bg-elevated);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-pill);
          color: var(--text-primary);
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-new-chat:hover {
          background-color: var(--bg-hover);
          border-color: var(--border-focus);
          color: #fff;
        }

        .sidebar-section-title {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-dim);
          padding: 12px 20px 6px;
        }

        .sidebar-history-list {
          flex: 1;
          overflow-y: auto;
          padding: 0 12px;
        }

        .sidebar-history-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 12px;
          border-radius: var(--radius-sm);
          font-size: 13px;
          color: var(--text-secondary);
          cursor: pointer;
          margin-bottom: 2px;
          transition: background 0.15s ease;
        }

        .sidebar-history-item:hover {
          background-color: var(--bg-hover);
          color: var(--text-primary);
        }

        .sidebar-history-item.active {
          background-color: var(--bg-elevated);
          color: #FFFFFF;
          font-weight: 500;
        }

        .sidebar-bottom {
          padding: 14px 16px;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .clearance-pill {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: border-color 0.2s ease;
        }

        .clearance-pill:hover {
          border-color: var(--border-focus);
        }

        /* --- MAIN WORKSPACE AREA --- */
        .epi-workspace {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: hidden;
          background-color: var(--bg-base);
          position: relative;
        }

        /* --- TOP NAV HEADER --- */
        .workspace-header {
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          border-bottom: 1px solid var(--border-subtle);
          background-color: rgba(19, 19, 20, 0.95);
          backdrop-filter: blur(12px);
          z-index: 30;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .model-selector-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-pill);
          font-size: 13px;
          font-weight: 500;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .model-selector-pill:hover {
          background-color: var(--bg-elevated);
          border-color: var(--border-focus);
        }

        /* --- DUAL-VIEW SEGMENTED TOGGLE --- */
        .view-segmented-wrap {
          display: flex;
          align-items: center;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-pill);
          padding: 3px;
        }

        .view-btn {
          padding: 6px 16px;
          font-size: 12.5px;
          font-weight: 500;
          border-radius: var(--radius-pill);
          border: none;
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .view-btn.active {
          background-color: var(--bg-elevated);
          color: #FFFFFF;
          box-shadow: 0 1px 3px rgba(0,0,0,0.4);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* --- CHAT WORKSPACE BODY --- */
        .chat-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
        }

        .chat-scroll-area {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .chat-scroll-content {
          max-width: 860px;
          width: 100%;
          margin: 0 auto;
          padding: 24px 20px 180px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* --- EMPTY STATE / STARTER CARDS --- */
        .starter-hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 0 28px;
          text-align: center;
        }

        .hero-glyph {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: var(--bg-elevated);
          border: 1px solid var(--border-medium);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .hero-title {
          font-size: 26px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }

        .hero-subtitle {
          font-size: 14px;
          color: var(--text-muted);
          max-width: 520px;
          line-height: 1.5;
        }

        .starter-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 32px;
        }

        .starter-card {
          padding: 16px 18px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-card);
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .starter-card:hover {
          background: var(--bg-elevated);
          border-color: var(--border-focus);
          transform: translateY(-1px);
        }

        .starter-card-title {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .starter-card-desc {
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.4;
        }

        /* --- MESSAGE ITEMS --- */
        .msg-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: fadeIn 0.25s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .user-msg-block {
          align-self: flex-end;
          max-width: 82%;
          background: var(--bg-elevated);
          border: 1px solid var(--border-medium);
          padding: 13px 18px;
          border-radius: 18px 18px 4px 18px;
          font-size: 14px;
          line-height: 1.55;
          color: var(--text-primary);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .assistant-msg-block {
          display: flex;
          gap: 16px;
          width: 100%;
        }

        .assistant-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 4px;
        }

        .assistant-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
          overflow: hidden;
        }

        .assistant-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          color: var(--text-dim);
        }

        .assistant-model-tag {
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.02em;
        }

        /* --- GEMINI THINKING ACCORDION ("Thought for X seconds") --- */
        .thought-accordion {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.2s ease;
        }

        .thought-accordion:hover {
          border-color: var(--border-medium);
        }

        .thought-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          cursor: pointer;
          user-select: none;
        }

        .thought-title-group {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 12.5px;
          font-family: var(--font-mono);
          color: var(--text-secondary);
        }

        .thought-timing-pill {
          padding: 2px 8px;
          background: var(--bg-elevated);
          border-radius: var(--radius-pill);
          font-size: 11px;
          color: var(--text-muted);
        }

        .thought-body {
          padding: 10px 14px 14px;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .thought-step-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 12px;
          line-height: 1.45;
          padding: 4px 0;
        }

        .step-indicator {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--text-muted);
          margin-top: 6px;
          flex-shrink: 0;
        }

        .step-name {
          font-weight: 600;
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 11.5px;
        }

        .step-time {
          color: var(--text-dim);
          font-size: 11px;
          margin-left: 6px;
        }

        .step-detail {
          color: var(--text-muted);
          margin-top: 2px;
        }

        /* --- RESPONSE MARKDOWN & CODE BLOCKS --- */
        .text-paragraphs-group {
          font-size: 14.5px;
          line-height: 1.65;
          color: var(--text-secondary);
        }

        .md-h3 {
          font-size: 16px;
          font-weight: 600;
          color: #FFFFFF;
          margin: 16px 0 8px;
        }

        .md-h2 {
          font-size: 18px;
          font-weight: 600;
          color: #FFFFFF;
          margin: 20px 0 10px;
        }

        .md-p {
          margin-bottom: 12px;
        }

        .code-block-wrap {
          margin: 14px 0;
          background: #0B0B0C;
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          overflow: hidden;
        }

        .code-block-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 7px 14px;
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-subtle);
          font-size: 11px;
          font-family: var(--font-mono);
          color: var(--text-dim);
          text-transform: uppercase;
        }

        .btn-copy-code {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 11px;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }

        .btn-copy-code:hover {
          color: #FFFFFF;
        }

        .code-pre {
          padding: 14px 16px;
          font-family: var(--font-mono);
          font-size: 12.5px;
          line-height: 1.5;
          color: #D4D4D4;
          overflow-x: auto;
          white-space: pre;
        }

        .msg-action-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 6px;
        }

        /* --- FLOATING GEMINI PROMPT PILL CONTAINER --- */
        .prompt-floating-container {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 40px);
          max-width: 820px;
          z-index: 25;
        }

        .prompt-pill-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-medium);
          border-radius: 26px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6);
          padding: 10px 16px 10px 18px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .prompt-pill-card:focus-within {
          border-color: var(--border-focus);
          box-shadow: 0 8px 36px rgba(0,0,0,0.8);
        }

        .prompt-upper-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .prompt-textarea {
          width: 100%;
          min-height: 28px;
          max-height: 180px;
          background: transparent;
          border: none;
          outline: none;
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-size: 14.5px;
          line-height: 1.5;
          resize: none;
        }

        .prompt-textarea::placeholder {
          color: var(--text-dim);
        }

        .prompt-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 4px;
        }

        .prompt-tools-group {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .tool-badge-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 11px;
          background: var(--bg-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-pill);
          font-size: 11.5px;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .tool-badge-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-focus);
        }

        .tool-badge-btn.active {
          background: rgba(255,255,255,0.08);
          border-color: var(--text-muted);
          color: #FFFFFF;
        }

        .btn-send-pill {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: #FFFFFF;
          color: #131314;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: opacity 0.2s ease, transform 0.15s ease;
        }

        .btn-send-pill:disabled {
          background: var(--bg-elevated);
          color: var(--text-dim);
          cursor: not-allowed;
          opacity: 0.6;
        }

        .btn-send-pill:not(:disabled):hover {
          transform: scale(1.05);
        }

        .prompt-disclaimer {
          text-align: center;
          font-size: 11px;
          color: var(--text-dim);
          margin-top: 8px;
        }

        /* --- ENTERPRISE OVERVIEW EDITORIAL PAGE --- */
        .overview-container {
          flex: 1;
          overflow-y: auto;
          padding: 36px 40px 100px;
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }

        .overview-hero {
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 24px;
          margin-bottom: 36px;
        }

        .overview-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 4px 12px;
          background: var(--bg-elevated);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-pill);
          font-size: 11px;
          font-family: var(--font-mono);
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .overview-title {
          font-size: 32px;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: -0.02em;
          margin-bottom: 10px;
        }

        .overview-subtitle {
          font-size: 15px;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 740px;
        }

        .matrix-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }

        .matrix-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-card);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: border-color 0.2s ease;
        }

        .matrix-card:hover {
          border-color: var(--border-focus);
        }

        .matrix-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .matrix-name {
          font-size: 18px;
          font-weight: 600;
          color: #FFFFFF;
        }

        .matrix-tag {
          font-size: 10.5px;
          font-family: var(--font-mono);
          padding: 3px 8px;
          border-radius: var(--radius-sm);
          background: var(--bg-elevated);
          color: var(--text-muted);
        }

        .matrix-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .matrix-specs {
          border-top: 1px solid var(--border-subtle);
          padding-top: 14px;
          display: grid;
          gap: 8px;
          font-size: 12px;
          font-family: var(--font-mono);
        }

        .spec-item {
          display: flex;
          justify-content: space-between;
          color: var(--text-muted);
        }

        .spec-val {
          color: #FFFFFF;
        }

        /* --- TELEMETRY DRAWER (SLIDE-OVER) --- */
        .drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          z-index: 50;
        }

        .telemetry-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 380px;
          background: var(--bg-surface);
          border-left: 1px solid var(--border-medium);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          z-index: 55;
          box-shadow: -10px 0 30px rgba(0,0,0,0.8);
          animation: slideLeft 0.25s ease;
        }

        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 14px;
        }

        .metric-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 14px;
        }

        .metric-title {
          font-size: 11px;
          font-family: var(--font-mono);
          color: var(--text-dim);
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .metric-val {
          font-size: 20px;
          font-weight: 600;
          color: #FFFFFF;
          font-family: var(--font-mono);
        }

        .bar-wrap {
          height: 6px;
          background: rgba(255,255,255,0.06);
          border-radius: var(--radius-pill);
          overflow: hidden;
          margin-top: 10px;
        }

        .bar-fill {
          height: 100%;
          background: #FFFFFF;
          border-radius: var(--radius-pill);
        }

        /* --- CLEARANCE MODAL --- */
        .modal-wrap {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 60;
          backdrop-filter: blur(8px);
        }

        .modal-box {
          width: 440px;
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-card);
          padding: 28px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.9);
        }

        .modal-input {
          width: 100%;
          padding: 11px 14px;
          background: var(--bg-elevated);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          color: #FFFFFF;
          font-family: var(--font-mono);
          font-size: 13px;
          margin: 14px 0 20px;
        }

        .modal-input:focus {
          border-color: var(--border-focus);
          outline: none;
        }

        /* --- RESPONSIVE FIXES --- */
        @media (max-width: 860px) {
          .epi-sidebar {
            position: absolute;
            height: 100%;
          }
          .matrix-grid {
            grid-template-columns: 1fr;
          }
          .starter-grid {
            grid-template-columns: 1fr;
          }
          .telemetry-drawer {
            width: 100%;
          }
        }
      `}</style>

      {/* --- SIDEBAR DRAWER --- */}
      <aside className={`epi-sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
        <div className="sidebar-header">
          <div className="brand-cluster">
            <Icons.Spark size={20} color="#FFFFFF" />
            <div>
              <div className="brand-title">Epinoia Fleet</div>
              <div className="brand-sub">SOVEREIGN HARNESS</div>
            </div>
          </div>
          <button className="btn-icon-ghost" onClick={() => setSidebarOpen(false)} title="Close Sidebar">
            <Icons.Menu size={18} />
          </button>
        </div>

        <div className="sidebar-new-chat-wrap">
          <button className="btn-new-chat" onClick={handleNewChat}>
            <Icons.Plus size={16} color="#FFFFFF" />
            <span>New conversation</span>
          </button>
        </div>

        <div className="sidebar-section-title">Recent Threads</div>
        <div className="sidebar-history-list">
          {conversations.map(conv => (
            <div
              key={conv.id}
              className={`sidebar-history-item ${activeConvId === conv.id ? 'active' : ''}`}
              onClick={() => { setActiveConvId(conv.id); setCurrentView('chat'); }}
            >
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '190px' }}>
                {conv.title}
              </span>
              {conversations.length > 1 && (
                <button
                  className="btn-icon-ghost"
                  style={{ width: 22, height: 22 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setConversations(conversations.filter(c => c.id !== conv.id));
                  }}
                  title="Delete thread"
                >
                  <Icons.Trash size={12} />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="sidebar-bottom">
          <div className="clearance-pill" onClick={() => setClearanceModalOpen(true)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icons.Shield size={16} color="#FFFFFF" />
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Clearance</div>
                <div style={{ fontSize: '12.5px', color: '#FFFFFF', fontWeight: 600 }}>{clearanceLevel}</div>
              </div>
            </div>
            <Icons.ChevronRight size={14} />
          </div>

          <button className="btn-new-chat" style={{ padding: '8px 14px', fontSize: '12.5px' }} onClick={() => setTelemetryOpen(true)}>
            <Icons.Sliders size={15} />
            <span>Telemetry &amp; Shard</span>
          </button>
        </div>
      </aside>

      {/* --- WORKSPACE CORE --- */}
      <main className="epi-workspace">
        {/* TOP HEADER */}
        <header className="workspace-header">
          <div className="header-left">
            {!sidebarOpen && (
              <button className="btn-icon-ghost" onClick={() => setSidebarOpen(true)} title="Expand Sidebar">
                <Icons.Menu size={18} color="#FFFFFF" />
              </button>
            )}

            {/* MODEL SELECTOR DROPDOWN */}
            <div style={{ position: 'relative' }}>
              <button className="model-selector-pill" onClick={() => setModelDropdownOpen(!modelDropdownOpen)}>
                {React.createElement(FLEET_MODELS[selectedModel].icon, { size: 16, color: FLEET_MODELS[selectedModel].color })}
                <span>{FLEET_MODELS[selectedModel].name}</span>
                <span style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  {FLEET_MODELS[selectedModel].tag}
                </span>
                <Icons.ChevronDown size={14} />
              </button>

              {modelDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '120%',
                  left: 0,
                  width: '320px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: '14px',
                  boxShadow: '0 12px 36px rgba(0,0,0,0.8)',
                  padding: '8px',
                  zIndex: 45
                }}>
                  {Object.values(FLEET_MODELS).map(m => (
                    <div
                      key={m.id}
                      onClick={() => {
                        setSelectedModel(m.id);
                        setModelDropdownOpen(false);
                      }}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: selectedModel === m.id ? 'var(--bg-elevated)' : 'transparent',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        marginBottom: 4
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: 13.5, color: '#FFFFFF' }}>
                          {React.createElement(m.icon, { size: 16, color: m.color })}
                          {m.name}
                        </div>
                        <span style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{m.latency}</span>
                      </div>
                      <div style={{ fontSize: 11.5, color: 'var(--text-muted)', lineHeight: 1.4 }}>{m.role}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* DUAL-VIEW TOGGLE */}
          <div className="view-segmented-wrap">
            <button
              className={`view-btn ${currentView === 'chat' ? 'active' : ''}`}
              onClick={() => setCurrentView('chat')}
            >
              <Icons.Spark size={14} />
              <span>Chat Workspace</span>
            </button>
            <button
              className={`view-btn ${currentView === 'overview' ? 'active' : ''}`}
              onClick={() => setCurrentView('overview')}
            >
              <Icons.Layers size={14} />
              <span>Enterprise Overview</span>
            </button>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="header-right">
            <button className="btn-icon-ghost" onClick={() => setTelemetryOpen(true)} title="Fleet Parameters">
              <Icons.Activity size={17} />
            </button>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-elevated)', border: '1px solid var(--border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>
              OP
            </div>
          </div>
        </header>

        {/* --- VIEW 1: CHAT WORKSPACE --- */}
        {currentView === 'chat' && (
          <div className="chat-container">
            <div className="chat-scroll-area">
              <div className="chat-scroll-content">
              {activeConversation.messages.length === 0 ? (
                <div className="starter-hero">
                  <div className="hero-glyph">
                    <Icons.Spark size={26} color="#FFFFFF" />
                  </div>
                  <h1 className="hero-title">Epinoia Sovereign Workspace</h1>
                  <p className="hero-subtitle">
                    Interact directly with Tier-0 Governor <b>Merlin</b>, shader synthesizer <b>Nxelle Codex</b>, and ultra-fast reflex router <b>Jie</b>.
                  </p>

                  <div className="starter-grid">
                    {STARTER_PROMPTS.map((p, idx) => (
                      <div
                        key={idx}
                        className="starter-card"
                        onClick={() => {
                          setSelectedModel(p.model);
                          handleSendPrompt(p.prompt);
                        }}
                      >
                        <div className="starter-card-title">
                          <span>{p.title}</span>
                          <Icons.ChevronRight size={14} color="#70757A" />
                        </div>
                        <div className="starter-card-desc">{p.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                activeConversation.messages.map(msg => (
                  <div key={msg.id} className="msg-row">
                    {msg.role === 'user' ? (
                      <div className="user-msg-block">
                        {msg.content}
                      </div>
                    ) : (
                      <div className="assistant-msg-block">
                        <div className="assistant-avatar">
                          {React.createElement(FLEET_MODELS[msg.model || 'merlin'].icon, { size: 16, color: '#FFFFFF' })}
                        </div>
                        <div className="assistant-body">
                          <div className="assistant-meta">
                            <span className="assistant-model-tag">{FLEET_MODELS[msg.model || 'merlin'].name}</span>
                            <span>•</span>
                            <span>{msg.timestamp}</span>
                            <span>•</span>
                            <span style={{ fontFamily: 'var(--font-mono)' }}>{FLEET_MODELS[msg.model || 'merlin'].tag}</span>
                          </div>

                          {/* GEMINI EXPANDABLE THINKING ACCORDION */}
                          {msg.thought && (
                            <div className="thought-accordion">
                              <div className="thought-header" onClick={() => toggleThought(msg.id)}>
                                <div className="thought-title-group">
                                  <Icons.Brain size={15} color="#9AA0A6" />
                                  <span>Thought for {msg.thought.duration}</span>
                                  <span className="thought-timing-pill">{msg.thought.steps.length} execution stages</span>
                                </div>
                                {expandedThoughts[msg.id] ? <Icons.ChevronDown size={14} /> : <Icons.ChevronRight size={14} />}
                              </div>

                              {expandedThoughts[msg.id] && (
                                <div className="thought-body">
                                  {msg.thought.steps.map((st, sidx) => (
                                    <div key={sidx} className="thought-step-item">
                                      <div className="step-indicator" />
                                      <div style={{ flex: 1 }}>
                                        <div>
                                          <span className="step-name">{st.name}</span>
                                          <span className="step-time">({st.time})</span>
                                        </div>
                                        <div className="step-detail">{st.detail}</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}

                          {/* MESSAGE CONTENT */}
                          {renderFormattedMessage(msg.content, msg.id)}

                          {/* ACTION BAR */}
                          <div className="msg-action-bar">
                            <button className="btn-icon-ghost" style={{ width: 28, height: 28 }} onClick={() => handleCopy(msg.id, msg.content)} title="Copy response">
                              {copiedId === msg.id ? <Icons.Check size={14} /> : <Icons.Copy size={14} />}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
              <div ref={chatBottomRef} />
              </div>
            </div>

            {/* FLOATING GEMINI PROMPT PILL */}
            <div className="prompt-floating-container">
              <div className="prompt-pill-card">
                <div className="prompt-upper-row">
                  <textarea
                    ref={textareaRef}
                    className="prompt-textarea"
                    placeholder={`Ask ${FLEET_MODELS[selectedModel].name} or type sovereign instruction...`}
                    rows={1}
                    value={inputPrompt}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendPrompt();
                      }
                    }}
                  />
                </div>

                <div className="prompt-bottom-row">
                  <div className="prompt-tools-group">
                    {/* FILE ATTACH BUTTON */}
                    <button
                      className="tool-badge-btn"
                      onClick={() => {
                        const fakeName = `matrix_spec_${Date.now().toString().slice(-4)}.ast`;
                        setAttachedFiles([...attachedFiles, { name: fakeName, size: '24 KB' }]);
                      }}
                      title="Attach AST / Specification"
                    >
                      <Icons.Paperclip size={14} />
                      {attachedFiles.length > 0 && <span>{attachedFiles.length}</span>}
                    </button>

                    {/* DEEP SEARCH TOGGLE */}
                    <button
                      className={`tool-badge-btn ${deepSearchActive ? 'active' : ''}`}
                      onClick={() => setDeepSearchActive(!deepSearchActive)}
                      title="Deep Fleet Knowledge Synthesis"
                    >
                      <Icons.Globe size={14} />
                      <span>Deep Search</span>
                    </button>

                    {/* THINKING BUDGET SELECTOR */}
                    <div style={{ position: 'relative' }}>
                      <button
                        className="tool-badge-btn"
                        onClick={() => setThinkingPopoverOpen(!thinkingPopoverOpen)}
                        title="Thinking Budget Allocation"
                      >
                        <Icons.Brain size={14} />
                        <span style={{ textTransform: 'capitalize' }}>Thinking: {thinkingBudget}</span>
                        <Icons.ChevronDown size={11} />
                      </button>

                      {thinkingPopoverOpen && (
                        <div style={{
                          position: 'absolute',
                          bottom: '120%',
                          left: 0,
                          width: '210px',
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-medium)',
                          borderRadius: '12px',
                          padding: '6px',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.9)',
                          zIndex: 40
                        }}>
                          {[
                            { key: 'low', label: 'Low (1s Reflex)', desc: 'Instantaneous stream' },
                            { key: 'mid', label: 'Mid (3-5s Analysis)', desc: 'Balanced AST validation' },
                            { key: 'high', label: 'High (8-12s Surgery)', desc: 'Deep Tier-3 verification' }
                          ].map(t => (
                            <div
                              key={t.key}
                              onClick={() => { setThinkingBudget(t.key); setThinkingPopoverOpen(false); }}
                              style={{
                                padding: '8px 10px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                background: thinkingBudget === t.key ? 'var(--bg-elevated)' : 'transparent',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                marginBottom: 2
                              }}
                            >
                              <div style={{ fontSize: 12, fontWeight: 600, color: '#FFFFFF' }}>{t.label}</div>
                              <div style={{ fontSize: 10.5, color: 'var(--text-dim)' }}>{t.desc}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* MIC DICTATION */}
                    <button
                      className={`tool-badge-btn ${isRecording ? 'active' : ''}`}
                      onClick={() => setIsRecording(!isRecording)}
                      title="Voice Dictation"
                    >
                      <Icons.Mic size={14} />
                    </button>
                  </div>

                  {/* SEND BUTTON */}
                  <button
                    className="btn-send-pill"
                    disabled={!inputPrompt.trim() || isStreaming}
                    onClick={() => handleSendPrompt()}
                    title="Send instruction"
                  >
                    <Icons.ArrowUp size={16} />
                  </button>
                </div>
              </div>
              <div className="prompt-disclaimer">
                Epinoia Sovereign Fleet. Strict air-gap policy active. Verify mission-critical AST payloads prior to dispatch.
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW 2: ENTERPRISE OVERVIEW EDITORIAL PAGE --- */}
        {currentView === 'overview' && (
          <div className="overview-container">
            <div className="overview-hero">
              <div className="overview-badge">
                <Icons.Shield size={14} color="#FFFFFF" />
                <span>EPI-FLEET SPECIFICATION v4.2 · AIR-GAP CERTIFIED</span>
              </div>
              <h1 className="overview-title">Enterprise Sovereign Fleet Architecture</h1>
              <p className="overview-subtitle">
                A single-tenant, hardware-aware computational matrix. Epinoia Horizon operates with zero external telemetry egress, cryptographic state validation, and autonomous multi-agent coordination.
              </p>
            </div>

            {/* FLEET MATRIX CARDS */}
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#FFFFFF' }}>Proprietary Engine Matrix</h2>
            <div className="matrix-grid">
              {Object.values(FLEET_MODELS).map(m => (
                <div key={m.id} className="matrix-card">
                  <div className="matrix-card-top">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {React.createElement(m.icon, { size: 20, color: '#FFFFFF' })}
                      <div className="matrix-name">{m.name}</div>
                    </div>
                    <span className="matrix-tag">{m.tag}</span>
                  </div>

                  <p className="matrix-desc">{m.role}</p>

                  <div className="matrix-specs">
                    <div className="spec-item">
                      <span>TTFT Latency</span>
                      <span className="spec-val">{m.latency}</span>
                    </div>
                    <div className="spec-item">
                      <span>Context Window</span>
                      <span className="spec-val">{m.context}</span>
                    </div>
                    <div className="spec-item">
                      <span>Kernel Target</span>
                      <span className="spec-val">{m.arch}</span>
                    </div>
                  </div>

                  <button
                    className="btn-new-chat"
                    style={{ marginTop: 'auto', padding: '9px 12px', fontSize: 12, justifyContent: 'center' }}
                    onClick={() => {
                      setSelectedModel(m.id);
                      setCurrentView('chat');
                    }}
                  >
                    Launch in Chat Workspace →
                  </button>
                </div>
              ))}
            </div>

            {/* SECURITY PILLARS */}
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#FFFFFF' }}>Sovereign Security Invariants</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div className="matrix-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600, color: '#FFFFFF' }}>
                  <Icons.Lock size={18} />
                  <span>Zero-Telemetry Isolation Guarantee</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Model execution never emits prompt vectors, telemetry traces, or activations to third-party endpoints. Invariant verified at kernel runtime.
                </p>
              </div>

              <div className="matrix-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600, color: '#FFFFFF' }}>
                  <Icons.Activity size={18} />
                  <span>Cryptographic Append-Only Ledger</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Every multi-agent dispatch creates an immutable hash signature, preventing prompt injection or state drift across long horizons.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* --- TELEMETRY PARAMETERS DRAWER --- */}
        {telemetryOpen && (
          <>
            <div className="drawer-overlay" onClick={() => setTelemetryOpen(false)} />
            <div className="telemetry-drawer">
              <div className="drawer-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600, color: '#FFFFFF', fontSize: 14 }}>
                  <Icons.Sliders size={18} color="#FFFFFF" />
                  <span>Fleet Shard Telemetry</span>
                </div>
                <button className="btn-icon-ghost" onClick={() => setTelemetryOpen(false)}>
                  <Icons.X size={18} />
                </button>
              </div>

              <div className="metric-card">
                <div className="metric-title">Active VPC Node Shard</div>
                <div className="metric-val" style={{ fontSize: 16 }}>us-east-sovereign-01</div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 4 }}>Air-Gapped Private Cluster</div>
              </div>

              <div className="metric-card">
                <div className="metric-title">KV-Cache Recurrence Load</div>
                <div className="metric-val">41.8%</div>
                <div className="bar-wrap">
                  <div className="bar-fill" style={{ width: '41.8%' }} />
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-title">Streaming Velocity</div>
                <div className="metric-val">142.6 tok/s</div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 4 }}>Fused Parallel Associative Scan</div>
              </div>

              <div className="metric-card">
                <div className="metric-title">Memory Allocation</div>
                <div className="metric-val" style={{ fontSize: 16 }}>4.8 GB / 24.0 GB</div>
                <div className="bar-wrap">
                  <div className="bar-fill" style={{ width: '20%' }} />
                </div>
              </div>

              <button className="btn-new-chat" style={{ marginTop: 'auto', justifyContent: 'center' }} onClick={() => setTelemetryOpen(false)}>
                Save Parameter State
              </button>
            </div>
          </>
        )}

        {/* --- ENTERPRISE CLEARANCE MODAL --- */}
        {clearanceModalOpen && (
          <div className="modal-wrap" onClick={() => setClearanceModalOpen(false)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <Icons.Shield size={22} color="#FFFFFF" />
                <h2 style={{ fontSize: 18, fontWeight: 600, color: '#FFFFFF' }}>Enterprise Clearance Level</h2>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Enter your cryptographic token to modify permission ceilings and kernel bypass access.
              </p>

              <input
                className="modal-input"
                value={clearanceKey}
                onChange={e => setClearanceKey(e.target.value)}
                placeholder="EPI-SOV-XXXX-XXXX"
              />

              <div style={{ display: 'grid', gap: 8, marginBottom: 20 }}>
                {['Tier-0 Sovereign', 'Tier-1 Operator', 'Tier-2 Guest'].map(lvl => (
                  <div
                    key={lvl}
                    onClick={() => setClearanceLevel(lvl)}
                    style={{
                      padding: '10px 14px',
                      background: clearanceLevel === lvl ? 'var(--bg-elevated)' : 'transparent',
                      border: `1px solid ${clearanceLevel === lvl ? 'var(--border-focus)' : 'var(--border-subtle)'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: 13,
                      fontWeight: 500,
                      color: clearanceLevel === lvl ? '#FFFFFF' : 'var(--text-muted)'
                    }}
                  >
                    <span>{lvl}</span>
                    {clearanceLevel === lvl && <Icons.Check size={14} color="#FFFFFF" />}
                  </div>
                ))}
              </div>

              <button
                className="btn-new-chat"
                style={{ justifyContent: 'center', background: '#FFFFFF', color: '#131314', fontWeight: 600 }}
                onClick={() => setClearanceModalOpen(false)}
              >
                Authenticate &amp; Lock Clearance
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
