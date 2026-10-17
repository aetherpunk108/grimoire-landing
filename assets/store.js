/* Epinoia Horizon — Store Runtime (Catalog, 3D GLB Support, Cart, Admin IndexedDB) */
(function() {
  'use strict';

  // Default Seed Catalog (Merlin Sovereign Pass + Artisan Handmade Pendants + 3D Animation & CAD Studio)
  const DEFAULT_PRODUCTS = [
    {
      id: 'merlin-harness',
      title: 'Merlin Sovereign High Pass',
      category: 'sovereign',
      categoryLabel: 'AI Workspace',
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
      id: 'solstice-pendant',
      title: 'Solstice Crystal Talisman Pendant',
      category: 'jewelry',
      categoryLabel: 'Handmade Pendant',
      price: 45,
      badge: 'HANDMADE · 925 SILVER',
      shortDesc: 'Hand-forged 925 sterling silver pendant featuring a natural raw double-terminated quartz crystal core and hand-engraved bindrunes.',
      fullDesc: 'Artisan handcrafted talisman created using traditional lost-wax casting and hand-finishing techniques by Epinoia Horizon Atelier. The centerpiece holds a high-clarity natural raw quartz crystal nestled in organic 925 sterling silver rootwork. Each bindrune is engraved by hand with cold chisel tools.',
      modelUrl: '/assets/models/crystal.glb',
      has3D: true,
      specs: {
        'Metal': 'Solid Sterling Silver 925 (Oxidized Antique Finish)',
        'Stone': 'Natural Raw Double-Terminated Quartz Crystal',
        'Pendant Size': '48mm x 22mm x 16mm',
        'Chain': '60cm Handcrafted Wheat Chain (925 Silver) Included',
        'Crafted By': 'Epinoia Horizon Artisan Jewelry Atelier'
      }
    },
    {
      id: 'aetherial-lantern',
      title: 'Aetherial Relic Cage Pendant',
      category: 'jewelry',
      categoryLabel: 'Artisan Jewelry',
      price: 55,
      badge: 'HANDMADE · 18K VERMEIL',
      shortDesc: 'Handcrafted filigree lantern cage pendant in 18K gold vermeil over 925 silver encapsulating natural tourmaline crystal shards.',
      fullDesc: 'Constructed from layered filigree wirework and 3D lost-wax precision casting, this relic lantern cage captures ambient light through raw multi-color tourmaline crystal shards. Features a screw-lock vault bale with custom celestial inscriptions along the circumference.',
      modelUrl: '/assets/models/lantern.glb',
      has3D: true,
      specs: {
        'Metal': '18K Gold Vermeil over Solid 925 Sterling Silver',
        'Gemstone': 'Untreated Bi-Color Tourmaline Shards',
        'Mechanism': 'Threaded Miniature Vault Bale Lock',
        'Dimensions': '38mm x 18mm',
        'Edition': 'Signed & Numbered Artisan Run'
      }
    },
    {
      id: 'gold-ingot-pendant',
      title: 'Alchemist Pure Ingot Bar Pendant',
      category: 'jewelry',
      categoryLabel: 'Handmade Pendant',
      price: 38,
      badge: 'HANDMADE · SIGNATURE',
      shortDesc: 'Heavy tactile hand-poured solid silver/bronze fusion bar pendant stamped with arcane alchemy weights and Epinoia eye hallmark.',
      fullDesc: 'Poured directly into hand-carved soapstone molds to create authentic organic surface ripples. Each ingot bar pendant is hand-stamped with the Epinoia all-seeing eye hallmark, alchemical weight sigils, and 925 purity insignia.',
      modelUrl: '/assets/models/gold-ingots.glb',
      has3D: true,
      specs: {
        'Material': 'Hand-Poured Heavy Silver 925 / Bronze Fusion',
        'Weight': '36.5 grams',
        'Hallmark': 'Epinoia All-Seeing Eye + Alchemical Sigils',
        'Bale': 'Heavy Duty 5mm Round Rope Bale',
        'Packaging': 'Wax-Sealed Leather Grimoire Box'
      }
    },
    {
      id: 'previs-pack',
      title: '3D Character & Cinematic Animation',
      category: 'studio3d',
      categoryLabel: '3D Animation Studio',
      price: 150,
      badge: '3D ANIMATOR · CUSTOM RIG',
      shortDesc: 'Bespoke 3D character sculpting, kinematic skeletal rigging, and 120 FPS cinematic animation sequences by Epinoia 3D Studio.',
      fullDesc: 'Commission the Epinoia Horizon 3D Animation Studio for custom 3D character modeling, biomechanical & organic skeletal rigging (IK/FK + facial blendshapes), and high-framerate cinematic animation sequences ready for Blender, Unreal Engine 5, Unity, or WebGL.',
      modelUrl: '/assets/models/chest.glb',
      has3D: true,
      specs: {
        'Deliverables': 'Rigged 3D Mesh + Keyframe/Motion Animation Sequence',
        'Formats': '.BLEND, .FBX, .GLTF / .GLB, Unreal & Unity Ready',
        'Rigging': 'Full IK/FK Skeletal Hierarchy + Weight Painting',
        'Textures': '4K PBR Texture Maps (Albedo, Normal, Roughness, Metallic)',
        'Revisions': 'Includes 3 Interactive 3D Previs Review Rounds'
      }
    },
    {
      id: 'arcanum-sdk',
      title: 'Custom 3D Jewelry CAD & Wax Sculpt',
      category: 'studio3d',
      categoryLabel: '3D Jewelry Design',
      price: 85,
      badge: '3D CAD · LOST-WAX READY',
      shortDesc: 'Custom 3D ZBrush/MatrixGold jewelry sculpting and print-ready STL/OBJ files engineered for lost-wax metal casting.',
      fullDesc: 'Turn your custom pendant, signet ring, or talisman concept into a production-ready 3D sculpt. Engineered with precise wall thickness, stone-setting prongs, and sprue tolerances for high-resolution resin 3D printing and direct lost-wax casting in silver or gold.',
      modelUrl: '/assets/models/open-book.glb',
      has3D: true,
      specs: {
        'Sculpting': 'High-Detail Organic & Geometric 3D Jewelry Sculpt',
        'Print Readiness': 'Manifold Watertight .STL & .OBJ for Wax 3D Printing',
        'Gemstone Seats': 'Calibrated Prong / Bezel / Channel Cutouts',
        'Visuals': 'Includes 4K Photorealistic Raytraced Turntable Render',
        'Option': 'Can be cast directly in 925 Silver by Epinoia Atelier'
      }
    }
  ];

  // Database / LocalStorage Sync
  window.EpinoiaStore = {
    getProducts: function() {
      try {
        const custom = localStorage.getItem('epinoia_custom_products_v3');
        if (custom) {
          const parsed = JSON.parse(custom);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch(e) {}
      return DEFAULT_PRODUCTS;
    },

    saveProducts: function(products) {
      localStorage.setItem('epinoia_custom_products_v3', JSON.stringify(products));
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
