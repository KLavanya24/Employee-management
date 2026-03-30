// LOGIN
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "admin" && pass === "1234") {
        alert("Login Success");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Username or Password");
    }
}

// DATA STORAGE
let employees = JSON.parse(localStorage.getItem("employees")) || [];

// ADD EMPLOYEE
function saveEmployee() {
    let name = document.getElementById("name").value;
    let salary = document.getElementById("salary").value;

    if (!name || !salary) {
        alert("Fill all fields");
        return;
    }

    employees.push({ name, salary });

    localStorage.setItem("employees", JSON.stringify(employees));

    document.getElementById("name").value = "";
    document.getElementById("salary").value = "";

    display();
}

// DISPLAY DATA
function display() {
    let tbody = document.getElementById("tableBody");
    if (!tbody) return;

    tbody.innerHTML = "";

    let search = document.getElementById("search")?.value.toLowerCase() || "";

    let total = 0;

    employees.forEach((emp, index) => {
        if (emp.name.toLowerCase().includes(search)) {

            total += Number(emp.salary);

            tbody.innerHTML += `
                <tr>
                    <td>${emp.name}</td>
                    <td>${emp.salary}</td>
                    <td>
                        <button onclick="deleteEmployee(${index})">Delete</button>
                    </td>
                </tr>
            `;
        }
    });

    document.getElementById("count").innerText = employees.length;
    document.getElementById("totalSalary").innerText = total;
}

// DELETE
function deleteEmployee(index) {
    employees.splice(index, 1);
    localStorage.setItem("employees", JSON.stringify(employees));
    display();
}

// LOAD DATA
display();



  
