// stone.js
class Stone extends BlockBase {
    constructor(scene, position) {
        super(scene, position);
        this.createMesh(scene);
    }

    createMesh(scene) {
        // Создание блока stone
        this.mesh = BABYLON.MeshBuilder.CreateBox('stone', { size: 1 }, scene);
        this.mesh.position = new BABYLON.Vector3(this.position[0], this.position[1], this.position[2]);

        // Задание текстуры
        const texture = new BABYLON.Texture("textures/blocks/stone.png", scene); // Укажите путь к текстуре
        const material = new BABYLON.StandardMaterial("stoneMaterial", scene);
        material.diffuseTexture = texture;

        this.mesh.material = material;

        console.log(`Stone created at ${this.mesh.position.toString()}`);
    }
}
