/* ============================================
   SMART WASTE SEGREGATION TRACKER
   Client Controller (Flask API + Embedded Fallback)
============================================ */

if (window.__SMART_WASTE_INIT__) {
    console.log("SmartWasteTracker script already initialized.");
} else {
    window.__SMART_WASTE_INIT__ = true;


const local_waste_data = {
    "banana peel": ["Wet Waste", "Green Bin", "Compost it"],
    "apple": ["Organic Waste", "Green Bin", "Compost it"],
    "vegetable waste": ["Organic Waste", "Green Bin", "Compost it"],
    "food waste": ["Wet Waste", "Green Bin", "Compost or place in organic bin"],
    "food": ["Wet Waste", "Green Bin", "Compost or place in organic bin"],

    "plastic bottle": ["Plastic Waste", "Blue Bin", "Clean, dry, and send for recycling"],
    "milk packet": ["Plastic Waste", "Blue Bin", "Recycle it"],
    "plastic cover": ["Plastic Waste", "Blue Bin", "Recycle it"],

    "newspaper": ["Paper Waste", "Blue Bin", "Flatten and send for paper recycling"],
    "paper": ["Paper Waste", "Blue Bin", "Recycle it"],
    "cardboard": ["Paper Waste", "Blue Bin", "Flatten box and place in paper bin"],

    "glass bottle": ["Glass Waste", "Glass Bin", "Rinse gently and deposit in glass bin"],
    "glass": ["Glass Waste", "Glass Bin", "Recycle it"],

    "metal can": ["Metal Waste", "Blue Bin", "Rinse and send for metal recycling"],
    "can": ["Metal Waste", "Blue Bin", "Rinse and send for metal recycling"],

    "battery": ["Hazardous Waste", "Red Bin", "Dispose safely at hazardous waste drop-off"],
    "medicine": ["Hazardous Waste", "Red Bin", "Dispose safely"],
    "light bulb": ["Hazardous Waste", "Red Bin", "Wrap safely and deposit at toxic collection point"],
    "bulb": ["Hazardous Waste", "Red Bin", "Wrap safely and deposit at toxic collection point"],

    "mobile phone": ["E-Waste", "E-Waste Bin", "Send to authorized E-Waste recycling center"],
    "mobile": ["E-Waste", "E-Waste Bin", "Send to authorized E-Waste Center"],
    "laptop": ["E-Waste", "E-Waste Bin", "Send to E-Waste Center"],
    "charger": ["E-Waste", "E-Waste Bin", "Send to E-Waste Center"]
};

function startSmartWasteApp() {
    initTheme();
    initLeafParticles();
    initTypingEffect();
    initSearchEngine();
    initStatsCounters();
    initBackToTop();
    initCalculators();
    initSimulators();
    initCodeModalCopy();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startSmartWasteApp);
} else {
    startSmartWasteApp();
}

/* -------------------------------------------------------------
   1. Theme Toggle (Dark / Light Mode)
------------------------------------------------------------- */
function initTheme() {
    const themeBtn = document.getElementById("themeToggleBtn");
    const storedTheme = localStorage.getItem("waste_tracker_theme") || "light";

    document.documentElement.setAttribute("data-theme", storedTheme);

    if (themeBtn) {
        updateThemeIcon(themeBtn, storedTheme);
        themeBtn.addEventListener("click", function () {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("waste_tracker_theme", newTheme);
            updateThemeIcon(themeBtn, newTheme);
            showToast(newTheme === "dark" ? "🌙 Dark Mode Enabled" : "☀️ Light Mode Enabled");
        });
    }
}

function updateThemeIcon(btn, theme) {
    const icon = btn.querySelector("i");
    if (icon) {
        if (theme === "dark") {
            icon.className = "fa-solid fa-sun text-warning";
        } else {
            icon.className = "fa-solid fa-moon text-primary";
        }
    }
}

