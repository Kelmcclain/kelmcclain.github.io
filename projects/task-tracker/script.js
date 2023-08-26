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

//Records 
const dateInputElement = document.querySelector('.js-date-input')
const dayInputElement = document.querySelector('.js-day-input')
const countInputElement = document.querySelector('.js-count-input')
const addRecordButton = document.querySelector('.js-add-record-btn')
const recordsElement = document.querySelector('.js-records-grid')
const deleteRecordButton = document.querySelector('.js-add-record-btn')
const weeklyAvergeElement = document.querySelector('.weekly-avg')

addRecordButton.addEventListener('click', () => {
    addRecord();
})

countInputElement.addEventListener('keydown', (event) => {
    keypressed = event.key
    if (keypressed === 'Enter') {
        addRecord();
    }
})

const records = JSON.parse(localStorage.getItem('records')) || []
const persistenceModule = JSON.parse(localStorage.getItem('persistenceModule')) || []
const weeklyrecords = JSON.parse(localStorage.getItem('weeklyrecords')) || {
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0
}

renderRecords()
function addRecord() {
    const record = {
        date: '',
        day: '',
        incidentCount: 0,
    }
    record.date = dateInputElement.value;
    const dateObj = new Date(record.date);
    record.day = dateObj.toLocaleDateString('en-US', { weekday: 'long' })
    record.incidentCount = parseInt(countInputElement.value);
    if (!record.day && !record.incidentCount) {
        alert('Cannot add empty record')
    } else if (!record.date) {
        alert('Date is required')
    } else if (!record.incidentCount) {
        alert('incident count is required')
    } else if (record.incidentCount < 0) {
        alert('incident count must be >= 0')
    } else {
        // Check if record with same day already exists
        const existingRecordIndex = records.findIndex(r => r.date === record.date);
        if (existingRecordIndex >= 0) {
            records[existingRecordIndex] = record; // Update existing record
        } else {
            records.push(record); // Add new record
        }

        // Check if record with same day already exists
        const existingRecordPersistenceModule = persistenceModule.findIndex(r => r.date === record.date);
        if (existingRecordPersistenceModule >= 0) {
            persistenceModule[existingRecordPersistenceModule] = record; // Update existing record
        } else {
            persistenceModule.push(record); // Add new record to persistenceModule

        }
    }

    dateInputElement.value = '';
    countInputElement.value = '';
    renderRecords();

    // Update weekly records with new or updated record's incident count
    const day = record.day.toLowerCase();
    weeklyrecords[day] = record.incidentCount;
    localStorage.setItem('weeklyrecords', JSON.stringify(weeklyrecords));

    let sum = 0;
    let recordsCount = 0;
    for (const key in weeklyrecords) {
        if (weeklyrecords.hasOwnProperty(key)) {
            sum += weeklyrecords[key];
            if (weeklyrecords[key] !== 0) {
                recordsCount++;
            }
        }
    }

    console.log('Total Incidents', sum);
    console.log('Number of days', recordsCount);

    weeklyAverge = sum / recordsCount;
    weeklyAvergeElement.innerHTML = `Weekly Average: ${weeklyAverge.toFixed(1)}`;

    localStorage.setItem('records', JSON.stringify(records));
    localStorage.setItem('persistenceModule', JSON.stringify(persistenceModule));

}

function renderRecords() {
    let recordsGridHTML = []
    for (let index = 0; index < records.length; index++) {
        const record = records[index];

        const html = `
            <p>${record.day}</p>
            <p>${record.incidentCount}</p>
            <button class="button js-deleteRecord">Delete</button>
        `
        recordsGridHTML += html
    }
    recordsElement.innerHTML = recordsGridHTML;

    const deleteButtons = document.querySelectorAll('.js-deleteRecord');
    for (let index = 0; index < deleteButtons.length; index++) {
        const deleteButton = deleteButtons[index];
        deleteButton.addEventListener('click', () => {
            const deletedRecord = records.splice(index, 1)[0];

            renderRecords();
            localStorage.setItem('records', JSON.stringify(records));

            // Update weekly records with deleted record's incident count
            const day = deletedRecord.day.toLowerCase();
            weeklyrecords[day] = 0;
            localStorage.setItem('weeklyrecords', JSON.stringify(weeklyrecords));

        });
    }

}



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


