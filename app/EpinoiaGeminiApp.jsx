import React, { useState, useEffect, useRef } from 'react';

// ============================================================================
// EPINOIA HORIZON · MERLIN ARCANE FLEET
// Authentic Epinoia Horizon Design System: Obsidian Void, Runic Gold & Cyan
// Gemini Architecture + Tier-0 Sovereign Governance
// ============================================================================

const Icons = {
  Eye: ({ size = 18, color = "#facc15" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" fill={color} fillOpacity="0.25" />
      <circle cx="12" cy="12" r="1.2" fill={color} />
    </svg>
  ),
  Spark: ({ size = 18, color = "#facc15" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" opacity="0.3" />
      <path d="m12 3 2.8 6.2L21 12l-6.2 2.8L12 21l-2.8-6.2L3 12l6.2-2.8z" fill={color} fillOpacity="0.2" />
    </svg>
  ),
  Merlin: ({ size = 18, color = "#facc15" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" fill={color} fillOpacity="0.1" />
      <line x1="12" y1="22" x2="12" y2="12" />
      <polyline points="2 8.5 12 12 22 8.5" />
      <circle cx="12" cy="12" r="2.5" fill={color} />
    </svg>
  ),
  Codex: ({ size = 18, color = "#22d3ee" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="10" y1="20" x2="14" y2="4" />
    </svg>
  ),
  Jie: ({ size = 18, color = "#a78bfa" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill={color} fillOpacity="0.2" />
    </svg>
  ),
  Menu: ({ size = 18, color = "#fde68a" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  Plus: ({ size = 16, color = "#facc15" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Search: ({ size = 16, color = "#a0aec0" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Globe: ({ size = 16, color = "#22d3ee" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Mic: ({ size = 16, color = "#facc15" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  ),
  ArrowUp: ({ size = 16, color = "#030208" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  ),
  Paperclip: ({ size = 16, color = "#a0aec0" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l7.88-7.88" />
    </svg>
  ),
  ChevronDown: ({ size = 14, color = "#fde68a" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  ChevronRight: ({ size = 14, color = "#fde68a" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Sliders: ({ size = 16, color = "#facc15" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  ),
  Shield: ({ size = 16, color = "#facc15" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={color} fillOpacity="0.15" />
    </svg>
  ),
  Copy: ({ size = 14, color = "#fde68a" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  Check: ({ size = 14, color = "#22d3ee" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Brain: ({ size = 16, color = "#22d3ee" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z" />
    </svg>
  ),
  Activity: ({ size = 16, color = "#22d3ee" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  Layers: ({ size = 16, color = "#facc15" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  X: ({ size = 16, color = "#a0aec0" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Trash: ({ size = 14, color = "#64748b" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  Lock: ({ size = 14, color = "#facc15" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill={color} fillOpacity="0.1" />
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
    color: '#facc15',
    accent: 'rgba(250, 204, 21, 0.15)',
    border: 'rgba(250, 204, 21, 0.45)'
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
    color: '#22d3ee',
    accent: 'rgba(34, 211, 238, 0.15)',
    border: 'rgba(34, 211, 238, 0.45)'
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
    color: '#a78bfa',
    accent: 'rgba(167, 139, 250, 0.15)',
    border: 'rgba(167, 139, 250, 0.45)'
  }
};

// --- INITIAL ARCANE STARTER PROMPTS ---
const STARTER_PROMPTS = [
  {
    title: "Audit Tier-3 Cognitive Pulse",
    desc: "Target input-dependent selectivity gates (Δ, B, C) in sovereign SSM architecture.",
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
    desc: "Trace token velocity, recurrence load, and active VPC node status.",
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
  const [currentView, setCurrentView] = useState('chat'); // 'chat' | 'overview'
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedModel, setSelectedModel] = useState('merlin');
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);

  // Thinking Features
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
  const canvasRef = useRef(null);

  // Background Starfield Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      velocity: (Math.random() * 0.2 + 0.05) * (Math.random() > 0.5 ? 1 : -1)
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(s => {
        s.alpha += s.velocity * 0.02;
        if (s.alpha > 0.9 || s.alpha < 0.15) s.velocity = -s.velocity;
        ctx.fillStyle = `rgba(254, 240, 138, ${Math.max(0.1, Math.min(0.9, s.alpha))})`;
        ctx.fillRect(s.x, s.y, s.size, s.size);
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

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

Recurrence Invariant:
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

  const activeConversation = conversations.find(c => c.id === activeConvId) || conversations[0];

  const handleInputChange = (e) => {
    setInputPrompt(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  };

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

  const toggleThought = (msgId) => {
    setExpandedThoughts(prev => ({
      ...prev,
      [msgId]: !prev[msgId]
    }));
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Markdown renderer
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
              <span className="code-lang-tag">{part.lang}</span>
              <button className="btn-copy-code" onClick={() => handleCopy(codeKey, part.code)}>
                {copiedId === codeKey ? <Icons.Check size={13} color="#22d3ee" /> : <Icons.Copy size={13} />}
                <span>{copiedId === codeKey ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="code-pre"><code>{part.code}</code></pre>
          </div>
        );
      }

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
      {/* Background Starfield & Glow */}
      <canvas ref={canvasRef} id="bg-canvas" />
      <div className="bg-glow" />

      <style>{`
        /* ====================================================================
           EPINOIA HORIZON DESIGN TOKENS (Imported from docs.css & pricing)
           ==================================================================== */
        :root {
          --bg: #030208;
          --panel: rgba(10, 7, 24, 0.86);
          --panel-2: rgba(4, 3, 10, 0.78);
          --panel-elevated: rgba(18, 12, 38, 0.92);
          --line: rgba(234, 179, 8, 0.22);
          --line-2: rgba(234, 179, 8, 0.42);
          --line-c: rgba(34, 211, 238, 0.32);
          --gold: #facc15;
          --gold-2: #eab308;
          --gold-soft: #fde68a;
          --cyan: #22d3ee;
          --cyan-soft: #a5f3fc;
          --purple: #a78bfa;
          --text: #e2e8f0;
          --muted: #a0aec0;
          --dim: #64748b;
          --radius-pill: 999px;
          --radius-card: 16px;
          --radius-sm: 8px;
          --font-display: 'Cinzel Decorative', serif;
          --font-heading: 'Cinzel', serif;
          --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body, html {
          background-color: var(--bg);
          color: var(--text);
          font-family: var(--font-sans);
          height: 100%;
          overflow: hidden;
          -webkit-font-smoothing: antialiased;
        }

        #bg-canvas {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .bg-glow {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(55% 45% at 12% 0%, rgba(139, 92, 246, 0.16), transparent 70%),
            radial-gradient(45% 40% at 92% 100%, rgba(6, 182, 212, 0.12), transparent 70%),
            radial-gradient(35% 35% at 50% 50%, rgba(234, 179, 8, 0.04), transparent 80%);
        }

        .epi-app-root {
          display: flex;
          height: 100vh;
          width: 100vw;
          background-color: var(--bg);
          color: var(--text);
          overflow: hidden;
          position: relative;
          z-index: 1;
        }

        /* --- SIDEBAR (ARCANE SANCTUM DRAWER) --- */
        .epi-sidebar {
          width: 290px;
          min-width: 290px;
          background-color: var(--panel);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          border-right: 1px solid var(--line);
          transition: margin-left 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 40;
        }

        .epi-sidebar.collapsed {
          margin-left: -290px;
        }

        .sidebar-header {
          padding: 18px 20px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(234, 179, 8, 0.1);
        }

        .brand-cluster {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .brand-icon {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          display: grid;
          place-items: center;
          background: rgba(17, 12, 36, 0.95);
          border: 1px solid rgba(234, 179, 8, 0.5);
          color: var(--gold);
          box-shadow: 0 0 16px rgba(234, 179, 8, 0.25);
        }

        .brand-title {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--gold-soft);
          text-shadow: 0 0 14px rgba(234, 179, 8, 0.4);
          line-height: 1.1;
        }

        .brand-sub {
          font-size: 9.5px;
          font-family: var(--font-mono);
          color: var(--cyan);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-top: 3px;
        }

        .btn-icon-ghost {
          background: transparent;
          border: none;
          color: var(--gold-soft);
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-icon-ghost:hover {
          background: rgba(234, 179, 8, 0.12);
          color: #fff;
          box-shadow: 0 0 12px rgba(234, 179, 8, 0.2);
        }

        .sidebar-new-chat-wrap {
          padding: 16px;
        }

        .btn-new-chat {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 16px;
          background: rgba(234, 179, 8, 0.07);
          border: 1px solid var(--line-2);
          border-radius: var(--radius-pill);
          color: var(--gold-soft);
          font-family: var(--font-heading);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 0 15px rgba(234, 179, 8, 0.08);
        }

        .btn-new-chat:hover {
          background: rgba(234, 179, 8, 0.18);
          border-color: var(--gold);
          color: #fff;
          box-shadow: 0 0 20px rgba(234, 179, 8, 0.25);
          transform: translateY(-1px);
        }

        .sidebar-section-title {
          font-family: var(--font-heading);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--dim);
          padding: 10px 20px 6px;
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
          color: var(--muted);
          cursor: pointer;
          margin-bottom: 3px;
          border: 1px solid transparent;
          transition: all 0.18s ease;
        }

        .sidebar-history-item:hover {
          background: rgba(234, 179, 8, 0.06);
          color: var(--text);
          border-color: rgba(234, 179, 8, 0.15);
        }

        .sidebar-history-item.active {
          background: rgba(234, 179, 8, 0.12);
          color: var(--gold-soft);
          border-color: var(--line);
          font-weight: 500;
          box-shadow: inset 0 0 12px rgba(234, 179, 8, 0.1);
        }

        .sidebar-bottom {
          padding: 14px 16px;
          border-top: 1px solid var(--line);
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: rgba(6, 4, 14, 0.6);
        }

        .clearance-pill {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: rgba(234, 179, 8, 0.06);
          border: 1px solid var(--line);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .clearance-pill:hover {
          border-color: var(--gold);
          box-shadow: 0 0 15px rgba(234, 179, 8, 0.15);
        }

        /* --- MAIN WORKSPACE AREA --- */
        .epi-workspace {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: hidden;
          background: transparent;
          position: relative;
        }

        /* --- TOP NAV HEADER (EPINOIA SANCTUM BAR) --- */
        .workspace-header {
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          border-bottom: 1px solid var(--line);
          background: rgba(3, 2, 8, 0.88);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
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
          gap: 9px;
          padding: 7px 16px;
          background: rgba(14, 10, 32, 0.8);
          border: 1px solid var(--line-2);
          border-radius: var(--radius-pill);
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 700;
          color: var(--gold-soft);
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 0 16px rgba(234, 179, 8, 0.12);
        }

        .model-selector-pill:hover {
          background: rgba(234, 179, 8, 0.14);
          border-color: var(--gold);
          box-shadow: 0 0 22px rgba(234, 179, 8, 0.25);
        }

        /* --- DUAL-VIEW SEGMENTED TOGGLE (EPINOIA SANCTUM PILL) --- */
        .view-segmented-wrap {
          display: flex;
          align-items: center;
          background: rgba(8, 6, 20, 0.85);
          border: 1px solid var(--line);
          border-radius: var(--radius-pill);
          padding: 4px;
          box-shadow: 0 0 20px rgba(0,0,0,0.4);
        }

        .view-btn {
          padding: 7px 18px;
          font-family: var(--font-heading);
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border-radius: var(--radius-pill);
          border: none;
          background: transparent;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .view-btn.active {
          background: linear-gradient(135deg, rgba(234, 179, 8, 0.25), rgba(202, 138, 4, 0.35));
          color: #fff;
          border: 1px solid var(--line-2);
          box-shadow: 0 0 18px rgba(234, 179, 8, 0.25);
          text-shadow: 0 0 10px rgba(234, 179, 8, 0.5);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .nav-link {
          font-family: var(--font-heading);
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #cbd5e1;
          transition: color 0.2s ease;
          text-decoration: none;
        }

        .nav-link:hover {
          color: var(--gold);
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
          max-width: 880px;
          width: 100%;
          margin: 0 auto;
          padding: 28px 24px 190px;
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
          padding: 36px 0 24px;
          text-align: center;
        }

        .hero-glyph {
          width: 58px;
          height: 58px;
          border-radius: 14px;
          background: rgba(17, 12, 36, 0.95);
          border: 1px solid var(--line-2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 22px;
          box-shadow: 0 0 30px rgba(234, 179, 8, 0.35);
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(26px, 4vw, 36px);
          font-weight: 900;
          color: var(--gold);
          letter-spacing: 0.04em;
          margin-bottom: 10px;
          text-shadow: 0 0 24px rgba(234, 179, 8, 0.45);
          background: linear-gradient(92deg, #fef3c7 0%, #facc15 45%, #eab308 70%, #c4b5fd 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 14.5px;
          color: var(--muted);
          max-width: 580px;
          line-height: 1.6;
        }

        .starter-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          margin-top: 32px;
        }

        .starter-card {
          padding: 18px 20px;
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: var(--radius-card);
          cursor: pointer;
          transition: all 0.25s ease;
          text-align: left;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
          position: relative;
          overflow: hidden;
        }

        .starter-card:hover {
          background: rgba(20, 14, 42, 0.9);
          border-color: var(--gold);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(234, 179, 8, 0.2);
        }

        .starter-card-title {
          font-family: var(--font-heading);
          font-size: 14px;
          font-weight: 700;
          color: var(--gold-soft);
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .starter-card-desc {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.45;
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
          background: rgba(22, 15, 48, 0.88);
          border: 1px solid var(--line-2);
          padding: 14px 20px;
          border-radius: 18px 18px 4px 18px;
          font-size: 14px;
          line-height: 1.6;
          color: #f8fafc;
          box-shadow: 0 4px 24px rgba(0,0,0,0.4), 0 0 15px rgba(139, 92, 246, 0.15);
        }

        .assistant-msg-block {
          display: flex;
          gap: 16px;
          width: 100%;
        }

        .assistant-avatar {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(17, 12, 36, 0.95);
          border: 1px solid var(--line);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 4px;
          box-shadow: 0 0 16px rgba(234, 179, 8, 0.2);
        }

        .assistant-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
          overflow: hidden;
        }

        .assistant-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          color: var(--dim);
        }

        .assistant-model-tag {
          font-family: var(--font-heading);
          font-weight: 700;
          color: var(--gold-soft);
          letter-spacing: 0.05em;
        }

        /* --- GEMINI THINKING ACCORDION (EPINOIA COGNITIVE PULSE) --- */
        .thought-accordion {
          background: rgba(10, 7, 24, 0.65);
          border: 1px solid rgba(34, 211, 238, 0.25);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.2s ease;
          box-shadow: 0 0 15px rgba(34, 211, 238, 0.06);
        }

        .thought-accordion:hover {
          border-color: var(--cyan);
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.15);
        }

        .thought-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          cursor: pointer;
          user-select: none;
        }

        .thought-title-group {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          font-family: var(--font-mono);
          color: var(--cyan-soft);
        }

        .thought-timing-pill {
          padding: 2px 8px;
          background: rgba(34, 211, 238, 0.1);
          border: 1px solid rgba(34, 211, 238, 0.3);
          border-radius: var(--radius-pill);
          font-size: 10.5px;
          color: var(--cyan);
        }

        .thought-body {
          padding: 10px 16px 14px;
          border-top: 1px solid rgba(34, 211, 238, 0.15);
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: rgba(4, 3, 10, 0.4);
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
          background: var(--cyan);
          box-shadow: 0 0 8px var(--cyan);
          margin-top: 6px;
          flex-shrink: 0;
        }

        .step-name {
          font-weight: 600;
          color: #f1f5f9;
          font-family: var(--font-mono);
          font-size: 11.5px;
        }

        .step-time {
          color: var(--dim);
          font-size: 11px;
          margin-left: 6px;
        }

        .step-detail {
          color: var(--muted);
          margin-top: 2px;
        }

        /* --- RESPONSE MARKDOWN & ARCANE TERMINAL BLOCKS --- */
        .text-paragraphs-group {
          font-size: 14.5px;
          line-height: 1.7;
          color: #e2e8f0;
        }

        .md-h3 {
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 700;
          color: var(--gold-soft);
          margin: 18px 0 8px;
          letter-spacing: 0.04em;
          text-shadow: 0 0 10px rgba(234, 179, 8, 0.3);
        }

        .md-h2 {
          font-family: var(--font-display);
          font-size: 19px;
          font-weight: 700;
          color: var(--gold);
          margin: 22px 0 10px;
          text-shadow: 0 0 16px rgba(234, 179, 8, 0.4);
        }

        .md-p {
          margin-bottom: 12px;
        }

        .code-block-wrap {
          margin: 16px 0;
          background: rgba(4, 3, 10, 0.95);
          border: 1px solid var(--line-2);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0,0,0,0.7);
        }

        .code-block-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 16px;
          background: rgba(14, 10, 32, 0.85);
          border-bottom: 1px solid var(--line);
        }

        .code-lang-tag {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--gold-soft);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .btn-copy-code {
          background: transparent;
          border: none;
          color: var(--gold-soft);
          font-family: var(--font-mono);
          font-size: 11px;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: color 0.18s ease;
        }

        .btn-copy-code:hover {
          color: #fff;
        }

        .code-pre {
          padding: 16px 18px;
          font-family: var(--font-mono);
          font-size: 12.5px;
          line-height: 1.55;
          color: #cbd5e1;
          overflow-x: auto;
          white-space: pre;
        }

        .msg-action-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 6px;
        }

        /* --- FLOATING GEMINI PROMPT PILL (EPINOIA SANCTUM STYLING) --- */
        .prompt-floating-container {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 40px);
          max-width: 840px;
          z-index: 25;
        }

        .prompt-pill-card {
          background: rgba(10, 7, 24, 0.92);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid var(--line-2);
          border-radius: 28px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.8), 0 0 25px rgba(234, 179, 8, 0.12);
          padding: 12px 18px 10px 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: all 0.25s ease;
        }

        .prompt-pill-card:focus-within {
          border-color: var(--gold);
          box-shadow: 0 12px 48px rgba(0,0,0,0.9), 0 0 35px rgba(234, 179, 8, 0.25);
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
          color: #f8fafc;
          font-family: var(--font-sans);
          font-size: 14.5px;
          line-height: 1.5;
          resize: none;
        }

        .prompt-textarea::placeholder {
          color: rgba(254, 240, 138, 0.4);
          font-family: var(--font-heading);
          font-size: 13.5px;
          letter-spacing: 0.05em;
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
          gap: 8px;
        }

        .tool-badge-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(234, 179, 8, 0.07);
          border: 1px solid var(--line);
          border-radius: var(--radius-pill);
          font-family: var(--font-heading);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: var(--gold-soft);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tool-badge-btn:hover {
          color: #fff;
          border-color: var(--gold);
          background: rgba(234, 179, 8, 0.16);
          box-shadow: 0 0 12px rgba(234, 179, 8, 0.2);
        }

        .tool-badge-btn.active {
          background: linear-gradient(135deg, rgba(34, 211, 238, 0.25), rgba(6, 182, 212, 0.35));
          border-color: var(--cyan);
          color: #fff;
          box-shadow: 0 0 16px rgba(34, 211, 238, 0.3);
        }

        .btn-send-pill {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #facc15, #ca8a04);
          color: #030208;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 0 18px rgba(234, 179, 8, 0.4);
        }

        .btn-send-pill:disabled {
          background: rgba(234, 179, 8, 0.15);
          color: var(--dim);
          cursor: not-allowed;
          box-shadow: none;
          opacity: 0.5;
        }

        .btn-send-pill:not(:disabled):hover {
          transform: scale(1.06);
          box-shadow: 0 0 25px rgba(234, 179, 8, 0.6);
        }

        .prompt-disclaimer {
          text-align: center;
          font-size: 11px;
          font-family: var(--font-mono);
          color: var(--dim);
          margin-top: 8px;
        }

        /* --- ENTERPRISE OVERVIEW EDITORIAL PAGE --- */
        .overview-container {
          flex: 1;
          overflow-y: auto;
          padding: 36px 40px 100px;
          max-width: 1180px;
          margin: 0 auto;
          width: 100%;
        }

        .overview-hero {
          border-bottom: 1px solid var(--line);
          padding-bottom: 28px;
          margin-bottom: 40px;
        }

        .overview-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 14px;
          background: rgba(234, 179, 8, 0.08);
          border: 1px solid var(--line-2);
          border-radius: var(--radius-pill);
          font-size: 11px;
          font-family: var(--font-mono);
          color: var(--gold-soft);
          margin-bottom: 18px;
          box-shadow: 0 0 14px rgba(234, 179, 8, 0.15);
        }

        .overview-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 4.5vw, 42px);
          font-weight: 900;
          color: var(--gold);
          letter-spacing: 0.04em;
          margin-bottom: 12px;
          text-shadow: 0 0 24px rgba(234, 179, 8, 0.45);
          background: linear-gradient(92deg, #fef3c7 0%, #facc15 45%, #eab308 70%, #c4b5fd 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .overview-subtitle {
          font-size: 15.5px;
          color: var(--muted);
          line-height: 1.65;
          max-width: 780px;
        }

        .matrix-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          margin-bottom: 44px;
        }

        .matrix-card {
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: var(--radius-card);
          padding: 26px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.6);
          transition: all 0.25s ease;
        }

        .matrix-card:hover {
          border-color: var(--gold);
          box-shadow: 0 12px 36px rgba(234, 179, 8, 0.2);
          transform: translateY(-2px);
        }

        .matrix-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .matrix-name {
          font-family: var(--font-heading);
          font-size: 19px;
          font-weight: 700;
          color: var(--gold-soft);
          letter-spacing: 0.04em;
        }

        .matrix-tag {
          font-size: 10.5px;
          font-family: var(--font-mono);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          background: rgba(234, 179, 8, 0.1);
          color: var(--gold-soft);
          border: 1px solid var(--line);
        }

        .matrix-desc {
          font-size: 13.5px;
          color: var(--muted);
          line-height: 1.55;
        }

        .matrix-specs {
          border-top: 1px solid var(--line);
          padding-top: 16px;
          display: grid;
          gap: 10px;
          font-size: 12px;
          font-family: var(--font-mono);
        }

        .spec-item {
          display: flex;
          justify-content: space-between;
          color: var(--dim);
        }

        .spec-val {
          color: #f1f5f9;
        }

        /* --- TELEMETRY DRAWER (SLIDE-OVER) --- */
        .drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(3, 2, 8, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 50;
        }

        .telemetry-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 400px;
          background: rgba(10, 7, 24, 0.95);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-left: 1px solid var(--line-2);
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          z-index: 55;
          box-shadow: -15px 0 45px rgba(0,0,0,0.9), 0 0 30px rgba(234, 179, 8, 0.15);
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
          border-bottom: 1px solid var(--line);
          padding-bottom: 16px;
        }

        .metric-card {
          background: rgba(18, 12, 38, 0.85);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 4px 18px rgba(0,0,0,0.4);
        }

        .metric-title {
          font-size: 11px;
          font-family: var(--font-mono);
          color: var(--gold-soft);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 6px;
        }

        .metric-val {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          font-family: var(--font-mono);
          text-shadow: 0 0 12px rgba(234, 179, 8, 0.3);
        }

        .bar-wrap {
          height: 7px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-pill);
          overflow: hidden;
          margin-top: 12px;
        }

        .bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--cyan), var(--gold));
          border-radius: var(--radius-pill);
          box-shadow: 0 0 10px var(--gold);
        }

        /* --- CLEARANCE MODAL --- */
        .modal-wrap {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(3, 2, 8, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 60;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .modal-box {
          width: 460px;
          background: rgba(14, 10, 32, 0.96);
          border: 1px solid var(--line-2);
          border-radius: var(--radius-card);
          padding: 32px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.95), 0 0 35px rgba(234, 179, 8, 0.2);
        }

        .modal-input {
          width: 100%;
          padding: 12px 16px;
          background: rgba(4, 3, 10, 0.9);
          border: 1px solid var(--line);
          border-radius: var(--radius-sm);
          color: var(--gold-soft);
          font-family: var(--font-mono);
          font-size: 13.5px;
          margin: 16px 0 22px;
          outline: none;
        }

        .modal-input:focus {
          border-color: var(--gold);
          box-shadow: 0 0 15px rgba(234, 179, 8, 0.25);
        }

        @media (max-width: 960px) {
          .nav-links {
            display: none;
          }
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
          <a href="/" className="brand-cluster">
            <div className="brand-icon">
              <Icons.Eye size={20} color="#facc15" />
            </div>
            <div>
              <div className="brand-title">Epinoia</div>
              <div className="brand-sub">Merlin Arcane Fleet</div>
            </div>
          </a>
          <button className="btn-icon-ghost" onClick={() => setSidebarOpen(false)} title="Close Sidebar">
            <Icons.Menu size={18} />
          </button>
        </div>

        <div className="sidebar-new-chat-wrap">
          <button className="btn-new-chat" onClick={handleNewChat}>
            <Icons.Plus size={16} />
            <span>New Spell Session</span>
          </button>
        </div>

        <div className="sidebar-section-title">Active Journals</div>
        <div className="sidebar-history-list">
          {conversations.map(conv => (
            <div
              key={conv.id}
              className={`sidebar-history-item ${activeConvId === conv.id ? 'active' : ''}`}
              onClick={() => { setActiveConvId(conv.id); setCurrentView('chat'); }}
            >
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
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
              <Icons.Shield size={18} color="#facc15" />
              <div>
                <div style={{ fontSize: '10px', color: 'var(--dim)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Sanctum Clearance</div>
                <div style={{ fontSize: '12.5px', color: 'var(--gold-soft)', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>{clearanceLevel}</div>
              </div>
            </div>
            <Icons.ChevronRight size={14} />
          </div>

          <button className="btn-new-chat" style={{ padding: '9px 14px', fontSize: '11px', justifyContent: 'center' }} onClick={() => setTelemetryOpen(true)}>
            <Icons.Sliders size={15} />
            <span>Shard Telemetry HUD</span>
          </button>
        </div>
      </aside>

      {/* --- WORKSPACE CORE --- */}
      <main className="epi-workspace">
        {/* TOP NAV HEADER */}
        <header className="workspace-header">
          <div className="header-left">
            {!sidebarOpen && (
              <button className="btn-icon-ghost" onClick={() => setSidebarOpen(true)} title="Expand Sidebar">
                <Icons.Menu size={20} />
              </button>
            )}

            {/* MODEL SELECTOR DROPDOWN */}
            <div style={{ position: 'relative' }}>
              <button className="model-selector-pill" onClick={() => setModelDropdownOpen(!modelDropdownOpen)}>
                {React.createElement(FLEET_MODELS[selectedModel].icon, { size: 16, color: FLEET_MODELS[selectedModel].color })}
                <span>{FLEET_MODELS[selectedModel].name}</span>
                <span style={{ fontSize: 10.5, color: 'var(--dim)', fontFamily: 'var(--font-mono)' }}>
                  {FLEET_MODELS[selectedModel].tag}
                </span>
                <Icons.ChevronDown size={14} />
              </button>

              {modelDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '120%',
                  left: 0,
                  width: '330px',
                  background: 'var(--panel)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--line-2)',
                  borderRadius: '14px',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.9), 0 0 25px rgba(234, 179, 8, 0.2)',
                  padding: '10px',
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
                        padding: '10px 14px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        background: selectedModel === m.id ? m.accent : 'transparent',
                        border: `1px solid ${selectedModel === m.id ? m.border : 'transparent'}`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        marginBottom: 4,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontWeight: 700, fontSize: 13.5, color: m.color, fontFamily: 'var(--font-heading)' }}>
                          {React.createElement(m.icon, { size: 16, color: m.color })}
                          {m.name}
                        </div>
                        <span style={{ fontSize: 11, color: 'var(--dim)', fontFamily: 'var(--font-mono)' }}>{m.latency}</span>
                      </div>
                      <div style={{ fontSize: 11.5, color: 'var(--muted)', lineHeight: 1.4 }}>{m.role}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* DUAL-VIEW SEGMENTED TOGGLE */}
          <div className="view-segmented-wrap">
            <button
              className={`view-btn ${currentView === 'chat' ? 'active' : ''}`}
              onClick={() => setCurrentView('chat')}
            >
              <Icons.Spark size={14} color="#facc15" />
              <span>Arcane Workspace</span>
            </button>
            <button
              className={`view-btn ${currentView === 'overview' ? 'active' : ''}`}
              onClick={() => setCurrentView('overview')}
            >
              <Icons.Layers size={14} color="#22d3ee" />
              <span>Fleet Matrix</span>
            </button>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="header-right">
            <div className="nav-links">
              <a href="/docs/" className="nav-link">Docs</a>
              <a href="/pricing/" className="nav-link">Pricing</a>
              <a href="/store/" className="nav-link" style={{ color: 'var(--gold)' }}>💎 Store</a>
            </div>

            <button className="btn-icon-ghost" onClick={() => setTelemetryOpen(true)} title="Fleet Parameters">
              <Icons.Activity size={18} color="#22d3ee" />
            </button>

            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(234, 179, 8, 0.1)', border: '1px solid var(--line-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11.5, fontWeight: 700, color: 'var(--gold-soft)', fontFamily: 'var(--font-mono)', boxShadow: '0 0 12px rgba(234, 179, 8, 0.2)' }}>
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
                      <Icons.Eye size={28} color="#facc15" />
                    </div>
                    <h1 className="hero-title">Epinoia Sovereign Sanctum</h1>
                    <p className="hero-subtitle">
                      Invoke Tier-0 Governor <b>Merlin</b> for deep strategic cognition, <b>Nxelle Codex</b> for shader geometry, and <b>Jie</b> for sub-millisecond telemetry routing.
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
                            <Icons.ChevronRight size={14} color="#facc15" />
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
                            {React.createElement(FLEET_MODELS[msg.model || 'merlin'].icon, { size: 18, color: FLEET_MODELS[msg.model || 'merlin'].color })}
                          </div>
                          <div className="assistant-body">
                            <div className="assistant-meta">
                              <span className="assistant-model-tag">{FLEET_MODELS[msg.model || 'merlin'].name}</span>
                              <span>•</span>
                              <span>{msg.timestamp}</span>
                              <span>•</span>
                              <span style={{ fontFamily: 'var(--font-mono)' }}>{FLEET_MODELS[msg.model || 'merlin'].tag}</span>
                            </div>

                            {/* COGNITIVE PULSE THINKING ACCORDION */}
                            {msg.thought && (
                              <div className="thought-accordion">
                                <div className="thought-header" onClick={() => toggleThought(msg.id)}>
                                  <div className="thought-title-group">
                                    <Icons.Brain size={15} color="#22d3ee" />
                                    <span>Cognitive Pulse for {msg.thought.duration}</span>
                                    <span className="thought-timing-pill">{msg.thought.steps.length} Arcane Gates</span>
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

                            {/* FORMATTED MARKDOWN CONTENT */}
                            {renderFormattedMessage(msg.content, msg.id)}

                            {/* ACTION BAR */}
                            <div className="msg-action-bar">
                              <button className="btn-icon-ghost" style={{ width: 28, height: 28 }} onClick={() => handleCopy(msg.id, msg.content)} title="Copy response">
                                {copiedId === msg.id ? <Icons.Check size={14} color="#22d3ee" /> : <Icons.Copy size={14} />}
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

            {/* FLOATING PROMPT PILL (EPINOIA SANCTUM STYLING) */}
            <div className="prompt-floating-container">
              <div className="prompt-pill-card">
                <div className="prompt-upper-row">
                  <textarea
                    ref={textareaRef}
                    className="prompt-textarea"
                    placeholder={`Inscribe instruction to ${FLEET_MODELS[selectedModel].name}...`}
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
                    <button
                      className="tool-badge-btn"
                      onClick={() => {
                        const fakeName = `ast_manifest_${Date.now().toString().slice(-4)}.spells`;
                        setAttachedFiles([...attachedFiles, { name: fakeName, size: '24 KB' }]);
                      }}
                      title="Attach Arcane AST"
                    >
                      <Icons.Paperclip size={14} />
                      {attachedFiles.length > 0 && <span>{attachedFiles.length}</span>}
                    </button>

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
                        <span style={{ textTransform: 'capitalize' }}>Cognitive: {thinkingBudget}</span>
                        <Icons.ChevronDown size={11} />
                      </button>

                      {thinkingPopoverOpen && (
                        <div style={{
                          position: 'absolute',
                          bottom: '120%',
                          left: 0,
                          width: '230px',
                          background: 'rgba(14, 10, 32, 0.98)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid var(--line-2)',
                          borderRadius: '12px',
                          padding: '8px',
                          boxShadow: '0 12px 36px rgba(0,0,0,0.95), 0 0 20px rgba(234, 179, 8, 0.2)',
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
                                padding: '8px 12px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                background: thinkingBudget === t.key ? 'rgba(234, 179, 8, 0.15)' : 'transparent',
                                border: `1px solid ${thinkingBudget === t.key ? 'var(--line-2)' : 'transparent'}`,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                marginBottom: 3,
                                transition: 'all 0.18s ease'
                              }}
                            >
                              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold-soft)', fontFamily: 'var(--font-heading)' }}>{t.label}</div>
                              <div style={{ fontSize: 10.5, color: 'var(--dim)' }}>{t.desc}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      className={`tool-badge-btn ${isRecording ? 'active' : ''}`}
                      onClick={() => setIsRecording(!isRecording)}
                      title="Vocal Transcription"
                    >
                      <Icons.Mic size={14} />
                    </button>
                  </div>

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
                Epinoia Sovereign Fleet. Strict air-gap protocol active. Verify critical cryptographic AST payloads.
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW 2: ENTERPRISE OVERVIEW EDITORIAL PAGE --- */}
        {currentView === 'overview' && (
          <div className="overview-container">
            <div className="overview-hero">
              <div className="overview-badge">
                <Icons.Shield size={14} color="#facc15" />
                <span>EPI-FLEET SPECIFICATION v4.2 · AIR-GAP CERTIFIED</span>
              </div>
              <h1 className="overview-title">Enterprise Sovereign Fleet Architecture</h1>
              <p className="overview-subtitle">
                A single-tenant, hardware-aware computational matrix. Epinoia Horizon operates with zero external telemetry egress, cryptographic state validation, and autonomous multi-agent coordination.
              </p>
            </div>

            {/* FLEET MATRIX CARDS */}
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 20, color: 'var(--gold-soft)' }}>
              Proprietary Engine Matrix
            </h2>
            <div className="matrix-grid">
              {Object.values(FLEET_MODELS).map(m => (
                <div key={m.id} className="matrix-card">
                  <div className="matrix-card-top">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {React.createElement(m.icon, { size: 22, color: m.color })}
                      <div className="matrix-name">{m.name}</div>
                    </div>
                    <span className="matrix-tag">{m.tag}</span>
                  </div>

                  <p className="matrix-desc">{m.role}</p>

                  <div className="matrix-specs">
                    <div className="spec-item">
                      <span>TTFT Latency</span>
                      <span className="spec-val" style={{ color: 'var(--cyan)' }}>{m.latency}</span>
                    </div>
                    <div className="spec-item">
                      <span>Context Window</span>
                      <span className="spec-val">{m.context}</span>
                    </div>
                    <div className="spec-item">
                      <span>Kernel Target</span>
                      <span className="spec-val" style={{ color: 'var(--gold-soft)' }}>{m.arch}</span>
                    </div>
                  </div>

                  <button
                    className="btn-new-chat"
                    style={{ marginTop: 'auto', padding: '10px 14px', fontSize: '11px', justifyContent: 'center' }}
                    onClick={() => {
                      setSelectedModel(m.id);
                      setCurrentView('chat');
                    }}
                  >
                    Launch in Arcane Workspace →
                  </button>
                </div>
              ))}
            </div>

            {/* SECURITY PILLARS */}
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 20, color: 'var(--gold-soft)' }}>
              Sovereign Security Invariants
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
              <div className="matrix-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 700, color: 'var(--gold-soft)', fontFamily: 'var(--font-heading)' }}>
                  <Icons.Lock size={20} color="#facc15" />
                  <span>Zero-Telemetry Isolation Guarantee</span>
                </div>
                <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.6 }}>
                  Model execution never emits prompt vectors, telemetry traces, or activations to third-party endpoints. Invariant verified at kernel runtime.
                </p>
              </div>

              <div className="matrix-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 700, color: 'var(--cyan)', fontFamily: 'var(--font-heading)' }}>
                  <Icons.Activity size={20} color="#22d3ee" />
                  <span>Cryptographic Append-Only Ledger</span>
                </div>
                <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.6 }}>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, color: 'var(--gold-soft)', fontSize: 15, fontFamily: 'var(--font-heading)' }}>
                  <Icons.Sliders size={18} color="#facc15" />
                  <span>Fleet Shard Telemetry HUD</span>
                </div>
                <button className="btn-icon-ghost" onClick={() => setTelemetryOpen(false)}>
                  <Icons.X size={18} />
                </button>
              </div>

              <div className="metric-card">
                <div className="metric-title">Active VPC Node Shard</div>
                <div className="metric-val" style={{ fontSize: 17, color: 'var(--cyan)' }}>us-east-sovereign-01</div>
                <div style={{ fontSize: 11, color: 'var(--dim)', marginTop: 4 }}>Air-Gapped Private Cluster</div>
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
                <div style={{ fontSize: 11, color: 'var(--dim)', marginTop: 4 }}>Fused Parallel Associative Scan</div>
              </div>

              <div className="metric-card">
                <div className="metric-title">Memory Allocation</div>
                <div className="metric-val" style={{ fontSize: 17 }}>4.8 GB / 24.0 GB</div>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <Icons.Shield size={24} color="#facc15" />
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--gold)' }}>
                  Sanctum Clearance Level
                </h2>
              </div>
              <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.5 }}>
                Enter your cryptographic token to modify permission ceilings and kernel bypass access.
              </p>

              <input
                className="modal-input"
                value={clearanceKey}
                onChange={e => setClearanceKey(e.target.value)}
                placeholder="EPI-SOV-XXXX-XXXX"
              />

              <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
                {['Tier-0 Sovereign', 'Tier-1 Operator', 'Tier-2 Guest'].map(lvl => (
                  <div
                    key={lvl}
                    onClick={() => setClearanceLevel(lvl)}
                    style={{
                      padding: '12px 16px',
                      background: clearanceLevel === lvl ? 'rgba(234, 179, 8, 0.15)' : 'rgba(4, 3, 10, 0.6)',
                      border: `1px solid ${clearanceLevel === lvl ? 'var(--gold)' : 'var(--line)'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: 13.5,
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      color: clearanceLevel === lvl ? 'var(--gold-soft)' : 'var(--muted)',
                      boxShadow: clearanceLevel === lvl ? '0 0 16px rgba(234, 179, 8, 0.2)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{lvl}</span>
                    {clearanceLevel === lvl && <Icons.Check size={16} color="#facc15" />}
                  </div>
                ))}
              </div>

              <button
                className="btn-new-chat"
                style={{ justifyContent: 'center', background: 'linear-gradient(135deg, #facc15, #ca8a04)', color: '#030208', fontWeight: 700 }}
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
