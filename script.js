// Get all necessary elements
const galleryImages = document.querySelectorAll('.gallery-img');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const tabButtons = document.querySelectorAll('.tab-btn');
const gallerySections = document.querySelectorAll('.gallery-section');

let currentIndex = 0;

// Function to open modal and display clicked image
function openModal(index) {
    currentIndex = index;
    updateModalContent();
    modal.style.display = 'block';
}

// Function to update modal image and caption
function updateModalContent() {
    modalImg.src = galleryImages[currentIndex].src;
    captionText.textContent = galleryImages[currentIndex].getAttribute('data-caption');
}

// Function to close modal
function closeModal() {
    modal.style.display = 'none';
}

// Function to navigate to the next image
function nextImage() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateModalContent();
}

// Function to navigate to the previous image
function prevImage() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateModalContent();
}

// Function to switch tabs
function switchTab(event) {
    const selectedTab = event.target.getAttribute('data-tab');

    // Hide all sections and remove 'active' class from all buttons
    gallerySections.forEach(section => {
        section.classList.remove('active');
    });
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Show the selected section and add 'active' class to the clicked button
    document.getElementById(selectedTab).classList.add('active');
    event.target.classList.add('active');
}

// Event listeners for gallery images
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openModal(index));
});

// Event listener to close modal
closeBtn.addEventListener('click', closeModal);

// Event listeners for navigation buttons
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

// Close modal when clicking outside the image
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard navigation
window.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'Escape') {
            closeModal();
        }
    }
});

// Event listeners for tab buttons
tabButtons.forEach(button => {
    button.addEventListener('click', switchTab);
});
