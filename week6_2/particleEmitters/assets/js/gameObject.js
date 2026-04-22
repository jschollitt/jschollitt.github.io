class GameObject {
    constructor(context, x, y, vx, vy, width, height) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.width = width;
        this.height = height;

        this.isColliding = false;

        this.draw = this.draw.bind(this);
        this.update = this.update.bind(this);
        this.getRight = this.getRight.bind(this);
        this.getBottom = this.getBottom.bind(this);
        this.setVelocity = this.setVelocity.bind(this);
        this.offsetVelocity = this.offsetVelocity.bind(this);
    }
    getRight() {
        return (this.x + this.width);
    }

    getBottom() {
        return (this.y + this.height);
    }

    draw(context) { };
    update(secondsPassed) { };
}

class Particle extends GameObject {
    constructor(context, x, y, vx, vy, radius, lifeTimeLimit, startColor, endColor) {
        super(context, x, y, vx, vy);

        // Set default width and height
        this.radius = radius;
        this.lifeTime = 0;
        this.lifeTimeLimit = lifeTimeLimit;
        this.startColor = startColor;
        this.endColor = endColor;

        this.draw = this.draw.bind(this);
        this.update = this.update.bind(this);
        this.setVelocity = this.setVelocity.bind(this);
        this.offsetVelocity = this.offsetVelocity.bind(this);
    }

    draw(ctx) {
        super.draw(ctx);
        // Draw a simple circle
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    update(secondsPassed) {
        super.update(secondsPassed);
        // Move with set velocity
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;

        this.lifeTime < this.lifeTimeLimit ? this.lifeTime += secondsPassed : null;
        this.colorLerp(1 - this.lifeTime / this.lifeTimeLimit);

        //console.log(this.x + ", " + this.y);
    }

    setVelocity(vx, vy) {
        this.vx = vx;
        this.vy = vy;
    }

    offsetVelocity(vx, vy) {
        this.vx += vx;
        this.vy += vy;
    }

    colorLerp(t) {
        const r = Math.round(this.endColor.r + t * (this.startColor.r - this.endColor.r));
        const g = Math.round(this.endColor.g + t * (this.startColor.g - this.endColor.g));
        const b = Math.round(this.endColor.b + t * (this.startColor.b - this.endColor.b));
        this.color = `rgb(${r}, ${g}, ${b})`;
    }
}

class Emitter {
    constructor(context, x, y, emitRate, particleCount, particleRadius, particleSpeed, particleLifeTime, colorStart, colorEnd) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.particles = [];
        this.emitRate = emitRate;
        this.particleCount = particleCount;
        this.particleRadius = particleRadius;
        this.particleSpeed = particleSpeed;
        this.particleLifeTime = particleLifeTime;
        this.colorStart = colorStart;
        this.colorEnd = colorEnd;
        this.timeSinceLastEmit = 0;

        this.draw = this.draw.bind(this);
        this.update = this.update.bind(this);
    }

    addParticle() {
        const angle = Math.random() * 2 * Math.PI;
        const speed = this.particleSpeed * (0.5 + Math.random() * 0.5);
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        const particle = new Particle(this.context, this.x, this.y, vx, vy, this.particleRadius, this.particleLifeTime, this.colorStart, this.colorEnd);
        this.particles.push(particle);
    }

    draw() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].draw(this.context);
        }
    }

    update(secondsPassed) {
        this.timeSinceLastEmit += secondsPassed;
        if (this.timeSinceLastEmit >= 1 / this.emitRate) {
            this.timeSinceLastEmit = 0;
            if (this.particles.length < this.particleCount) {
                this.addParticle();
            }
        }

        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update(secondsPassed);
            if (this.particles[i].lifeTime >= this.particleLifeTime) {
                this.particles.splice(i, 1);
                i--;
                this.addParticle();
            }
        }
    }
}