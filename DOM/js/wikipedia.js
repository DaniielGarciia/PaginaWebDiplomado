const wikiPanel   = document.getElementById('wiki-panel');
const familiaBtns = document.querySelectorAll('.familia-btn');

async function fetchWikipedia(query) {
    wikiPanel.innerHTML = '<div class="wiki-loading"> Consultando en Wikipedia…</div>';

    try {
        
        const searchUrl  = `https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&srlimit=1`;
        const searchData = await (await fetch(searchUrl)).json();

        if (!searchData.query.search.length) {
            wikiPanel.innerHTML = '<p class="wiki-error"> No se encontró información sobre este tema en Wikipedia.</p>';
            return;
        }

        
        const pageTitle  = searchData.query.search[0].title;
        const summaryUrl = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`;
        const data       = await (await fetch(summaryUrl)).json();

        
        const thumb = data.thumbnail
            ? `<img class="wiki-thumb" src="${data.thumbnail.source}" alt="${data.title}">`
            : '';

        wikiPanel.innerHTML = `
            ${thumb}
            <h3>${data.title}</h3>
            <p>${data.extract || 'No hay descripción disponible.'}</p>
            <a class="wiki-link" href="${data.content_urls?.desktop?.page || '#'}" target="_blank">
                Leer artículo completo en Wikipedia →
            </a>
        `;

    } catch (err) {
        wikiPanel.innerHTML = '<p class="wiki-error"> Error al conectar con Wikipedia. Porfavor intenta de nuevo. </p>';
        console.error('Wikipedia API error:', err);
    }
}

// Acciones para los botones de la barra de navegación
familiaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        familiaBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        fetchWikipedia(btn.dataset.query);
    });
});