document.addEventListener("DOMContentLoaded", function () {
    const galleryContainer = document.getElementById("gallery");

    // Use the shared Airtable view URL (replace with your actual shared view URL)
    const airtableViewUrl = 'https://api.airtable.com/v0/YOUR_SHARED_VIEW_LINK?format=json';

    // Fetch the data from the shared view URL
    fetch(airtableViewUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Display data as a gallery
            data.records.forEach(record => {
                const title = record.fields.Title;
                const imageUrl = record.fields.Display[0].url;  // Assuming the Display field is an attachment
                const linkUrl = record.fields['Link to Access'];

                // Create gallery item
                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');

                galleryItem.innerHTML = `
                    <a href="${linkUrl}" target="_blank">
                        <img src="${imageUrl}" alt="${title}">
                        <h3>${title}</h3>
                    </a>
                `;

                // Append the gallery item to the gallery container
                galleryContainer.appendChild(galleryItem);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            galleryContainer.innerHTML = `<p>Failed to load gallery. Please try again later.</p>`;
        });
});
