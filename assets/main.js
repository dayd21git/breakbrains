document.addEventListener('DOMContentLoaded', function() {
	// const randomNum = Math.floor(Math.random() * 10);
	
    // document.body.style.backgroundImage = `url('assets/background${randomNum}.jpg')`;
	document.body.style.backgroundImage = "url('assets/images/background0.jpg')";
});
	
function openModal(event) {
    event.preventDefault();
    const modalId = event.target.getAttribute("data-modal");
    document.getElementById(modalId).style.display = "flex";
}

function closeModal(event) {
    // Закрытие модального окна при нажатии вне его или на кнопку "Закрыть"
    if (event.target.classList.contains("modal-overlay")) {
        event.target.style.display = "none";
    } else {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.style.display = 'none';
        });
    }
}