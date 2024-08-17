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
        const sortedRecords = data.records.sort((a, b) => {
            return (a.fields.Sort || 0) - (b.fields.Sort || 0);
        });

        sortedRecords.forEach(record => {
            const title = record.fields.Title;
            const imageUrl = record.fields.Display[0].url;
            const linkUrl = record.fields['Link to Access'];

            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');

            galleryItem.innerHTML = `
                <a href="${linkUrl}" target="_blank">
                    <img data-src="${imageUrl}" alt="${title}" class="lazy-load">
                    <h3>${title}</h3>
                </a>
            `;

            galleryContainer.appendChild(galleryItem);
        });

        lazyLoadImages();
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        galleryContainer.innerHTML = `<p>Failed to load gallery. Please try again later.</p>`;
    });

    function lazyLoadImages() {
        const lazyImages = document.querySelectorAll('.lazy-load');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.classList.remove('lazy-load');
                        imageObserver.unobserve(lazyImage);
                    }
                });
            });

            lazyImages.forEach(image => {
                imageObserver.observe(image);
            });
        } else {
            // Fallback for older browsers
            lazyImages.forEach(image => {
                image.src = image.dataset.src;
                image.classList.remove('lazy-load');
            });
        }
    }
});
