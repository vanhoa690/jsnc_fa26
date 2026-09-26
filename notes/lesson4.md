# Lesson 4 - JavaScript Cơ Bản: Gọi API với Axios

## Mục tiêu bài học

Sau bài học này, bạn có thể:

- Hiểu **API** là gì.
- Biết **Axios** là gì và cách cài đặt.
- Gọi API bằng phương thức `GET`.
- Hiển thị dữ liệu lên HTML Table.

---

# 1. API là gì?

## 1.1. API dùng để làm gì?

API là viết tắt của:

> **Application Programming Interface**

Hiểu đơn giản:

> API là nơi giúp các ứng dụng trao đổi và lấy dữ liệu.

Ví dụ chúng ta có một website quản lý sinh viên.

Thay vì viết trực tiếp dữ liệu trong JavaScript:

```js
const students = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    age: 20,
  },
];
```

Chúng ta có thể lấy dữ liệu từ một API:

```text
http://localhost:3000/students
```

API có thể trả về:

```json
[
  {
    "id": 1,
    "name": "Nguyễn Văn A",
    "age": 20
  },
  {
    "id": 2,
    "name": "Trần Văn B",
    "age": 21
  }
]
```

JavaScript sẽ gọi API → nhận dữ liệu → hiển thị dữ liệu lên giao diện.

Có thể hình dung:

```text
JavaScript
    ↓
Gọi API
    ↓
http://localhost:3000/students
    ↓
API trả về dữ liệu
    ↓
JavaScript nhận dữ liệu
    ↓
Hiển thị lên HTML
```

---

# 2. JSON Server

Trong thực tế, API thường được xây dựng bằng Backend.

Ví dụ:

```text
Node.js
Express
Laravel
Java Spring
.NET
...
```

Tuy nhiên, khi học Frontend, chúng ta chưa cần xây dựng Backend ngay.

Có thể sử dụng **JSON Server** để tạo một API giả lập.

## 2.1. File `db.json`

Tạo file:

```text
db.json
```

Nội dung:

```json
{
  "students": [
    {
      "id": 1,
      "name": "Nguyễn Văn A",
      "age": 20,
      "email": "a@gmail.com"
    },
    {
      "id": 2,
      "name": "Trần Văn B",
      "age": 21,
      "email": "b@gmail.com"
    },
    {
      "id": 3,
      "name": "Lê Văn C",
      "age": 22,
      "email": "c@gmail.com"
    }
  ]
}
```

Trong đó:

```text
students
```

là tên của resource.

JSON Server sẽ tạo API:

```text
http://localhost:3000/students
```

---

# 3. Chạy JSON Server

Nếu project đã cấu hình script:

```json
{
  "scripts": {
    "db": "json-server --watch db.json"
  }
}
```

Chạy:

```bash
npm run db
```

Sau khi chạy thành công, mở trình duyệt:

```text
http://localhost:3000/students
```

Nếu nhìn thấy dữ liệu:

```json
[
  {
    "id": 1,
    "name": "Nguyễn Văn A",
    "age": 20,
    "email": "a@gmail.com"
  },
  {
    "id": 2,
    "name": "Trần Văn B",
    "age": 21,
    "email": "b@gmail.com"
  }
]
```

thì API đã hoạt động.

---

# 4. Axios là gì?

Để JavaScript gọi API, chúng ta có thể sử dụng nhiều cách.

Ví dụ:

```js
fetch();
```

Hoặc sử dụng thư viện:

```text
Axios
```

**Axios** là một thư viện JavaScript giúp gửi HTTP Request đến API.

Ví dụ:

```js
axios.get("http://localhost:3000/students");
```

Ở bài này, chúng ta sử dụng Axios vì cú pháp đơn giản và thường được sử dụng trong các project Frontend.

---

# 5. Cài đặt Axios bằng CDN

Với JavaScript cơ bản, chúng ta có thể sử dụng Axios thông qua CDN.

Trong file `index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

Sau khi thêm Axios, file JavaScript có thể sử dụng:

```js
axios;
```

Ví dụ:

```js
axios.get("http://localhost:3000/students");
```

---

# 6. Chuẩn bị HTML

Tạo bảng để hiển thị danh sách sinh viên:

```html
<h2>Danh sách sinh viên</h2>