/* -------------------------------------------------------------
   2. Background Leaf & Recycle Particles
------------------------------------------------------------- */
function initLeafParticles() {
    const container = document.getElementById("bgParticles");
    if (!container) return;

    const icons = ["fa-leaf", "fa-seedling", "fa-recycle", "fa-tree", "fa-clover"];
    const particleCount = 18;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("i");
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        
        particle.className = `fa-solid ${randomIcon} particle`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${12 + Math.random() * 14}s`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.fontSize = `${0.9 + Math.random() * 1.4}rem`;

        container.appendChild(particle);
    }
}

/* -------------------------------------------------------------
   3. Hero Typing Effect
------------------------------------------------------------- */
function initTypingEffect() {
    const textElement = document.getElementById("typingText");
    if (!textElement) return;

    const phrases = [
        "AI Inspired Waste Classification System",
        "Python Flask Backend (No DB Required)",
        "Smart Dustbin Color Guidance Engine",
        "Instant Recycling & Disposal Recommendations"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* -------------------------------------------------------------
   4. Flask API & Fallback Waste Search Engine
------------------------------------------------------------- */
function initSearchEngine() {
    const searchInput = document.getElementById("wasteSearchInput");
    const searchBtn = document.getElementById("wasteSearchBtn");
    const resultCard = document.getElementById("searchResultCard");

    if (!searchInput || !resultCard) return;

    function performSearch(query) {
        if (!query.trim()) {
            showToast("⚠️ Please enter a waste item to classify.");
            return;
        }

        // Auto-detect static web hosting (GitHub Pages or local file:// protocol)
        const isStaticHost = window.location.hostname.includes("github.io") || window.location.protocol === "file:";

        if (isStaticHost) {
            executeLocalSearch(query);
            return;
        }

        fetch("/api/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ item: query })
        })
        .then(res => {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.json();
        })
        .then(data => {
            if (data && data.found) {
                renderSearchResult(data);
            } else {
                executeLocalSearch(query);
            }
        })
        .catch(err => {
            executeLocalSearch(query);
        });
    }

    function executeLocalSearch(query) {
        const q = query.trim().toLowerCase();
        
        // 1. Exact Match
        let matched = local_waste_data[q];
        
        // 2. Substring Match
        if (!matched) {
            for (const k in local_waste_data) {
                if (k.includes(q) || q.includes(k)) {
                    matched = local_waste_data[k];
                    break;
                }
            }
        }
        
        // 3. Generic Keyword Fallback (Identical to Python Backend)
        if (!matched) {
            const generic_keywords = {
                "organic": ["Organic Waste", "Green Bin", "Compost it"],
                "wet": ["Wet Waste", "Green Bin", "Compost or place in organic bin"],
                "food": ["Wet Waste", "Green Bin", "Compost or place in organic bin"],
                "fruit": ["Organic Waste", "Green Bin", "Compost it"],
                "peel": ["Organic Waste", "Green Bin", "Compost it"],
                "plastic": ["Plastic Waste", "Blue Bin", "Clean, dry, and send for recycling"],
                "poly": ["Plastic Waste", "Blue Bin", "Recycle it"],
                "bottle": ["Plastic Waste", "Blue Bin", "Clean, dry, and send for recycling"],
                "paper": ["Paper Waste", "Blue Bin", "Flatten and send for paper recycling"],
                "card": ["Paper Waste", "Blue Bin", "Flatten box and place in paper bin"],
                "glass": ["Glass Waste", "Glass Bin", "Rinse gently and deposit in glass bin"],
                "metal": ["Metal Waste", "Blue Bin", "Rinse and send for metal recycling"],
                "can": ["Metal Waste", "Blue Bin", "Rinse and send for metal recycling"],
                "tin": ["Metal Waste", "Blue Bin", "Rinse and send for metal recycling"],
                "battery": ["Hazardous Waste", "Red Bin", "Dispose safely at hazardous waste drop-off"],
                "medicine": ["Hazardous Waste", "Red Bin", "Dispose safely"],
                "bulb": ["Hazardous Waste", "Red Bin", "Wrap safely and deposit at toxic collection point"],
                "phone": ["E-Waste", "E-Waste Bin", "Send to authorized E-Waste Center"],
                "mobile": ["E-Waste", "E-Waste Bin", "Send to authorized E-Waste Center"],
                "laptop": ["E-Waste", "E-Waste Bin", "Send to authorized E-Waste Center"],
                "charger": ["E-Waste", "E-Waste Bin", "Send to authorized E-Waste Center"]
            };
            
            for (const kw in generic_keywords) {
                if (q.includes(kw)) {
                    matched = generic_keywords[kw];
                    break;
                }
            }
        }

        if (matched) {
            renderSearchResult({
                query: query,
                category: matched[0],
                bin: matched[1],
                instruction: matched[2],
                found: true
            });
        } else {
            renderSearchResult({
                query: query,
                category: "Unknown Waste",
                bin: "General / Audit Bin",
                instruction: "Item not found in standard classification database. Please check manual eco-sorting guidelines.",
                found: false
            });
        }
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", () => performSearch(searchInput.value));
    }

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            performSearch(searchInput.value);
        }
    });

    document.querySelectorAll(".tag-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            const item = this.dataset.item || this.innerText;
            searchInput.value = item;
            performSearch(item);
        });
    });
}

function renderSearchResult(data) {
    const resultCard = document.getElementById("searchResultCard");
    const resQuery = document.getElementById("resQuery");
    const resCategory = document.getElementById("resCategory");
    const resBinBadge = document.getElementById("resBinBadge");
    const resInstruction = document.getElementById("resInstruction");
    const resIcon = document.getElementById("resIcon");
    const unknownAlert = document.getElementById("unknownAlert");

    if (!resultCard) return;

    resQuery.innerText = data.query;
    resCategory.innerText = data.category;
    resInstruction.innerText = data.instruction;

    let badgeClass = "bin-green";
    let iconClass = "fa-leaf";

    if (data.category === "Organic Waste" || data.category === "Wet Waste") {
        badgeClass = "bin-green";
        iconClass = "fa-leaf";
    } else if (data.category === "Plastic Waste") {
        badgeClass = "bin-blue";
        iconClass = "fa-bottle-water";
    } else if (data.category === "Paper Waste") {
        badgeClass = "bin-blue";
        iconClass = "fa-newspaper";
    } else if (data.category === "Glass Waste") {
        badgeClass = "bin-glass";
        iconClass = "fa-wine-bottle";
    } else if (data.category === "Metal Waste") {
        badgeClass = "bin-blue";
        iconClass = "fa-can-food";
    } else if (data.category === "Hazardous Waste") {
        badgeClass = "bin-red";
        iconClass = "fa-biohazard";
    } else if (data.category === "E-Waste") {
        badgeClass = "bin-ewaste";
        iconClass = "fa-laptop";
    } else {
        badgeClass = "bin-unknown";
        iconClass = "fa-triangle-exclamation";
    }

    resBinBadge.className = `bin-badge ${badgeClass}`;
    resBinBadge.innerHTML = `<i class="fa-solid ${iconClass}"></i> ${data.bin}`;
    resIcon.className = `fa-solid ${iconClass} display-4 text-emerald`;

    if (!data.found && unknownAlert) {
        unknownAlert.classList.remove("d-none");
    } else if (unknownAlert) {
        unknownAlert.classList.add("d-none");
    }

    resultCard.style.display = "block";
    resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* -------------------------------------------------------------
   5. Animated Statistics Counters
------------------------------------------------------------- */
function initStatsCounters() {
    const counters = document.querySelectorAll(".counter-value");
    if (!counters.length) return;

    let animated = false;

    function startCounters() {
        if (animated) return;
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target, 10) || 0;
            let current = 0;
            const step = Math.max(1, Math.floor(target / 60));

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.innerText = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    counter.innerText = current.toLocaleString();
                }
            }, 25);
        });
        animated = true;
    }

    window.addEventListener("scroll", () => {
        const statsSection = document.getElementById("statsSection");
        if (statsSection) {
            const rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                startCounters();
            }
        }
    });

    setTimeout(startCounters, 800);
}

/* -------------------------------------------------------------
   6. Interactive Carbon Footprint Calculator
------------------------------------------------------------- */
function initCalculators() {
    const kgInput = document.getElementById("wasteKgInput");
    const kgDisplay = document.getElementById("wasteKgDisplay");
    const co2Saved = document.getElementById("co2SavedRes");
    const treesSaved = document.getElementById("treesSavedRes");
    const energySaved = document.getElementById("energySavedRes");

    if (!kgInput) return;

    function updateCalc() {
        const kg = parseFloat(kgInput.value) || 0;
        if (kgDisplay) kgDisplay.innerText = kg;

        const co2 = (kg * 2.5).toFixed(1);
        const trees = (kg * 0.04).toFixed(2);
        const energy = (kg * 3.8).toFixed(1);

        if (co2Saved) co2Saved.innerText = `${co2} kg`;
        if (treesSaved) treesSaved.innerText = `${trees} Trees`;
        if (energySaved) energySaved.innerText = `${energy} kWh`;
    }

    kgInput.addEventListener("input", updateCalc);
    updateCalc();
}

/* -------------------------------------------------------------
   7. AI Camera & Voice Simulators
------------------------------------------------------------- */

/**
 * PREDEFINED WASTE DATASET (10 Items Required)
 * Used by both Camera Vision Simulator & Voice Assistant Engine
 */
const predefinedWasteDataset = [
    {
        name: "Plastic Bottle",
        icon: "fa-bottle-water",
        category: "Plastic Waste",
        bin: "Blue Bin",
        binBadgeClass: "badge-bin-blue",
        recommendation: "Clean, dry, and send for recycling.",
        keywords: ["plastic bottle", "bottle", "plastic", "బాటిల్", "బోతల్", "प्लास्टिक की बोतल", "बोतल", "botella", "bouteille"]
    },
    {
        name: "Banana Peel",
        icon: "fa-leaf",
        category: "Wet Waste",
        bin: "Green Bin",
        binBadgeClass: "badge-bin-green",
        recommendation: "Compost this waste.",
        keywords: ["banana peel", "banana", "peel", "అరటి", "అరటిపండు", "కేలా", "केला", "केले का छिलका", "platano", "banane"]
    },
    {
        name: "Newspaper",
        icon: "fa-newspaper",
        category: "Paper Waste",
        bin: "Blue Bin",
        binBadgeClass: "badge-bin-blue",
        recommendation: "Flatten and send for paper recycling.",
        keywords: ["newspaper", "paper", "news", "పేపర్", "వార్తాపత్రిక", "अखबार", "समाचार पत्र", "periodico", "journal", "papier"]
    },
    {
        name: "Glass Bottle",
        icon: "fa-wine-bottle",
        category: "Glass Waste",
        bin: "Glass Bin",
        binBadgeClass: "badge-bin-glass",
        recommendation: "Rinse gently and deposit in glass collection bin.",
        keywords: ["glass bottle", "glass", "గాజు", "గాజు సీసా", "कांच की बोतल", "कांच", "vidrio", "verre"]
    },
    {
        name: "Metal Can",
        icon: "fa-can-food",
        category: "Metal Waste",
        bin: "Blue Bin",
        binBadgeClass: "badge-bin-blue",
        recommendation: "Rinse and send for metal scrap recycling.",
        keywords: ["metal can", "can", "tin", "metal", "డబ్బా", "టిన్", "केन", "धातु", "lata", "canette"]
    },
    {
        name: "Battery",
        icon: "fa-battery-full",
        category: "Hazardous Waste",
        bin: "Red Bin",
        binBadgeClass: "badge-bin-red",
        recommendation: "Dispose safely at hazardous waste drop-off.",
        keywords: ["battery", "cell", "బ్యాటరీ", "बैटरी", "pila", "bateria", "pile"]
    },
    {
        name: "Mobile Phone",
        icon: "fa-mobile-screen",
        category: "E-Waste",
        bin: "E-Waste Bin",
        binBadgeClass: "badge-bin-ewaste",
        recommendation: "Send to authorized E-Waste Recycling Center.",
        keywords: ["mobile phone", "mobile", "phone", "smartphone", "మొబైల్", "ఫోన్", "मोबाइल", "फोन", "movil", "telefono", "portable"]
    },
    {
        name: "Food Waste",
        icon: "fa-utensils",
        category: "Wet Waste",
        bin: "Green Bin",
        binBadgeClass: "badge-bin-green",
        recommendation: "Compost or place in organic waste bin.",
        keywords: ["food waste", "food", "leftover", "అన్నం", "ఆహారం", "भोजन", "खाना", "comida", "nourriture"]
    },
    {
        name: "Cardboard",
        icon: "fa-box-archive",
        category: "Paper Waste",
        bin: "Blue Bin",
        binBadgeClass: "badge-bin-blue",
        recommendation: "Flatten box and place in paper bin.",
        keywords: ["cardboard", "box", "అట్టపెట్టె", "कार्डबोर्ड", "गत्ता", "carton"]
    },
    {
        name: "Light Bulb",
        icon: "fa-lightbulb",
        category: "Hazardous Waste",
        bin: "Red Bin",
        binBadgeClass: "badge-bin-red",
        recommendation: "Wrap safely and deposit at toxic waste collection center.",
        keywords: ["light bulb", "bulb", "lamp", "బల్బు", "లైట్", "बल्ब", "बिजली का बल्ब", "bombilla", "ampoule"]
    }
];

/**
 * ARCHITECTURE FOR UPGRADING TO PRODUCTION AI MODELS:
 * 
 * 1. YOLOv8 (ONNX Web Runtime):
 *    const session = await ort.InferenceSession.create('./models/yolov8n.onnx');
 *    const tensor = preprocessCanvasToONNXTensor(cameraCanvas);
 *    const outputs = await session.run({ images: tensor });
 *    const detectedClass = parseYOLOBoundingBoxes(outputs);
 * 
 * 2. ResNet50 / TensorFlow.js:
 *    const model = await tf.loadLayersModel('https://storage.googleapis.com/.../resnet50/model.json');
 *    const tensor = tf.browser.fromPixels(videoElement).resizeNearestNeighbor([224, 224]).expandDims(0);
 *    const predictions = await model.predict(tensor).data();
 * 
 * 3. Google Gemini Vision API:
 *    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
 *        method: 'POST',
 *        headers: { 'Content-Type': 'application/json' },
 *        body: JSON.stringify({
 *            contents: [{ parts: [{ text: "Classify waste item in image into Wet, Plastic, Paper, Glass, Metal, E-Waste or Hazardous." }, { inline_data: { mime_type: "image/jpeg", data: base64Frame } }] }]
 *        })
 *    });
 */

let speechRecognitionInstance = null;

function initSimulators() {
    initCameraVisionSimulator();
    initVoiceRecognitionAssistant();
}

/* =============================================================
   A. AI CAMERA VISION SIMULATOR LOGIC
============================================================= */
function initCameraVisionSimulator() {
    const simCamBtn = document.getElementById("startCamSimBtn");
    const camStatus = document.getElementById("camStatusText");
    const camOverlay = document.getElementById("camOverlayBox");
    const scannerLine = document.getElementById("camScannerLine");

    if (!simCamBtn) return;

    simCamBtn.addEventListener("click", function () {
        // Disable button during scanning
        simCamBtn.disabled = true;
        simCamBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin me-1"></i> Scanning Frame...`;

        if (camStatus) camStatus.innerText = "🔍 AI Neural Net Scanning Object Frame...";
        if (scannerLine) scannerLine.classList.add("active");

        if (camOverlay) {
            camOverlay.innerHTML = `
                <div class="py-3">
                    <span class="badge bg-warning text-dark px-3 py-2 fs-6 rounded-pill animate__animated animate__pulse animate__infinite">
                        <i class="fa-solid fa-expand fa-spin me-1"></i> Analyzing Neural Feature Maps...
                    </span>
                </div>
            `;
        }

        // Simulate Neural Network inference delay (1.5 seconds)
        setTimeout(() => {
            // Select random waste object from predefined dataset
            const randomIndex = Math.floor(Math.random() * predefinedWasteDataset.length);
            const detectedItem = predefinedWasteDataset[randomIndex];
            
            // Random confidence score between 90.0% and 99.8%
            const confidence = (90 + Math.random() * 9.8).toFixed(1);

            // Remove laser scan animation
            if (scannerLine) scannerLine.classList.remove("active");

            // Render Output Results
            if (camOverlay) {
                camOverlay.innerHTML = `
                    <div class="ai-output-box text-start my-2 animate__animated animate__fadeIn">
                        <div class="d-flex align-items-center justify-content-between mb-2">
                            <h5 class="fw-bold mb-0 text-white"><i class="fa-solid ${detectedItem.icon} text-primary me-2"></i> ${detectedItem.name}</h5>
                            <span class="badge bg-success rounded-pill px-2 py-1"><i class="fa-solid fa-shield-halved me-1"></i> ${confidence}% Confidence</span>
                        </div>
                        <div class="row g-2 text-dark mt-2">
                            <div class="col-6">
                                <div class="p-2 bg-glass-card rounded-3 border border-glass">
                                    <small class="text-muted d-block fw-bold">Waste Category</small>
                                    <span class="fw-bold text-emerald small"><i class="fa-solid fa-layer-group me-1"></i> ${detectedItem.category}</span>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="p-2 bg-glass-card rounded-3 border border-glass">
                                    <small class="text-muted d-block fw-bold">Correct Bin</small>
                                    <span class="badge ${detectedItem.binBadgeClass} small"><i class="fa-solid fa-dumpster me-1"></i> ${detectedItem.bin}</span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-2 p-2 rounded-3 bg-dark-subtle text-white small border border-secondary">
                            <strong><i class="fa-solid fa-circle-info text-info me-1"></i> Recommendation:</strong> ${detectedItem.recommendation}
                        </div>
                    </div>
                `;
            }

            if (camStatus) camStatus.innerText = `✅ Classification Complete (${confidence}% Confidence)`;
            
            // Reset button state
            simCamBtn.disabled = false;
            simCamBtn.innerHTML = `<i class="fa-solid fa-aperture me-1"></i> Scan Next Object`;

            showToast(`🤖 Camera Vision: Recognized ${detectedItem.name} (${confidence}%)`);
        }, 1500);
    });
}

