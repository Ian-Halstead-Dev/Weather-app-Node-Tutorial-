console.log('Client JS is loaded');

const weatherForm = document.getElementById('weatherForm');
const search = document.getElementById('locationSearch');
const msg1 = document.getElementById('msg-1');
const msg2 = document.getElementById('msg-2');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const location = search.value;

	msg1.innerText = 'Loading...';
	msg2.innerText = '';

	fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				msg1.innerText = 'Error: ' + data.error;
			}
			else {
				msg1.innerText = 'The weather right now in ' + data.location;
				msg2.innerText = 'It is ' + data.temperature + ' degrees but it feels like ' + data.feelsLike;
			}
		});
	});
});
