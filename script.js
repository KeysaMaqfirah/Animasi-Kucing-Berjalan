
let isPaused = false;
let currentSpeed = 1;
const speeds = [0.5, 1, 1.5, 2, 3];
let speedIndex = 1;


function toggleAnimation() {
    const catContainer = document.querySelector('.cat-container');
    const cat = document.querySelector('.cat');
    
    if (isPaused) {
        
        catContainer.style.animationPlayState = 'running';
        cat.style.animationPlayState = 'running';
        document.querySelectorAll('*').forEach(el => {
            el.style.animationPlayState = 'running';
        });
        isPaused = false;
    } else {
        
        catContainer.style.animationPlayState = 'paused';
        cat.style.animationPlayState = 'paused';
        document.querySelectorAll('*').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
        isPaused = true;
    }
}


function changeSpeed() {
    speedIndex = (speedIndex + 1) % speeds.length;
    currentSpeed = speeds[speedIndex];
    
    const root = document.documentElement;
    root.style.setProperty('--speed-multiplier', currentSpeed);
    
    
    const catContainer = document.querySelector('.cat-container');
    catContainer.style.animationDuration = (10 / currentSpeed) + 's';
    
   
    const cat = document.querySelector('.cat');
    cat.style.animationDuration = (0.8 / currentSpeed) + 's';
    
    
    document.querySelectorAll('.cat-leg').forEach(leg => {
        leg.style.animationDuration = (0.8 / currentSpeed) + 's';
    });
    
    
    const catTail = document.querySelector('.cat-tail');
    if (catTail) catTail.style.animationDuration = (1 / currentSpeed) + 's';
    
    const catBody = document.querySelector('.cat-body');
    if (catBody) catBody.style.animationDuration = (0.8 / currentSpeed) + 's';
    
    const catHead = document.querySelector('.cat-head');
    if (catHead) catHead.style.animationDuration = (0.8 / currentSpeed) + 's';
}

/**
 * Create sparkle effect at specified coordinates
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 */
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '10px';
    sparkle.style.height = '10px';
    sparkle.style.background = 'gold';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'sparkle 1s ease-out forwards';
    sparkle.style.zIndex = '1000';
    
    document.body.appendChild(sparkle);
    
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.remove();
        }
    }, 1000);
}


function initializeEventListeners() {
    
    document.addEventListener('click', function(e) {
        createSparkle(e.clientX, e.clientY);
    });

    
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case ' ': 
                e.preventDefault();
                toggleAnimation();
                break;
            case 'ArrowUp': 
                e.preventDefault();
                changeSpeed();
                break;
            case 'r': 
                e.preventDefault();
                resetAnimation();
                break;
        }
    });

    
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        
        createSparkle(touchEndX, touchEndY);
        
        
        const deltaX = Math.abs(touchEndX - touchStartX);
        const deltaY = Math.abs(touchEndY - touchStartY);
        
        if (deltaX > 50 || deltaY > 50) {
            
            toggleAnimation();
        }
    });
}


function resetAnimation() {
    
    speedIndex = 1;
    currentSpeed = speeds[speedIndex];
    
    
    isPaused = false;
    
   
    const catContainer = document.querySelector('.cat-container');
    catContainer.style.animation = 'none';
    catContainer.offsetHeight; // Trigger reflow
    catContainer.style.animation = 'walkAcross 10s linear infinite';
    
  
    document.querySelectorAll('*').forEach(el => {
        el.style.animationPlayState = 'running';
    });
}


function addPerformanceMonitoring() {
    let frameCount = 0;
    let lastTime = performance.now();
    
    function countFrames() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            console.log(`FPS: ${frameCount}`);
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(countFrames);
    }
    
    
}


function init() {
    console.log('🐱 Animasi Kucing Berjalan - Initialized!');
    console.log('Controls:');
    console.log('- Spacebar: Pause/Play');
    console.log('- Arrow Up: Change Speed');
    console.log('- R: Reset Animation');
    console.log('- Click/Touch: Create Sparkles');
    
    initializeEventListeners();
    addPerformanceMonitoring();
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}