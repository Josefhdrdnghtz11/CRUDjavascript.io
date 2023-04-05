let data = [];

function tampil(){
    let tabel = document.getElementById('tabel');
    tabel.innerHTML = '<tr><th>No</th><th>Nama</th><th>Jurusan</th><th>Action</th></tr>';
    for (let i = 0; i < data.length; i++) {
        let btnEdit = '<button class="btn-edit" onclick="edit(' + i + ')">edit</button>';
        let btnHapus = '<button class="btn-hapus" onclick="hapus(' + i + ')">Hapus</button>';
        let j = i + 1;
        tabel.innerHTML += `<tr><td>${j}</td><td>${data[i][0]}</td><td>${data[i][1]}</td><td>${btnEdit}${btnHapus}</td></tr>`
    }
}

function tambah() {
    const inputName = document.querySelector('input[name="Nama"]');
    const inputJurusan = document.querySelector('input[name="jurusan"]');
    data.push([inputName.value, inputJurusan.value]);
    tampil();
    console.log(data);
}

function edit(index) {
  let newName = prompt("Masukkan nama baru:");
  let newJurusan = prompt("Masukkan jurusan baru:");
  data[index] = [newName, newJurusan];
  tampil();
}

function hapus(index) {
    data.splice(index, 1);
    tampil();
}

tampil();
