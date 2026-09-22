# Lesson 3 - JavaScript Cơ Bản: `map()`, `join()` và Hiển thị dữ liệu dạng Table

## 1. Mục tiêu bài học

Sau bài học này, sinh viên có thể:

- Hiểu được `map().
- Hiển thị Array Object lên HTML dưới dạng Table.
- Sử dụng `index` trong `map()` để tạo số thứ tự.
- Tạo các nút thao tác trong từng dòng của Table.

---

## 2. Ôn tập Lesson 2

Ở Lesson 2, chúng ta đã học:

- Biến với `let`, `const`.
- Kiểu dữ liệu `String`, `Number`, `Boolean`.
- Function.
- Array.
- Object.
- Array Object.
- Vòng lặp `for`.
- Hiển thị Array Object lên HTML.

Ví dụ:

```js
const students = [
  { id: 1, name: "Nguyễn Văn An", age: 20 },
  { id: 2, name: "Trần Văn Bình", age: 21 },
  { id: 3, name: "Lê Văn Cường", age: 20 },
];
```

Ở Lesson 2, để duyệt qua Array Object, chúng ta sử dụng `for`:

```js
for (let i = 0; i < students.length; i++) {
  console.log(students[i]);
}
```

Trong Lesson 3, chúng ta sẽ học cách viết ngắn gọn hơn bằng `map()`.

---

# 3. Từ `for` sang `map()`

## 3.1. Cách làm với `for`

```js
const numbers = [1, 2, 3, 4, 5];

let result = [];

for (let i = 0; i < numbers.length; i++) {
  result.push(numbers[i] * 2);
}

console.log(result);
```

Kết quả:

```txt
[2, 4, 6, 8, 10]
```

JavaScript cung cấp `map()` để thực hiện công việc này ngắn gọn hơn.

---

# 4. `map()` là gì?

`map()` là phương thức của Array dùng để:

> Duyệt qua từng phần tử trong Array và tạo ra một Array mới từ kết quả xử lý.

Ví dụ:

```js
const numbers = [1, 2, 3, 4, 5];

const result = numbers.map(function (number) {
  return number * 2;
});

console.log(result);
```

Kết quả:

```txt
[2, 4, 6, 8, 10]
```

Điểm quan trọng:

```js
map();
```

**trả về một Array mới.**

---

# 5. Cú pháp `map()`

```js
const result = array.map(function (item) {
  return giá_trị_mới;
});
```

Ví dụ:

```js
const names = ["An", "Bình", "Cường"];

const result = names.map(function (name) {
  return name;
});

console.log(result);
```

---

# 6. `map()` với Array Object

```js
const students = [
  { id: 1, name: "Nguyễn Văn An", age: 20 },
  { id: 2, name: "Trần Văn Bình", age: 21 },
  { id: 3, name: "Lê Văn Cường", age: 20 },
];

const names = students.map(function (student) {
  return student.name;
});

console.log(names);
```

Kết quả:

```txt
["Nguyễn Văn An", "Trần Văn Bình", "Lê Văn Cường"]
```

---

# 7. `map()` để tạo HTML

Ví dụ:

```js
const students = [
  { id: 1, name: "Nguyễn Văn An", age: 20 },
  { id: 2, name: "Trần Văn Bình", age: 21 },
  { id: 3, name: "Lê Văn Cường", age: 20 },
];

const html = students.map(function (student) {
  return `
    <div>
      ${student.id} - ${student.name} - ${student.age}
    </div>
  `;
});
```

Lúc này `html` là một Array:

```js
["<div>...</div>", "<div>...</div>", "<div>...</div>"];
```

Để biến Array thành String HTML, chúng ta sử dụng `join("")`.

---

# 8. `join()` là gì?

`join()` dùng để:

> Nối các phần tử trong Array thành một String.

```js
const names = ["An", "Bình", "Cường"];

const result = names.join("");

console.log(result);
```

Kết quả:

```txt
AnBìnhCường
```

Có thể truyền dấu phân cách:

```js
const names = ["An", "Bình", "Cường"];

console.log(names.join(", "));
```

Kết quả:

```txt
An, Bình, Cường
```

---

# 9. Tại sao cần `join("")` sau `map()`?

Ví dụ:

```js
const names = ["An", "Bình", "Cường"];

