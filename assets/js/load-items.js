document.addEventListener("DOMContentLoaded", function() {
    // Получаем параметры из URL
    const urlParams = new URLSearchParams(window.location.search);
    const dataFile = urlParams.get('dataFile'); // Параметр dataFile из URL

    const errorMessageElement = document.getElementById('error-message');
    const listElement = document.getElementById('list');

    if (!dataFile) {
        errorMessageElement.textContent = 'JSON file parameter is missing in the URL';
        errorMessageElement.style.display = 'block';
        return;
    }

    fetch("assets/js/minecraft/" + dataFile + ".json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (!listElement) {
                errorMessageElement.textContent = 'Element with id "list" not found';
                errorMessageElement.style.display = 'block';
                return;
            }

            const template = document.getElementById('item-template');
            if (!template) {
                errorMessageElement.textContent = 'Template with id "item-template" not found';
                errorMessageElement.style.display = 'block';
                return;
            }

            const templateContent = template.innerHTML;

            // Пройдемся по каждому ключу в JSON
            let hasData = false;
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const item = data[key];
                    let itemHtml = templateContent
                        .replace(/{KEY}/g, key)
                        .replace(/{NAME}/g, item.name)
                        .replace(/{DESCRIPTION}/g, item.Description);

                    // Создаем новый элемент и добавляем его в список
                    const itemElement = document.createElement('div');
                    itemElement.innerHTML = itemHtml;
                    listElement.appendChild(itemElement);
                    hasData = true;
                }
            }

            if (!hasData) {
                errorMessageElement.textContent = 'No data found in JSON file';
                errorMessageElement.style.display = 'block';
            }
        })
        .catch(error => {
            errorMessageElement.textContent = `Error loading JSON: ${error.message}`;
            errorMessageElement.style.display = 'block';
        });
});
