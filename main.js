// ==========================================================================
// 1. MOTOR DEL CURSOR MUTABLE
// ==========================================================================
const cursor = document.querySelector('.custom-cursor');

window.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
});

// Reacción elástica en elementos clicables
const elementosClicables = '.msg-icon-circle-btn, .download-icon-circle-btn, .btn-connect, .nav-logo, .nav-links a, .modal-close-btn, .symmetric-project-card, .icon-box-item';

document.querySelectorAll(elementosClicables).forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.backgroundColor = 'var(--accent-color)'; 
        cursor.style.width = '16px';                        
        cursor.style.height = '16px';
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.backgroundColor = '#121212';            
        cursor.style.width = '10px';                        
        cursor.style.height = '10px';
    });
});

// ==========================================================================
// 2. CONTROL DE CAPAS: APERTURA ASÍNCRONA MEDIANTE FETCH (MODAL DE PROYECTOS)
// ==========================================================================
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-dynamic-content');

function openProject(projectId) {
    fetch(`projects/${projectId}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`No se pudo cargar la ficha: projects/${projectId}.html`);
            }
            return response.text();
        })
        .then(htmlContent => {
            modalContent.innerHTML = htmlContent;
            modal.classList.add('is-active');
            document.body.style.overflow = 'hidden'; 
        })
        .catch(error => {
            console.error('Error en el fetch de proyectos:', error);
            modalContent.innerHTML = `
                <div style="text-align:center; padding:4rem 2rem; font-family:var(--font-mono);">
                    <p style="color:var(--accent-color); font-weight:bold; margin-bottom:1rem;">✦ Error 404 ✦</p>
                    <p style="font-size:0.9rem; color:var(--text-muted);">No he podido encontrar el archivo "projects/${projectId}.html". Asegúrate de haber creado la carpeta y de que los nombres coinciden exactamente.</p>
                </div>
            `;
            modal.classList.add('is-active');
        });
}

function closeProject() {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
}

// ==========================================================================
// 3. CONTROL DEL LIGHTBOX DE VÍDEOS
// ==========================================================================
function openVideoModal(videoUrl) {
    const lightbox = document.getElementById('videoLightbox');
    const iframe = document.getElementById('lightboxIframe');
    
    if (lightbox && iframe) {
        iframe.src = videoUrl;
        lightbox.classList.add('is-active'); // Sincronizado con la clase del CSS
        document.body.style.overflow = 'hidden'; 
    }
}

function closeVideoModal() {
    const lightbox = document.getElementById('videoLightbox');
    const iframe = document.getElementById('lightboxIframe');
    
    if (lightbox && iframe) {
        iframe.src = ''; 
        lightbox.classList.remove('is-active'); // Sincronizado con la clase del CSS
        document.body.style.overflow = ''; 
    }
}

// ==========================================================================
// 4. CIERRE GLOBAL CON TECLA ESCAPE
// ==========================================================================
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProject();
        closeVideoModal();
    }
});