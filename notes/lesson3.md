# Lesson 3 - JavaScript Cơ Bản: Template Literal, Arrow Function và map()

## Nội dung bài học

- Ôn tập Function
- Template Literal và dấu backtick ``
- Arrow Function
- `map()` ở mức cơ bản
- Kết hợp Arrow Function + Template Literal + `map()`

---

# 1. Ôn tập Lesson 2

Ở Lesson 2, chúng ta đã học:

- `let`, `const`
- Kiểu dữ liệu cơ bản
- Function
- Array
- Object
- Array Object
- Vòng lặp `for`
- Hiển thị dữ liệu lên HTML

Ví dụ:

```js
const student = {
  id: 1,
  name: "Nguyễn Văn An",
  age: 20,
};

console.log(student.name);
```

Danh sách nhiều sinh viên:

```js
const students = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    age: 20,
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    age: 21,
  },
];
```

Lesson 3 sẽ giúp code ngắn gọn và dễ đọc hơn khi làm việc với chuỗi, Function và dữ liệu Array Object.

---

# 2. String và cách nối chuỗi

## 2.1. Cách nối chuỗi thông thường

```js
const name = "Nguyễn Văn An";
const age = 20;

const result = "Xin chào " + name + ", bạn " + age + " tuổi";

console.log(result);
```

Khi có nhiều biến hoặc HTML, cách nối bằng `+` sẽ khó đọc.

---

# 3. Template Literal

Template Literal là cách tạo chuỗi bằng dấu **backtick**:

```js
const name = "Nguyễn Văn An";
const message = `Xin chào ${name}`;

console.log(message);
```

Kết quả:

```text
Xin chào Nguyễn Văn An
```

---

# 4. `${}` trong Template Literal

Cú pháp:

```js
`${tenBien}`;
```

Ví dụ:

```js
const name = "Nguyễn Văn An";
const age = 20;

const message = `Tên: ${name}, Tuổi: ${age}`;

console.log(message);
```

Có thể đưa biểu thức vào `${}`:

```js
const a = 10;
const b = 20;

const result = `Tổng = ${a + b}`;

console.log(result);
```

---

# 5. Template Literal với Object

```js
const student = {
  id: 1,
  name: "Nguyễn Văn An",
  age: 20,
};

const result = `
Mã sinh viên: ${student.id}
Tên: ${student.name}
Tuổi: ${student.age}
`;

console.log(result);
```

Template Literal cũng cho phép viết chuỗi nhiều dòng:

```js
const message = `
Xin chào sinh viên.

Hôm nay chúng ta học JavaScript.

Nội dung:
- Template Literal
- Arrow Function
- map()
`;

console.log(message);
```

---

# 6. Template Literal để tạo HTML

```js
const student = {
  id: 1,
  name: "Nguyễn Văn An",
  age: 20,
};

const html = `
  <div>
    <h3>${student.name}</h3>
    <p>Mã: ${student.id}</p>
    <p>Tuổi: ${student.age}</p>
  </div>
`;

document.getElementById("app").innerHTML = html;
```

Tạo Table:

```js
const html = `
  <tr>
    <td>${student.id}</td>
    <td>${student.name}</td>
    <td>${student.age}</td>
  </tr>
`;
```

---

# 7. Arrow Function

Ở Lesson 1 và Lesson 2 chúng ta đã sử dụng Function.

Function thông thường:

```js
function add(a, b) {
  return a + b;
}
```

Arrow Function:

```js
const add = (a, b) => {
  return a + b;
};
```

Hai cách trên đều có thể nhận `a`, `b` và trả về tổng.

---

# 8. Cú pháp cơ bản của Arrow Function

```js
const tenFunction = () => {
  // code
};
```

Ví dụ:

```js
const sayHello = () => {
  console.log("Hello JavaScript");
};

sayHello();
```

---

# 9. Arrow Function có tham số

```js
const sayHello = (name) => {
  console.log(`Xin chào ${name}`);
};

sayHello("An");
```

---

# 10. Arrow Function với nhiều tham số