<table border="1" cellpadding="10">
  <thead>
    <tr>
      <th>ID</th>
      <th>Họ tên</th>
      <th>Tuổi</th>
      <th>Email</th>
    </tr>
  </thead>

  <tbody id="student-list"></tbody>
</table>
```

Chúng ta có:

```html
<tbody id="student-list"></tbody>
```

Đây là vị trí JavaScript sẽ đưa dữ liệu sinh viên vào.

---

# 7. Gọi API bằng Axios

Để lấy dữ liệu từ API:

```js
axios.get("http://localhost:3000/students");
```

`get()` có nghĩa là:

> Lấy dữ liệu từ API.

Tuy nhiên, gọi như trên mới chỉ gửi request.

Chúng ta cần xử lý dữ liệu API trả về.

Có thể sử dụng:

```js
.then()
```

Ví dụ:

```js
axios.get("http://localhost:3000/students").then((res) => {
  console.log(res);
});
```

Mở **Console** trong trình duyệt để xem kết quả.

---

# 8. `response.data` là gì?

Khi API trả về dữ liệu, Axios tạo ra một object response.

Ví dụ:

```js
axios.get("http://localhost:3000/students").then((res) => {
  console.log(res);
});
```

Trong response có nhiều thông tin.

Phần chúng ta quan tâm nhất là:

```js
res.data;
```

`res.data` chính là dữ liệu mà API trả về.

Ví dụ:

```js
axios.get("http://localhost:3000/students").then((res) => {
  console.log(res.data);
});
```

Kết quả:

```js
[
  {
    id: 1,
    name: "Nguyễn Văn A",
    age: 20,
    email: "a@gmail.com",
  },
  {
    id: 2,
    name: "Trần Văn B",
    age: 21,
    email: "b@gmail.com",
  },
];
```

Có thể nhớ đơn giản:

```text
res
 ↓
response

res.data
 ↓
dữ liệu API trả về
```

---

# 9. Hiển thị dữ liệu lên Table

Bây giờ chúng ta đã có:

```js
res.data;
```

Đây là một Array.

Ví dụ:

```js
[
  {
    id: 1,
    name: "Nguyễn Văn A",
    age: 20,
    email: "a@gmail.com",
  },
  {
    id: 2,
    name: "Trần Văn B",
    age: 21,
    email: "b@gmail.com",
  },
];
```

Chúng ta có thể sử dụng kiến thức `map()` đã học ở Lesson 3.

```js
res.data.map((student) => {
  return `
    <tr>
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.email}</td>
    </tr>
  `;
});
```

Ở đây:

```js
student;
```

là từng phần tử trong Array.

Ví dụ:

```js
student = {
  id: 1,
  name: "Nguyễn Văn A",
  age: 20,
  email: "a@gmail.com",
};
```

Sau đó:

```js
student.name;
```

lấy ra:

```text
Nguyễn Văn A
```

---

# 10. Template Literal

Trong bài này chúng ta tiếp tục sử dụng dấu backtick:

```js
`
  <tr>
    <td>${student.id}</td>
    <td>${student.name}</td>
  </tr>
`;
```

Dấu:

```text
`
```

được gọi là **backtick**.

Cho phép chúng ta viết HTML nhiều dòng và chèn biến bằng:

```js
${}
```

Ví dụ:

```js
const name = "Nguyễn Văn A";

const html = `
  <h2>${name}</h2>
`;
```

Kết quả:

```html
<h2>Nguyễn Văn A</h2>
```

---

# 11. Từ Array thành HTML

`map()` trả về một Array mới.

Ví dụ:

```js
const html = res.data.map((student) => {
  return `
    <tr>
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.email}</td>
    </tr>
  `;
});
```

Kết quả có thể hình dung:

```js
[
  `
    <tr>
      <td>1</td>
      <td>Nguyễn Văn A</td>
      <td>20</td>
      <td>a@gmail.com</td>
    </tr>
  `,

  `
    <tr>
      <td>2</td>
      <td>Trần Văn B</td>
      <td>21</td>
      <td>b@gmail.com</td>
    </tr>
  `,
];
```

Nhưng HTML cần một chuỗi.

Vì vậy chúng ta sử dụng:

```js
.join("")
```

Ví dụ:

```js
const html = res.data
  .map((student) => {
    return `
      <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.email}</td>
      </tr>
    `;
  })
  .join("");
```

---

# 12. Đưa HTML vào Table

