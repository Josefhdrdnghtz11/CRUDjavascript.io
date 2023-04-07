// Function to send form data to spreadsheet
function SubForm() {
    // Get input values
    const namaInput = document.querySelector('input[name="Nama"]').value;
    const jurusanInput = document.querySelector('input[name="jurusan"]').value;
  
    // Create data object
    const data = {
      Nama: namaInput,
      Jurusan: jurusanInput
    };
  
    // Send data to Apispreadsheets API
    fetch("https://api.apispreadsheets.com/data/LQmdai9ervKESF0W/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      if (res.status === 201) {
        // SUCCESS
        alert("Data has been saved to spreadsheet!");
        // Reset input values
        document.querySelector('input[name="Nama"]').value = '';
        document.querySelector('input[name="jurusan"]').value = '';
        // Fetch and display updated data in table
        fetchDataAndDisplayData();
      } else {
        // ERROR
        alert("Failed to save data to spreadsheet.");
      }
    })
    .catch(err => console.log(err));
  }
  
  // Function to fetch data from spreadsheet and display in table
  function fetchDataAndDisplayData() {
    fetch("https://api.apispreadsheets.com/data/LQmdai9ervKESF0W/")
    .then(res => res.json())
    .then(data => {
      if (data && Array.isArray(data)) {
        displayData(data);
      } else {
        console.error('Failed to fetch data from spreadsheet.');
      }
    })
    .catch(err => console.log(err));
  }
  
  // Function to display data in table
  function displayData(data) {
    const tableBody = document.querySelector('.table-body'); // Update selector to match your tbody element's class or ID
    if (!tableBody) {
      console.error('Table body element not found in DOM');
      return;
    }
    tableBody.innerHTML = '';
  
    // Loop through data array and create table rows
    data.forEach(item => {
      const row = document.createElement('tr');
      const namaCell = document.createElement('td');
      const jurusanCell = document.createElement('td');
  
      namaCell.textContent = item.Nama;
      jurusanCell.textContent = item.Jurusan;
  
      row.appendChild(namaCell);
      row.appendChild(jurusanCell);
      tableBody.appendChild(row);
    });
  }
  
  // Fetch and display data on page load
  document.addEventListener('DOMContentLoaded', fetchDataAndDisplayData);
  