```js
const add = (a, b) => {
  return a + b;
};

console.log(add(10, 20));
```

---

# 11. Arrow Function dạng rút gọn

Nếu Function chỉ có một câu lệnh `return`, có thể viết ngắn hơn.

```js
const add = (a, b) => {
  return a + b;
};
```

Viết ngắn:

```js
const add = (a, b) => a + b;
```

Ví dụ:

```js
const square = (number) => number * number;

console.log(square(5));
```

Kết quả:

```text
25
```

---

# 12. Arrow Function với một tham số

Có thể bỏ `()` khi chỉ có một tham số:

```js
const sayHello = (name) => `Xin chào ${name}`;

console.log(sayHello("An"));
```

Với người mới học, có thể ưu tiên cách đầy đủ:

```js
const sayHello = (name) => {
  return `Xin chào ${name}`;
};
```

---

# 13. Arrow Function + Template Literal

```js
const sayHello = (name) => {
  return `Xin chào ${name}`;
};

console.log(sayHello("Nguyễn Văn An"));
```

Hoặc viết ngắn:

```js
const sayHello = (name) => `Xin chào ${name}`;
```

---

# 14. Arrow Function với Object

```js
const student = {
  id: 1,
  name: "Nguyễn Văn An",
  age: 20,
};

const getStudentInfo = (student) => {
  return `Mã: ${student.id} - Tên: ${student.name} - Tuổi: ${student.age}`;
};

console.log(getStudentInfo(student));
```

---

# 15. Giới thiệu map()

Ở Lesson 2 chúng ta đã dùng vòng lặp `for` để duyệt Array:

```js
const students = [
  { id: 1, name: "An" },
  { id: 2, name: "Bình" },
  { id: 3, name: "Cường" },
];

for (let i = 0; i < students.length; i++) {
  console.log(students[i].name);
}
```

JavaScript có `map()` để tạo một Array mới từ Array cũ.

---

# 16. Cú pháp cơ bản của map()

```js
array.map((item) => {
  return giá_trị_mới;
});
```

Ví dụ:

```js
const numbers = [1, 2, 3];

const newNumbers = numbers.map((number) => {
  return number * 2;
});

console.log(newNumbers);
```

Kết quả:

```js
[2, 4, 6];
```

---

# 17. map() kết hợp Arrow Function

```js
const numbers = [1, 2, 3];

const newNumbers = numbers.map((number) => number * 2);

console.log(newNumbers);
```

Đây là lý do Arrow Function thường xuất hiện cùng `map()`.

---

# 18. map() với Array Object

```js
const students = [
  {
    id: 1,
    name: "An",
    age: 20,
  },
  {
    id: 2,
    name: "Bình",
    age: 21,
  },
  {
    id: 3,
    name: "Cường",
    age: 22,
  },
];

const names = students.map((student) => {
  return student.name;
});

console.log(names);
```

Kết quả:

```js
["An", "Bình", "Cường"];
```

Viết ngắn:

```js
const names = students.map((student) => student.name);
```

---

# 19. map() + Template Literal

```js
const students = [
  {
    id: 1,
    name: "An",
    age: 20,
  },
  {
    id: 2,
    name: "Bình",
    age: 21,
  },
];

const html = students.map((student) => {
  return `
    <tr>
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
    </tr>
  `;
});

console.log(html);
```

`map()` tạo ra một Array chứa các String HTML.

---

# 20. join("")

Nếu muốn nối các phần tử trong Array thành một String:

```js
const arr = ["<p>An</p>", "<p>Bình</p>", "<p>Cường</p>"];

const html = arr.join("");

console.log(html);
```

Kết quả:

```html
<p>An</p>
<p>Bình</p>
<p>Cường</p>
```

---

# 21. map() + Template Literal + join()

```js
const students = [
  {
    id: 1,
    name: "An",
    age: 20,
  },
  {
    id: 2,
    name: "Bình",
    age: 21,
  },
  {
    id: 3,
    name: "Cường",
    age: 22,
  },
];

const html = students
  .map((student) => {
    return `
      <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
      </tr>
    `;
  })
  .join("");

document.querySelector("tbody").innerHTML = html;
```

