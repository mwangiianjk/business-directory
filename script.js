// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Show all businesses initially
    const businessCards = document.querySelectorAll('.business-card');
    businessCards.forEach(card => {
        card.style.display = 'block';
    });

    // Initialize maps for business cards
    initializeMaps();

    // Initialize authentication
    initAuth();
});

// Authentication handling
function initAuth() {
    const signInBtn = document.querySelector('.sign-in-btn');
    const authModal = document.getElementById('authModal');
    const closeModal = document.querySelector('.close-modal');
    const authForm = document.getElementById('authForm');
    const signupLink = document.getElementById('signupLink');
    const forgotPassword = document.getElementById('forgotPassword');

    if (signInBtn) {
        signInBtn.addEventListener('click', () => {
            authModal.classList.add('active');
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            authModal.classList.remove('active');
        });
    }

    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = authForm.querySelector('input[type="email"]').value;
            const password = authForm.querySelector('input[type="password"]').value;
            
            // Here you would typically send this to your backend
            console.log('Login attempt:', { email });
            
            // For demo purposes, show success and close modal
            alert('Successfully signed in!');
            authModal.classList.remove('active');
        });
    }

    if (signupLink) {
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Switch form to signup mode
            document.querySelector('.auth-content h2').textContent = 'Sign Up';
            authForm.querySelector('button').textContent = 'Sign Up';
        });
    }

    if (forgotPassword) {
        forgotPassword.addEventListener('click', (e) => {
            e.preventDefault();
            const email = authForm.querySelector('input[type="email"]').value;
            if (email) {
                alert('Password reset link sent to your email!');
            } else {
                alert('Please enter your email address.');
            }
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.remove('active');
        }
    });
}

// DOM Elements
const filterButtons = document.querySelectorAll('.filter-btn');
const businessCards = document.querySelectorAll('.business-card');
const searchInput = document.querySelector('.main-search input');
const searchButton = document.querySelector('.main-search button');
const newsletterForm = document.querySelector('.newsletter-form');
const businessSubmissionForm = document.querySelector('#businessSubmissionForm');

// Map initialization
function initializeMaps() {
    // Kenya business coordinates
    const coordinates = {
        'map1': [-0.5166700, 37.4500000], // Nyahururu
        'map2': [-1.2921, 36.8219],       // Nairobi
        'map3': [-4.0435, 39.6682],       // Mombasa
        'map4': [-0.1022, 34.7617]        // Kisumu
    };

    // Initialize maps for each business card
    Object.entries(coordinates).forEach(([mapId, coords]) => {
        const mapElement = document.getElementById(mapId);
        if (mapElement) {
            const map = L.map(mapId).setView(coords, 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: ' OpenStreetMap contributors'
            }).addTo(map);
            
            // Add marker with popup
            L.marker(coords)
                .bindPopup(getBusinessInfo(mapId))
                .addTo(map);
        }
    });
}

function getBusinessInfo(mapId) {
    const businessInfo = {
        'map1': 'WAYAMOJA ENTERPRISE<br>Internet Service Provider<br>Chaphi house, 1st floor, Room 20<br>Nyahururu',
        'map2': 'Tech Hub Kenya<br>IT Services & Training<br>Westlands, Nairobi',
        'map3': 'Coastal Delights Restaurant<br>Fine Dining<br>Nyali, Mombasa',
        'map4': 'Lake Basin Mall<br>Shopping & Entertainment<br>Kisumu CBD'
    };
    return businessInfo[mapId] || '';
}

// Filter businesses by category
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const category = button.dataset.category;
        
        businessCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in');
            }
        });
    });
});

// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    function switchTab(e) {
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Add active class to clicked button
        const button = e.target;
        button.classList.add('active');

        // Find and show corresponding pane
        const category = button.getAttribute('data-category');
        const pane = document.getElementById(category);
        if (pane) {
            pane.classList.add('active');
        }
    }

    // Add click event listeners to all tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', switchTab);
    });

    // Enhanced search functionality
    function searchBusinesses(query) {
        query = query.toLowerCase().trim();
        const businessCards = document.querySelectorAll('.business-card');
        let hasResults = false;

        businessCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const category = card.closest('.tab-pane')?.id || '';
            
            if (title.includes(query) || description.includes(query) || category.includes(query)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-in';
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide no results message
        const noResultsMsg = document.getElementById('no-results');
        if (noResultsMsg) {
            noResultsMsg.style.display = hasResults ? 'none' : 'block';
        }

        // If searching in a specific tab, switch to that tab
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            const category = tab.getAttribute('data-category').toLowerCase();
            if (category.includes(query)) {
                tab.click();
            }
        });
    }

    // Real-time search functionality
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            searchBusinesses(this.value);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.main-search input');
    const searchButton = document.querySelector('.main-search button');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const businessCards = document.querySelectorAll('.business-card');

        businessCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                // Add fade-in animation
                card.style.animation = 'fadeIn 0.5s ease-in';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects for business cards
    const businessCards = document.querySelectorAll('.business-card');
    businessCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
    });

    // Contact form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');

            if (!nameInput.value.trim()) {
                alert('Please enter your name');
                return;
            }

            if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
                alert('Please enter a valid email address');
                return;
            }

            if (!messageInput.value.trim()) {
                alert('Please enter your message');
                return;
            }

            // Here you would typically send the form data to a server
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Initialize AOS
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });
});

