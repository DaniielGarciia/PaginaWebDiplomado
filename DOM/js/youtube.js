// Constante para almacenar videos predefinidos por categorías de búsqueda.
const videoLibrary = {

    // ── Carga inicial por defecto ───────────────────────────────
    default: [
        { id: 'zBLZikzobso', title: 'Familia de instrumentos musicales',     channel: 'Educación Musical'  },
        { id: 'tPp0gQEV_-s', title: 'Instrumentos de Cuerda – Familia',      channel: 'Música y Educación' },
        { id: 'ieIxVtCGcLs', title: 'Instrumentos de Percusión',              channel: 'Educación Musical'  },
        { id: 's-bONWCVPbI', title: 'Instrumentos de Viento',                 channel: 'Aprende Música'     },
        { id: 'oa-RhA_59Vc', title: 'Mi Primera Batería',                     channel: 'DanMusic'           },
        { id: 'F6ge8PeSI_o', title: 'Guitarra para principiantes',            channel: 'DanMusic'           },
    ],

    // ── Instrumentos de Cuerda ──────────────────────────────────
    'familia instrumentos cuerda': [
        { id: 'tPp0gQEV_-s', title: 'Instrumentos de Cuerda',                channel: 'Educación Musical'  },
        { id: 'zBLZikzobso', title: 'Familia de instrumentos – Resumen',      channel: 'Educación Musical'  },
        { id: 'F6ge8PeSI_o', title: 'Guitarra para principiantes',            channel: 'DanMusic'           },
        { id: 'oa-RhA_59Vc', title: 'Cuerdas en la batería',                  channel: 'DanMusic'           },
        { id: 'ieIxVtCGcLs', title: 'Percusión y cuerda combinadas',          channel: 'Educación Musical'  },
        { id: 's-bONWCVPbI', title: 'Viento y Cuerda en la orquesta',         channel: 'Aprende Música'     },
    ],

    // ── Instrumentos de Viento ──────────────────────────────────
    'instrumentos de viento madera': [
        { id: 's-bONWCVPbI', title: 'Instrumentos de Viento',                 channel: 'Aprende Música'     },
        { id: 'zBLZikzobso', title: 'Viento en la familia de instrumentos',   channel: 'Educación Musical'  },
        { id: 'tPp0gQEV_-s', title: 'Familias: Viento y Cuerda',              channel: 'Música y Educación' },
        { id: 'ieIxVtCGcLs', title: 'Percusión y Viento – Comparación',       channel: 'Educación Musical'  },
        { id: 'F6ge8PeSI_o', title: 'Introducción a instrumentos de viento',  channel: 'DanMusic'           },
        { id: 'oa-RhA_59Vc', title: 'Ritmo y melodía con vientos',            channel: 'DanMusic'           },
    ],

    // ── Instrumentos de Percusión ───────────────────────────────
    'bateria percusion tutorial': [
        { id: 'ieIxVtCGcLs', title: 'Instrumentos de Percusión',              channel: 'Educación Musical'  },
        { id: 'oa-RhA_59Vc', title: 'Mi Primera Batería',                     channel: 'DanMusic'           },
        { id: 'zBLZikzobso', title: 'Percusión en la familia musical',        channel: 'Educación Musical'  },
        { id: 's-bONWCVPbI', title: 'Ritmo: Viento y Percusión',              channel: 'Aprende Música'     },
        { id: 'tPp0gQEV_-s', title: 'Batería y cuerda – Ritmo combinado',     channel: 'Música y Educación' },
        { id: 'F6ge8PeSI_o', title: 'Bases rítmicas para guitarra',           channel: 'DanMusic'           },
    ],

    // ── Instrumentos Electrónicos ───────────────────────────────
    'piano electronico sintetizador': [
        { id: 'F6ge8PeSI_o', title: 'Piano para principiantes',               channel: 'DanMusic'           },
        { id: 'zBLZikzobso', title: 'Electrónicos en la familia musical',     channel: 'Educación Musical'  },
        { id: 'tPp0gQEV_-s', title: 'Cuerdas y teclas – Comparación',         channel: 'Música y Educación' },
        { id: 'oa-RhA_59Vc', title: 'Batería electrónica vs acústica',        channel: 'DanMusic'           },
        { id: 's-bONWCVPbI', title: 'Viento electrónico – EWI',               channel: 'Aprende Música'     },
        { id: 'ieIxVtCGcLs', title: 'Percusión electrónica',                  channel: 'Educación Musical'  },
    ],

    // ── Música Clásica / Orquesta ───────────────────────────────
    'musica clasica orquesta': [
        { id: 'zBLZikzobso', title: 'Familia de instrumentos en la orquesta', channel: 'Educación Musical'  },
        { id: 's-bONWCVPbI', title: 'Vientos en la orquesta clásica',         channel: 'Aprende Música'     },
        { id: 'tPp0gQEV_-s', title: 'Cuerdas en la orquesta sinfónica',       channel: 'Música y Educación' },
        { id: 'ieIxVtCGcLs', title: 'Percusión orquestal',                    channel: 'Educación Musical'  },
        { id: 'F6ge8PeSI_o', title: 'Piano clásico – Introducción',           channel: 'DanMusic'           },
        { id: 'oa-RhA_59Vc', title: 'Batería y orquesta – Ritmo',             channel: 'DanMusic'           },
    ],

    // ── Tutoriales para principiantes ───────────────────────────
    'como aprender guitarra principiantes': [
        { id: 'F6ge8PeSI_o', title: 'Guitarra para principiantes',            channel: 'DanMusic'           },
        { id: 'tPp0gQEV_-s', title: 'Instrumentos de Cuerda – Primeros pasos',channel: 'Música y Educación' },
        { id: 'oa-RhA_59Vc', title: 'Primeros pasos con la batería',          channel: 'DanMusic'           },
        { id: 'zBLZikzobso', title: 'Familias musicales para empezar',        channel: 'Educación Musical'  },
        { id: 's-bONWCVPbI', title: 'Instrumentos de viento para principiantes', channel: 'Aprende Música'  },
        { id: 'ieIxVtCGcLs', title: 'Percusión básica para comenzar',         channel: 'Educación Musical'  },
    ],
};

