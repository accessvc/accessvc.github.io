document.addEventListener("DOMContentLoaded", function () {
    const galleryContainer = document.getElementById("gallery");

    // Use the Airtable shared view URL (replace with your actual shared view URL)
    const airtableViewUrl = 'https://airtable.com/appx7QfA2O5a9bGX3/shrWlRpLOJktCEPto';

    // Fetch the shared view page
    fetch(airtableViewUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();  // We expect HTML text
        })
        .then(html => {
            // Create a temporary DOM element to parse the HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Extract data (titles, images, links) from the shared view HTML
            const rows = doc.querySelectorAll('.some-row-selector');  // Adjust selector based on the actual structure
            rows.forEach(row => {
                const title = row.querySelector('.title-selector').innerText;
                const imageUrl = row.querySelector('.image-selector').src;
                const linkUrl = row.querySelector('.link-selector').href;

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
