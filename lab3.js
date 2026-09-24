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

// const html = `
//   <div>
//     <h3>${student.name}</h3>
//     <p>Mã: ${student.id}</p>
//     <p>Tuổi: ${student.age}</p>
//   </div>
// `;
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

// map

// const mapInfo = students.map((item) => {
//   console.log(item);
//   return `ID: ${item.id} - Ten: ${item.name}`;
// });

const students = [
  { id: 1, name: "An", age: 22 },
  { id: 2, name: "Bình", age: 33 },
  { id: 3, name: "Cường", age: 34 },
];

document.getElementById("students").innerHTML = students
  .map(
    (student) => `
     <tr class="hover:bg-gray-50">
              <td class="px-4 py-2 border border-gray-300">${student.id}</td>
              <td class="px-4 py-2 border border-gray-300">${student.name}</td>
              <td class="px-4 py-2 border border-gray-300">${student.age}</td>
              <td class="px-4 py-2 border border-gray-300">
                <div class="flex items-center justify-center gap-2">
                  <a
                    href="#"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </a>

                  <button
                    class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            `,
  )
  .join("");
