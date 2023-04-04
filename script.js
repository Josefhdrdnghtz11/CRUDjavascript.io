let data = [];

function tampil() {
  let tabel = document.getElementById('tabel');
  tabel.innerHTML = '<tr><th>No</th><th>Name</th><th>Jurusan</th><th>Action</th></tr>';
  for (let i = 0; i < data.length; i++) {
    let btnEdit = '<button class="btn-edit" onclick="edit(' + i + ')">edit</button>';
    let btnHapus = '<button class="btn-hapus" onclick="hapus(' + i + ')">Hapus</button>';
    let row = `<tr><td>${i + 1}</td><td>${data[i].name}</td><td>${data[i].jurusan}</td><td>${btnEdit}${btnHapus}</td></tr>`;
    tabel.innerHTML += row;
  }
}

function tambah() {
  const inputJurusan = document.querySelector('input[name="jurusan"]');
  const inputName = document.querySelector('input[name="name"]');
  const newItem = { name: inputName.value, jurusan: inputJurusan.value };
  data.push(newItem);
  tampil();
  console.log(data);
}

function edit(index) {
  let newValue = prompt('Masukkan nilai baru', data[index].name);
  if (newValue !== null) {
    data[index].name = newValue;
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
    data[i - 1].name = cells[1].innerText;
    data[i - 1].jurusan = cells[2].innerText;
  }
  console.log(data);
}
