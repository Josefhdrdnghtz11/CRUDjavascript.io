document.addEventListener("DOMContentLoaded", function() {
    // Fetch and display data in table
    fetchDataAndDisplayData();
  });
  
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
    fetch("https://api.apispreadsheets.com/data/LQmdai9ervKESF0W/?query=select%20*%20from%20LQmdai9ervKESF0W%20where%20No=1&count")
      .then(res => {
        if (res.status === 200) {
          // SUCCESS
          res.json().then(data => {
            const yourData = data;
            // Update your DOM manipulation logic with the fetched data
            const tableBody = document.querySelector('.table-body'); // Update selector to match your tbody element's class or ID
            if (!tableBody) {
              console.error('Table body element not found in DOM');
              return;
            }
            tableBody.innerHTML = '';
  
            // Loop through data array and create table rows
            yourData.forEach(item => {
              const row = document.createElement('tr');
              const namaCell = document.createElement('td');
              const jurusanCell = document.createElement('td');
  
              namaCell.textContent = item.Nama;
              jurusanCell.textContent = item.Jurusan;
  
              row.appendChild(namaCell);
              row.appendChild(jurusanCell);
              tableBody.appendChild(row);
            });
          }).catch(err => console.log(err));
        } else {
          // ERROR
          console.error('Failed to fetch data from spreadsheet.');
        }
      })
      .catch(err => console.log(err));
  }
  
  // Function to update data in spreadsheet
function updateData() {
    // Get input values
    const namaInput = document.querySelector('input[name="Nama"]').value;
    const jurusanInput = document.querySelector('input[name="jurusan"]').value;
  
    // Create data object
    const data = {
      No: 1,
      Nama: namaInput,
      Jurusan: jurusanInput
    };
  
    // Send data to Apispreadsheets API
    fetch("https://api.apispreadsheets.com/data/LQmdai9ervKESF0W/", {
      method: "POST",
      body: JSON.stringify({
        data: data,
        query: "select * from LQmdai9ervKESF0W where No=1"
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 200) {
          // SUCCESS
          alert("Data has been updated in spreadsheet!");
          // Reset input values
          document.querySelector('input[name="Nama"]').value = '';
          document.querySelector('input[name="jurusan"]').value = '';
          // Fetch and display updated data in table
          fetchDataAndDisplayData();
        } else {
          // ERROR
          alert("Failed to update data in spreadsheet.");
        }
      })
      .catch(err => console.log(err));
  }

  // Add an event listener to the button
document.getElementById('updateBtn').addEventListener('click', updateData);

  