// Location tabs functionality
const locationTabButtons = document.querySelectorAll('.location-tab-btn');
const locationPanes = document.querySelectorAll('.location-pane');

function switchLocationTab(e) {
    // Remove active class from all buttons and panes
    locationTabButtons.forEach(btn => btn.classList.remove('active'));
    locationPanes.forEach(pane => pane.classList.remove('active'));

    // Add active class to clicked button
    const button = e.target;
    button.classList.add('active');

    // Find and show corresponding pane
    const location = button.getAttribute('data-location');
    const pane = document.getElementById(location);
    if (pane) {
        pane.classList.add('active');
    }
}

// Add click event listeners to all location tab buttons
locationTabButtons.forEach(button => {
    button.addEventListener('click', switchLocationTab);
});

// Enhance search to include locations
function searchBusinesses(query) {
    query = query.toLowerCase().trim();
    const businessCards = document.querySelectorAll('.business-card');
    let hasResults = false;

    businessCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const category = card.closest('.tab-pane')?.id || '';
        const location = card.querySelector('.location')?.textContent.toLowerCase() || '';
        
        if (title.includes(query) || 
            description.includes(query) || 
            category.includes(query) || 
            location.includes(query)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease-in';
            hasResults = true;
            
            // If card is in a location tab, switch to that tab
            const locationPane = card.closest('.location-pane');
            if (locationPane) {
                const locationId = locationPane.id;
                const locationBtn = document.querySelector(`[data-location="${locationId}"]`);
                if (locationBtn) {
                    locationBtn.click();
                }
            }
        } else {
            card.style.display = 'none';
        }
    });

    // Show/hide no results message
    const noResultsMsg = document.getElementById('no-results');
    if (noResultsMsg) {
        noResultsMsg.style.display = hasResults ? 'none' : 'block';
    }
}

// Newsletter form submission
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        if (emailInput.value) {
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        }
    });
}

// Business submission form handling
if (businessSubmissionForm) {
    businessSubmissionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Basic form validation
        const requiredFields = businessSubmissionForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (!isValid) {
            alert('Please fill in all required fields');
            return;
        }

        // Handle file upload
        const logoInput = document.getElementById('logo');
        if (logoInput && logoInput.files[0]) {
            const file = logoInput.files[0];
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                alert('Logo file size must be less than 2MB');
                return;
            }
        }

        // Here you would typically send the form data to your backend
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            alert('Thank you for submitting your business! We will review your submission and get back to you soon.');
            businessSubmissionForm.reset();
            
            // Redirect to home page after successful submission
            window.location.href = 'index.html';
        } catch (error) {
            alert('An error occurred while submitting your business. Please try again.');
        }
    });
}

// Image optimization
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
});

// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all tab panes
            const tabPanes = document.querySelectorAll('.tab-pane');
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Show the selected tab pane
            const category = tab.dataset.category;
            const selectedPane = document.getElementById(category);
            if (selectedPane) {
                selectedPane.classList.add('active');
            }
        });
    });
});

