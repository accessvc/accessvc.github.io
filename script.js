document.addEventListener("DOMContentLoaded", function () {
    const galleryContainer = document.getElementById("gallery");

    const baseId = 'appx7QfA2O5a9bGX3';
    const tableId = 'tblkBviCbTghJmFsE';
    const apiKey = 'patjEEgdBQK3h4g6J.b3c8267f140e12bd10f9d630787f1693e73c93cca45d96956887007d1e6c87fe';

    fetch(`https://api.airtable.com/v0/${baseId}/${tableId}`, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
    .then(response => response.json())
    .then(data => {
        data.records.forEach(record => {
            const title = record.fields.Title;  
            const imageUrl = record.fields.Image[0].url; 
            const linkUrl = record.fields.Link;

            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');

            galleryItem.innerHTML = `
                <a href="${linkUrl}" target="_blank">
                    <img src="${imageUrl}" alt="${title}">
                    <h3>${title}</h3>
                </a>
            `;

            galleryContainer.appendChild(galleryItem);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        galleryContainer.innerHTML = `<p>Failed to load gallery. Please try again later.</p>`;
    });
});