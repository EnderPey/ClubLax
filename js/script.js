// Function to handle tab switching
function handleTabSwitch(event) {
    event.preventDefault(); // Prevent default link behavior

    // Get the clicked tab and its associated content
    const tabId = event.target.getAttribute('data-tab');
    const tabs = document.querySelectorAll('.tabs li a');
    const contents = document.querySelectorAll('.tab-content');

    // Remove active class from all tabs and contents
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    // Add active class to the clicked tab and corresponding content
    event.target.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Add event listeners to all tabs
document.querySelectorAll('.tabs li a').forEach(tab => {
    tab.addEventListener('click', handleTabSwitch);
});

// Set default tab to be active
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.tabs li a').classList.add('active');
    document.querySelector('.tab-content').classList.add('active');
});


document.addEventListener('DOMContentLoaded', function() {
    const ROSTER_CSV_URL = 'csv/Roster.csv'; // Update with your roster CSV URL
    const SCHEDULE_CSV_URL = 'csv/Schedule.csv'; // Update with your schedule CSV URL

    function fetchCSV(url, tableID) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                const rows = data.split('\n').map(row => row.split(','));
                const table = document.getElementById(tableID).getElementsByTagName('tbody')[0];
                table.innerHTML = ''; // Clear the table before inserting new data

                rows.forEach((row, rowIndex) => {
                    if (row.length === 0) return; // Skip empty rows
                    const tr = document.createElement('tr');
                    row.forEach((cell, cellIndex) => {
                        
                        
                        const cellElement = document.createElement('td');
                        cellElement.textContent = cell.trim();
                        tr.appendChild(cellElement);
                    });
                    table.appendChild(tr);
                });
            })
            .catch(error => console.error('Error fetching CSV data:', error));
    }

    // Load and display roster data
    fetchCSV(ROSTER_CSV_URL, 'roster-table');

    // Load and display schedule data
    fetchCSV(SCHEDULE_CSV_URL, 'schedule-table');
});

document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const carouselImages = document.querySelector('.carousel-images');
    const images = Array.from(carouselImages.querySelectorAll('img'));

    // Clone the first and last images to create a seamless loop
    const firstImage = images[0].cloneNode(true);
    const lastImage = images[images.length - 1].cloneNode(true);
    carouselImages.appendChild(firstImage);
    carouselImages.insertBefore(lastImage, images[0]);

    const clonedImages = Array.from(carouselImages.querySelectorAll('img'));
    let index = 1; // Start at the first original image
    const totalImages = clonedImages.length;

    function updateCarousel() {
        const offset = -index * 100;
        carouselImages.style.transform = `translateX(${offset}%)`;
        
        // Handle transition wrapping
        if (index === 0) {
            setTimeout(() => {
                carouselImages.style.transition = 'none';
                carouselImages.style.transform = `translateX(-${(totalImages - 2) * 100}%)`;
                index = totalImages - 2;
            }, 500); // Match this to the transition duration
        } else if (index === totalImages - 1) {
            setTimeout(() => {
                carouselImages.style.transition = 'none';
                carouselImages.style.transform = 'translateX(-100%)';
                index = 1;
            }, 500); // Match this to the transition duration
        }
    }

    function moveToImage(newIndex) {
        if (newIndex >= 0 && newIndex < totalImages) {
            index = newIndex;
            carouselImages.style.transition = 'transform 0.5s ease';
            updateCarousel();
        }
    }

    prevButton.addEventListener('click', () => {
        moveToImage(index === 0 ? totalImages - 2 : index - 1);
    });

    nextButton.addEventListener('click', () => {
        moveToImage(index === totalImages - 1 ? 1 : index + 1);
    });

    // Initial setup
    updateCarousel();
});
