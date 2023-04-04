let data = [];

function tampil(){
    let tabel = document.getElementById('tabel');
    tabel.innerHTML = '<tr><th>No</th><th>Jurusan</th><th>Action</th></tr>';
    for (let i = 0; i < data.length; i++) {
        let btnEdit = '<button class="btn-edit" onclick="edit('+i+')">edit</button>';
        let btnHapus = '<button class="btn-hapus" onclick="hapus('+i+')">Hapus</button>';
        j = i + 1;
        tabel.innerHTML += `<tr><td>${j}</td><td>${data[i]}</td><td>${btnEdit}${btnHapus}</td></tr>`
    }
}

function tambah() {
    const input = document.querySelector('input[name="jurusan"]');
    data.push(input.value);
    tampil();
    console.log(data);
}

function edit(index) {
    let newValue = prompt('Masukkan nilai baru', data[index]);
    if (newValue !== null) {
        data[index] = newValue;
        tampil();
        console.log(data);
    }
}

function hapus(index) {
    data.splice(index, 1);
    tampil();
    console.log(data);
}

function update() {
    let tabel = document.getElementById('tabel');
    let rows = tabel.getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        data[i-1] = cells[1].innerText;
    }
    console.log(data);
}
