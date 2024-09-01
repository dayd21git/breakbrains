document.addEventListener("DOMContentLoaded", function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const listElement = document.getElementById('list');
            const template = document.getElementById('item-template').innerHTML;

            // Пройдемся по каждому ключу в JSON
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const item = data[key];
                    let itemHtml = template
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
