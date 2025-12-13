// Main JavaScript functionality for Pandit Bhavesh Joshi's website
// Author: Web Development Team
// Date: 2025-12-12

class HinduPriestApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.setupScrollAnimations();
        this.setupMobileMenu();
    }

    setupEventListeners() {
        // Navigation active state
        this.updateActiveNavigation();
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    initializeComponents() {
        // Initialize image carousel if present
        this.initImageCarousel();
        
        // Initialize service cards hover effects
        this.initServiceCards();
        
        // Initialize booking calendar if present
        this.initBookingCalendar();
        
        // Initialize contact form
        this.initContactForm();
        
        // Initialize shop functionality
        this.initShopFunctionality();
    }

    setupMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                mobileMenuToggle.classList.toggle('active');
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            });
        }
    }

    updateActiveNavigation() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    initImageCarousel() {
        const carousel = document.querySelector('.image-carousel');
        if (!carousel) return;

        const images = carousel.querySelectorAll('.carousel-image');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const dots = carousel.querySelectorAll('.carousel-dot');
        
        let currentIndex = 0;
        let autoPlayInterval;

        const showImage = (index) => {
            images.forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });
            
            if (dots.length > 0) {
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }
        };

        const nextImage = () => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        };

        const prevImage = () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        };

        // Auto-play functionality
        const startAutoPlay = () => {
            autoPlayInterval = setInterval(nextImage, 5000);
        };

        const stopAutoPlay = () => {
            clearInterval(autoPlayInterval);
        };

        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextImage);
        if (prevBtn) prevBtn.addEventListener('click', prevImage);
        
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    showImage(currentIndex);
                });
            });
        }

        // Pause auto-play on hover
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // Initialize
        showImage(0);
        startAutoPlay();
    }

    initServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(255, 153, 51, 0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    initBookingCalendar() {
        const calendar = document.querySelector('.booking-calendar');
        if (!calendar) return;

        const currentDate = new Date();
        let displayMonth = currentDate.getMonth();
        let displayYear = currentDate.getFullYear();

        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
        const firstDay = new Date(displayYear, displayMonth, 1).getDay();

        this.renderCalendar(calendar, displayYear, displayMonth, daysInMonth, firstDay);
        this.setupCalendarNavigation(calendar, displayYear, displayMonth);
    }

    renderCalendar(calendar, year, month, daysInMonth, firstDay) {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const monthHeader = calendar.querySelector('.calendar-month');
        const calendarGrid = calendar.querySelector('.calendar-grid');
        
        if (monthHeader) {
            monthHeader.textContent = `${monthNames[month]} ${year}`;
        }

        if (calendarGrid) {
            calendarGrid.innerHTML = '';
            
            // Add day headers
            const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            dayHeaders.forEach(day => {
                const dayHeader = document.createElement('div');
                dayHeader.className = 'calendar-day-header';
                dayHeader.textContent = day;
                calendarGrid.appendChild(dayHeader);
            });

            // Add empty cells for days before month starts
            for (let i = 0; i < firstDay; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day empty';
                calendarGrid.appendChild(emptyDay);
            }

            // Add days of the month
            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = day;
                
                // Make future dates clickable
                const currentDate = new Date();
                const dayDate = new Date(year, month, day);
                
                if (dayDate >= currentDate) {
                    dayElement.addEventListener('click', () => {
                        calendar.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                        dayElement.classList.add('selected');
                        this.showTimeSlots(dayDate);
                    });
                } else {
                    dayElement.classList.add('disabled');
                }

                calendarGrid.appendChild(dayElement);
            }
        }
    }

    setupCalendarNavigation(calendar, currentYear, currentMonth) {
        const prevBtn = calendar.querySelector('.calendar-prev');
        const nextBtn = calendar.querySelector('.calendar-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                this.updateCalendarMonth(calendar, currentYear, currentMonth);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                this.updateCalendarMonth(calendar, currentYear, currentMonth);
            });
        }
    }

    updateCalendarMonth(calendar, year, month) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        this.renderCalendar(calendar, year, month, daysInMonth, firstDay);
    }

    showTimeSlots(selectedDate) {
        const timeSlotsContainer = document.querySelector('.time-slots');
        if (!timeSlotsContainer) return;

        const timeSlots = [
            { period: 'Morning', slots: ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM'] },
            { period: 'Afternoon', slots: ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'] },
            { period: 'Evening', slots: ['6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'] }
        ];

        timeSlotsContainer.innerHTML = '<h3 class="text-lg font-semibold mb-4">Available Time Slots</h3>';

        timeSlots.forEach(({ period, slots }) => {
            const periodSection = document.createElement('div');
            periodSection.className = 'mb-6';
            
            const periodTitle = document.createElement('h4');
            periodTitle.className = 'font-medium text-gray-700 mb-3';
            periodTitle.textContent = period;
            
            const slotsGrid = document.createElement('div');
            slotsGrid.className = 'grid grid-cols-3 md:grid-cols-6 gap-2';
            
            slots.forEach(time => {
                const slotBtn = document.createElement('button');
                slotBtn.className = 'time-slot-btn px-3 py-2 text-sm border rounded-lg hover:bg-orange-500 hover:text-white transition-colors';
                slotBtn.textContent = time;
                slotBtn.addEventListener('click', () => {
                    timeSlotsContainer.querySelectorAll('.time-slot-btn').forEach(btn => btn.classList.remove('selected'));
                    slotBtn.classList.add('selected');
                    this.showBookingForm(selectedDate, time);
                });
                slotsGrid.appendChild(slotBtn);
            });
            
            periodSection.appendChild(periodTitle);
            periodSection.appendChild(slotsGrid);
            timeSlotsContainer.appendChild(periodSection);
        });

        timeSlotsContainer.classList.remove('hidden');
    }

    showBookingForm(selectedDate, selectedTime) {
        const bookingModal = document.querySelector('.booking-modal');
        if (!bookingModal) return;

        const dateStr = selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        const modalContent = bookingModal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.innerHTML = `
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-4">Book Your Appointment</h3>
                    <div class="mb-4 p-3 bg-orange-50 rounded-lg">
                        <p class="font-medium">Selected Date & Time:</p>
                        <p class="text-orange-600">${dateStr} at ${selectedTime}</p>
                    </div>
                    <form class="booking-form space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">Full Name *</label>
                                <input type="text" name="name" required class="w-full px-3 py-2 border rounded-lg focus:border-orange-500 focus:outline-none">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Age</label>
                                <input type="number" name="age" class="w-full px-3 py-2 border rounded-lg focus:border-orange-500 focus:outline-none">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">Gender</label>
                            <select name="gender" class="w-full px-3 py-2 border rounded-lg focus:border-orange-500 focus:outline-none">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">Location/City *</label>
                            <input type="text" name="location" required class="w-full px-3 py-2 border rounded-lg focus:border-orange-500 focus:outline-none">
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">Mobile Number *</label>
                                <input type="tel" name="mobile" required class="w-full px-3 py-2 border rounded-lg focus:border-orange-500 focus:outline-none">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">WhatsApp Number</label>
                                <input type="tel" name="whatsapp" class="w-full px-3 py-2 border rounded-lg focus:border-orange-500 focus:outline-none">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">Email Address</label>
                            <input type="email" name="email" class="w-full px-3 py-2 border rounded-lg focus:border-orange-500 focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">Reason for Consultation *</label>
                            <select name="reason" required class="w-full px-3 py-2 border rounded-lg focus:border-orange-500 focus:outline-none">
                                <option value="">Select Service Type</option>
                                <option value="wedding">Wedding Ceremony</option>
                                <option value="puja">General Puja</option>
                                <option value="havan">Havan/Fire Ceremony</option>
                                <option value="griha-pravesh">Griha Pravesh</option>
                                <option value="namkaran">Namkaran Ceremony</option>
                                <option value="upanayanam">Upanayanam</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">Booking For</label>
                            <div class="flex gap-4">
                                <label class="flex items-center">
                                    <input type="radio" name="booking_for" value="self" class="mr-2">
                                    <span>Myself</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="radio" name="booking_for" value="other" class="mr-2">
                                    <span>Someone Else</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">Additional Notes</label>
                            <textarea name="notes" rows="3" class="w-full px-3 py-2 border rounded-lg focus:border-orange-500 focus:outline-none" placeholder="Any specific requirements or questions..."></textarea>
                        </div>
                        <div class="flex gap-4 pt-4">
                            <button type="button" class="close-modal px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                            <button type="submit" class="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Confirm Booking</button>
                        </div>
                    </form>
                </div>
            `;

            // Add event listeners for modal
            const closeBtn = modalContent.querySelector('.close-modal');
            const form = modalContent.querySelector('.booking-form');

            closeBtn.addEventListener('click', () => {
                bookingModal.classList.remove('active');
            });

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleBookingSubmission(form, selectedDate, selectedTime);
            });
        }

        bookingModal.classList.add('active');
    }

    handleBookingSubmission(form, date, time) {
        const formData = new FormData(form);
        const bookingData = {
            date: date.toISOString(),
            time: time,
            name: formData.get('name'),
            age: formData.get('age'),
            gender: formData.get('gender'),
            location: formData.get('location'),
            mobile: formData.get('mobile'),
            whatsapp: formData.get('whatsapp'),
            email: formData.get('email'),
            reason: formData.get('reason'),
            booking_for: formData.get('booking_for'),
            notes: formData.get('notes')
        };

        // Simulate booking submission
        console.log('Booking Data:', bookingData);
        
        // Show success message
        this.showBookingSuccess(bookingData);
    }

    showBookingSuccess(bookingData) {
        const modal = document.querySelector('.booking-modal');
        const modalContent = modal.querySelector('.modal-content');
        
        modalContent.innerHTML = `
            <div class="p-6 text-center">
                <div class="mb-4">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Booking Confirmed!</h3>
                    <p class="text-gray-600 mb-4">Your appointment has been successfully booked.</p>
                </div>
                <div class="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                    <h4 class="font-medium mb-2">Booking Details:</h4>
                    <p><strong>Name:</strong> ${bookingData.name}</p>
                    <p><strong>Date:</strong> ${new Date(bookingData.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> ${bookingData.time}</p>
                    <p><strong>Service:</strong> ${bookingData.reason}</p>
                    <p><strong>Location:</strong> ${bookingData.location}</p>
                </div>
                <p class="text-sm text-gray-600 mb-4">
                    You will receive a confirmation call within 24 hours. For urgent queries, please call: +1 (555) 123-4567
                </p>
                <button class="close-modal px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Close</button>
            </div>
        `;

        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    initContactForm() {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const contactData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message')
            };

            // Simulate form submission
            console.log('Contact Data:', contactData);
            
            // Show success message
            this.showContactSuccess();
        });
    }

    showContactSuccess() {
        const form = document.querySelector('.contact-form');
        const successMessage = document.createElement('div');
        successMessage.className = 'contact-success bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4';
        successMessage.innerHTML = `
            <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                Thank you for your message! We will get back to you soon.
            </div>
        `;
        
        form.insertBefore(successMessage, form.firstChild);
        form.reset();
        
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }

    initShopFunctionality() {
        const addToCartBtns = document.querySelectorAll('.add-to-cart');
        const buyNowBtns = document.querySelectorAll('.buy-now');

        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productCard = btn.closest('.product-card');
                const productName = productCard.querySelector('.product-name').textContent;
                
                this.showNotification(`${productName} added to cart!`, 'success');
            });
        });

        buyNowBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productCard = btn.closest('.product-card');
                const productName = productCard.querySelector('.product-name').textContent;
                
                this.showNotification(`Redirecting to checkout for ${productName}...`, 'info');
            });
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type} fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white transform translate-x-full transition-transform duration-300`;
        
        const bgColor = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500',
            warning: 'bg-yellow-500'
        }[type] || 'bg-blue-500';
        
        notification.classList.add(bgColor);
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);

        // Observe elements with scroll animation class
        document.querySelectorAll('.scroll-animate').forEach(el => {
            observer.observe(el);
        });
    }

    handleResize() {
        // Handle responsive adjustments
        const isMobile = window.innerWidth < 768;
        
        // Adjust carousel for mobile
        const carousel = document.querySelector('.image-carousel');
        if (carousel && isMobile) {
            // Mobile-specific carousel adjustments
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HinduPriestApp();
});

// Modal functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
    
    if (e.target.classList.contains('modal-close')) {
        const modal = e.target.closest('.modal-overlay');
        if (modal) {
            modal.classList.remove('active');
        }
    }
});

// Utility functions
function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(time) {
    return new Date(`2000-01-01 ${time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

// Export for use in other scripts if needed
window.HinduPriestApp = HinduPriestApp;