// array []
const student1 = "Nguyễn Văn An";
const student2 = "Trần Văn Bình";
const student3 = "Lê Văn Nam";

const students = ["Nguyễn Văn An", "Trần Văn Bình", "Lê Văn Nam"];

const ids = [1, 5, 23, 45, 54];
const actives = [true, false, 42, "hoadv21"];
// danh index: 0, 1, 2
console.log("ban dau", students);
students[0] = "hoadv";
// students = ["hoadv"]; -> error
// console.log("sau khi thay doi", students);
console.log("do dai array", students.length);

students.push("nguyen van a");
console.log("sau khi thay doi", students);

// for
for (let i = 0; i < students.length; i++) {
  console.log(students[i]);
}

// object
const student = {
  id: "ph6666",
  name: "hoadv",
  age: 36,
};
console.log(student.id);
student.id = "ph888";
// student = {}; => error
student.addess = "ha noi";
delete student.addess;
console.log(student.id);
console.log(student.addess);

// array object
const myStudents = [
  {
    id: "ph6666",
    name: "hoadv",
  },
  {
    id: "ph888",
    name: "namdv",
  },
];

console.log(myStudents[0].name);

// truy cap dom id = students
let html = document.getElementById("students");
let content = "";
// canh so 1: ``
for (let i = 0; i < myStudents.length; i++) {
  content += `
    <div>
      <h3>Ten sinh vien: ${myStudents[i].name}</h3>
      <h4>ID sinh vien: ${myStudents[i].id}</h4>
    </div>
  `;
}

html.innerHTML = content;

console.log(html);
