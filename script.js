document.addEventListener('DOMContentLoaded', () => {
    const solarSystem = document.querySelector('.solar-system');
    let isMouseDown = false;
    let startX, startY, startRotateX = 0, startRotateY = 0;

    // Effet de parallaxe au survol
    document.addEventListener('mousemove', (e) => {
        if (!isMouseDown) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 100;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 100;
            
            solarSystem.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
    });

    // Rotation manuelle au clic
    solarSystem.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startX = e.pageX;
        startY = e.pageY;
        const transform = window.getComputedStyle(solarSystem).transform;
        const matrix = new DOMMatrix(transform);
        startRotateX = Math.asin(-matrix.m23) * (180 / Math.PI);
        startRotateY = Math.atan2(matrix.m13, matrix.m11) * (180 / Math.PI);
    });

    document.addEventListener('mousemove', (e) => {
        if (isMouseDown) {
            const deltaX = (e.pageX - startX) / 5;
            const deltaY = (e.pageY - startY) / 5;
            solarSystem.style.transform = `rotateY(${startRotateY + deltaX}deg) rotateX(${startRotateX - deltaY}deg)`;
        }
    });

    document.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    // Zoom avec la molette de la souris
    document.addEventListener('wheel', (e) => {
        e.preventDefault();
        const scale = parseFloat(solarSystem.style.scale || 1);
        const newScale = e.deltaY > 0 ? 
            Math.max(0.5, scale - 0.1) : 
            Math.min(2, scale + 0.1);
        solarSystem.style.scale = newScale;
    }, { passive: false });
});

// Ajout d'un effet de perspective
document.querySelector('.solar-system').style.transform = 'perspective(1000px)'; 