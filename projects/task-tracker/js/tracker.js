import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
    getFirestore, collection, onSnapshot, addDoc,
    setDoc, doc, query, where, orderBy, getDocs, collectionGroup, updateDoc, deleteDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import {
    getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDU95mBEwswXTrehr6-awwFxPNMOqnEscM",
    authDomain: "peak-suprstate-384109.firebaseapp.com",
    projectId: "peak-suprstate-384109",
    storageBucket: "peak-suprstate-384109.appspot.com",
    messagingSenderId: "764256186835",
    appId: "1:764256186835:web:ecdecc4c9b5bd4bb1e7f26",
    measurementId: "G-QG56KL9Y1R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//init services
const auth = getAuth();
const database = getFirestore();


let userUid;
// Listen for changes in authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        userUid = user.uid;
        console.log(`User is signed in with UID: ${userUid}`);
        document.querySelector('.currentUser').innerHTML = user.displayName
        getUserIncidents()
        getUserIncidentCount()
    } else {
        console.log("User is signed out");
    }
});


document.addEventListener('DOMContentLoaded', function () {
    // Hide the loading screen when the page is fully loaded
    window.addEventListener('load', function () {
        const loadingScreen = document.querySelectorAll('#loading-screen');
        loadingScreen.forEach((screen) => {
            screen.style.display = 'none';
        })
    });
});


//Records 
const dateInputElement = document.querySelector('.js-date-input');
const countInputElement = document.querySelector('.js-count-input');
const addRecordButton = document.querySelector('.js-add-record-btn');
const recordsElement = document.querySelector('.js-records-grid');
const deleteRecordButton = document.querySelector('.js-add-record-btn');
const weeklyAvergeElement = document.querySelector('.weekly-avg');

//Collection and Documents references
recordsElement.style.display = 'none';
let localeRecords = []
function getUserIncidents() {
    const userDocRef = doc(database, 'users', userUid)
    const usersColRef = collection(database, 'users')
    const dailyIncidentsColRef = collection(userDocRef, "daily_incidents");
    const q = query(dailyIncidentsColRef, orderBy('createdAt', 'asc'))



    //render records to UI
    onSnapshot(q, (snapshot) => {
        let records = []
        snapshot.docs.forEach((doc) => {
            records.push({ ...doc.data(), id: doc.id });
            localeRecords.push({ ...doc.data(), id: doc.id });

        })
        recordsElement.style.display = 'grid';
        function renderRecords() {
            let recordsGridHTML = []
            for (let index = 0; index < records.length; index++) {
                const record = records[index];

                const html = `
                    <p>${record.day}</p>
                    <p>${record.incidentCount}</p>
                    <button class="button js-deleteRecord" data-id="${record.id}">Delete</button>
                `
                recordsGridHTML += html
            }
            recordsElement.innerHTML = recordsGridHTML;

            const deleteButtons = document.querySelectorAll('.js-deleteRecord');
            //TODO - Implement delete functionality
            deleteButtons.forEach((button) => {
                const { id } = button.dataset
                const docRef = doc(database, 'users', userUid, "daily_incidents", id)
                button.addEventListener('click', (e) => {
                    deleteDoc(docRef)
                    console.log("Record Deleted")
                })
            })
        }
        renderRecords()
    })

    //Initialize graph data
    const graphDataColRef = collection(userDocRef, "graph_data");
    let quir = query(graphDataColRef, orderBy('createdAt', 'asc'))

    onSnapshot(quir, (snapshot) => {
        let persistenceModule = []
        snapshot.docs.forEach((doc) => {
            persistenceModule.push({ ...doc.data(), id: doc.id });

        })
        renderGraphicalData(persistenceModule)
    })

}



let totalIncidents = null
let totalIncElement = document.querySelector('.incident-Element')

function getUserIncidentCount() {
    let incidentId = ''
    const userDocRef = doc(database, 'users', userUid)
    const dailyIncidentsCount = collection(userDocRef, "incident_count");
    onSnapshot(dailyIncidentsCount, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            totalIncidents = ({ ...doc.data(), id: doc.id })

        })
        incidentId = totalIncidents.id
        renderHTML(totalIncidents);
    })
    document.querySelector('.js-increment').addEventListener('click', () => {
        incrementIncident()
    })
    document.addEventListener('keydown', (event) => {
        if (event.key === '+') {
            incrementIncident();
            startTimer()
        }
    });

    function incrementIncident() {
        let incidents = totalIncidents.incidents += 1;
        let incidentData = { incidents }
        const docRef = doc(dailyIncidentsCount, incidentId)
        updateDoc(docRef, incidentData)
    }

    //Decrementor Hander
    document.querySelector('.js-decrement').addEventListener('click', () => {
        decrementIncident()
    })
    document.addEventListener('keydown', (event) => {
        if (event.key === '-') {
            decrementIncident();
        }
    });
    function decrementIncident() {
        if (totalIncidents.incidents === 0) {
            return
        }
        let incidents = totalIncidents.incidents -= 1;
        let incidentData = { incidents }
        const docRef = doc(dailyIncidentsCount, incidentId)
        updateDoc(docRef, incidentData)
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
        let incidentData = { incidents: 0 }
        const docRef = doc(dailyIncidentsCount, incidentId)
        updateDoc(docRef, incidentData)
        renderHTML(totalIncidents)
        closePopup();
    });

    noButton.addEventListener('click', () => {
        console.log('Code execution cancelled.');
        closePopup();
    });

    function closePopup() {
        popup.style.display = 'none';
    }
    function renderHTML(data) {
        totalIncElement.innerHTML = `Total Incidents: ${data.incidents}`
    }
}