Luồng xử lý:

```text
Array Object
     ↓
   map()
     ↓
Tạo HTML cho từng Object
     ↓
  join("")
     ↓
Một chuỗi HTML
     ↓
innerHTML
     ↓
Hiển thị lên Website
```

---

# 22. Ví dụ hoàn chỉnh: Danh sách sinh viên

## HTML

```html
<table border="1">
  <thead>
    <tr>
      <th>ID</th>
      <th>Tên</th>
      <th>Tuổi</th>
    </tr>
  </thead>

  <tbody id="student-list"></tbody>
</table>
```

## JavaScript

```js
const students = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    age: 20,
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    age: 21,
  },
  {
    id: 3,
    name: "Lê Văn Cường",
    age: 22,
  },
];

const html = students
  .map((student) => {
    return `
      <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
      </tr>
    `;
  })
  .join("");

document.querySelector("#student-list").innerHTML = html;
```

---

# 23. So sánh for và map()

## Dùng for

```js
let html = "";

for (let i = 0; i < students.length; i++) {
  html += `
    <tr>
      <td>${students[i].id}</td>
      <td>${students[i].name}</td>
    </tr>
  `;
}
```

## Dùng map()

```js
const html = students
  .map((student) => {
    return `
      <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
      </tr>
    `;
  })
  .join("");
```

Mục tiêu Lesson 3 không phải học thật nhiều phương thức Array mà là hiểu mối liên hệ:

```text
Array Object
     +
Arrow Function
     +
Template Literal
     ↓
Tạo HTML
```

---

# 24. Ví dụ sản phẩm

```js
const products = [
  {
    id: 1,
    name: "iPhone 15",
    price: 20000000,
  },
  {
    id: 2,
    name: "MacBook Air",
    price: 25000000,
  },
  {
    id: 3,
    name: "AirPods",
    price: 5000000,
  },
];

const html = products
  .map((product) => {
    return `
      <div>
        <h3>${product.name}</h3>
        <p>Giá: ${product.price} VNĐ</p>
      </div>
    `;
  })
  .join("");

document.querySelector("#product-list").innerHTML = html;
```

HTML:

```html
<div id="product-list"></div>
```

---

# 25. Bài tập 1 - Template Literal

Cho:

```js
const name = "Nguyễn Văn An";
const age = 20;
const major = "Lập trình Web";
```

Yêu cầu tạo ra:

```text
Xin chào Nguyễn Văn An.
Bạn 20 tuổi.
Ngành học: Lập trình Web.
```

Sử dụng Template Literal.

---

# 26. Bài tập 2 - Template Literal với Object

Cho:

```js
const student = {
  id: 1,
  name: "Nguyễn Văn An",
  age: 20,
  major: "Lập trình Web",
};
```

Yêu cầu hiển thị:

```text
Mã sinh viên: 1
Họ tên: Nguyễn Văn An
Tuổi: 20
Ngành: Lập trình Web
```

Sử dụng Template Literal.

---

# 27. Bài tập 3 - Chuyển Function sang Arrow Function

Cho:

```js
function add(a, b) {
  return a + b;
}
```

Chuyển thành Arrow Function.

---

# 28. Bài tập 4 - Arrow Function

Viết các Arrow Function:

### a. Tính bình phương

```js
square(5);
```

Kết quả:

```text
25
```

### b. Tính tổng

```js
sum(10, 20);
```

Kết quả:

```text
30
```

### c. Chào người dùng

```js
sayHello("An");
```

Kết quả:

```text
Xin chào An
```

---

# 29. Bài tập 5 - map() cơ bản

Cho:

```js
const numbers = [1, 2, 3, 4, 5];
```

Sử dụng `map()` tạo Array mới:

```js
[2, 4, 6, 8, 10];
```

---

# 30. Bài tập 6 - map() với Array Object

Cho:

```js
const students = [
  { id: 1, name: "An" },
  { id: 2, name: "Bình" },
  { id: 3, name: "Cường" },
];
```

