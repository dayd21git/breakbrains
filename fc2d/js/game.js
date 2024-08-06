let player; // Переменная для игрока
let engine; // Объявляем переменную для двигателя
let scene; // Переменная для сцены
let camera;
const canvas = document.getElementById('game-canvas');
const gameData = {
	"type": 0,
	"world-data": {
		"spawn": [0, 0, 0],
		"blocks": {
			"blocks": [
				{ t: "stone", p: [0, 0, 0] },
				{ t: "stone", p: [1, 0, 1] },
				{ t: "stone", p: [-1, 0, -1] },
				{ t: "stone", p: [1, 0, -1] },
				{ t: "stone", p: [-1, 0, 1] },
				{ t: "stone", p: [1, 0, 0] },
				{ t: "stone", p: [0, 0, 1] },
				{ t: "stone", p: [0, 0, -1] },
				{ t: "stone", p: [-1, 0, 0] }
			]
		}
	},
	"player": {
		"coords": [0, 1, 0]
	}
};

function initializeGame() {
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }
    
    engine = new BABYLON.Engine(canvas, true);
    scene = createScene();

    // Initialize player
    player = new Player("player1", gameData["player"]["coords"], [1, 2, 1], 100, 10);
    console.log(`Player created at ${player.getPosition().toString()}`);

    // Set up key event listeners
    setupControls();

    engine.runRenderLoop(function() {
        scene.render();
    });

    window.addEventListener('resize', function() {
        engine.resize();
    });
}

function createScene() {
    const scene = new BABYLON.Scene(engine);

    // Создаем ArcRotateCamera
    camera = new BABYLON.ArcRotateCamera(
        "camera",
        Math.PI / 2,                    // Альфа
        Math.PI / 4,                    // Бета
        10,                             // Радиус
        new BABYLON.Vector3(0, 0, 0),   // Целевая точка
        scene
    );

    camera.attachControl(canvas, true);

    // Ограничение радиуса камеры
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 20;
	
	camera.inputs.clear();
	
    // Создаем свет
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Создаем блоки
    createBlocks(scene);

    // Обновляем целевую точку камеры на основе позиции игрока
    scene.registerBeforeRender(function() {
        if (player) {
            camera.target = player.mesh.position;
        }
    });

    return scene;
}

function createScene() {
    const scene = new BABYLON.Scene(engine);

    // Создаем FreeCamera
    camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 10, -15), scene); // Начальная позиция камеры
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    camera.rotation.x = Math.PI / 10;

    // Отключаем все входные данные от камеры
    camera.inputs.clear();

    // Создаем свет
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Создаем блоки
    createBlocks(scene);

    // Функция для обновления позиции камеры
    scene.registerBeforeRender(function() {
        if (player) {
            // Задаем позицию камеры относительно игрока
            const offset = new BABYLON.Vector3(0, 10, -15); // Измените значение, чтобы отдалить камеру
            camera.position = player.mesh.position.add(offset);
            camera.setTarget(player.mesh.position); // Камера будет смотреть на игрока
        }
    });

    return scene;
}


function setupControls() {
    const keys = {};

    window.addEventListener('keydown', function(event) {
        keys[event.code] = true;
        handleMovement();
    });

    window.addEventListener('keyup', function(event) {
        keys[event.code] = false;
    });

    function handleMovement() {
        console.log(`Camera position: ${camera.position.toString()}`);
        console.log(`Player position: ${player.mesh.position.toString()}`);
        
        if (keys['KeyW'] || keys['ArrowUp']) {
            player.move('up');
        }
        if (keys['KeyS'] || keys['ArrowDown']) {
            player.move('down');
        }
        if (keys['KeyA'] || keys['ArrowLeft']) {
            player.move('left');
        }
        if (keys['KeyD'] || keys['ArrowRight']) {
            player.move('right');
        }
    }
}

function createBlocks(scene) {
    console.log("Creating blocks...");
    const blockData = gameData["world-data"]["blocks"]["blocks"];
    for (const block of blockData) {
        const { t, p } = block;
        let blockObj;
        switch(t) {
            case 'stone':
                blockObj = new Stone(scene, p);
                break;
            // Добавьте другие типы блоков по мере необходимости
        }
        if (blockObj) {
            console.log(`Block ${t} created at ${blockObj.mesh.position.toString()}`);
        }
    }
}