const html = names
  .map(function (name) {
    return `<div>${name}</div>`;
  })
  .join("");

document.querySelector("#app").innerHTML = html;
```

---

# 10. Công thức quan trọng

```txt
Array
  ↓
map()
  ↓
Array HTML
  ↓
join("")
  ↓
String HTML
  ↓
innerHTML
```

---

# 11. Hiển thị Object lên Table

Ví dụ:

```js
const student = {
  id: 1,
  name: "Nguyễn Văn An",
  age: 20,
};
```

HTML:

```html
<table border="1">
  <tr>
    <th>ID</th>
    <th>Họ tên</th>
    <th>Tuổi</th>
  </tr>

  <tr>
    <td>1</td>
    <td>Nguyễn Văn An</td>
    <td>20</td>
  </tr>
</table>
```

---

# 12. Hiển thị Array Object lên Table

HTML:

```html
<table border="1">
  <thead>
    <tr>
      <th>ID</th>
      <th>Họ tên</th>
      <th>Tuổi</th>
    </tr>
  </thead>

  <tbody id="student-list"></tbody>
</table>
```

JavaScript:

```js
const students = [
  { id: 1, name: "Nguyễn Văn An", age: 20 },
  { id: 2, name: "Trần Văn Bình", age: 21 },
  { id: 3, name: "Lê Văn Cường", age: 20 },
];

const html = students
  .map(function (student) {
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

# 13. Thêm số thứ tự STT bằng `map()`

Trong `map()`, ngoài phần tử, chúng ta có thể lấy thêm `index`.

```js
array.map(function (item, index) {
  ...
});
```

Ví dụ:

```js
const names = ["An", "Bình", "Cường"];

const result = names.map(function (name, index) {
  return `${index + 1}. ${name}`;
});

console.log(result);
```

Kết quả:

```txt
[
  "1. An",
  "2. Bình",
  "3. Cường"
]
```

---

## 13.1. Thêm STT vào Table

```js
const html = students
  .map(function (student, index) {
    return `
      <tr>
        <td>${index + 1}</td>
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

# 14. Thêm cột Thao tác

```js
const html = students
  .map(function (student, index) {
    return `
      <tr>
        <td>${index + 1}</td>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>
          <button>Sửa</button>
          <button>Xóa</button>
        </td>
      </tr>
    `;
  })
  .join("");

document.querySelector("#student-list").innerHTML = html;
```

Ở Lesson 3, chúng ta mới tạo giao diện nút:

```html
<button>Sửa</button> <button>Xóa</button>
```

Chưa xử lý sự kiện click.

---

# 15. Ví dụ hoàn chỉnh: Hiển thị danh sách sinh viên

## HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Danh sách sinh viên</title>
  </head>
  <body>
    <h1>Danh sách sinh viên</h1>

    <table border="1">
      <thead>
        <tr>
          <th>STT</th>
          <th>ID</th>
          <th>Họ tên</th>
          <th>Tuổi</th>
          <th>Thao tác</th>
        </tr>
      </thead>

      <tbody id="student-list"></tbody>
    </table>

    <script src="./main.js"></script>
  </body>
</html>
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
    name: "Trần Văn Bình",
    age: 21,
  },
  {
    id: 3,
    name: "Lê Văn Cường",
    age: 20,
  },
];

const html = students
  .map(function (student, index) {
    return `
      <tr>
        <td>${index + 1}</td>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>
          <button>Sửa</button>
          <button>Xóa</button>
        </td>
      </tr>
    `;
  })
  .join("");

document.querySelector("#student-list").innerHTML = html;
```

---

# 16. So sánh `for` và `map()`

## Dùng `for`

```js
let html = "";

for (let i = 0; i < students.length; i++) {
  html += `
    <tr>
      <td>${students[i].id}</td>
      <td>${students[i].name}</td>
      <td>${students[i].age}</td>
    </tr>
  `;
}

