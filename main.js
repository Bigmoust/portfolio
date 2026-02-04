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

    oktzy: {
        title: "OKTZY",
        desc: "Video library and timestamp manager that helps organize clips, chapters, tags, and searchable timestamps for fast retrieval.",
        liveUrl: "#",
        codeUrl: "#",
        videoSrc: "./assets/projects/demos/oktzy.mp4",
        goal: "Provide a clean workflow to save, search, and reuse timestamps and clips across a personal video library.",
        features: [
            "Timestamp creation with labels and tags",
            "Search and filtering by tag / title / time ranges",
            "Export / share timestamps for reuse",
            "Clean UI for browsing library"
        ],
        tech: `
      <p><strong>Stack</strong><br>Next.js, Node.js, Database</p>
      <p><strong>Architecture</strong><br>Client UI + API + persistence layer</p>
    `,
        challenges: [
            "Consistent timestamp format across sources",
            "Fast search without bloating the UI",
            "Keeping the UX minimal but powerful"
        ]
    },

    noto: {
        title: "NOTO()",
        desc: "Rich text editor & note app to organize thoughts, structure knowledge, and keep what matters accessible.",
        liveUrl: "#",
        codeUrl: "#",
        videoSrc: "./assets/projects/demos/noto.mp4",
        goal: "Build a fast note-taking app with rich text editing, organization, and reliable persistence.",
        features: [
            "Rich text editor with formatting",
            "Notes organization (folders/tags)",
            "Search across notes",
            "Export notes"
        ],
        tech: `
      <p><strong>Stack</strong><br>JavaScript/TypeScript, Frontend UI, Storage</p>
      <p><strong>Architecture</strong><br>Editor component + persistence + search indexing</p>
    `,
        challenges: [
            "Editor state management and performance",
            "Reliable persistence and restore",
            "Search indexing without lag"
        ]
    },

    guruweather: {
        title: "GURUWEATHER",
        desc: "Weather forecasting app with city search, clean forecast UI, and fast responses with caching.",
        liveUrl: "#",
        codeUrl: "#",
        videoSrc: "./assets/projects/demos/guruweather.mp4",
        goal: "Deliver a minimal, attractive weather UI with accurate forecast data and smooth browsing.",
        features: [
            "User authentication",
            "Browse catalog + book details",
            "Search and filtering",
            "Reserve and cancel reservations"
        ],
        tech: `
      <p><strong>Stack</strong><br>Frontend UI + Weather API</p>
      <p><strong>Architecture</strong><br>MVC with a layered structure</p>
    `,
        challenges: [
            "Preventing double reservations",
            "Keeping availability accurate",
            "Catalog search performance"
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
