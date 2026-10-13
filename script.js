const MAX_STUDENTS = 30;
let names = new Array(MAX_STUDENTS).fill("");
let marks = new Array(MAX_STUDENTS).fill(0.0);
let currentCount = 0;

function addStudent() {
    const nameEl = document.getElementById('nameInput');
    const markEl = document.getElementById('markInput');
    const nameVal = nameEl.value.trim();
    const markVal = parseFloat(markEl.value);

    if (nameVal === "") {
        alert('Please enter a valid student name.');
        return;
    }
    if (isNaN(markVal) || markVal < 0 || markVal > 100) {
        alert('Mark must be a number between 0 and 100.');
        return;
    }
    if (currentCount >= MAX_STUDENTS) {
        alert('Maximum capacity of 30 students reached.');
        return;
    }

    names[currentCount] = nameVal;
    marks[currentCount] = markVal;
    currentCount++;

    nameEl.value = '';
    markEl.value = '';
    updateUI();
    setOutput(`Successfully added ${nameVal} with mark ${markVal}.`);
}

function loadSampleData() {
    const sampleNames = ["Alice Smith", "Bob Jones", "Charlie Brown", "Diana Prince", "Ethan Hunt"];
    const sampleMarks = [88.5, 72.0, 94.5, 65.0, 79.0];
    currentCount = 0;
    for (let i = 0; i < sampleNames.length; i++) {
        names[i] = sampleNames[i];
        marks[i] = sampleMarks[i];
        currentCount++;
    }
    updateUI();
    setOutput('Loaded sample class data of 5 students successfully.');
}

function clearAllData() {
    names.fill("");
    marks.fill(0.0);
    currentCount = 0;
    updateUI();
    setOutput('All student records cleared.');
}

function updateUI() {
    renderArrayGrid();
    updateStatistics();
}

function renderArrayGrid() {
    const grid = document.getElementById('arrayGrid');
    grid.innerHTML = '';
    for (let i = 0; i < MAX_STUDENTS; i++) {
        const box = document.createElement('div');
        box.className = 'array-box';
        if (i < currentCount) {
            box.innerHTML = `<div class="index-label">[${i}]</div><div class="name-val" title="${names[i]}">${names[i]}</div><div class="mark-val">${marks[i].toFixed(1)}</div>`;
            box.style.borderColor = 'var(--accent)';
        } else {
            box.innerHTML = `<div class="index-label">[${i}]</div><div class="name-val" style="color:var(--text-muted)">empty</div><div class="mark-val">--</div>`;
        }
        grid.appendChild(box);
    }
}

function updateStatistics() {
    const countEl = document.getElementById('statCount');
    const avgEl = document.getElementById('statAvg');
    const highEl = document.getElementById('statHighest');
    const lowEl = document.getElementById('statLowest');
    const aboveEl = document.getElementById('statAbove');

    countEl.innerText = `${currentCount} / ${MAX_STUDENTS}`;

    if (currentCount === 0) {
        avgEl.innerText = '--';
        highEl.innerText = '--';
        lowEl.innerText = '--';
        aboveEl.innerText = '-- students';
        return;
    }

    let sum = 0;
    let highest = marks[0], lowest = marks[0];
    let highName = names[0], lowName = names[0];

    for (let i = 0; i < currentCount; i++) {
        sum += marks[i];
        if (marks[i] > highest) { highest = marks[i]; highName = names[i]; }
        if (marks[i] < lowest) { lowest = marks[i]; lowName = names[i]; }
    }

    let avg = sum / currentCount;
    let aboveCount = 0;
    for (let i = 0; i < currentCount; i++) {
        if (marks[i] > avg) aboveCount++;
    }

    avgEl.innerText = avg.toFixed(1);
    highEl.innerText = `${highest.toFixed(1)} (${highName})`;
    lowEl.innerText = `${lowest.toFixed(1)} (${lowName})`;
    aboveEl.innerText = `${aboveCount} students`;
}

function searchStudent() {
    if (currentCount === 0) {
        setOutput('No student records available.');
        return;
    }
    const query = document.getElementById('searchNameInput').value.trim().toLowerCase();
    if (query === "") {
        setOutput('Please enter a name to search.');
        return;
    }

    let found = false;
    for (let i = 0; i < currentCount; i++) {
        if (names[i].toLowerCase().includes(query)) {
            setOutput(`Search Result Found (Index [${i}]):\nName: ${names[i]}\nMark: ${marks[i].toFixed(1)}`);
            found = true;
            break;
        }
    }

    if (!found) {
        setOutput(`Student matching "${query}" not found.`);
    }
}

function sortStudents() {
    if (currentCount === 0) {
        setOutput('No student records available to sort.');
        return;
    }

    for (let i = 0; i < currentCount - 1; i++) {
        for (let j = 0; j < currentCount - i - 1; j++) {
            if (marks[j] < marks[j + 1]) {
                let tempMark = marks[j];
                marks[j] = marks[j + 1];
                marks[j + 1] = tempMark;

                let tempName = names[j];
                names[j] = names[j + 1];
                names[j + 1] = tempName;
            }
        }
    }

    updateUI();
    setOutput('Students sorted successfully from highest to lowest mark.');
}

function setOutput(text) {
    document.getElementById('outputBox').innerText = text;
}

updateUI();
