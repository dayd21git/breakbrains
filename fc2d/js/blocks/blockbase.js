// blockbase.js
class BlockBase {
    constructor(scene, position) {
        this.position = position;
        this.scene = scene;
        this.createMesh();
    }

    // Абстрактный метод, должен быть реализован в производных классах
    createMesh() {
        throw new Error("createMesh() must be implemented in derived class");
    }
}