/* =============================================================
   B. AI VOICE RECOGNITION ASSISTANT LOGIC
============================================================= */
function initVoiceRecognitionAssistant() {
    const startBtn = document.getElementById("startVoiceSimBtn");
    const stopBtn = document.getElementById("stopVoiceSimBtn");
    const langSelect = document.getElementById("voiceLangSelect");
    const micContainer = document.getElementById("micPulseContainer");
    const equalizer = document.getElementById("audioEqualizer");
    const voiceOverlay = document.getElementById("voiceOverlayBox");
    const voiceStatus = document.getElementById("voiceStatusText");
    const micIcon = document.getElementById("micIconMain");

    if (!startBtn) return;

    // Check for browser Web Speech API support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    function setListeningUI(listening) {
        if (listening) {
            if (micContainer) micContainer.classList.add("listening");
            if (equalizer) equalizer.classList.add("active");
            if (startBtn) startBtn.disabled = true;
            if (stopBtn) stopBtn.disabled = false;
            if (micIcon) micIcon.className = "fa-solid fa-microphone-lines text-white";
            if (voiceStatus) voiceStatus.innerText = "Status: Listening... Speak waste item name";
        } else {
            if (micContainer) micContainer.classList.remove("listening");
            if (equalizer) equalizer.classList.remove("active");
            if (startBtn) startBtn.disabled = false;
            if (stopBtn) stopBtn.disabled = true;
            if (micIcon) micIcon.className = "fa-solid fa-microphone-lines";
            if (voiceStatus) voiceStatus.innerText = "Status: Speech engine ready";
        }
    }

    function processRecognizedText(transcript) {
        setListeningUI(false);

        const text = transcript.trim().toLowerCase();
        let matchedItem = null;

        // Search dataset for matching keywords
        for (const item of predefinedWasteDataset) {
            for (const kw of item.keywords) {
                if (text.includes(kw.toLowerCase()) || kw.toLowerCase().includes(text)) {
                    matchedItem = item;
                    break;
                }
            }
            if (matchedItem) break;
        }

        if (matchedItem) {
            renderVoiceResult(matchedItem, transcript);
            showToast(`🗣️ Voice Assistant: Recognized '${matchedItem.name}'`);
        } else {
            if (voiceOverlay) {
                voiceOverlay.innerHTML = `
                    <div class="ai-output-box text-start my-2 animate__animated animate__fadeIn border-warning">
                        <div class="d-flex align-items-center gap-2 mb-2 text-warning">
                            <i class="fa-solid fa-triangle-exclamation fs-4"></i>
                            <h6 class="fw-bold mb-0">Unrecognized Item: "${transcript}"</h6>
                        </div>
                        <p class="text-secondary small mb-1">Could not match spoken item with our primary waste dataset.</p>
                        <small class="text-muted">Try speaking items like: <em>Banana Peel, Plastic Bottle, Battery, Newspaper, Mobile Phone</em></small>
                    </div>
                `;
            }
            showToast(`⚠️ Voice input '${transcript}' not found in database.`);
        }
    }

    function renderVoiceResult(item, originalTranscript) {
        if (!voiceOverlay) return;
        voiceOverlay.innerHTML = `
            <div class="ai-output-box text-start my-2 animate__animated animate__fadeIn">
                <div class="d-flex align-items-center justify-content-between mb-2">
                    <h5 class="fw-bold mb-0 text-success"><i class="fa-solid ${item.icon} me-2"></i> ${item.name}</h5>
                    <span class="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2 py-1"><i class="fa-solid fa-microphone me-1"></i> Verified Speech</span>
                </div>
                <div class="mb-2 text-muted small">
                    <i class="fa-solid fa-quote-left me-1"></i> User Said: <strong class="text-dark">"${originalTranscript}"</strong>
                </div>
                <div class="row g-2 mt-1">
                    <div class="col-6">
                        <div class="p-2 bg-glass-card rounded-3 border border-glass">
                            <small class="text-muted d-block fw-bold">Category</small>
                            <span class="fw-bold text-emerald small"><i class="fa-solid fa-layer-group me-1"></i> ${item.category}</span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="p-2 bg-glass-card rounded-3 border border-glass">
                            <small class="text-muted d-block fw-bold">Correct Bin</small>
                            <span class="badge ${item.binBadgeClass} small"><i class="fa-solid fa-dumpster me-1"></i> ${item.bin}</span>
                        </div>
                    </div>
                </div>
                <div class="mt-2 p-2 rounded-3 bg-success-subtle text-success-emphasis small border border-success-subtle">
                    <strong><i class="fa-solid fa-check-circle me-1"></i> Recommendation:</strong> ${item.recommendation}
                </div>
            </div>
        `;
    }

    // Initialize Web Speech API if supported
    if (SpeechRecognition) {
        speechRecognitionInstance = new SpeechRecognition();
        speechRecognitionInstance.continuous = false;
        speechRecognitionInstance.interimResults = false;

        speechRecognitionInstance.onstart = function () {
            setListeningUI(true);
            if (voiceOverlay) {
                voiceOverlay.innerHTML = `
                    <div class="py-2 text-success fw-bold animate__animated animate__pulse animate__infinite">
                        <i class="fa-solid fa-microphone fa-beat-fade me-2"></i> Listening... Speak waste item name
                    </div>
                `;
            }
        };

        speechRecognitionInstance.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            processRecognizedText(transcript);
        };

        speechRecognitionInstance.onerror = function (event) {
            setListeningUI(false);
            if (voiceOverlay) {
                voiceOverlay.innerHTML = `
                    <div class="p-2 text-danger small">
                        <i class="fa-solid fa-circle-exclamation me-1"></i> Speech recognition error (${event.error}). Try sample chips below.
                    </div>
                `;
            }
            showToast("⚠️ Microphone access error or permission denied.");
        };

        speechRecognitionInstance.onend = function () {
            setListeningUI(false);
        };
    }

    // Start Listening Handler
    startBtn.addEventListener("click", function () {
        const selectedLang = langSelect ? langSelect.value : "en-US";

        if (SpeechRecognition && speechRecognitionInstance) {
            try {
                speechRecognitionInstance.lang = selectedLang;
                speechRecognitionInstance.start();
            } catch (e) {
                // If recognition is already active or fails, restart gracefully
                speechRecognitionInstance.stop();
                setListeningUI(true);
            }
        } else {
            // Fallback Voice Simulation if Web Speech API is restricted/unsupported
            setListeningUI(true);
            if (voiceOverlay) {
                voiceOverlay.innerHTML = `
                    <div class="py-2 text-success fw-bold animate__animated animate__pulse animate__infinite">
                        <i class="fa-solid fa-microphone fa-beat-fade me-2"></i> Simulated Speech Engine active...
                    </div>
                `;
            }

            setTimeout(() => {
                const sampleItems = ["Banana Peel", "Plastic Bottle", "Battery", "Newspaper", "Mobile Phone"];
                const randomSample = sampleItems[Math.floor(Math.random() * sampleItems.length)];
                processRecognizedText(randomSample);
            }, 2000);
        }
    });

    // Stop Listening Handler
    if (stopBtn) {
        stopBtn.addEventListener("click", function () {
            if (SpeechRecognition && speechRecognitionInstance) {
                try {
                    speechRecognitionInstance.stop();
                } catch (e) {}
            }
            setListeningUI(false);
            if (voiceOverlay) {
                voiceOverlay.innerHTML = `
                    <h6 class="fw-bold mb-1">Voice Recognition Stopped</h6>
                    <p class="text-secondary small mb-0">Click "Start Listening" to try again.</p>
                `;
            }
        });
    }

    // Sample Voice Query Chips Handler (Fallback / Interactive Testing)
    document.querySelectorAll(".voice-sample-chip").forEach(chip => {
        chip.addEventListener("click", function () {
            const sampleName = this.dataset.sample || this.innerText;
            setListeningUI(true);
            if (voiceOverlay) {
                voiceOverlay.innerHTML = `
                    <div class="py-2 text-success fw-bold animate__animated animate__pulse">
                        <i class="fa-solid fa-microphone me-2"></i> Voice Query: "${sampleName}"
                    </div>
                `;
            }
            setTimeout(() => {
                processRecognizedText(sampleName);
            }, 800);
        });
    });
}


/* -------------------------------------------------------------
   8. Python Code Copy Handler
------------------------------------------------------------- */
function initCodeModalCopy() {
    const copyBtns = document.querySelectorAll("#copyPythonCodeBtn");
    copyBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            const codeBlock = document.getElementById("pythonCodeBlockOnPage") || document.getElementById("pythonCodeBlock");
            if (codeBlock) {
                navigator.clipboard.writeText(codeBlock.innerText).then(() => {
                    showToast("📋 Python code copied to clipboard!");
                });
            }
        });
    });
}

/* -------------------------------------------------------------
   9. Toast Notification Utility
------------------------------------------------------------- */
function showToast(msg) {
    let toast = document.getElementById("customToast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "customToast";
        toast.className = "toast-custom";
        document.body.appendChild(toast);
    }

    toast.innerHTML = `<i class="fa-solid fa-bell text-success"></i> <span>${msg}</span>`;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3200);
}

/* -------------------------------------------------------------
   10. Back to Top Button
------------------------------------------------------------- */
function initBackToTop() {
    const topBtn = document.getElementById("backToTopBtn");
    if (!topBtn) return;

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            topBtn.classList.add("show");
        } else {
            topBtn.classList.remove("show");
        }
    });

    topBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

}
