const closeBtn = document.getElementById('close-alert');
const alertContainer = document.getElementById('alert');
const alertMessage = document.getElementById('alert-message');
const alertTitle = document.getElementById('alert-title');

closeBtn.addEventListener('click', () => {
	alertContainer.style.display = 'none';
});

const alertHTML = (title, message) => {
	alertMessage.innerText = message;
	alertTitle.innerText = title;
	alertContainer.style.display = 'flex';
};
