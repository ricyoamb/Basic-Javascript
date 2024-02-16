class RegistrationForm {
  constructor() {
    this.registrations = [];
  }

  async submitForm() {
    try {
      let personName = document.getElementById("personName").value;
      let personAge = document.getElementById("personAge").value;
      let personMoney = document.getElementById("personMoney").value;

      await this.checkInput(personName, personAge, personMoney);

      let registration = {
        name: personName,
        age: personAge,
        money: personMoney,
      };

      this.registrations.push(registration);
      this.showMyAlert();
      this.displayData();
    } catch (error) {
      this.showMyError(error);
    }
  }

  showMyError(error) {
    let errorMessages = document.getElementById("alertMessages");
    errorMessages.textContent = `Error : ${error}`;

    let myAlert = document.getElementById("myAlert");
    myAlert.classList.add("show");

    setTimeout(function () {
      myAlert.classList.remove("show");
    }, 3000);
  }

  showMyAlert() {
    let alertMessages = document.getElementById("alertMessages");
    alertMessages.textContent = `Data berhasil ditambahkan`;
    myAlert.classList.add("show");

    setTimeout(function () {
      myAlert.classList.remove("show");
    }, 3000);
  }

  checkInput(personName, personAge, personMoney) {
    return new Promise((resolve, reject) => {
      if (!personName || !personAge || !personMoney) {
        reject("Isi data yang kosong");
      }
      if (personName.length > 10) {
        reject("Nama minimal 10 karakter.");
      }

      if (isNaN(personAge) || personAge < 25) {
        reject("Umur minimal 25 Tahun.");
      }

      if (isNaN(personMoney) || personMoney < 100000 || personMoney > 1000000) {
        reject(
          "Masukkan jumlah uang minimal Rp. 100.000 dan maksimal Rp. 1.000.000."
        );
      }

      resolve();
    });
  }

  displayData() {
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    this.registrations.forEach(function (data, index) {
      let row = tableBody.insertRow();
      let td1 = row.insertCell(0);
      let td2 = row.insertCell(1);
      let td3 = row.insertCell(2);
      let td4 = row.insertCell(3);

      td1.innerHTML = index + 1;
      td2.innerHTML = data.name;
      td3.innerHTML = `${data.age} Tahun`;
      td4.innerHTML = `Rp. ${parseInt(data.money).toLocaleString("id-ID")}`;
    });

    this.avgCells();
  }

  avgCells() {
    let totalAge = 0;
    let totalMoney = 0;

    for (let i = 0; i < this.registrations.length; i++) {
      totalAge += parseFloat(this.registrations[i].age);
      totalMoney += parseFloat(this.registrations[i].money);
    }

    let averageAge = totalAge / this.registrations.length;
    let averageMoney = totalMoney / this.registrations.length;

    let resumeData = document.getElementById("resumeData");

    resumeData.textContent = `Rata - Rata Pendaftar Memiliki Uang Sangu Sebesar Rp. ${parseFloat(
      averageMoney.toFixed(2)
    ).toLocaleString("id-ID")} Dengan Rata - Rata Umur ${averageAge.toFixed(
      2
    )} Tahun`;
  }
  resetTable() {
    let tableBody = document.getElementById("tableBody");
    let resumeData = document.getElementById("resumeData");

    tableBody.innerHTML = "";
    resumeData.textContent = "No Data";
    this.registrations = [];

    this.showMyAlertReset();
  }
  showMyAlertReset() {
    let alertMessages = document.getElementById("alertMessages2");
    alertMessages.textContent = `Data berhasil dihapus`;
    myAlertReset.classList.add("show");

    setTimeout(function () {
      myAlertReset.classList.remove("show");
    }, 3000);
  }
}

const registrationForm = new RegistrationForm("Registration Form");
