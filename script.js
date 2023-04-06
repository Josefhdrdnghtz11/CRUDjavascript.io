let data = [];

function tampil() {
    // Fetch data from APIspreadsheets.com
    fetch("https://api.apispreadsheets.com/data/Nwxbrdoj7AWn7d9U/")
    .then(res => res.json())
    .then(data => {
        // Generate and display table dynamically
        const tableContainer = document.getElementById("table-container"); // Replace with the ID of the HTML element where you want to display the table
        let tableHTML = "<table>";
        tableHTML += "<tr><th>No</th><th>Nama</th><th>Jurusan</th></tr>";
        data.data.forEach(row => {
            tableHTML += `<tr><td>${row["Unnamed: 0"]}</td><td>${row["Unnamed: 1"]}</td><td>${row["Unnamed: 2"]}</td></tr>`;
        });
        tableHTML += "</table>";
        tableContainer.innerHTML = tableHTML;
    })
    .catch(error => {
        console.error('Error fetching data from APIspreadsheets.com:', error);
        alert('Error fetching data from APIspreadsheets.com. Please try again.');
    });
}


// Initialize Google Sheets API client
gapi.load('client', initClient);

function initClient() {
    // Load the Google Sheets API
    gapi.client.load('sheets', 'v4', function() {
        // API client loaded, you can now make API calls
    });
}

function tambah() {
    // Your existing code for adding data to the 'data' array

    // Update Google Sheets
    const spreadsheetId = 'Nwxbrdoj7AWn7d9U'; // Replace with the ID of your Google Sheets spreadsheet
    const sheetName = 'Untitled spreadsheet (1)'; // Replace with the name of the sheet you want to update
    const range = `${sheetName}!A4:C24`; // Replace with the range of cells you want to update
    const values = [['No', 'Nama', 'Jurusan']].concat(data);
    gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: spreadsheetId,
        range: range,
        valueInputOption: 'RAW',
        resource: {
            values: values
        }
    }).then(function(response) {
        console.log('Data has been updated in Google Sheets:', response);
        alert('Data has been saved to Google Sheets!');

        // Call tampil() function to show the table after adding data
        tampil();

        // Add fetch request to update the APIspreadsheets.com data
        fetch("https://api.apispreadsheets.com/data/19584/", {
            method: "POST",
            body: JSON.stringify({"data": data}),
        }).then(res =>{
            if (res.status === 201){
                // SUCCESS
            }
            else{
                // ERROR
            }
        });
    }).catch(function(error) {
        console.error('Error updating data in Google Sheets:', error);
        alert('Error updating data in Google Sheets. Please try again.');
    });
}





function edit(index) {
    let option = prompt("Pilih data yang ingin diubah (1 = Nama, 2 = Jurusan):");
    if (option === "1") {
        let newName = prompt("Masukkan nama baru:");
        data[index][0] = newName;
        tampil();
    } else if (option === "2") {
        let newJurusan = prompt("Masukkan jurusan baru:");
        data[index][1] = newJurusan;
        tampil();
    } else {
        alert("Pilihan tidak valid.");
    }
}

function hapus(index) {
    data.splice(index, 1);
    tampil();
}

tampil();
