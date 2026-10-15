/* Epinoia Horizon — Store Runtime (Catalog, 3D GLB Support, Cart, Admin IndexedDB) */
(function() {
  'use strict';

  // Default Seed Catalog (4 Core Sovereign Items + Artisan Handmade Jewelry)
  const DEFAULT_PRODUCTS = [
    {
      id: 'merlin-harness',
      title: 'Merlin Harness Core Access',
      category: 'sovereign',
      categoryLabel: 'License',
      price: 1499,
      badge: 'SOVEREIGN · TIER 3',
      shortDesc: 'Unlimited autonomous agent orchestration tier with dedicated high-priority neural pipeline access.',
      fullDesc: 'Merlin Harness Core Access delivers deep architectural orchestration for agent fleets. Integrates triple-pulse cognitive routing (Cerebras instant pulse, Mamba selective SSM state scan, GLM deep audit) with automated self-healing daemons, cross-session synaptic preservation, and vector memory palaces.',
      modelUrl: '/assets/models/wizard.glb',
      has3D: true,
      specs: {
        'Agent Slots': '100 Concurrent Autonomous Swarms',
        'Runtime': 'Linux / WSL2 / Windows Native',
        'Previs Engine': 'Real-Time Three.js & WebGPU Viewports',
        'Memory Palace': 'Unified Vector Store + SQLite WAL',
        'License Term': 'Perpetual Commercial Deployment'
      }
    },
    {
      id: 'scrying-orb',
      title: 'Scrying Orb Neural Server',
      category: 'sovereign',
      categoryLabel: 'Hardware Node',
      price: 3850,
      badge: 'HARDWARE NODE',
      shortDesc: 'Dedicated edge hardware rig or isolated cloud cluster with built-in quantum-resistant hardware security module.',
      fullDesc: 'Precision-milled obsidian and aerospace-grade anodized aluminum chassis. Encapsulates a dedicated high-throughput NPU edge inference unit with cold-storage HSM enclaves for sovereign private keys and continuous offline agent execution.',
      modelUrl: '/assets/models/crystal.glb',
      has3D: true,
      specs: {
        'Chassis': 'Obsidian Glass & Anodized Aerospace Alloy',
        'Security Module': 'Hardware RoT & Cold HSM Enclave',
        'Uplink': 'Wi-Fi 7 / Dual 10GbE SFP+ Fiber',
        'Cooling': 'Silent Vapor Chamber Cryo-Loop',
        'Included': 'Dual Tactile Brass Cognitive Encoders'
      }
    },
    {
      id: 'arcanum-sdk',
      title: 'Arcane Grimoire SDK',
      category: 'sovereign',
      categoryLabel: 'SDK Suite',
      price: 799,
      badge: 'SDK SUITE',
      shortDesc: 'Complete TypeScript & Python bindings for constructing custom agent spell compilers and webhooks.',
      fullDesc: 'The complete programmatic developer kit for Epinoia Horizon. Provides type-safe bindings for TypeScript, Python 3.11+, and Go. Includes pre-built AST compiler utilities, WebGL spatial canvas connectors, and adaptive token budget governors.',
      modelUrl: '/assets/models/open-book.glb',
      has3D: true,
      specs: {
        'Languages': 'TypeScript, Python, Rust, Go',
        'Graphics Hooks': 'WebGL 2.0 / WebGPU Canvas Adapters',
        'Token Governor': 'Automated Context Compaction AST',
        'Updates': 'Continuous Lifetime Private Git Access',
        'Documentation': 'Full Interactive OpenAPI & Typedocs'
      }
    },
    {
      id: 'previs-pack',
      title: 'Previs 3D Artifact Pack',
      category: 'sovereign',
      categoryLabel: 'Asset Suite',
      price: 450,
      badge: 'ASSET SUITE',
      shortDesc: 'High-poly procedural 3D magical artifacts, shaders, and particle FX tailored for WebGL viewports.',
      fullDesc: 'Over 50 production-grade procedural materials and optimized GLTF/GLB geometries. Pre-configured for Three.js, Babylon.js, and Unreal Engine. Features custom vertex-displacement spell shaders and GPU particle systems.',
      modelUrl: '/assets/models/chest.glb',
      has3D: true,
      specs: {
        'Geometries': 'Optimized Low/High Poly GLTF & GLB',
        'Materials': '50+ PBR Procedural Shader Graph Assets',
        'Texture Maps': '4K Albedo, Normal, Roughness, Emissive',
        'Rigging': 'Pre-rigged Three.js / Babylon Components',
        'Commercial SLA': 'Royalty-Free Commercial Production Permit'
      }
    },
    {
      id: 'solstice-pendant',
      title: 'Solstice Rune Talisman Pendant',
      category: 'jewelry',
      categoryLabel: 'Handmade Pendant',
      price: 320,
      badge: 'HANDMADE · 1 OF 1',
      shortDesc: 'Hand-forged sterling silver pendant featuring raw natural crystal core with hand-engraved protection bindrunes.',
      fullDesc: 'Artisan handcrafted talisman created using traditional lost-wax casting and hand-finishing techniques. The centerpiece holds a high-clarity natural raw crystal nestled in organic sterling silver rootwork. Each bindrune is engraved by hand with cold chisel tools.',
      modelUrl: '/assets/models/crystal.glb',
      has3D: true,
      specs: {
        'Metal': 'Solid Sterling Silver 925 (Oxidized Antique Finish)',
        'Stone': 'Natural Raw Double-Terminated Quartz Crystal',
        'Pendant Size': '48mm x 22mm x 16mm',
        'Chain': '60cm Handcrafted Wheat Chain (Silver 925)',
        'Crafted By': 'Epinoia Atelier Master Goldsmith'
      }
    },
    {
      id: 'aetherial-lantern',
      title: 'Aetherial Relic Cage Pendant',
      category: 'jewelry',
      categoryLabel: 'Handmade Jewelry',
      price: 460,
      badge: 'HANDMADE · ARTISAN',
      shortDesc: 'Artisan filigree lantern cage pendant with 18K gold vermeil accents encapsulating tourmaline shards.',
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
      price: 290,
      badge: 'HANDMADE · SIGNATURE',
      shortDesc: 'Heavy tactile hand-poured solid bar pendant stamped with arcane alchemy weights and runes.',
      fullDesc: 'Poured directly into hand-carved soapstone molds to create authentic rustic textures. Each ingot pendant has unique natural surface cools and is stamped with the Epinoia eye hallmark and 925 purity insignia.',
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
        const custom = localStorage.getItem('epinoia_custom_products');
        if (custom) {
          const parsed = JSON.parse(custom);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch(e) {}
      return DEFAULT_PRODUCTS;
    },

    saveProducts: function(products) {
      localStorage.setItem('epinoia_custom_products', JSON.stringify(products));
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
