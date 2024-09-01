document.addEventListener("DOMContentLoaded", function() {
    const descElement = document.getElementById('desc');
    const listElement = document.getElementById('list');
    const template = document.getElementById('item-template').innerHTML;

    // Скрываем блок #desc по умолчанию
    if (descElement) descElement.style.display = 'none';

    // Получаем параметры dataFile и type из URL
    const urlParams = new URLSearchParams(window.location.search);
    const dataFileParam = urlParams.get('dataFile');
    const type = urlParams.get('type');

    // Проверяем наличие необходимых параметров и их корректность
    if (!dataFileParam || !type || (type !== 'list' && type !== 'desc')) {
        const errorMessage = document.getElementById('error-message');
        if (errorMessage) {
            errorMessage.textContent = 'Invalid or missing dataFile and/or type parameters in the URL.';
            errorMessage.style.display = 'block';
        }
        return; // Прерываем выполнение скрипта
    }

    // Переключаем отображение блоков на основе значения type
    if (type === 'desc') {
        listElement.style.display = 'none';
        descElement.style.display = 'block';
    } else if (type === 'list') {
        listElement.style.display = 'block';
        descElement.style.display = 'none';
    }

    // Формируем путь к JSON файлу (относительно корневого каталога сайта)
    const dataFilePath = `/bbrains/assets/json/minecraft/${dataFileParam}.json`;

    // Загружаем данные из JSON файла
    fetch(dataFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Пройдемся по каждому ключу в JSON
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const item = data[key];
                    let itemHtml = template
                        .replace(/{KEY}/g, key)
                        .replace(/{NAME}/g, item.name)
                        .replace(/{DESCRIPTION}/g, item.description);

                    // Создаем новый элемент и добавляем его в список
                    const itemElement = document.createElement('div');
                    itemElement.innerHTML = itemHtml;
                    listElement.appendChild(itemElement);
                }
            }
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
            const errorMessage = document.getElementById('error-message');
            if (errorMessage) {
                errorMessage.textContent = 'Error loading JSON data. Please try again later.';
                errorMessage.style.display = 'block';
            }
        });
});
