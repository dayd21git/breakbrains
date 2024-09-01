document.addEventListener("DOMContentLoaded", function() {
    fetch('plugins.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const listElement = document.getElementById('list');
            if (!listElement) {
                console.error('Element with id "list" not found');
                return;
            }

            const template = document.getElementById('item-template');
            if (!template) {
                console.error('Template with id "item-template" not found');
                return;
            }

            const templateContent = template.innerHTML;

            // Пройдемся по каждому ключу в JSON
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
                }
            }
        })
        .catch(error => console.error('Error loading JSON:', error));
});
