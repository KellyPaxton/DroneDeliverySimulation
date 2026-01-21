export function delivery(position, map, overlay) {
    const startLat = position.lat;
    const endLat = 35.7750;
    const duration = 25000;
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        position.lat = startLat + (endLat - startLat) * progress;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}  