// ── Referencias al DOM ──────────────────────────────────────────
const ytGrid   = document.getElementById('yt-grid');
const ytStatus = document.getElementById('yt-status');
const ytModal  = document.getElementById('yt-modal');
const ytIframe = document.getElementById('yt-modal-iframe');

// ── Renderizar tarjetas de video ────────────────────────────────
function renderVideoCards(videos) {
    ytStatus.className   = '';
    ytStatus.textContent = '';
    ytGrid.innerHTML     = '';

    // Limpiar nota extra si existía de búsqueda anterior
    const oldNote = document.getElementById('yt-search-note');
    if (oldNote) oldNote.remove();

    if (!videos || !videos.length) {
        ytStatus.textContent = 'No se encontraron videos para esta búsqueda.';
        return;
    }

    videos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'yt-card';
        card.innerHTML = `
            <div class="yt-thumb-wrap">
                <img src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg"
                     alt="${video.title}" loading="lazy"
                     onerror="this.src='https://img.youtube.com/vi/${video.id}/default.jpg'">
                <div class="yt-play-icon">
                    <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
            </div>
            <div class="yt-info">
                <div class="yt-title">${video.title}</div>
                <div class="yt-channel">${video.channel}</div>
            </div>
        `;
        card.addEventListener('click', () => openVideoModal(video.id, video.title));
        ytGrid.appendChild(card);
    });
}

// ── Abrir modal con el video seleccionado ───────────────────────
function openVideoModal(videoId, videoTitle) {
    // Intentar con embed; si falla (no embeddable) el iframe muestra
    // el error de YouTube con el enlace "Mirar en YouTube".
    ytIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    ytModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

// ── Cerrar modal ────────────────────────────────────────────────
function closeVideoModal() {
    ytIframe.src = '';
    ytModal.classList.remove('open');
    document.body.style.overflow = '';
}

document.getElementById('yt-modal-close').addEventListener('click', closeVideoModal);
ytModal.addEventListener('click', e => { if (e.target === ytModal) closeVideoModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeVideoModal(); });

// ── Lógica de búsqueda ──────────────────────────────────────────
function searchVideos(query) {
    ytStatus.className   = 'loading';
    ytStatus.textContent = 'Buscando videos…';
    ytGrid.innerHTML     = '';

    const oldNote = document.getElementById('yt-search-note');
    if (oldNote) oldNote.remove();

    setTimeout(() => {
        const q = query.toLowerCase().trim();

        // 1. Coincidencia exacta con clave de la biblioteca
        if (videoLibrary[q]) {
            renderVideoCards(videoLibrary[q]);
            return;
        }

        // 2. Coincidencia aproximada por palabras clave (mínimo 3 letras)
        const matchKey = Object.keys(videoLibrary).find(key =>
            key !== 'default' &&
            (key.includes(q) || q.split(' ').some(w => w.length >= 3 && key.includes(w)))
        );

        if (matchKey) {
            renderVideoCards(videoLibrary[matchKey]);
            return;
        }

        // 3. Sin coincidencia: mostrar videos por defecto + enlace a YouTube
        renderVideoCards(videoLibrary.default);

        const note = document.createElement('div');
        note.id = 'yt-search-note';
        note.style.cssText = 'text-align:center; margin-top:20px; font-size:13px; color:#888;';
        note.innerHTML = `
            Mostrando videos recomendados. Para buscar
            "<strong>${query}</strong>" en tiempo real:
            <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(query)}"
               target="_blank"
               style="color:#1a73e8; margin-left:4px; font-weight:600;">
                Ver en YouTube →
            </a>
        `;
        ytGrid.after(note);
    }, 500);
}

// ── Eventos de búsqueda ─────────────────────────────────────────
document.getElementById('yt-search-btn').addEventListener('click', () => {
    const q = document.getElementById('yt-search-input').value.trim();
    if (q) searchVideos(q);
});

document.getElementById('yt-search-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        const q = e.target.value.trim();
        if (q) searchVideos(q);
    }
});

document.querySelectorAll('.yt-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('yt-search-input').value = btn.dataset.q;
        searchVideos(btn.dataset.q);
    });
});

// ── Carga inicial con videos por defecto ────────────────────────
renderVideoCards(videoLibrary.default);