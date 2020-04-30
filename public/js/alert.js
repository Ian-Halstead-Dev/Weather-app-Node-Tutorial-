const closeAlert = document.getElementById('close-alert');
const alertContainer = document.getElementById('alert');
const alertMessage = document.getElementById('alert-message');
const alertTitle = document.getElementById('alert-title');

closeAlert.addEventListener('click', () => {
	alertContainer.style.display = 'none';
	window.clearTimeout(alertTimeout);
});

// Allows me to reset the timer when the closeAlert is clicked
let alertTimeout = undefined;

const alertHTML = (title, message) => {
	alertMessage.innerText = message;
	alertTitle.innerText = title;
	alertContainer.style.display = 'flex';
	alertTimeout = window.setTimeout(() => {
		alertContainer.style.display = 'none';
	}, 5000);
};
