document.getElementById("form-add").addEventListener("submit", (event) => {
  event.preventDefault(); // chan reload
  const name = document.getElementById("name").value; // data input
  const age = document.getElementById("age").value;
  const category = document.getElementById("category").value;
  const newStudent = {
    name: name,
    age: age,
    category,
  };
  console.log(newStudent);
  // name = ""
  // !"": true
  if (!name) {
    alert("Nhap name");
    return;
  }
  // age < 0
  axios
    .post("http://localhost:3000/students", newStudent)
    .then(() => {
      location.replace("index.html");
      alert("Them thanh cong");
    })
    .catch(() => {
      alert("them that bai");
    });
});
