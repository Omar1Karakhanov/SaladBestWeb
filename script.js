document.addEventListener('DOMContentLoaded', () => {

// ===== BURGER MENU FUNCTIONALITY =====
const burgerMenu = document.querySelector('.burger-menu');
const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');
const body = document.body;

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    mobileNavOverlay.classList.toggle('active');
    body.style.overflow = mobileNavOverlay.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking on a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        burgerMenu.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        body.style.overflow = '';
        
        // Scroll to section based on link
        const linkText = link.textContent.toLowerCase();
        if (linkText === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (linkText === 'shop') {
            document.querySelector('.menu')?.scrollIntoView({ behavior: 'smooth' });
        } else if (linkText === 'recipy' || linkText === 'recipe') {
            document.querySelector('.feature')?.scrollIntoView({ behavior: 'smooth' });
        } else if (linkText === 'contact') {
            document.querySelector('.site-footer')?.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Close menu when clicking outside
mobileNavOverlay.addEventListener('click', (e) => {
    if (e.target === mobileNavOverlay) {
        burgerMenu.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        body.style.overflow = '';
    }
});

// ===== DESKTOP NAVIGATION FUNCTIONALITY =====
const desktopNavLinks = document.querySelectorAll('.site-nav a');

desktopNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const linkText = link.textContent.toLowerCase();
        
        if (linkText === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (linkText === 'shop') {
            document.querySelector('.menu')?.scrollIntoView({ behavior: 'smooth' });
        } else if (linkText === 'recipy' || linkText === 'recipe') {
            document.querySelector('.feature')?.scrollIntoView({ behavior: 'smooth' });
        } else if (linkText === 'contact') {
            document.querySelector('.site-footer')?.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== ENHANCED CART FUNCTIONALITY =====
// Show cart modal
const showCartModal = () => {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.style.display = 'flex';
        body.style.overflow = 'hidden';
        renderCartItems();
    }
};

// Hide cart modal
const hideCartModal = () => {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.style.display = 'none';
        body.style.overflow = '';
    }
};

// Render cart items in modal
const renderCartItems = () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        if (emptyCartMessage) emptyCartMessage.style.display = 'block';
        if (cartTotal) cartTotal.style.display = 'none';
        return;
    }
    
    if (emptyCartMessage) emptyCartMessage.style.display = 'none';
    if (cartTotal) cartTotal.style.display = 'block';
    
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.price.toFixed(2)} × ${item.quantity}</p>
            </div>
            <div class="cart-item-actions">
                <span class="cart-item-total">${itemTotal.toFixed(2)}</span>
                <button class="cart-item-remove" data-index="${index}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    document.getElementById('cart-total-amount').textContent = `${total.toFixed(2)}`;
    
    // Add remove functionality
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            cart.splice(index, 1);
            updateCartBadge();
            renderCartItems();
        });
    });
};

// Cart icon click
const cartIcon = document.querySelector('.site-header__cart');
if (cartIcon) {
    cartIcon.addEventListener('click', showCartModal);
}

// Clear cart function
window.clearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        updateCartBadge();
        renderCartItems();
    }
};

// Checkout function
const checkoutBtn = document.querySelector('.cart-checkout');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        alert(`Checkout - Total: ${total.toFixed(2)}\n\nThank you for your order!`);
        cart = [];
        updateCartBadge();
        hideCartModal();
    });
}

// Close modal when clicking outside
document.getElementById('cart-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'cart-modal') {
        hideCartModal();
    }
});

// Make hideCartModal global
window.hideCartModal = hideCartModal;

// ===== MENU FILTER FUNCTIONALITY =====
const filterButtons = document.querySelectorAll('.menu__filter-item');
const menuCards = document.querySelectorAll('.menu__card');

// Add data-category attributes to cards (you can customize these in HTML)
// For now, we'll randomly assign categories for demonstration
const categories = ['veg', 'non-veg', 'spicy', 'fruit'];
menuCards.forEach((card, index) => {
    // Assign categories based on card titles or randomly
    const title = card.querySelector('.menu__card-title').textContent.toLowerCase();
    if (title.includes('paneer') || title.includes('cabbage')) {
        card.setAttribute('data-category', 'veg');
    } else if (title.includes('non veg') || title.includes('chicken')) {
        card.setAttribute('data-category', 'non-veg');
    } else if (title.includes('spicy') || title.includes('crunchy')) {
        card.setAttribute('data-category', 'spicy');
    } else {
        card.setAttribute('data-category', 'fruit');
    }
});

filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('menu__filter-item--active'));
        
        // Add active class to clicked button
        button.classList.add('menu__filter-item--active');
        
        // Get filter value
        const filterText = button.textContent.trim().toLowerCase();
        let filterCategory = 'all';
        
        if (filterText.includes('veg salad')) {
            filterCategory = 'veg';
        } else if (filterText.includes('non veg')) {
            filterCategory = 'non-veg';
        } else if (filterText.includes('spicy')) {
            filterCategory = 'spicy';
        } else if (filterText.includes('fruit')) {
            filterCategory = 'fruit';
        }
        
        // Filter cards with animation
        menuCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filterCategory === 'all' || cardCategory === filterCategory) {
                setTimeout(() => {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                }, index * 100);
            } else {
                card.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== EXPLORE MORE BUTTON FUNCTIONALITY =====
const exploreMoreBtn = document.querySelector('.menu__explore .button');
let currentlyShowing = 4; // Initially showing 4 cards

// Hide extra cards initially
if (menuCards.length > 4) {
    menuCards.forEach((card, index) => {
        if (index >= 4) {
            card.style.display = 'none';
        }
    });
    exploreMoreBtn.textContent = 'Explore More';
} else {
    exploreMoreBtn.style.display = 'none'; // Hide button if 4 or fewer cards
}

exploreMoreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const allCards = Array.from(menuCards);
    const hiddenCards = allCards.filter(card => card.style.display === 'none');
    
    if (hiddenCards.length > 0) {
        // Show more cards (4 at a time)
        hiddenCards.slice(0, 4).forEach((card, index) => {
            setTimeout(() => {
                card.style.display = 'flex';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            }, index * 100);
        });
        
        currentlyShowing += 4;
        
        // Check if all cards are now visible
        setTimeout(() => {
            const stillHidden = allCards.filter(card => card.style.display === 'none');
            if (stillHidden.length === 0) {
                exploreMoreBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Show Less';
            }
        }, 500);
    } else {
        // Collapse - show only first 4
        allCards.forEach((card, index) => {
            if (index >= 4) {
                card.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        currentlyShowing = 4;
        exploreMoreBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Explore More';
        
        // Scroll to menu section
        setTimeout(() => {
            document.querySelector('.menu').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 400);
    }
});

    // =======================================================
    // Shopping Cart Logic
    // =======================================================
    let cart = [];
    const cartBadge = document.querySelector('.site-header__cart-badge');

    const updateCartBadge = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

        if (totalItems > 0) {
            cartBadge.style.display = 'block'; 
            cartBadge.textContent = totalItems;
            const cartIcon = document.querySelector('.site-header__cart');
            cartIcon.classList.add('pop-animation');
            setTimeout(() => {
                cartIcon.classList.remove('pop-animation');
            }, 300); 
        } else {
            cartBadge.style.display = 'none'; 
        }
    };
    
    updateCartBadge();


    // =======================================================
    // Hero Section Controls
    // =======================================================
    const decreaseBtn = document.querySelector('.quantity__decrease');
    const increaseBtn = document.querySelector('.quantity__increase');
    const quantityValue = document.querySelector('.quantity__value');
    const heroOrderBtn = document.querySelector('.hero__order');

    decreaseBtn.addEventListener('click', () => {
        let currentQuantity = parseInt(quantityValue.textContent);
        if (currentQuantity > 1) { 
            currentQuantity--;
            quantityValue.textContent = currentQuantity.toString().padStart(2, '0');
        }
    });

    increaseBtn.addEventListener('click', () => {
        let currentQuantity = parseInt(quantityValue.textContent);
        currentQuantity++;
        quantityValue.textContent = currentQuantity.toString().padStart(2, '0');
    });

    heroOrderBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityValue.textContent);
        const itemName = document.querySelector('.hero__title').textContent;
        const itemPriceText = document.querySelector('.hero__price').textContent;
        const itemPrice = parseFloat(itemPriceText.replace('$', ''));

        const existingItem = cart.find(item => item.name === itemName);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name: itemName, price: itemPrice, quantity: quantity });
        }

        console.log('Cart updated:', cart);
        alert(`${quantity}x ${itemName} added to cart!`);
        updateCartBadge();
    });


    // =======================================================
    // Menu Section - Add to Cart
    // =======================================================
    const menuAddToCartButtons = document.querySelectorAll('.menu__card-action');

    menuAddToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.menu__card');
            const itemName = card.querySelector('.menu__card-title').textContent;
            const itemPriceText = card.querySelector('.menu__card-price').textContent;
            const itemPrice = parseFloat(itemPriceText.replace('$', ''));
            const quantity = 1; 

            const existingItem = cart.find(item => item.name === itemName);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ name: itemName, price: itemPrice, quantity: quantity });
            }
            
            console.log('Cart updated:', cart); 
            alert(`${itemName} added to cart!`);
            updateCartBadge();
        });
    });
    

    // =======================================================
    // Menu Section - Filter Visuals
    // =======================================================
    const filterItems = document.querySelectorAll('.menu__filter-item');
    
    filterItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            filterItems.forEach(filter => filter.classList.remove('menu__filter-item--active'));
            item.classList.add('menu__filter-item--active');
        });
    });




});


document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // ===== HERO ENTRY ANIMATIONS =====
  gsap.from('.hero__plate', {
    opacity: 0,
    x: 200,
    rotate: 45,
    duration: 1.2,
    ease: 'power3.out'
  });

  gsap.from('.hero__image', {
    opacity: 0,
    scale: 0.5,
    duration: 1.2,
    delay: 0.3,
    ease: 'back.out(1.7)'
  });

  gsap.from('.hero__thumb', {
    opacity: 0,
    scale: 0,
    stagger: 0.2,
    duration: 1,
    delay: 0.8,
    ease: 'elastic.out(1, 0.7)'
  });

  gsap.from('.hero__content > *', {
    opacity: 0,
    y: 50,
    stagger: 0.15,
    duration: 0.8,
    delay: 0.5,
    ease: 'power2.out'
  });

  // ===== PARALLAX LEAVES =====
  const leaves = document.querySelectorAll('.feature__leaf');
  window.addEventListener('scroll', () => {
    leaves.forEach(leaf => {
      const speed = leaf.dataset.speed;
      leaf.style.transform = `translateY(${window.scrollY * speed * 0.1}px)`;
    });
  });

  // ===== SCROLL ANIMATIONS =====
  gsap.utils.toArray('.feature__text, .feature__image-wrap').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  });

  gsap.utils.toArray('.menu__card').forEach(card => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  });

  gsap.from('.site-footer', {
    scrollTrigger: {
      trigger: '.site-footer',
      start: 'top 90%'
    },
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: 'power2.out'
  });
});





