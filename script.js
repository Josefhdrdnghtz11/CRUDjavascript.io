let data = [];

function tampil(){
    let tabel = document.getElementById('tabel');
    tabel.innerHTML = '<tr><th>No</th><th>Nama</th><th>Jurusan</th><th>Action</th></tr>';
    for (let i = 0; i < data.length; i++) {
        let btnEdit = '<button class="btn-edit" onclick="edit(' + i + ')">Edit</button>';
        let btnHapus = '<button class="btn-hapus" onclick="hapus(' + i + ')">Hapus</button>';
        let j = i + 1;
        tabel.innerHTML += `<tr><td>${j}</td><td>${data[i][0]}</td><td>${data[i][1]}</td><td>${btnEdit}${btnHapus}</td></tr>`
    }
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
    }).catch(function(error) {
        console.error('Error updating data in Google Sheets:', error);
        alert('Error updating data in Google Sheets. Please try again.');
    });

    // Add fetch request to update the APIspreadsheets.com data
    fetch("https://api.apispreadsheets.com/data/Nwxbrdoj7AWn7d9U/", {
        method: "POST",
        body: JSON.stringify({"data": {"Unnamed: 0":"No","Unnamed: 1":"Nama","Unnamed: 2":"Jurusan"}}),
    }).then(res =>{
        if (res.status === 201){
            // SUCCESS
        }
        else{
            // ERROR
        }
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