// Add review functionality
function addReview(businessId, rating, comment) {
    // Here you would typically send this to your backend
    console.log(`Review added for business ${businessId}: ${rating} stars - ${comment}`);
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-links') && !event.target.closest('.menu-toggle')) {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// Show details functionality
function showDetails(element, businessName, category, location = '', phone = '', email = '', hours = '') {
    const li = element.parentElement;
    const oldContent = li.innerHTML;
    
    li.innerHTML = `
        <div style="display: grid; gap: 10px; margin-bottom: 10px;">
            <input type="text" value="${businessName}" id="editName" placeholder="Business Name">
            <input type="text" value="${category}" id="editCategory" placeholder="Category">
            <input type="text" value="${location}" id="editLocation" placeholder="Full Address">
            <input type="tel" value="${phone}" id="editPhone" placeholder="Phone Number">
            <input type="email" value="${email}" id="editEmail" placeholder="Email Address">
            <input type="text" value="${hours}" id="editHours" placeholder="Business Hours">
        </div>
        <button onclick="saveDetails(this)" style="padding: 5px 10px;">Save</button>
        <button onclick="cancelEdit(this, '${oldContent}')" style="padding: 5px 10px;">Cancel</button>
    `;
}

function saveDetails(button) {
    const li = button.parentElement;
    const newName = li.querySelector('#editName').value;
    const newCategory = li.querySelector('#editCategory').value;
    const newLocation = li.querySelector('#editLocation').value;
    const newPhone = li.querySelector('#editPhone').value;
    const newEmail = li.querySelector('#editEmail').value;
    const newHours = li.querySelector('#editHours').value;
    
    li.innerHTML = `${newName} - ${newLocation} - <a href="#" onclick="showDetails(this, '${newName}', '${newCategory}', '${newLocation}', '${newPhone}', '${newEmail}', '${newHours}')">View Details</a>`;
}

function cancelEdit(button, oldContent) {
    const li = button.parentElement;
    li.innerHTML = oldContent;
}

function addBusiness() {
    const businessName = prompt("Enter business name:");
    const category = prompt("Enter business category:");
    const location = prompt("Enter business location:");
    const phone = prompt("Enter phone number:");
    const email = prompt("Enter email address:");
    const hours = prompt("Enter business hours:");
    
    if (businessName && category) {
        const list = document.querySelector('#business-list ul');
        const newBusiness = document.createElement('li');
        newBusiness.innerHTML = `${businessName} - ${location} - <a href="#" onclick="showDetails(this, '${businessName}', '${category}', '${location}', '${phone}', '${email}', '${hours}')">View Details</a>`;
        list.appendChild(newBusiness);
    }
}

// Authentication Tab Switching
document.addEventListener('DOMContentLoaded', function() {
    const authTabs = document.querySelectorAll('.auth-tab');
    const authPanes = document.querySelectorAll('.auth-pane');

    if (authTabs && authPanes) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and panes
                authTabs.forEach(t => t.classList.remove('active'));
                authPanes.forEach(p => p.classList.remove('active'));

                // Add active class to clicked tab and corresponding pane
                tab.classList.add('active');
                const pane = document.getElementById(tab.dataset.tab);
                if (pane) pane.classList.add('active');
            });
        });
    }

    // Handle Sign In Form Submission
    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('signin-email').value;
            const password = document.getElementById('signin-password').value;

            try {
                // Here you would typically make an API call to your backend
                console.log('Sign in attempt:', { email });
                alert('Sign in functionality will be implemented with backend integration');
            } catch (error) {
                console.error('Sign in error:', error);
                alert('An error occurred during sign in');
            }
        });
    }

    // Handle Registration Form Submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = {
                name: document.getElementById('register-name').value,
                email: document.getElementById('register-email').value,
                phone: document.getElementById('register-phone').value,
                password: document.getElementById('register-password').value,
                confirmPassword: document.getElementById('register-confirm-password').value
            };

            if (formData.password !== formData.confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            try {
                // Here you would typically make an API call to your backend
                console.log('Registration attempt:', { ...formData, password: '[HIDDEN]' });
                alert('Registration functionality will be implemented with backend integration');
            } catch (error) {
                console.error('Registration error:', error);
                alert('An error occurred during registration');
            }
        });
    }

    // Handle Business Listing Form Submission
    const businessForm = document.getElementById('business-listing-form');
    if (businessForm) {
        businessForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(businessForm);
            
            try {
                // Here you would typically make an API call to your backend
                console.log('Business listing submission:', Object.fromEntries(formData));
                alert('Business listing submission will be implemented with backend integration');
            } catch (error) {
                console.error('Business listing error:', error);
                alert('An error occurred while submitting your business listing');
            }
        });
    }
});

// File Upload Preview (for business listing)
const businessLogo = document.getElementById('business-logo');
const businessPhotos = document.getElementById('business-photos');

if (businessLogo) {
    businessLogo.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert('Logo file size should not exceed 5MB');
                this.value = '';
            }
        }
    });
}

if (businessPhotos) {
    businessPhotos.addEventListener('change', function(e) {
        const files = e.target.files;
        if (files.length > 5) {
            alert('You can only upload up to 5 photos');
            this.value = '';
        }
        for (let file of files) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert('Each photo file size should not exceed 5MB');
                this.value = '';
                break;
            }
        }
    });
}

