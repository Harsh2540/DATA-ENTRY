// Save entry on index.html
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('entryForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const date = document.getElementById('date').value;
      const caseName = document.getElementById('caseName').value;
      const todayEntry = parseInt(document.getElementById('todayEntry').value);

      const entry = { date, caseName, todayEntry };
      const entries = JSON.parse(localStorage.getItem('entries') || '[]');
      entries.push(entry);
      localStorage.setItem('entries', JSON.stringify(entries));
      form.reset();
      alert('Entry added!');
    });
  }

  // Load table on table.html
  const tableBody = document.querySelector('#entryTable tbody');
  if (tableBody) loadTable();
});

function loadTable() {
  const entries = JSON.parse(localStorage.getItem('entries') || '[]');
  const tbody = document.querySelector('#entryTable tbody');
  tbody.innerHTML = '';
  let total = 0;

  entries.forEach((entry, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.date}</td>
      <td>${entry.caseName}</td>
      <td>${entry.todayEntry}</td>
      <td class="no-print">
        <button onclick="editEntry(${index})">Edit</button>
        <button onclick="deleteEntry(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
    total += Number(entry.todayEntry);
  });

  // Update total below table
  document.getElementById('totalEntry').textContent = total;
}


function deleteEntry(index) {
  const entries = JSON.parse(localStorage.getItem('entries'));
  if (confirm('Are you sure to delete this entry?')) {
    entries.splice(index, 1);
    localStorage.setItem('entries', JSON.stringify(entries));
    loadTable();
  }
}

function editEntry(index) {
  const entries = JSON.parse(localStorage.getItem('entries'));
  const entry = entries[index];
  const newDate = prompt ('Edit Date:', entry.date);
  const newCase = prompt('Edit Case Name:', entry.caseName);
  const newToday = prompt('Edit Today Entry:', entry.todayEntry);

  if (newDate && newCase && newToday) {
    entries[index] = {
      date: newDate,
      caseName: newCase,
      todayEntry: parseInt(newToday),
    };
    localStorage.setItem('entries', JSON.stringify(entries));
    loadTable();
  }
}

function addNewEntry() {
  window.location.href = 'index.html';
}

  document.addEventListener("DOMContentLoaded", function () {
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("date").value = today;
  });


