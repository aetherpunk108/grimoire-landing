/* Epinoia Horizon — Store Runtime (Catalog, 3D GLB Support, Cart, Admin IndexedDB) */
(function() {
  'use strict';

  // Default Seed Catalog (4 Core Sovereign Items + Artisan Handmade Jewelry)
  const DEFAULT_PRODUCTS = [
    {
      id: 'merlin-harness',
      title: 'Merlin Sovereign High Pass',
      category: 'sovereign',
      categoryLabel: 'High Plan',
      price: 29,
      badge: 'HIGH PLAN · FULL FLEET',
      shortDesc: 'Full-tier Sanctum Workspace access unlocking Merlin (Claude Opus 5), Nxelle Codex (GLM 5.3), and Jie with 1,000 msgs/day and 10 file uploads.',
      fullDesc: 'Merlin Sovereign High Pass delivers unrestricted access to our flagship frontier engines inside the Epinoia Sanctum Workspace (/app/). Unlock Merlin on Claude Opus 5 for deep architectural synthesis, Nxelle Codex on GLM 5.3 Sovereign for surgical code generation, and Jie for rapid multi-disciplinary operations—backed by 1,000 messages per day (including 100 frontier Opus/GLM messages) and 10 document/code file attachments up to 1 MB each.',
      modelUrl: '/assets/models/wizard.glb',
      has3D: true,
      specs: {
        'Primary Personas': 'Merlin (Claude Opus 5), Nxelle Codex (GLM 5.3), Jie',
        'Daily Message Quota': '1,000 Total Msgs/Day (100 Frontier Opus 5 / GLM 5.3)',
        'File Attachments': 'Up to 10 Files per Prompt (Max 1 MB per file)',
        'Workspace Features': 'Cloud Auth, Persistent Chat History & Full Markdown HUD',
        'Billing & Activation': '$29 USD / Month (Rp 465.000) · Instant License Key'
      }
    },
    {
      id: 'scrying-orb',
      title: 'Sanctum Medium Operator Pass',
      category: 'sovereign',
      categoryLabel: 'Medium Plan',
      price: 8,
      badge: 'MEDIUM PLAN · POPULAR',
      shortDesc: 'High-speed daily driver unlocking all 3 personas (Merlin, Nxelle Codex & Jie) across high-throughput Flash engines with 300 msgs/day.',
      fullDesc: 'Designed for daily software development, research, and rapid iteration. The Sanctum Medium Operator Pass unlocks all three sovereign personas (Merlin, Nxelle Codex, and Jie) across GLM 5.3 Flash, Gemini 3.7 Flash, and DeepSeek V4.1 Flash with 300 messages per day and multi-file code/document uploads.',
      modelUrl: '/assets/models/crystal.glb',
      has3D: true,
      specs: {
        'Unlocked Personas': 'All 3 Personas (Merlin, Nxelle Codex, Jie)',
        'Neural Engines': 'GLM 5.3 Flash, Gemini 3.7 Flash & DeepSeek V4.1 Flash',
        'Daily Message Quota': '300 High-Speed Messages / Day',
        'File Attachments': 'Up to 5 Files per Prompt (Max 512 KB per file)',
        'Billing & Activation': '$8 USD / Month (Rp 129.000) · Instant License Key'
      }
    },
    {
      id: 'arcanum-sdk',
      title: 'Arcane Grimoire Developer SDK',
      category: 'sovereign',
      categoryLabel: 'SDK Suite',
      price: 39,
      badge: 'SDK & CLI SUITE',
      shortDesc: 'Complete TypeScript & Python developer kit for embedding Merlin Agent harnesses into local terminals, web apps, and CI/CD pipelines.',
      fullDesc: 'The complete programmatic developer kit for Epinoia Horizon. Provides type-safe bindings for TypeScript/Node.js and Python 3.11+. Includes pre-built streaming SSE connectors, multi-model fallback routers, custom system prompt compilers, and WebGL spatial canvas hooks.',
      modelUrl: '/assets/models/open-book.glb',
      has3D: true,
      specs: {
        'Supported Languages': 'TypeScript / Node.js 20+ & Python 3.11+',
        'Streaming & Routing': 'Native SSE Streaming + Automatic Multi-Engine Failover',
        'Graphics Hooks': 'WebGL 2.0 / Three.js Spatial Status Adapters',
        'Updates': 'Lifetime Repository Access & Version Releases',
        'License Term': '$39 USD One-Time (Rp 625.000) · Commercial Permit'
      }
    },
    {
      id: 'previs-pack',
      title: 'Previs 3D WebGL & Shader Pack',
      category: 'sovereign',
      categoryLabel: '3D Asset Suite',
      price: 19,
      badge: '3D ASSET SUITE',
      shortDesc: 'Production-ready collection of 50+ procedural PBR materials, custom GLSL shaders, and optimized GLTF/GLB 3D arcane artifacts.',
      fullDesc: 'Over 50 production-grade procedural materials, GLSL raymarching shaders, and optimized GLTF/GLB 3D geometries pre-configured for Three.js, React Three Fiber, Babylon.js, and Unreal Engine. Features custom vertex-displacement spell shaders and interactive GPU particle systems.',
      modelUrl: '/assets/models/chest.glb',
      has3D: true,
      specs: {
        'Geometries': 'Optimized Low/High Poly GLTF & GLB 3D Models',
        'Materials & Shaders': '50+ PBR Procedural Materials & Custom GLSL Shaders',
        'Texture Maps': '4K Albedo, Normal, Roughness & Emissive Channels',
        'Engine Compatibility': 'Three.js, React Three Fiber, Babylon.js & Blender',
        'License Term': '$19 USD One-Time (Rp 299.000) · Royalty-Free Commercial'
      }
    },
    {
      id: 'solstice-pendant',
      title: 'Solstice Rune Talisman Pendant',
      category: 'jewelry',
      categoryLabel: 'Handmade Pendant',
      price: 45,
      badge: 'HANDMADE · 925 SILVER',
      shortDesc: 'Hand-forged sterling silver pendant featuring a natural raw quartz crystal core and hand-engraved protection bindrunes.',
      fullDesc: 'Artisan handcrafted talisman created using traditional lost-wax casting and hand-finishing techniques. The centerpiece holds a high-clarity natural raw quartz crystal nestled in organic 925 sterling silver rootwork. Each bindrune is engraved by hand with cold chisel tools.',
      modelUrl: '/assets/models/crystal.glb',
      has3D: true,
      specs: {
        'Metal': 'Solid Sterling Silver 925 (Oxidized Antique Finish)',
        'Stone': 'Natural Raw Double-Terminated Quartz Crystal',
        'Pendant Size': '48mm x 22mm x 16mm',
        'Chain': '60cm Handcrafted Wheat Chain Included',
        'Crafted By': 'Epinoia Atelier Artisan Goldsmith'
      }
    },
    {
      id: 'aetherial-lantern',
      title: 'Aetherial Relic Cage Pendant',
      category: 'jewelry',
      categoryLabel: 'Handmade Jewelry',
      price: 55,
      badge: 'HANDMADE · ARTISAN',
      shortDesc: 'Artisan filigree lantern cage pendant with 18K gold vermeil accents encapsulating natural tourmaline crystal shards.',
      fullDesc: 'Constructed from layered filigree wirework, this relic lantern cage captures ambient light through raw multi-color tourmaline crystal shards. Features a screw-lock vault bale with custom celestial inscriptions along the circumference.',
      modelUrl: '/assets/models/lantern.glb',
      has3D: true,
      specs: {
        'Metal': '18K Gold Vermeil over Solid 925 Sterling Silver',
        'Gemstone': 'Untreated Bi-Color Tourmaline Shards',
        'Mechanism': 'Threaded Miniature Vault Bale Lock',
        'Dimensions': '38mm x 18mm',
        'Edition': 'Limited Artisan Run (Signed & Numbered)'
      }
    },
    {
      id: 'gold-ingot-pendant',
      title: 'Alchemist Pure Ingot Bar',
      category: 'jewelry',
      categoryLabel: 'Handmade Jewelry',
      price: 35,
      badge: 'HANDMADE · SIGNATURE',
      shortDesc: 'Heavy tactile hand-poured solid bar pendant stamped with arcane alchemy weights and Epinoia eye hallmark.',
      fullDesc: 'Poured directly into hand-carved soapstone molds to create authentic rustic textures. Each ingot pendant has unique natural surface ripples and is stamped with the Epinoia all-seeing eye hallmark and 925 purity insignia.',
      modelUrl: '/assets/models/gold-ingots.glb',
      has3D: true,
      specs: {
        'Material': 'Hand-Poured Heavy Silver 925 / Bronze Fusion',
        'Weight': '36.5 grams',
        'Hallmark': 'Epinoia All-Seeing Eye + Alchemical Sigils',
        'Bale': 'Heavy Duty 5mm Round Rope Bale',
        'Packaging': 'Wax-Sealed Leather Grimoire Box'
      }
    }
  ];

  // Database / LocalStorage Sync
  window.EpinoiaStore = {
    getProducts: function() {
      try {
        const custom = localStorage.getItem('epinoia_custom_products_v2');
        if (custom) {
          const parsed = JSON.parse(custom);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch(e) {}
      return DEFAULT_PRODUCTS;
    },

    saveProducts: function(products) {
      localStorage.setItem('epinoia_custom_products_v2', JSON.stringify(products));
    },

    getProductById: function(id) {
      const all = this.getProducts();
      return all.find(p => p.id === id) || all[0];
    },

    // Cart Management
    getCart: function() {
      try {
        return JSON.parse(localStorage.getItem('epinoia_cart') || '[]');
      } catch(e) { return []; }
    },

    addToCart: function(product) {
      const cart = this.getCart();
      const existing = cart.find(item => item.id === product.id);
      if (existing) {
        existing.qty = (existing.qty || 1) + 1;
      } else {
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          categoryLabel: product.categoryLabel,
          modelUrl: product.modelUrl,
          qty: 1
        });
      }
      localStorage.setItem('epinoia_cart', JSON.stringify(cart));
      this.updateCartUI();
      this.openCart();
    },

    addToCartById: function(id) {
      const product = this.getProductById(id);
      if (product) this.addToCart(product);
    },

    removeFromCart: function(id) {
      let cart = this.getCart().filter(item => item.id !== id);
      localStorage.setItem('epinoia_cart', JSON.stringify(cart));
      this.updateCartUI();
    },

    updateCartUI: function() {
      const cart = this.getCart();
      const badges = document.querySelectorAll('.cart-badge');
      const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
      badges.forEach(b => b.textContent = totalQty);

      const itemsContainer = document.getElementById('cart-items-list');
      const totalEl = document.getElementById('cart-total-price');
      if (!itemsContainer) return;

      if (cart.length === 0) {
        itemsContainer.innerHTML = `<p style="color:var(--dim);text-align:center;padding:40px 0;font-family:'JetBrains Mono',monospace;font-size:12px;">Your vault selection is empty.</p>`;
        if (totalEl) totalEl.textContent = '$0';
        return;
      }

      let subtotal = 0;
      itemsContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * (item.qty || 1);
        subtotal += itemTotal;
        return `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;background:rgba(255,255,255,0.03);border:1px solid rgba(234,179,8,0.2);border-radius:12px;margin-bottom:10px;">
            <div>
              <div style="font-family:'Cinzel',serif;font-size:13px;color:#fff;font-weight:700;">${item.title}</div>
              <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--cyan);">$${item.price.toLocaleString()} x ${item.qty || 1}</div>
            </div>
            <button onclick="window.EpinoiaStore.removeFromCart('${item.id}')" style="background:none;border:none;color:#ef4444;cursor:pointer;padding:6px;font-size:14px;">
              <i class="fas fa-trash-can"></i>
            </button>
          </div>
        `;
      }).join('');

      if (totalEl) totalEl.textContent = '$' + subtotal.toLocaleString();
    },

    openCart: function() {
      const drawer = document.getElementById('cart-drawer');
      const overlay = document.getElementById('cart-overlay');
      if (drawer) drawer.classList.add('open');
      if (overlay) overlay.classList.add('open');
    },

    closeCart: function() {
      const drawer = document.getElementById('cart-drawer');
      const overlay = document.getElementById('cart-overlay');
      if (drawer) drawer.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
    }
  };

  // Init cart badge on page load
  document.addEventListener('DOMContentLoaded', function() {
    window.EpinoiaStore.updateCartUI();
  });
})();
