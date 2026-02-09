const modal = document.getElementById("projectModal");
const closeBtn = modal.querySelector(".project-modal__close");

const pmTitle = document.getElementById("pmTitle");
const pmDesc = document.getElementById("pmDesc");
const pmGoal = document.getElementById("pmGoal");
const pmFeatures = document.getElementById("pmFeatures");
const pmTech = document.getElementById("pmTech");
const pmChallenges = document.getElementById("pmChallenges");


const pmVideo = document.getElementById("pmVideo");
const pmVideoSrc = document.getElementById("pmVideoSrc");

const PROJECTS = {
    bibligo: {
        title: "BIBLIGO",
        desc: "Bibligo is a web application for libraries that lets patrons browse a catalog and reserve books online, while enabling staff to manage availability and reservations from a centralized interface. The goal is to reduce manual handling and provide a smoother end-to-end reservation experience.",
        videoSrc: "./assets/projects/demos/bibligo.mp4",
        goal: [
            "Digitize the book reservation process and streamline the user flow from discovery to reservation.",
            "Provide a clear management view for tracking catalog availability and reservation requests"
        ],
        features: [
            "User authentication",
            "Browse catalog + book details",
            "Search and filtering",
            "Reserve and cancel reservations"
        ],
        tech: `
      <p><strong>Java (JavaFX)</strong><br>desktop application</p>
      <p><strong>Architecture</strong><br>Bot service + REST API backend + dashboard UI</p>
    `,
        challenges: [
            "Preventing double reservations",
            "Keeping availability accurate",
            "Catalog search performance"
        ]
    },

    AIPROJECTCRITIC: {
        title: "AI-PROJECT-CRITIC",
        desc: "AI Project Critic is a static-analysis dashboard that reviews a Python repository in minutes. " +
            "You upload a .zip, the tool scans the codebase for lint issues, security risks then outputs a quality score plus a prioritized action plan.",
        videoSrc: "./assets/projects/demos/bp.mp4",
        goal: [
            "Provide a fast, standardized code review for Python projects.",
            "Transform multiple tools into one actionable dashboard (score + priorities).",
            "Help developers quickly identify security risks and maintainability bottlenecks."
        ],
        features: [
            "Upload repo (.zip) and run automated review",
            "Quality scoring: Overall / Maintainability / Security",
            "Export / share timestamps for reuse",
            "Export report (report.md) for sharing / documentation"
        ],
        tech: `
      <p><strong>Python</strong><br>Streamlit,Pandas</p>
      <p><strong>Architecture</strong><br>Extract ZIP → Scan Pipeline → Normalize Findings → Scoring → Report Export</p>
    `,
        challenges: [
            "Normalizing outputs from different tools into a single findings schema",
            "Keeping summaries evidence-based to reduce “hallucinations”",
            "Windows PATH issues, venv, sys.executable"
        ]
    },

    MessyMLPipeline:{
        title: "Messy ML Pipeline (Titanic)",
        desc: "End-to-end machine learning pipeline built for messy real-world tabular data. Includes schema validation and cleaning policies, baseline vs model evaluation, batch inference, drift monitoring (PSI), and an automated retraining orchestrator exposed via a FastAPI service.",
        videoSrc: "./assets/projects/demos/Titanic.mp4",
        goal: [
            "Build a production-like ML workflow: from messy ingestion to a deployable inference service.",
            "Ensure reproducibility and safety through validation + artifacts (metrics, drift report, model bundle)."
        ],
        features: [
            "Schema validation (Pandera) + cleaning policies (type coercion, outlier capping)",
            "Feature engineering (imputation + one-hot encoding)",
            "Training: baseline vs logistic regression + persisted model bundle",
            "Drift monitoring: PSI reference vs current + retrain trigger"
        ],
        tech: `
      <p><strong>Python</strong><br>Pandas, NumPy, scikit-learn</p>
      <p><strong>Architecture</strong><br>Titanic dataset → validation → training → drift (PSI) → retrain + FastAPI</p>
    `,
        challenges: [
            "Handling messy data safely (types, missing, outliers) without leaking target information",
            "Keeping train/test feature alignment stable after one-hot encoding",
            "Making retrain orchestration robust (using venv python + stop-on-failure)"
        ],

    },

    MINI_LLM: {
        title: "MINI LLM",
        desc: "Mini LLM is a lightweight decoder-only Transformer trained for next-character prediction on a text corpus. It generates theatrical-style dialogue using temperature + top-k sampling and exposes inference through a FastAPI endpoint for interactive testing. The project focuses on end-to-end AI engineering: model implementation, training pipeline (AMP + checkpointing), and an API layer for deployment-style usage.",
        videoSrc: "./assets/projects/demos/MINI_LLM.mp4",
        goal: "Build a minimal, end-to-end LLM system—from scratch Transformer implementation to a usable inference API.",
        features: [
            "Decoder-only Transformer with causal self-attention",
            "Character-level tokenizer + dataset pipeline (context window / block size)",
            "Training loop with validation, checkpointing, and gradient clipping",
            "GPU acceleration support (AMP / TF32) for faster training"
        ],
        tech: `
      <p><strong>Python</strong><br>PyTorch</p>
      <p><strong>FastAPI</strong><br>Uvicorn</p>
      <p><strong>Architecture</strong><br>model.py , train.py , api.py </p>
    `,
        challenges: [
            "Stabilizing training with small models (loss spikes → grad clipping + AMP)",
            "Keeping inference responsive (limiting max tokens, safe defaults)",
            "Handling unknown characters / prompt constraints in a char-level tokenizer"
        ]
    }
};

function fillList(ul, items){
    ul.innerHTML = "";
    items.forEach(t => {
        const li = document.createElement("li");
        li.textContent = t;
        ul.appendChild(li);
    });
}

function openProject(key){
    const p = PROJECTS[key];
    if (!p) return;

    pmTitle.textContent = p.title;
    pmDesc.textContent = p.desc;

    pmGoal.textContent = p.goal;
    fillList(pmFeatures, p.features);
    pmTech.innerHTML = p.tech;
    fillList(pmChallenges, p.challenges);


    // video
    pmVideo.pause();
    pmVideo.currentTime = 0;
    pmVideoSrc.src = p.videoSrc || "";
    pmVideo.load();

    modal.showModal();
}

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => openProject(card.dataset.project));
});

// Close
closeBtn.addEventListener("click", () => {
    pmVideo.pause();
    modal.close();
});

// Click outside
modal.addEventListener("click", (e) => {
    const rect = modal.getBoundingClientRect();
    const outside =
        e.clientX < rect.left || e.clientX > rect.right ||
        e.clientY < rect.top  || e.clientY > rect.bottom;
    if (outside){
        pmVideo.pause();
        modal.close();
    }
});

// Esc
modal.addEventListener("close", () => {
    pmVideo.pause();
});
modal.querySelector(".project-modal__close");
closeBtn.addEventListener("click", () => {
    pmVideo.pause();
    modal.close();
});
const progressBar = document.getElementById("scrollProgressBar");

// Si tu scroll sur la page entière
function updateScrollProgress(){
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;

    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();