// Sample business data (in a real app, this would come from a backend)
const businessData = {
    'coffee-house': {
        name: 'The Coffee House',
        category: 'Restaurants & Cafes',
        location: 'CBD, Nairobi',
        rating: 4.5,
        reviewCount: 128,
        description: 'A cozy coffee shop offering premium coffee, fresh pastries, and a warm atmosphere. Perfect for both work and relaxation.',
        images: [
            'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FmZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
            'https://images.unsplash.com/photo-1600093463592-2e8d28d7f1f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2FmZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
            'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNhZmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
        ],
        services: [
            'Specialty Coffee',
            'Fresh Pastries',
            'Breakfast Menu',
            'Lunch Menu',
            'Wi-Fi',
            'Meeting Space'
        ],
        hours: {
            'Monday': '7:00 AM - 8:00 PM',
            'Tuesday': '7:00 AM - 8:00 PM',
            'Wednesday': '7:00 AM - 8:00 PM',
            'Thursday': '7:00 AM - 8:00 PM',
            'Friday': '7:00 AM - 10:00 PM',
            'Saturday': '8:00 AM - 10:00 PM',
            'Sunday': '8:00 AM - 6:00 PM'
        },
        contact: {
            phone: '+254 712 345 678',
            email: 'info@thecoffeehouse.co.ke',
            website: 'www.thecoffeehouse.co.ke'
        },
        address: '123 City Center, CBD, Nairobi',
        reviews: [
            {
                name: 'John Doe',
                avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
                rating: 5,
                date: '2024-02-01',
                content: 'Best coffee in town! The atmosphere is perfect for both work and casual meetings.'
            },
            {
                name: 'Jane Smith',
                avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
                rating: 4,
                date: '2024-01-28',
                content: 'Great service and delicious pastries. The Wi-Fi could be a bit faster though.'
            }
        ]
    },
    // Add more businesses here
};

// Make business cards clickable
document.addEventListener('DOMContentLoaded', function() {
    const businessCards = document.querySelectorAll('.business-card');
    businessCards.forEach(card => {
        card.addEventListener('click', () => {
            const businessId = card.getAttribute('data-business-id') || 'coffee-house';
            window.location.href = `business-details.html?id=${businessId}`;
        });
    });

    // Handle business details page
    if (window.location.pathname.includes('business-details.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const businessId = urlParams.get('id') || 'coffee-house';
        const business = businessData[businessId];

        if (business) {
            // Update page title
            document.title = `${business.name} - Business Directory`;

            // Update business information
            document.getElementById('business-name').textContent = business.name;
            document.getElementById('business-category').innerHTML = `<i class="fas fa-tag"></i> ${business.category}`;
            document.getElementById('business-location').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${business.location}`;
            document.getElementById('rating-value').textContent = business.rating;
            document.getElementById('review-count').textContent = business.reviewCount;
            document.getElementById('business-description').textContent = business.description;

            // Update featured image and thumbnails
            const featuredImage = document.getElementById('featured-image');
            featuredImage.src = business.images[0];
            featuredImage.alt = business.name;

            const thumbnailsContainer = document.getElementById('image-thumbnails');
            business.images.forEach((image, index) => {
                const thumb = document.createElement('div');
                thumb.className = 'gallery-thumb';
                thumb.innerHTML = `<img src="${image}" alt="${business.name} Image ${index + 1}">`;
                thumb.addEventListener('click', () => {
                    featuredImage.src = image;
                    featuredImage.alt = `${business.name} Image ${index + 1}`;
                });
                thumbnailsContainer.appendChild(thumb);
            });

            // Update services
            const servicesList = document.getElementById('services-list');
            servicesList.innerHTML = business.services.map(service => 
                `<div class="service-item"><i class="fas fa-check"></i> ${service}</div>`
            ).join('');

            // Update business hours
            const hourslist = document.getElementById('business-hours');
            Object.entries(business.hours).forEach(([day, hours]) => {
                const li = document.createElement('li');
                li.innerHTML = `<span>${day}</span><span>${hours}</span>`;
                hourslist.appendChild(li);
            });

            // Update contact information
            document.getElementById('contact-phone').innerHTML = `<i class="fas fa-phone"></i> ${business.contact.phone}`;
            document.getElementById('contact-email').innerHTML = `<i class="fas fa-envelope"></i> ${business.contact.email}`;
            document.getElementById('contact-website').innerHTML = `<i class="fas fa-globe"></i> ${business.contact.website}`;
            document.getElementById('business-address').textContent = business.address;

            // Update reviews
            const reviewsList = document.getElementById('reviews-list');
            business.reviews.forEach(review => {
                const reviewCard = document.createElement('div');
                reviewCard.className = 'review-card';
                reviewCard.innerHTML = `
                    <div class="review-header">
                        <div class="reviewer-info">
                            <img src="${review.avatar}" alt="${review.name}" class="reviewer-avatar">
                            <div>
                                <div class="reviewer-name">${review.name}</div>
                                <div class="review-date">${new Date(review.date).toLocaleDateString()}</div>
                            </div>
                        </div>
                        <div class="review-rating">
                            ${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}
                        </div>
                    </div>
                    <div class="review-content">${review.content}</div>
                `;
                reviewsList.appendChild(reviewCard);
            });
        }
    }
}};
