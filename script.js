document.addEventListener("DOMContentLoaded", function () {
    const galleryContainer = document.getElementById("gallery");

    // Your Airtable base and table info
    const baseId = 'appx7QfA2O5a9bGX3';
    const tableId = 'tblkBviCbTghJmFsE';
    const apiKey = 'patjEEgdBQK3h4g6J.b3c8267f140e12bd10f9d630787f1693e73c93cca45d96956887007d1e6c87fe';

    // Fetch data from Airtable
    fetch(`https://api.airtable.com/v0/${baseId}/${tableId}`, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
    .then(response => response.json())
    .then(data => {
        // Loop through the records and create the gallery
        data.records.forEach(record => {
            const title = record.fields.Title;
            const imageUrl = record.fields.Display[0].url; // Adjust field name to match your actual data
            const linkUrl = record.fields['Link to Access'];

            // Create a gallery item
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');

            galleryItem.innerHTML = `
                <a href="${linkUrl}" target="_blank">
                    <img src="${imageUrl}" alt="${title}">
                    <h3>${title}</h3>
                </a>
            `;

            // Append to the gallery container
            galleryContainer.appendChild(galleryItem);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        galleryContainer.innerHTML = `<p>Failed to load gallery. Please try again later.</p>`;
    });
});