Sử dụng `map()` lấy ra:

```js
["An", "Bình", "Cường"];
```

---

# 31. Bài tập 7 - Hiển thị danh sách sinh viên

Cho Array Object sinh viên.

Tạo Table:

```text
ID | Tên | Tuổi
```

Sử dụng:

- Arrow Function
- Template Literal
- `map()`
- `join("")`
- `innerHTML`

---

# 32. Bài tập 8 - Hiển thị sản phẩm

Cho:

```js
const products = [
  {
    id: 1,
    name: "iPhone 15",
    price: 20000000,
  },
  {
    id: 2,
    name: "MacBook Air",
    price: 25000000,
  },
  {
    id: 3,
    name: "AirPods",
    price: 5000000,
  },
];
```

Yêu cầu hiển thị:

```text
ID | Tên sản phẩm | Giá
```

---

# 33. Bài tập tổng hợp

Tạo danh sách sản phẩm:

```js
const products = [
  {
    id: 1,
    name: "Áo thun",
    price: 150000,
    category: "Thời trang",
  },
  {
    id: 2,
    name: "Quần jean",
    price: 350000,
    category: "Thời trang",
  },
  {
    id: 3,
    name: "Giày sneaker",
    price: 800000,
    category: "Giày",
  },
];
```

Yêu cầu:

1. Tạo HTML Table.
2. Hiển thị `id`.
3. Hiển thị `name`.
4. Hiển thị `price`.
5. Hiển thị `category`.
6. Sử dụng Template Literal.
7. Sử dụng Arrow Function.
8. Sử dụng `map()`.
9. Sử dụng `join("")`.
10. Hiển thị bằng `innerHTML`.

---

# 34. Kiến thức cần nhớ

## Template Literal

```js
const message = `Xin chào ${name}`;
```

## `${}`

```js
`${name}`;
```

Có thể chèn biến hoặc biểu thức:

```js
`${price * quantity}`;
```

## Arrow Function

```js
const add = (a, b) => {
  return a + b;
};
```

Dạng ngắn:

```js
const add = (a, b) => a + b;
```

## map()

```js
const result = array.map((item) => {
  return item;
});
```

## join()

```js
const html = array.join("");
```

---

# 35. Sơ đồ kiến thức Lesson 3

```text
JavaScript
│
├── String
│   └── Template Literal
│       ├── ``
│       ├── ${}
│       ├── nhiều dòng
│       └── tạo HTML
│
├── Function
│   └── Arrow Function
│       ├── () => {}
│       ├── tham số
│       ├── return
│       └── return rút gọn
│
└── Array Object
    └── map()
        ├── Arrow Function
        ├── Template Literal
        └── join("")
              ↓
           innerHTML
              ↓
           HTML
```

---

# 36. Sau Lesson 3 sinh viên có thể

- Hiểu Template Literal.
- Sử dụng dấu backtick.
- Sử dụng `${}` để chèn dữ liệu.
- Tạo String nhiều dòng.
- Tạo HTML bằng Template Literal.
- Hiểu Arrow Function.
- Viết Arrow Function có tham số.
- Viết Arrow Function có `return`.
- Viết Arrow Function dạng rút gọn.
- Hiểu `map()` ở mức cơ bản.
- Kết hợp `map()` với Arrow Function.
- Kết hợp `map()` với Template Literal.
- Sử dụng `join("")`.
- Hiển thị Array Object lên HTML.

---

# 37. Chưa học ở Lesson 3

Các nội dung sau sẽ học ở những bài tiếp theo:

- Event `click`
- Form
- Submit Form
- Edit
- Delete
- CRUD
- Fetch API
- JSON Server
- LocalStorage
- API Backend
- Các phương thức Array nâng cao khác

Mục tiêu của Lesson 3 là tạo nền tảng:

```text
JavaScript cơ bản
      ↓
Function
      ↓
Arrow Function
      ↓
Array Object
      ↓
Template Literal
      ↓
Tạo HTML
      ↓
CRUD / API ở các bài tiếp theo
```
