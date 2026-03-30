// LOGIN
function login() {
  let user = document.getElementById("username").value.trim();
  let pass = document.getElementById("password").value.trim();

  if (user === "admin" && pass === "1234") {
    alert("Login Success ✅");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid Login ❌");
  }
}

// DARK MODE
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// DATA
let employees = JSON.parse(localStorage.getItem("employees")) || [];

// SAVE
function saveEmployee() {
  let id = document.getElementById("empId").value;
  let name = document.getElementById("name").value;
  let deptId = document.getElementById("deptId").value;
  let salary = document.getElementById("salary").value;
  let hireDate = document.getElementById("hireDate").value;

  if (!id || !name || !deptId || !salary || !hireDate) {
    alert("Fill all fields");
    return;
  }

  employees.push({ id, name, deptId, salary, hireDate });

  localStorage.setItem("employees", JSON.stringify(employees));

  clearFields();
  display();
}

// DISPLAY
function display() {
  let tbody = document.getElementById("tableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  let search = document.getElementById("search")?.value.toLowerCase() || "";

  let total = 0;
  let labels = [];
  let data = [];

  employees.forEach((emp, index) => {
    if (emp.name.toLowerCase().includes(search)) {

      total += Number(emp.salary);

      labels.push(emp.name);
      data.push(emp.salary);

      tbody.innerHTML += `
        <tr>
          <td>${emp.id}</td>
          <td>${emp.name}</td>
          <td>${emp.deptId}</td>
          <td>${emp.salary}</td>
          <td>${emp.hireDate}</td>
          <td>
            <button onclick="editEmployee(${index})">Edit</button>
            <button onclick="deleteEmployee(${index})">Delete</button>
          </td>
        </tr>
      `;
    }
  });

  document.getElementById("count").innerText = employees.length;
  document.getElementById("totalSalary").innerText = total;

  drawChart(labels, data);
}

// DELETE
function deleteEmployee(index) {
  employees.splice(index, 1);
  localStorage.setItem("employees", JSON.stringify(employees));
  display();
}

// EDIT
function editEmployee(index) {
  let emp = employees[index];

  document.getElementById("empId").value = emp.id;
  document.getElementById("name").value = emp.name;
  document.getElementById("deptId").value = emp.deptId;
  document.getElementById("salary").value = emp.salary;
  document.getElementById("hireDate").value = emp.hireDate;

  deleteEmployee(index);
}

// CLEAR
function clearFields() {
  document.getElementById("empId").value = "";
  document.getElementById("name").value = "";
  document.getElementById("deptId").value = "";
  document.getElementById("salary").value = "";
  document.getElementById("hireDate").value = "";
}

// GRAPH
function drawChart(labels, data) {
  let canvas = document.getElementById("chart");
  if (!canvas) return;

  let ctx = canvas.getContext("2d");

  if (window.myChart) {
    window.myChart.destroy();
  }

  window.myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Salary",
        data: data,
        backgroundColor: "#3498db"
      }]
    }
  });
}

// LOAD
display();