document.querySelector("#student-list").innerHTML = html;
```

## Dùng `map()`

```js
const html = students
  .map(function (student) {
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

### Ghi nhớ

`for`:

```txt
Duyệt → xử lý → cộng chuỗi
```

`map()`:

```txt
Duyệt → xử lý → tạo Array mới
```

Kết hợp:

```txt
map() → join("") → tạo String HTML
```

---

# 17. Bài tập 1 - Sử dụng `map()`

Cho:

```js
const numbers = [1, 2, 3, 4, 5];
```

Yêu cầu:

- Sử dụng `map()`.
- Tạo ra Array mới chứa các số được nhân với 2.

Kết quả:

```txt
[2, 4, 6, 8, 10]
```

---

# 18. Bài tập 2 - Lấy danh sách tên

Cho:

```js
const students = [
  { id: 1, name: "An", age: 20 },
  { id: 2, name: "Bình", age: 21 },
  { id: 3, name: "Cường", age: 20 },
];
```

Yêu cầu:

Sử dụng `map()` để tạo Array chỉ chứa tên sinh viên.

Kết quả:

```txt
["An", "Bình", "Cường"]
```

---

# 19. Bài tập 3 - Sử dụng `join()`

Cho:

```js
const names = ["An", "Bình", "Cường"];
```

Yêu cầu:

Sử dụng `join()` để tạo String:

```txt
An - Bình - Cường
```

---

# 20. Bài tập 4 - Hiển thị sản phẩm lên Table

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
    name: "Samsung S24",
    price: 18000000,
  },
  {
    id: 3,
    name: "Xiaomi 14",
    price: 12000000,
  },
];
```

Tạo Table:

```txt
STT | ID | Tên sản phẩm | Giá
```

Yêu cầu:

- Sử dụng `map()`.
- Sử dụng `join("")`.
- Hiển thị dữ liệu bằng `innerHTML`.

---

# 21. Bài tập 5 - Thêm STT

Từ bài tập 4:

Thêm cột:

```txt
STT
```

Sử dụng:

```js
index;
```

trong `map()`.

---

# 22. Bài tập 6 - Thêm nút thao tác

Từ bài tập 5, thêm:

```txt
Thao tác
```

Mỗi dòng có:

```html
<button>Sửa</button> <button>Xóa</button>
```

Chưa cần xử lý sự kiện click.

---

# 23. Bài tập tổng hợp

Tạo chương trình quản lý sinh viên đơn giản.

Dữ liệu:

```js
const students = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    age: 20,
    major: "Web Developer",
  },
  {
    id: 2,
    name: "Trần Văn Bình",
    age: 21,
    major: "Mobile",
  },
  {
    id: 3,
    name: "Lê Văn Cường",
    age: 20,
    major: "Web Developer",
  },
];
```

Hiển thị:

```txt
STT | ID | Họ tên | Tuổi | Ngành | Thao tác
```

Yêu cầu:

1. Sử dụng `map()`.
2. Sử dụng `index`.
3. Sử dụng `join("")`.
4. Hiển thị bằng `innerHTML`.
5. Mỗi dòng có nút `Sửa`.
6. Mỗi dòng có nút `Xóa`.

---

# 24. Kiến thức cần nhớ sau Lesson 3

## `map()`

```js
const result = array.map(function (item) {
  return item;
});
```

## `join()`

```js
const result = array.join("");
```

## `map()` + `join("")`

```js
const html = students
  .map(function (student) {
    return `
      <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
      </tr>
    `;
  })
  .join("");
```

Sau đó:

```js
document.querySelector("#student-list").innerHTML = html;
```

## Công thức

```txt
Array Object
     ↓
   map()
     ↓
Array HTML
     ↓
  join("")
     ↓
String HTML
     ↓
 innerHTML
     ↓
HTML Table
```

---

# 25. Kết quả đầu ra của Lesson 3

Sau Lesson 3, sinh viên có thể:

- Hiểu `map()`.
- Sử dụng `map()` với Array.
- Sử dụng `map()` với Array Object.
- Hiểu `index` trong `map()`.
- Hiểu `join()`.
- Kết hợp `map()` và `join("")`.
- Hiển thị Array Object lên HTML.
- Hiển thị danh sách dữ liệu lên Table.
- Tạo số thứ tự STT.
- Tạo cột thao tác cho Table.

---

# 26. Chưa học trong Lesson 3

Ở Lesson 3 chưa đi sâu vào:

- Event `click`.
- Xử lý nút Sửa.
- Xử lý nút Xóa.
- Form.
- CRUD.
- `fetch()`.
- API.
- JSON Server.
- LocalStorage.

Các nội dung này sẽ được triển khai ở các bài học tiếp theo.
