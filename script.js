const apiUrl = "https://script.google.com/macros/s/AKfycbwmxklwEAhoW2E4cP2skLjFrfBLFgKkwN9UfPCcTAwY5aeX4PHA2TWfEWsqKhHFll9qTQ/exec";

function fetchStudentData(event) {
    event.preventDefault();

    const admissionNumber = document.getElementById("admissionNumber").value;
    const classInput = document.getElementById("class").value;
    const division = document.getElementById("division").value;

    const loadingElement = document.getElementById("loading");
    const resultElement = document.getElementById("result");
    loadingElement.style.display = "block";
    resultElement.innerHTML = "";

    if (!validateForm(admissionNumber, classInput, division)) {
        loadingElement.style.display = "none";
        return;
    }

    const url = `${apiUrl}?admission_number=${admissionNumber}&class=${classInput}&division=${division}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            loadingElement.style.display = "none";
            displayResult(data);
        })
        .catch(error => {
            loadingElement.style.display = "none";
            resultElement.innerHTML = `<p class="error">Error fetching data. Please try again.</p>`;
            console.error(error);
        });
}

function validateForm(admissionNumber, classInput, division) {
    const allowedClasses = ["1", "2", "3", "4", "6", "8", "9", "11"];
    const allowedDivisions = ["A", "B"];

    if (admissionNumber <= 0) {
        alert("Admission Number must be a positive number.");
        return false;
    }

    if (!allowedClasses.includes(classInput)) {
        alert("Class must be one of the following: 1, 2, 3, 4, 6, 8, 9, 11.");
        return false;
    }

    if (!allowedDivisions.includes(division)) {
        alert("Division must be A or B.");
        return false;
    }

    return true;
}

function displayResult(data) {
    const resultElement = document.getElementById("result");

    if (!data.student) {
        resultElement.innerHTML = `<p class="error">Student not found</p>`;
        return;
    }

    const studentInfo = `
        <h2>Student Details</h2>
        <div class="student-basic">
        <p><strong>Name:</strong> ${data.student.name}</p>
        <p><strong>Class:</strong> ${data.student.class}</p>
        <p><strong>Division:</strong> ${data.student.division}</p>
        </div>
        <div class="student-stats">
        <p><strong>Rank:</strong> <span id="student-rank"></span>${data.student.rank}</p>
         <p><strong>Obtained Marks:</strong> <span id="student-obtained-marks"></span></p>
        <p><strong>Total Marks:</strong> <span id="student-total-marks"></span></p>
         <p><strong>Attendance:</strong> <span id="student-attendance">${data.student.attendance}</span></p>
        <p><strong>Total Working Days:</strong> <span id="student-working-days">${data.student.total_working_days}</span></p>
    </div>
    `;

    let marksTable = `<h2>Exam Marks</h2>
        <table>
            <tr><th>Subject</th><th>Max Mark</th><th>Obtained Mark</th><th>Grade</th></tr>`;

    data.marks.forEach(mark => {
        marksTable += `<tr>
            <td>${mark.subject}</td>
            <td>${mark.max_mark}</td>
            <td>${mark.obtained_mark}</td>
            <td>${mark.grade}</td>
        </tr>`;
    });

    marksTable += `</table>`;

    resultElement.innerHTML = studentInfo + marksTable;
}










// const apiUrl = "https://script.google.com/macros/s/AKfycbwmxklwEAhoW2E4cP2skLjFrfBLFgKkwN9UfPCcTAwY5aeX4PHA2TWfEWsqKhHFll9qTQ/exec";

// function fetchStudentData(event) {
//     event.preventDefault();

//     const admissionNumber = document.getElementById("admissionNumber").value;
//     const classInput = document.getElementById("class").value;
//     const division = document.getElementById("division").value;

//     const loadingElement = document.getElementById("loading");
//     const resultElement = document.getElementById("result");
//     loadingElement.style.display = "block";
//     resultElement.innerHTML = "";

//     if (!validateForm(admissionNumber, classInput, division)) {
//         loadingElement.style.display = "none";
//         return;
//     }

//     const url = `${apiUrl}?admission_number=${admissionNumber}&class=${classInput}&division=${division}`;
    
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             loadingElement.style.display = "none";
//             displayResult(data);
//         })
//         .catch(error => {
//             loadingElement.style.display = "none";
//             resultElement.innerHTML = `<p class="error">Error fetching data. Please try again.</p>`;
//             console.error(error);
//         });
// }

// function validateForm(admissionNumber, classInput, division) {
//     const allowedClasses = ["1", "2", "3", "4", "6", "8", "9", "11"];
//     const allowedDivisions = ["A", "B"];

//     if (admissionNumber <= 0) {
//         alert("Admission Number must be a positive number.");
//         return false;
//     }

//     if (!allowedClasses.includes(classInput)) {
//         alert("Class must be one of the following: 1, 2, 3, 4, 6, 8, 9, 11.");
//         return false;
//     }

//     if (!allowedDivisions.includes(division)) {
//         alert("Division must be A or B.");
//         return false;
//     }

//     return true;
// }

// function displayResult(data) {
//     const resultElement = document.getElementById("result");

//     if (!data.student) {
//         resultElement.innerHTML = `<p class="error">Student not found</p>`;
//         return;
//     }

//     const studentInfo = `
//         <h2>Student Details</h2>
//         <p><strong>Name:</strong> ${data.student.name}</p>
//         <p><strong>Class:</strong> ${data.student.class}</p>
//         <p><strong>Division:</strong> ${data.student.division}</p>
//         <p><strong>Attendance:</strong> ${data.student.attendance}/${data.student.total_working_days}</p>
//         <p><strong>Rank:</strong> ${data.student.rank}</p>
//         <p><strong>Total Subjects:</strong> ${data.student.total_subject}</p>
//     `;

//     let marksTable = "<h2>Exam Marks</h2><table><tr><th>Subject</th><th>Max Mark</th><th>Obtained Mark</th><th>Grade</th></tr>";

//     data.marks.forEach(mark => {
//         marksTable += `<tr>
//             <td>${mark.subject}</td>
//             <td>${mark.max_mark}</td>
//             <td>${mark.obtained_mark}</td>
//             <td>${mark.grade}</td>
//         </tr>`;
//     });

//     marksTable += "</table>";

//     resultElement.innerHTML = studentInfo + marksTable;
// }



