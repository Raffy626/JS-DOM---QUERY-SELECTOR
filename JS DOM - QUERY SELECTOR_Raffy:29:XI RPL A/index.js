// Mengubah judul
let judul = document.querySelector("p");
judul.innerHTML = "My To Do List";
judul.classList.add("text-center", "fs-3", "fw-bold", "mt-3");

// Menambahkan kelas ke elemen row
let rowInput = document.querySelector(".row");
rowInput.classList.add("justify-content-center", "align-items-center", "mb-3");

// Mengubah placeholder dan tipe input
let input = document.getElementById("input");
input.setAttribute("placeholder", "Masukkan Tugas Baru");
input.setAttribute("type", "text");

// Mengubah teks tombol
let inputButton = document.getElementById("inputButton");
inputButton.innerHTML = "Tambah";

// Mengatur gaya untuk container
let container = document.querySelector(".container"); 
container.style.margin = "135px auto";
container.style.maxWidth = "550px";
container.style.background = "#fff";
container.style.borderRadius = "7px";
container.style.padding = "30px";

// Mengatur gaya background body
document.body.style.backgroundImage = "linear-gradient(to right,#0d2432,#37526d,#6768ab,#ac8188,#feb17d)";

// Fungsi untuk menambah tugas
function tambahTugas(event) {
    if (input.value.length == 0) {
        alert("Tugas ini harus diisi terlebih dahulu");
        return; // Menambahkan return untuk menghentikan eksekusi lebih lanjut jika input kosong
    }

    let list = document.getElementById("list");

    let divRow = document.createElement("div");
    divRow.classList.add("row", "ms-5", "mb-2");

    let divCol = document.createElement("div");
    divCol.className = "col-8";

    let divAuto = document.createElement("div");
    divAuto.className = "col-auto";

    let divForm = document.createElement("div");
    divForm.classList.add("form-check", "mt-2");

    let divBtn = document.createElement("div");
    divBtn.className = "btn";

    let inputTugas = document.createElement("input");
    inputTugas.setAttribute("type", "checkbox");
    inputTugas.classList.add("form-check-input", "list");
    inputTugas.addEventListener("change", tugasSelesai);

    let label = document.createElement("label");
    label.className = "form-check-label";
    label.appendChild(document.createTextNode(input.value)); // Menambahkan teks tugas

    let icon = document.createElement("div");
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/></svg>`;
    icon.addEventListener("click", hapusTugas);

    list.appendChild(divRow);
    divRow.append(divCol, divAuto);
    divCol.appendChild(divForm);
    divForm.append(inputTugas, label);
    divAuto.appendChild(divBtn);
    divBtn.appendChild(icon);

    input.value = ""; // Mengosongkan input setelah menambah tugas

    // Update visibility of tasks
    updateSembunyikanTugas();
}

// Menghapus tugas


function hapusTugas(e) {
    let child = e.target.closest('.row'); // Mencari elemen '.row' terdekat dari elemen yang diklik
    if (child) {
        child.remove(); // Menghapus elemen baris yang terkait
        updateSembunyikanTugas(); // Update visibility of tasks
    }
}

// Menandai tugas selesai
function tugasSelesai(e) {   
    let label = e.target.nextSibling;

    if (e.target.checked) {
        label.style.textDecoration = "line-through";
        label.style.color = "green";
    } else {
        label.style.removeProperty("text-decoration");
        label.style.removeProperty("color");
    }

    updateSembunyikanTugas(); // Update visibility of tasks
}

// Menambahkan event listener untuk submit button
inputButton.addEventListener("click", tambahTugas);

// Function tanpa isi atau tanpa nama disebut dengan anonymous function
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        tambahTugas(); // Dengan menekan tombol enter akan menambahkan tugas baru
    }
});

// Menambahkan event listener untuk perubahan placeholder input
input.addEventListener("mouseover", function() {
    input.setAttribute("placeholder", "Kolom ini harus diisi");
});
input.addEventListener("mouseout", function() {
    input.setAttribute("placeholder", "Masukkan tugas baru");
});

// Mengubah warna tombol saat hover
function gantiRed() {
    inputButton.style.backgroundColor = "red";
    inputButton.style.color = "black";
}
function gantiBlue() {
    inputButton.style.backgroundColor = "blue";
    inputButton.style.color = "white";
}

input.addEventListener("input", dataInput);

function dataInput() {
    console.log("Elemen Kehilangan fokus"); // Terpicu ketika niali elemen input berubah dan elemen kehilangan fokus 
}

// Menambahkan event listener untuk perubahan warna tombol
inputButton.addEventListener("mouseout", gantiBlue);
inputButton.addEventListener("mouseover", gantiRed);

// Update fungsi Sembunyikan Tugas
function updateSembunyikanTugas() {
    const list = document.getElementById("list");
    const hide = document.getElementById("hide");
    
    // Check if "Sembunyikan Tugas" already exists
    if (list.children.length > 0 && !document.getElementById("hideAllTasks")) {
        hide.innerHTML = `
            <div class="row mb-2 ms-2">
                <div class="col-auto">
                    <input id="hideAllTasks" class="form-check-input" type="checkbox">
                    <label class="form-check-label" for="hideAllTasks">Sembunyikan Tugas</label>
                </div>
            </div>
        `;
        document.getElementById("hideAllTasks").addEventListener("change", updateSembunyikanTugas);
    }
    
    // Hide or show tasks based on "Sembunyikan Tugas" checkbox
    const hideChecked = document.getElementById("hideAllTasks")?.checked || false;
    document.querySelectorAll("#list .row").forEach(row => {
        const isDone = row.querySelector(".form-check-input").checked;
        row.style.display = (hideChecked && isDone) ? "none" : "";
    });
}
