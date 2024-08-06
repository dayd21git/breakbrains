class EntityBase {
    constructor(name, position, size) {
        this.name = name;
        this.position = position; // [x, y, z]
        this.size = size; // [width, height, depth] or [radius] for spherical entities
    }

    setPosition(x, y, z) {
        this.position = [x, y, z];
    }

    getPosition() {
        return this.position;
    }

    setSize(width, height, depth) {
        this.size = [width, height, depth];
    }

    getSize() {
        return this.size;
    }
}