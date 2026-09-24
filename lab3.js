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
