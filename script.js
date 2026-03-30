
// LOGIN
function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid login");
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
  let emp = {
    id: document.getElementById("empId").value || "N/A",
    name: document.getElementById("name").value,
    dept: document.getElementById("deptId").value || "N/A",
    salary: document.getElementById("salary").value,
    date: document.getElementById("hireDate").value || "N/A"
  };

  if (!emp.name || !emp.salary) {
    alert("Fill required fields");
    return;
  }

  employees.push(emp);
  localStorage.setItem("employees", JSON.stringify(employees));

  display();
}

// DISPLAY
function display() {
  let tbody = document.getElementById("tableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  let search = document.getElementById("search").value.toLowerCase();

  let total = 0;
  let labels = [];
  let data = [];

  employees.forEach((e, i) => {
    if (e.name.toLowerCase().includes(search)) {

      total += Number(e.salary);

      labels.push(e.name);
      data.push(e.salary);

      tbody.innerHTML += `
        <tr>
          <td>${e.id}</td>
          <td>${e.name}</td>
          <td>${e.dept}</td>
          <td>${e.salary}</td>
          <td>${e.date}</td>
          <td>
            <button onclick="editEmployee(${i})">Edit</button>
            <button onclick="deleteEmployee(${i})">Delete</button>
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
function deleteEmployee(i) {
  employees.splice(i, 1);
  localStorage.setItem("employees", JSON.stringify(employees));
  display();
}

// EDIT
function editEmployee(i) {
  let e = employees[i];

  document.getElementById("empId").value = e.id;
  document.getElementById("name").value = e.name;
  document.getElementById("deptId").value = e.dept;
  document.getElementById("salary").value = e.salary;
  document.getElementById("hireDate").value = e.date;

  employees.splice(i, 1);
}

// CHART
let chart;

function drawChart(labels, data) {
  let ctx = document.getElementById("chart");

  if (!ctx) return;

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
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