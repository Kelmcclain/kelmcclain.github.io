let totalIncidents = JSON.parse(localStorage.getItem('incidents')) || { incidents: 0 }
let totalIncElement = document.querySelector('.incident-Element')


renderHTML();
//incrementor Hander
document.querySelector('.js-increment').addEventListener('click', () => {
    incrementIncident()
    renderHTML();
})
document.addEventListener('keydown', (event) => {
    if (event.key === '+') {
        incrementIncident();
        renderHTML();
        startTimer()
    }
});
function incrementIncident() {
    totalIncidents.incidents += 1;
    localStorage.setItem('incidents', JSON.stringify(totalIncidents))
}

//Decrementor Hander
document.querySelector('.js-decrement').addEventListener('click', () => {
    decrementIncident()
    renderHTML()
})
document.addEventListener('keydown', (event) => {
    if (event.key === '-') {
        decrementIncident();
        renderHTML();
    }
});
function decrementIncident() {
    if (totalIncidents.incidents === 0) {
        return
    }
    totalIncidents.incidents -= 1;
    localStorage.setItem('incidents', JSON.stringify(totalIncidents))
}

//Reset Hander
const popup = document.getElementById('popup');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
document.querySelector('.js-reset').addEventListener('click', () => {
    popup.style.display = 'flex';
})

yesButton.addEventListener('click', () => {
    console.log('Incidents Cleared');
    localStorage.removeItem('incidents')
    totalIncidents.incidents = 0
    renderHTML()
    closePopup();
});

noButton.addEventListener('click', () => {
    console.log('Code execution cancelled.');
    closePopup();
});

function closePopup() {
    popup.style.display = 'none';
}


//HTML Renderer
function renderHTML() { totalIncElement.innerHTML = `Total Incidents: ${totalIncidents.incidents}` }


let timerInterval;
let seconds = 0;
let isRunning = false;

function startTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
    isRunning = true;
}

function updateTimer() {
    seconds++;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(remainingSeconds)}`;
    const timerElement = document.querySelector('.timer');
    timerElement.textContent = formattedTime;

    // Set the color based on the number of seconds
    timerElement.style.color = getColorForSeconds(seconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function getColorForSeconds(seconds) {
    if (seconds < 60) {
        return '#d4d4df'; // Change to the desired color for seconds < 60
    } else if (seconds < 120) {
        return '#64cb64'; // Change to the desired color for seconds >= 60 and < 120
    } else if (seconds < 180) {
        return 'orange'; // Change to the desired color for seconds >= 120 and < 180
    } else {
        return 'red'; // Change to the desired color for seconds >= 180
    }
}
document.getElementById('startButton').addEventListener('click', startTimer);
