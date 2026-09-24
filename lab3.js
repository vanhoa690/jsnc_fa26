// Template Literal
const name = "hoadv";
const age = 30;
const info = "Ten: " + name + " Tuoi: " + age;
console.log(info);
// ``
const myName = `- Ten toi la: ${name}
                - Tuoi: ${age}
                `;
console.log(myName);

const student = {
  id: 1,
  name: "Nguyễn Văn An",
  age: 20,
};

const studentInfo = `
                    Mã sinh viên: ${student.id}
                    Tên: ${student.name}
                    Tuổi: ${student.age}
                    `;
console.log(studentInfo);

const arr = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    age: 20,
  },
];

const arrInfo = `${arr[0].name}`;
console.log(arrInfo);

const html = `
  <div>
    <h3>${student.name}</h3>
    <p>Mã: ${student.id}</p>
    <p>Tuổi: ${student.age}</p>
  </div>
`;
// document.getElementById("app").innerHTML = html;

function add(a, b) {
  return a + b;
}
// arrow function
const add2 = (a, b) => {
  return a + b;
};

const add3 = (a, b) => a + b; // return a + b
console.log(add2(3, 4));
console.log(add2(6, 4));
