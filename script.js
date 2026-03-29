
let employees = JSON.parse(localStorage.getItem("employees")) || [];
let editIndex = -1;

// DISPLAY
function display() {
    let table = document.getElementById("tableBody");
    table.innerHTML = "";

    let total = 0;

    employees.forEach((emp, index) => {
        total += Number(emp.salary);

        table.innerHTML += `
            <tr>
                <td>${emp.name}</td>
                <td>${emp.salary}</td>
                <td>
                    <button onclick="editEmployee(${index})">Edit</button>
                    <button onclick="deleteEmployee(${index})">Delete</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("count").innerText = employees.length;
    document.getElementById("totalSalary").innerText = total;
}

// SAVE / UPDATE
function saveEmployee() {
    let name = document.getElementById("name").value;
    let salary = document.getElementById("salary").value;

    if (name === "" || salary === "") return;

    if (editIndex === -1) {
        employees.push({ name, salary });
    } else {
        employees[editIndex] = { name, salary };
        editIndex = -1;
    }

    localStorage.setItem("employees", JSON.stringify(employees));

    document.getElementById("name").value = "";
    document.getElementById("salary").value = "";

    display();
}

// DELETE (with confirm)
function deleteEmployee(index) {
    if (confirm("Are you sure to delete?")) {
        employees.splice(index, 1);
        localStorage.setItem("employees", JSON.stringify(employees));
        display();
    }
}

// EDIT
function editEmployee(index) {
    document.getElementById("name").value = employees[index].name;
    document.getElementById("salary").value = employees[index].salary;
    editIndex = index;
}

// SEARCH
function searchEmployee() {
    let input = document.getElementById("search").value.toLowerCase();
    let rows = document.querySelectorAll("#tableBody tr");

    rows.forEach(row => {
        let name = row.cells[0].innerText.toLowerCase();
        row.style.display = name.includes(input) ? "" : "none";
    });
}

// DARK MODE
function toggleDarkMode() {
    document.body.classList.toggle("dark");

    let btn = document.getElementById("darkBtn");

    if (document.body.classList.contains("dark")) {
        btn.innerText = "☀ Light Mode";
    } else {
        btn.innerText = "🌙 Dark Mode";
    }
}

display();