countInputElement.addEventListener('keydown', (event) => {
    const keypressed = event.key
    if (keypressed === 'Enter') {
        addRecord();
    }
})
addRecordButton.addEventListener('click', () => {
    addRecord();

})

function addRecord() {
    const incidentData =
    {
        date: '',
        day: '',
        incidentCount: 0,
        createdAt: serverTimestamp(),
    };

    incidentData.date = dateInputElement.value
    const dateObj = new Date(incidentData.date);
    incidentData.day = dateObj.toLocaleDateString('en-US', { weekday: 'long' })
    incidentData.incidentCount = parseInt(countInputElement.value);
    if (!incidentData.day && !incidentData.incidentCount) {
        alert('Cannot add empty record')
    } else if (!incidentData.date) {
        alert('Date is required')
    } else if (!incidentData.incidentCount) {
        alert('incident count is required')
    } else if (incidentData.incidentCount < 0) {
        alert('incident count must be >= 0')
    } else {



        const existingRecordIndex = localeRecords.findIndex(r => r.date === incidentData.date)
        if (existingRecordIndex >= 0) {
            let recordToUpdate = localeRecords[existingRecordIndex].id
            updateExistingRecord(userUid, recordToUpdate, incidentData)
        } else {
            addDailyRecord(userUid, incidentData);

        }

    }

    function addDailyRecord(userUid, dailyIncidentData) {
        const userDocRef = doc(database, 'users', userUid)
        const dailyIncidentsDocRef = collection(userDocRef, "daily_incidents");
        const graphDataDocRef = collection(userDocRef, "graph_data");

        // Add a new document with an automatically generated ID
        addDoc(dailyIncidentsDocRef, dailyIncidentData)
            .then(() => {
                console.log("Record added");
            })
            .catch((error) => {
                console.error("Error adding record: ", error);
            });
        addDoc(graphDataDocRef, dailyIncidentData)
    };

    function updateExistingRecord(userUid, recordToUpdate, incidentData) {
        const userDocRef = doc(database, 'users', userUid)
        const dailyIncidentsDocRef = collection(userDocRef, "daily_incidents");
        const docRef = doc(dailyIncidentsDocRef, recordToUpdate)
        updateDoc(docRef, incidentData)

    }
    dateInputElement.value = '';
    countInputElement.value = '';
}

function renderGraphicalData(data) {
    const tableBody = document.getElementById('table-body');
    let persistenceModule = data
    // Function to render the table
    function renderTable(data, itemsPerPage, currentPage) {
        tableBody.innerHTML = '';
    
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentPageData = data.slice(startIndex, endIndex);
    
        currentPageData.forEach(item => {
            const row = document.createElement('tr');
            const dateObj = new Date(item.date);
            const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    
            row.innerHTML = `
                <td>${item.date} (${dayOfWeek})</td>
                <td>${item.incidentCount}</td>
            `;
            tableBody.appendChild(row);
        });
    
        // Add pagination controls
        const totalPages = Math.ceil(data.length / itemsPerPage);
    
        const paginationContainer = document.getElementById('pagination');
        paginationContainer.innerHTML = '';
    
        const maxPagesToShow = 3; // Adjust this value to change the number of pages displayed
    
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
    
        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
    
        // Add previous button
        if (currentPage > 1) {
            const prevButton = document.createElement('button');
            prevButton.textContent = 'Previous';
            prevButton.addEventListener('click', () => {
                renderTable(data, itemsPerPage, currentPage - 1);
            });
            paginationContainer.appendChild(prevButton);
        }
    
        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
    
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
    
            pageButton.addEventListener('click', () => {
                renderTable(data, itemsPerPage, i);
            });
    
            paginationContainer.appendChild(pageButton);
        }
    
        // Add next button
        if (currentPage < totalPages) {
            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.addEventListener('click', () => {
                renderTable(data, itemsPerPage, currentPage + 1);
            });
            paginationContainer.appendChild(nextButton);
        }
    }
    
    // ...
    
    // Call renderTable with an initial current page
    const itemsPerPage = 5; // You can adjust this value based on your preference
    let currentPage = 1;
    
    renderTable(persistenceModule, itemsPerPage, currentPage);
    
    

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
            document.querySelector('#incident-table').innerHTML = `
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
            function renderTable(data, itemsPerPage, currentPage) {
                tableBody.innerHTML = '';
                
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const currentPageData = data.slice(startIndex, endIndex);
            
                currentPageData.forEach(item => {
                    const row = document.createElement('tr');
                    const dateObj = new Date(item.date);
                    const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
            
                    row.innerHTML = `
                        <td>${item.date} (${dayOfWeek})</td>
                        <td>${item.incidentCount}</td>
                    `;
                    tableBody.appendChild(row);
                });
            
                // Add pagination controls
                const totalPages = Math.ceil(data.length / itemsPerPage);
            
                const paginationContainer = document.getElementById('pagination');
                paginationContainer.innerHTML = '';
            
                for (let i = 1; i <= totalPages; i++) {
                    const pageButton = document.createElement('button');
                    pageButton.textContent = i;
            
                    if (i === currentPage) {
                        pageButton.classList.add('active');
                    }
            
                    pageButton.addEventListener('click', () => {
                        renderTable(data, itemsPerPage, i);
                    });
            
                    paginationContainer.appendChild(pageButton);
                }
            }
            
            // ...
            
            // Call renderTable with an initial current page
            const itemsPerPage = 5; // You can adjust this value based on your preference
            let currentPage = 1;
            
            renderTable(persistenceModule, itemsPerPage, currentPage);
            
        }

    })
}