Sau khi có:

```js
const html = ...
```

Chúng ta đưa HTML vào:

```html
<tbody id="student-list"></tbody>
```

Sử dụng:

```js
document.getElementById("student-list").innerHTML = html;
```

Có thể hiểu:

```text
res.data
   ↓
map()
   ↓
HTML của từng student
   ↓
join("")
   ↓
html
   ↓
innerHTML
   ↓
<tbody>
```

---

# 13. Hoàn thiện chương trình

Code JavaScript:

```js
axios.get("http://localhost:3000/students").then((res) => {
  const html = res.data
    .map((student) => {
      return `
          <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.email}</td>
          </tr>
        `;
    })
    .join("");

  document.getElementById("student-list").innerHTML = html;
});
```

Chương trình hoạt động theo các bước:

```text
1. Gọi API
       ↓
2. Nhận response
       ↓
3. Lấy response.data
       ↓
4. Dùng map()
       ↓
5. Tạo HTML
       ↓
6. join("")
       ↓
7. innerHTML
       ↓
8. Hiển thị Table
```

---

# 14. Tách thành function `loadStudents()`

Khi chương trình lớn hơn, chúng ta không nên viết toàn bộ code bên ngoài.

Có thể đưa vào một function:

```js
function loadStudents() {
  axios.get("http://localhost:3000/students").then((res) => {
    const html = res.data
      .map((student) => {
        return `
            <tr>
              <td>${student.id}</td>
              <td>${student.name}</td>
              <td>${student.age}</td>
              <td>${student.email}</td>
            </tr>
          `;
      })
      .join("");

    document.getElementById("student-list").innerHTML = html;
  });
}
```

Sau đó gọi:

```js
loadStudents();
```

---

# 15. Tại sao phải tạo function?

Nếu sau này chúng ta có:

```text
Thêm sinh viên
Sửa sinh viên
Xóa sinh viên
```

Sau mỗi thao tác, chúng ta có thể gọi lại:

```js
loadStudents();
```

Ví dụ:

```js
function deleteStudent() {
  // Xóa sinh viên

  loadStudents();
}
```

Như vậy danh sách trên giao diện sẽ được tải lại.

Đây là cách tổ chức code giúp chương trình dễ quản lý hơn.

---

# 16. Cấu trúc thư mục

Project có thể có cấu trúc:

```text
project
│
├── index.html
├── index.js
├── db.json
└── package.json
```

Trong đó:

| File           | Vai trò          |
| -------------- | ---------------- |
| `index.html`   | Giao diện        |
| `index.js`     | JavaScript xử lý |
| `db.json`      | Dữ liệu          |
| `package.json` | Cấu hình project |

---

# 17. Ví dụ hoàn chỉnh

## `index.html`

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />

    <title>Student Manager</title>
  </head>

  <body>
    <h2>Danh sách sinh viên</h2>

    <table border="1" cellpadding="10">
      <thead>
        <tr>
          <th>ID</th>
          <th>Họ tên</th>
          <th>Tuổi</th>
          <th>Email</th>
        </tr>
      </thead>

      <tbody id="student-list"></tbody>
    </table>

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

    <script src="./index.js"></script>
  </body>
</html>
```

## `index.js`

```js
function loadStudents() {
  axios.get("http://localhost:3000/students").then((res) => {
    const html = res.data
      .map((student) => {
        return `
            <tr>
              <td>${student.id}</td>
              <td>${student.name}</td>
              <td>${student.age}</td>
              <td>${student.email}</td>
            </tr>
          `;
      })
      .join("");

    document.getElementById("student-list").innerHTML = html;
  });
}

loadStudents();
```

## `db.json`

```json
{
  "students": [
    {
      "id": 1,
      "name": "Nguyễn Văn A",
      "age": 20,
      "email": "a@gmail.com"
    },
    {
      "id": 2,
      "name": "Trần Văn B",
      "age": 21,
      "email": "b@gmail.com"
    },
    {
      "id": 3,
      "name": "Lê Văn C",
      "age": 22,
      "email": "c@gmail.com"
    }
  ]
}
```

---

# 18. Một số lỗi thường gặp

## Lỗi 1: API không chạy

Kiểm tra JSON Server:

```bash
npm run db
```

Sau đó truy cập:

```text
http://localhost:3000/students
```

---

## Lỗi 2: Axios không tồn tại

Nếu Console báo:

```text
axios is not defined
```

Kiểm tra đã thêm Axios chưa:

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

Đặc biệt phải đặt Axios **trước** `index.js`:

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<script src="./index.js"></script>
```

