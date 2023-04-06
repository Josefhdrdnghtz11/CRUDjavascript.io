let data = [];

function tampil() {
    // Fetch data from Google Sheets
    const spreadsheetId = '<Nwxbrdoj7AWn7d9U>'; // Replace with the ID of your Google Sheets spreadsheet
    const sheetName = 'Untitled spreadsheet (1)'; // Replace with the name of the sheet you want to fetch data from
    const range = `${sheetName}!A4:C24`; // Replace with the range of cells that contain your data
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: range
    }).then(function(response) {
        const data = response.result.values;
        if (data.length > 0) {
            // Generate and display table dynamically
            const tableContainer = document.getElementById("table-container"); // Replace with the ID of the HTML element where you want to display the table
            let tableHTML = "<table>";
            tableHTML += "<tr><th>No</th><th>Nama</th><th>Jurusan</th></tr>";
            for (let i = 0; i < data.length; i++) {
                let j = i + 1;
                tableHTML += `<tr><td>${j}</td><td>${data[i][0]}</td><td>${data[i][1]}</td></tr>`;
            }
            tableHTML += "</table>";
            tableContainer.innerHTML = tableHTML;
        } else {
            // Handle empty data
            console.log('No data found in Google Sheets.');
        }
    }).catch(function(error) {
        console.error('Error fetching data from Google Sheets:', error);
        alert('Error fetching data from Google Sheets. Please try again.');
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
    const formData = new FormData(document.getElementById("form-data")); // Replace with the ID of your HTML form element
    const data = {
        "data": {
            "No": formData.get("no"),
            "Nama": formData.get("nama"),
            "Jurusan": formData.get("jurusan")
        }
    };

    // Add data to APIspreadsheets.com
    fetch("https://api.apispreadsheets.com/data/Nwxbrdoj7AWn7d9U/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res =>{
        if (res.status === 201){
            // SUCCESS

            // Fetch and display updated data
            tampil(); // Call the tampil() function to fetch and display the updated data
        }
        else{
            // ERROR
        }
    }).catch(error => {
        console.error('Error adding data:', error);
        alert('Error adding data. Please try again.');
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
