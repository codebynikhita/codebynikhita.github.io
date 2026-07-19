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
            title: "SecureLock: AI-powered Fake Detection",
            tag: "Machine Learning & Capstone Thesis",
            tech: ["Python", "scikit-learn", "XGBoost", "Flask", "SQLite"],
            desc: `
                <p>SecureLock is a comprehensive ML-driven cybersecurity system designed to identify clone accounts and sybil nodes in digital networks.</p>
                <h4>My Core Contributions:</h4>
                <ul>
                    <li>Independently engineered the machine learning classification model using an ensemble pipeline of Random Forest, XGBoost, and k-NN.</li>
                    <li>Developed feature extraction scripts to preprocess profile activity patterns and network graphs.</li>
                    <li>Achieved 94.2% test accuracy and integrated the classifier with a Python Flask web API for real-time predictions.</li>
                </ul>
                <div class="modal-actions">
                    <a href="https://github.com/codebynikhita/securelock" target="_blank" class="btn btn-primary">View Code on GitHub</a>
                </div>
            `
        },
        weatherdata: {
            title: "WeatherData: Meteorological Big Data Analytics",
            tag: "Big Data Systems",
            tech: ["Apache Spark", "Hadoop MapReduce", "Python", "Pandas"],
            desc: `
                <p>Designed a distributed big data analytics pipeline to clean, aggregate, and query large meteorological datasets spanning multiple years.</p>
                <h4>My Core Contributions:</h4>
                <ul>
                    <li>Implemented Spark DataFrame operations to filter and group massive weather records efficiently.</li>
                    <li>Developed map and reduce functions for distributed calculation of average seasonal statistics.</li>
                    <li>Engineered automated cleaning pipelines to handle missing and anomalies in sensor data.</li>
                </ul>
                <div class="modal-actions">
                    <a href="https://github.com/codebynikhita/weather-data" target="_blank" class="btn btn-primary">View Code on GitHub</a>
                </div>
            `
        },
        payrolldbms: {
            title: "Advanced Payroll DBMS",
            tag: "Database Systems",
            tech: ["PHP", "MySQL", "Apache", "HTML/CSS"],
            desc: `
                <p>Refactored a relational database model to improve transactional performance and schema normalization.</p>
                <h4>My Core Contributions:</h4>
                <ul>
                    <li>Designed fully normalized 3NF database schemas, establishing optimized index constraints.</li>
                    <li>Programmed transactional SQL routes to handle salary slip generations and employee hours tracking.</li>
                    <li>Integrated front-end forms with back-end PHP routes, securing queries against SQL injection.</li>
                </ul>
                <div class="modal-actions">
                    <a href="https://github.com/codebynikhita/payroll-DBMS" target="_blank" class="btn btn-primary">View Code on GitHub</a>
                </div>
            `
        },
        taskflow: {
            title: "TaskFlow: Project Management Portal",
            tag: "Full Stack Systems",
            tech: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT"],
            desc: `
                <p>A collaborative project portal built to handle task distribution, status monitoring, and data exports.</p>
                <h4>My Core Contributions:</h4>
                <ul>
                    <li>Programmed secure JSON Web Token (JWT) user authentication and route guards.</li>
                    <li>Built interactive Kanban dashboards with drag-and-drop status update triggers.</li>
                    <li>Developed CSV and PDF export APIs to extract project status reports directly from MongoDB.</li>
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
            const projKey = linkHref.split('/').pop().toLowerCase().replace(/-/g, '');
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
