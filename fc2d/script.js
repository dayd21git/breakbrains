document.getElementById('play-button').addEventListener('click', function() {
    const playerName = document.getElementById('player-name').value;
    if (playerName) {
        document.getElementById('main-scene').style.display = 'none';
        document.getElementById('game-scene').style.display = 'block';
		initializeGame();
    } else {
        showModalCenter('Пожалуйста, введите свой ник');
		showModalBottomRight('Пожалуйста, введите свой ник');
    }
});

// Функция для отображения централизованного модального окна
function showModalCenter(message) {
    const modal = document.getElementById('modal-center');
    const modalText = document.getElementById('modal-center-text');
    const closeBtn = document.getElementById('modal-center-close');

    modalText.textContent = message;
    modal.style.display = 'block';

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    // Закрытие модального окна при клике вне его
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
}

function showModalBottomRight(message) {
    const modal = document.getElementById('modal-bottom-right');
    
    // Создаем новый элемент сообщения
    const messageElem = document.createElement('div');
    messageElem.className = 'message';
    messageElem.textContent = message;
    
    modal.appendChild(messageElem);

    // Перемещаем старые сообщения вверх
    const messages = modal.getElementsByClassName('message');
    for (let i = 0; i < messages.length; i++) {
        messages[i].style.marginTop = '10px';
    }

    // Удаляем сообщение через 3 секунды и применяем эффект затухания
    setTimeout(() => {
        messageElem.classList.add('fade-out');
        setTimeout(() => {
            messageElem.remove();
        }, 2000); // Время затухания
    }, 3000); // Время жизни сообщения
}

function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadScript(`js/entities/entitybase.js`);
        await loadScript(`js/entities/player.js`);
        await loadScript(`js/blocks/blockbase.js`);
        await loadScript(`js/blocks/stone.js`);
        await loadScript(`js/game.js`);
    } catch (error) {
        console.error('Error loading scene scripts:', error);
    }
});