// Sample data for demonstration

const tableBody = document.getElementById('table-body');

// Function to render the table
function renderTable(data) {
    tableBody.innerHTML = '';
    data.forEach(item => {
        const row = document.createElement('tr');
        const dateObj = new Date(item.date);
        const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'long' });

        row.innerHTML = `
        <td>${item.date} (${dayOfWeek})</td>
        <td>${item.incidentCount}</td>
      `;
        tableBody.appendChild(row);
    });
}

// Initial rendering
renderTable(persistenceModule);

// Function to calculate weekly averages
function calculateWeeklyAverages(data) {
    const weeklyAverages = [];
    let weekStartIndex = 0;
    let weekEndIndex = 0;
    let currentWeekTotal = 0;

    while (weekEndIndex < data.length) {
        currentWeekTotal += data[weekEndIndex].incidentCount;

        const weekStartDate = new Date(data[weekStartIndex].date);
        const weekEndDate = new Date(data[weekEndIndex].date);

        if (weekEndDate.getDay() === 6) { // Assuming Saturday is the end of the week
            const average = currentWeekTotal / 7;
            weeklyAverages.push(average.toFixed(2));

            currentWeekTotal = 0;
            weekStartIndex = weekEndIndex + 1;
        }

        weekEndIndex++;
    }

    return weeklyAverages;
}
// Function to update table with weekly averages
function updateTableWithAverages() {
    const weeklyAverages = calculateWeeklyAverages(persistenceModule);
    const tableRows = tableBody.querySelectorAll('tr');

    tableRows.forEach((row, index) => {
        const cell = document.createElement('td');
        cell.textContent = index < weeklyAverages.length ? weeklyAverages[index] : '';
        row.appendChild(cell);
    });
}

// Call function to update table with weekly averages
updateTableWithAverages();


//Render Stats Graph
const graphButton = document.querySelector('.js-graph')
graphButton.addEventListener('click', () => {

    if (graphButton.innerHTML === 'Graph') {
        graphButton.innerHTML = 'Stats'
        document.querySelector('.js-stats').innerHTML = `
    <div>
        <canvas id="myChart"></canvas>
    </div>`

        const ctx = document.getElementById('myChart');
        const labels = persistenceModule.map(item => item.date);
        const incidentCounts = persistenceModule.map(item => item.incidentCount);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Incident Count',
                    data: incidentCounts,
                    borderWidth: .5,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        graphButton.innerHTML = 'Graph'
        document.querySelector('.js-stats').innerHTML = `
        <div class="table-container">
                    <table id="incident-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Incidents</th>
                            </tr>
                        </thead>
                        <tbody id="table-body">
                            <!-- Table content will be added here -->
                        </tbody>
                    </table>
                </div>`

        const tableBody = document.getElementById('table-body');

        // Function to render the table
        function renderTable(data) {
            tableBody.innerHTML = '';
            data.forEach(item => {
                const row = document.createElement('tr');
                const dateObj = new Date(item.date);
                const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'long' });

                row.innerHTML = `
                        <td>${item.date} (${dayOfWeek})</td>
                        <td>${item.incidentCount}</td>
                      `;
                tableBody.appendChild(row);
            });
        }
        renderTable(persistenceModule)
    }

})

const clearStatsbutton = document.querySelector('.js-clear-stats')
clearStatsbutton.addEventListener('click', () => {
    localStorage.removeItem('persistenceModule');
    clearStatsbutton.innerHTML = 'Cleared!'

    setTimeout(() => {
        clearStatsbutton.innerHTML = 'Clear Stats'

    }, 1000)

})