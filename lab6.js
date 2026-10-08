const id = new URLSearchParams(location.search).get("id");

axios.get(`http://localhost:3000/students/${id}`).then((res) => {
  const student = res.data;
  document.getElementById("name").value = student.name;
  document.getElementById("age").value = student.age;
});

document.getElementById("form-edit").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const data = {
    name,
    age,
  };
  axios.put(`http://localhost:3000/students/${id}`, data).then(() => {
    location.replace("index.html");
    alert("update thanh cong");
  });
});