---

## Lỗi 3: Sai endpoint

Ví dụ API là:

```text
/students
```

nhưng JavaScript lại gọi:

```js
axios.get("http://localhost:3000/student");
```

sẽ không lấy được dữ liệu.

Phải đúng:

```js
axios.get("http://localhost:3000/students");
```

---

# 19. Bài tập

## Bài 1 - Danh sách sản phẩm

Tạo `db.json`:

```json
{
  "products": [
    {
      "id": 1,
      "name": "iPhone 15",
      "price": 25000000
    },
    {
      "id": 2,
      "name": "Samsung S25",
      "price": 22000000
    },
    {
      "id": 3,
      "name": "Xiaomi 15",
      "price": 18000000
    }
  ]
}
```

Yêu cầu:

- Tạo API `/products`.
- Gọi API bằng Axios.
- Hiển thị danh sách sản phẩm lên Table.

Table gồm:

```text
ID | Tên sản phẩm | Giá
```

---

## Bài 2 - Thêm STT

Thêm cột:

```text
STT
```

Ví dụ:

```text
STT | ID | Tên sản phẩm | Giá
1   | 1  | iPhone 15     | ...
2   | 2  | Samsung S25   | ...
3   | 3  | Xiaomi 15     | ...
```

Gợi ý:

Trong `map()` có thể lấy thêm `index`:

```js
products.map((product, index) => {
  // ...
});
```

---

## Bài 3 - Thêm cột Thao tác

Thêm cột:

```text
Thao tác
```

Mỗi sản phẩm có:

```text
Sửa
Xóa
```

Ví dụ:

```text
STT | Tên sản phẩm | Giá        | Thao tác
1   | iPhone 15    | 25.000.000 | Sửa | Xóa
2   | Samsung S25  | 22.000.000 | Sửa | Xóa
```

**Chưa cần xử lý chức năng Sửa và Xóa.**

Mục tiêu của bài tập là luyện:

- `map()`
- Template literal
- HTML
- `innerHTML`

---

## Bài 4 - Đổi endpoint

Đổi endpoint:

```text
/students
```

thành:

```text
/products
```

Ví dụ:

```js
axios.get("http://localhost:3000/products");
```

Sau đó hiển thị đúng dữ liệu sản phẩm.

---

# 20. Bài tập nâng cao

Thêm trường:

```json
"category": "Điện thoại"
```

Ví dụ:

```json
{
  "id": 1,
  "name": "iPhone 15",
  "price": 25000000,
  "category": "Điện thoại"
}
```

Hiển thị:

```text
STT | ID | Tên | Giá | Danh mục
```

---

# Tổng kết Lesson 4

Trong bài này chúng ta đã học:

### 1. API

API giúp Frontend lấy dữ liệu từ Backend.

```text
Frontend → API → Data
```

### 2. JSON Server

Dùng để tạo API giả lập khi học Frontend.

```text
db.json
   ↓
JSON Server
   ↓
http://localhost:3000/students
```

### 3. Axios

Dùng Axios để gọi API:

```js
axios.get("http://localhost:3000/students");
```

### 4. Lấy dữ liệu API

Dữ liệu nằm trong:

```js
res.data;
```

### 5. Hiển thị dữ liệu

Kết hợp kiến thức Lesson 3:

```js
map();
```

với:

```js
template literal
```

và:

```js
innerHTML;
```

### 6. Tách function

Đưa việc gọi API vào:

```js
function loadStudents() {
  // gọi API
}
```

Sau đó:

```js
loadStudents();
```

---

# Kiến thức chuẩn bị cho Lesson 5

Ở Lesson 4 chúng ta mới chỉ:

```text
GET
 ↓
Lấy danh sách
 ↓
Hiển thị
```

Ở các bài tiếp theo có thể phát triển thành:

```text
GET
 ↓
Lấy danh sách

POST
 ↓
Thêm dữ liệu

PUT / PATCH
 ↓
Sửa dữ liệu

DELETE
 ↓
Xóa dữ liệu
```

Từ đó chúng ta có thể xây dựng một ứng dụng **CRUD JavaScript hoàn chỉnh**.
