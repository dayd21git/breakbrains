class Player extends EntityBase {
    constructor(name, coords, scale, health, speed) {
        super(name, coords, scale);
        this.name = name;
        this.position = coords; // [x, y, z]
        this.scale = scale;
        this.health = health;
        this.speed = speed;

        // Create the player mesh (e.g., a sphere)
        this.mesh = BABYLON.MeshBuilder.CreateSphere('player', { diameter: 1 }, scene);
        this.mesh.position = new BABYLON.Vector3(this.position[0], this.position[1], this.position[2]);

        console.log(`Player mesh created at ${this.mesh.position.toString()}`);
    }

    // Method to move the player
    move(direction) {
        const speed = this.speed / 100;
        switch (direction) {
            case 'left':
                this.position[0] -= speed; // Двигаемся влево по оси X
                break;
            case 'right':
                this.position[0] += speed; // Двигаемся вправо по оси X
                break;
            case 'up':
                this.position[2] += speed; // Двигаемся вперед по оси Z
                break;
            case 'down':
                this.position[2] -= speed; // Двигаемся назад по оси Z
                break;
        }
        this.mesh.position = new BABYLON.Vector3(this.position[0], this.position[1], this.position[2]);
        console.log(`Player moved to ${this.mesh.position.toString()}`);
    }

    getPosition() {
        return this.position;
    }

    setHealth(health) {
        this.health = health;
    }

    getHealth() {
        return this.health;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    getSpeed() {
        return this.speed;
    }
}
