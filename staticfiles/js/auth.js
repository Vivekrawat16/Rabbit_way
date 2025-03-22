




document.addEventListener('DOMContentLoaded', () => {
    // Particle Animation (Fixed)
    const initParticleAnimation = () => {
        const canvas = document.querySelector('.particles');
        const ctx = canvas.getContext('2d');
        
        // Set initial canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 1.5;
                this.speedY = (Math.random() - 0.5) * 1.5;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap-around boundaries
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = `rgba(79,70,229,${this.size/3})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const particles = Array(100).fill().map(() => new Particle());

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            requestAnimationFrame(animate);
        };

        // Start animation
        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            resizeCanvas();
            particles.forEach(p => {
                p.x = Math.random() * canvas.width;
                p.y = Math.random() * canvas.height;
            });
        });
    };

    // Rest of your code...
    initParticleAnimation();
});