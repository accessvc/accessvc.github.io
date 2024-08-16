document.addEventListener("DOMContentLoaded", function () {
    const galleryContainer = document.getElementById("gallery");

    // Airtable Configuration
    const apiKey = 'YOUR_AIRTABLE_API_KEY'; // Replace with your Airtable API key
    const baseId = 'YOUR_AIRTABLE_BASE_ID'; // Replace with your Base ID
    const tableName = 'Table 1'; // Replace with your table name
    const airtableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;

    // Fetch data from Airtable
    fetch(airtableUrl, {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    })
    .then(response => response.json())
    .then(data => {
        // Display data as a gallery
        data.records.forEach(record => {
            const title = record.fields.Title;
            const imageUrl = record.fields['Image URL'];
            const linkUrl = record.fields.Link;

            // Create gallery item
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
    .catch(error => console.error('Error fetching data:', error));
});
