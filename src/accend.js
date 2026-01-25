import { delivery } from './delivery.js';

export function accend(position, map, overlay) {
    const startAlt = position.altitude;
    const endAlt = 30;
    const duration = 5000;
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        position.altitude = startAlt + (endAlt - startAlt) * progress;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);

    setTimeout(() => {
        delivery(position, map, overlay);
    }, duration + 1000);

}
