document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Default to light-mode (Cream & Green)
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    body.className = savedTheme;

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.className = 'light-mode';
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.className = 'dark-mode';
            localStorage.setItem('theme', 'dark-mode');
        }
    });

    // Copy Email to Clipboard
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const emailText = document.getElementById('email-text');

    if (copyEmailBtn && emailText) {
        copyEmailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(emailText.textContent.trim())
                .then(() => {
                    copyEmailBtn.classList.add('copied');
                    setTimeout(() => {
                        copyEmailBtn.classList.remove('copied');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        });
    }


    // Modal Functionality
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-container glass-panel">
            <button class="modal-close" aria-label="Close modal">&times;</button>
            <div class="modal-content-area"></div>
        </div>
    `;
    document.body.appendChild(modal);

    const modalContainer = modal.querySelector('.modal-container');
    const modalContent = modal.querySelector('.modal-content-area');
    const modalClose = modal.querySelector('.modal-close');

    function openModal(contentHTML) {
        console.log("openModal executing, adding active class to modal.");
        modalContent.innerHTML = contentHTML;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        modalContent.innerHTML = '';
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Project Cards Modal Data
    const projectData = {
        securelock: {
            title: "SecureLock: AI-Based Synthetic Media & Clone Detection",
            tag: "Machine Learning & Capstone Project",
            tech: ["Python", "scikit-learn", "XGBoost", "Random Forest", "Flask", "REST APIs"],
            desc: `
                <p>Final-year capstone project where I built the complete machine learning classification model, from data pipeline through deployment.</p>
                <h4>Key Contributions & Engineering Results:</h4>
                <ul>
                    <li>Engineered classification pipelines using an ensemble of Random Forest and XGBoost with automated feature preprocessing.</li>
                    <li>Processed 50,000+ benchmark records and achieved 94.8% precision and 0.93 F1-score.</li>
                    <li>Built and deployed a lightweight Flask-based REST service maintaining response latency below 450 ms.</li>
                </ul>
                <div class="modal-actions">
                    <a href="https://github.com/codebynikhita/securelock" target="_blank" class="btn btn-primary">View Code on GitHub</a>
                </div>
            `
        },
        weatherdata: {
            title: "WeatherData: Distributed Meteorological Big Data Query Engine",
            tag: "Distributed Systems & Big Data",
            tech: ["Apache Spark", "Hadoop MapReduce", "Python", "Pandas", "Matplotlib"],
            desc: `
                <p>Designed a distributed processing pipeline for large-scale meteorological datasets spanning multiple recording stations.</p>
                <h4>Key Contributions & Engineering Results:</h4>
                <ul>
                    <li>Implemented distributed Spark and Hadoop MapReduce jobs to process and aggregate 50+ GB of climate data (120M+ records).</li>
                    <li>Optimized distributed query execution plans and partition strategies, achieving approximately 4.2× throughput improvement.</li>
                    <li>Generated automated analytical reports and seasonal statistical aggregations using Python and Pandas.</li>
                </ul>
                <div class="modal-actions">
                    <a href="https://github.com/codebynikhita/weather-data" target="_blank" class="btn btn-primary">View Code on GitHub</a>
                </div>
            `
        },
        densetree: {
            title: "DenseTree: Memory-Optimized Search Structures",
            tag: "Systems Programming & Optimization",
            tech: ["C99", "Linux", "GDB", "Valgrind", "Memory Architecture"],
            desc: `
                <p>Implemented high-performance search tree structures in C99 with manual memory allocation and cache-conscious layout.</p>
                <h4>Key Contributions & Engineering Results:</h4>
                <ul>
                    <li>Engineered compact node representations utilizing manual memory allocation, pointer arithmetic, and block pooling.</li>
                    <li>Conducted rigorous memory profiling and runtime debugging using GDB and Valgrind to ensure leak-free operation.</li>
                    <li>Achieved approximately 28% lower memory overhead and 40% fewer cache misses through memory-layout optimizations.</li>
                </ul>
                <div class="modal-actions">
                    <a href="https://github.com/codebynikhita/Dense-tree" target="_blank" class="btn btn-primary">View Code on GitHub</a>
                </div>
            `
        },
        taskflow: {
            title: "TaskFlow: Real-Time Collaborative Sprint Management Platform",
            tag: "Full-Stack & Distributed Coordination",
            tech: ["React", "JavaScript", "Node.js", "Express", "MongoDB", "WebSockets", "JWT"],
            desc: `
                <p>A collaborative sprint-management platform featuring Kanban workflows and real-time task synchronization.</p>
                <h4>Key Contributions & Engineering Results:</h4>
                <ul>
                    <li>Implemented secure JWT-based authentication, role-based access control, and protected Express API routes.</li>
                    <li>Integrated real-time bidirectional communication via WebSockets for dynamic Kanban board synchronization.</li>
                    <li>Constructed MongoDB aggregation pipelines for team velocity reporting, reducing sprint-management overhead by ~60%.</li>
                </ul>
                <div class="modal-actions">
                    <a href="https://github.com/codebynikhita/TaskFlow" target="_blank" class="btn btn-primary">View Code on GitHub</a>
                </div>
            `
        }
    };

    // Attach listeners to Project Cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            console.log("Project card click detected, target:", e.target);
            if (e.target.tagName === 'A') {
                console.log("Target is link anchor, allowing default navigation.");
                return;
            }
            const linkHref = card.querySelector('.project-link').getAttribute('href');
            const projKey = card.dataset.proj || linkHref.split('/').pop().toLowerCase().replace(/-/g, '');
            const data = projectData[projKey];
            console.log("Project key resolved:", projKey, "Data found:", !!data);
            if (data) {
                const techBadges = data.tech.map(t => `<span>${t}</span>`).join('');
                const html = `
                    <span class="project-tag" style="margin-bottom:12px; display:inline-block;">${data.tag}</span>
                    <h3 class="modal-title">${data.title}</h3>
                    <div class="project-tech" style="margin: 16px 0;">${techBadges}</div>
                    <div class="modal-description">${data.desc}</div>
                `;
                openModal(html);
            }
        });
    });

    // Certifications Modal Data
    const certFiles = {
        qlik: "certificates/Qlik_Data_Architect_Certificate.pdf",
        sap: "certificates/SAP_Exploring_BTP_Certificate.pdf",
        wipro: "certificates/Wipro_TalentNext_Certificate.pdf",
        ibm: "certificates/IBM_SkillsBuild_Certificate.pdf"
    };

    document.querySelectorAll('.cert-card').forEach((card, index) => {
        card.style.cursor = 'pointer';
        const keys = ['qlik', 'sap', 'wipro', 'ibm'];
        const key = keys[index];
        card.addEventListener('click', () => {
            console.log("Cert card click detected, key:", key);
            const certUrl = certFiles[key];
            console.log("Cert URL resolved:", certUrl);
            if (certUrl) {
                const title = card.querySelector('h3').textContent;
                const html = `
                    <h3 class="modal-title" style="margin-bottom:16px;">${title}</h3>
                    <div class="iframe-container">
                        <iframe src="${certUrl}" width="100%" height="500px" style="border:none; border-radius:8px;"></iframe>
                    </div>
                    <div class="modal-actions" style="margin-top:16px;">
                        <a href="${certUrl}" target="_blank" class="btn btn-primary">Open PDF in New Tab</a>
                    </div>
                `;
                openModal(html);
            }
        });
    });

    // Experience Card Modal (KrewsUp Certificate)
    const expCard = document.querySelector('.timeline-content');
    if (expCard) {
        expCard.style.cursor = 'pointer';
        expCard.addEventListener('click', () => {
            console.log("Experience card click detected, loading KrewsUp certificate.");
            const certUrl = "certificates/KrewsUp_Internship_Certificate.pdf";
            const title = "KrewsUp SDE Internship Certificate";
            const html = `
                <h3 class="modal-title" style="margin-bottom:16px;">${title}</h3>
                <div class="iframe-container">
                    <iframe src="${certUrl}" width="100%" height="500px" style="border:none; border-radius:8px;"></iframe>
                </div>
                <div class="modal-actions" style="margin-top:16px;">
                    <a href="${certUrl}" target="_blank" class="btn btn-primary">Open PDF in New Tab</a>
                </div>
            `;
            openModal(html);
        });
    }

    // Scroll styling for navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = 'var(--card-shadow)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
});
