

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
