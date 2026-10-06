# Lesson 6 - JavaScript Cơ Bản: Chỉnh sửa dữ liệu với Axios

## Nội dung bài học

- Hiểu chức năng Edit
- Lấy `id` của dữ liệu cần sửa
- Lấy dữ liệu cũ bằng `GET`
- Hiển thị dữ liệu cũ lên Form
- Chỉnh sửa dữ liệu với `PUT`

---

# 1. Ôn tập Lesson 5

Ở Lesson 5, chúng ta đã sử dụng Axios để thực hiện:

```text
GET
 ↓
Lấy danh sách

POST
 ↓
Thêm dữ liệu

DELETE
 ↓
Xóa dữ liệu

```

Ví dụ:

```js
axios.get("http://localhost:3000/students");
```

```js
axios.post("http://localhost:3000/students", {
  name: "Nguyễn Văn An",
  age: 20,
  email: "an@gmail.com",
});
```

```js
axios.delete("http://localhost:3000/students/1");
```

Lesson 6 bổ sung chức năng:

```text
PUT
 ↓
Cập nhật dữ liệu

```

---

# 2. CRUD là gì?

Sau Lesson 6, chúng ta đã có 4 chức năng cơ bản:

```text
CRUD
│
├── C - Create
│      ↓
│     POST
│      ↓
│     Thêm
│
├── R - Read
│      ↓
│     GET
│      ↓
│     Xem
│
├── U - Update
│      ↓
│     PUT
│      ↓
│     Sửa
│
└── D - Delete
       ↓
      DELETE
       ↓
      Xóa

```

Đây là 4 chức năng cơ bản của rất nhiều hệ thống quản lý dữ liệu.

Ví dụ:

```text
Quản lý sinh viên

Thêm sinh viên
Xem danh sách
Sửa sinh viên
Xóa sinh viên

```

---

# 3. Chức năng Edit hoạt động như thế nào?

Khi người dùng đang ở trang danh sách:

```text
Danh sách sinh viên

ID    Họ tên             Tuổi
1     Nguyễn Văn An      20       Sửa
2     Trần Thị Bình      21       Sửa
3     Lê Văn Cường       22       Sửa

```

Người dùng bấm:

```text
Sửa

```

Chúng ta cần biết:

```text
Sinh viên nào cần sửa?

```

Ví dụ:

```text
id = 2

```

Sau đó chuyển sang:

```text
edit.html?id=2

```

Trang `edit.html` sẽ lấy:

```text
id = 2

```

Sau đó gọi:

```text
GET /students/2

```

để lấy dữ liệu cũ.

Luồng:

```text
index.html
     ↓
Bấm Sửa
     ↓
edit.html?id=2
     ↓
Lấy id = 2
     ↓
GET /students/2
     ↓
Lấy dữ liệu cũ
     ↓
Hiển thị lên Form
     ↓
Người dùng chỉnh sửa
     ↓
Submit
     ↓
PUT /students/2
     ↓
Cập nhật dữ liệu
     ↓
index.html

```

---

# 4. Thêm nút Sửa

Ở Lesson 5, chúng ta có nút:

```html
<button onclick="deleteStudent(${student.id})">Xóa</button>
```

Bây giờ thêm nút:

```html
<a href="./edit.html?id=${student.id}"> Sửa </a>
```

Ví dụ:

```js
const html = res.data
  .map(
    (student) => `
      <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.email}</td>

        <td>
          <a href="./edit.html?id=${student.id}">
            Sửa
          </a>

          <button onclick="deleteStudent(${student.id})">
            Xóa
          </button>
        </td>
      </tr>
    `,
  )
  .join("");
```

Khi sinh viên có:

```text
id = 2

```

Link sẽ trở thành:

```text
edit.html?id=2

```

---

# 5. Query String là gì?

URL:

```text
edit.html?id=2

```

Trong đó:

```text
edit.html

```

là tên trang.

```text
?

```

bắt đầu phần Query String.

```text
id=2

```

là dữ liệu được truyền sang trang.

Có thể hiểu:

```text
edit.html?id=2

       ↓

Trang Edit
   +
id = 2

```

Ví dụ khác:

```text
edit.html?id=5

```

thì:

```text
id = 5

```

---

# 6. Lấy id từ URL

JavaScript có:

```js
URLSearchParams;
```

Ví dụ:

```js
const params = new URLSearchParams(location.search);
```

Sau đó lấy `id`:

```js
const id = params.get("id");
```

Nếu URL:

```text
edit.html?id=2

```

thì:

```js
console.log(id);
```

kết quả:

```text
2

```

Luồng:

```text
URL

edit.html?id=2
       ↓
location.search
       ↓
?id=2
       ↓
URLSearchParams
       ↓
params.get("id")
       ↓
2

```

---

# 7. Gọi API lấy dữ liệu cũ

Sau khi lấy được:

```js
const id = params.get("id");
```

chúng ta gọi:

```js
axios.get(`http://localhost:3000/students/${id}`);
```

Ví dụ:

```js
axios.get(`http://localhost:3000/students/${id}`).then((res) => {
  console.log(res.data);
});
```

Nếu:

```text
id = 2

```

API sẽ là:

```text
GET /students/2

```

JSON Server trả về:

```json
{
  "id": 2,
  "name": "Trần Thị Bình",
  "age": 21,
  "email": "binh@gmail.com"
}
```

---

# 8. Hiển thị dữ liệu cũ lên Form

HTML:

```html
<form id="form-edit">
  <div>
    <label>Họ tên</label>
    <input id="name" />
  </div>

  <br />

  <div>
    <label>Tuổi</label>
    <input id="age" type="number" />
  </div>

  <br />

  <div>
    <label>Email</label>
    <input id="email" type="email" />
  </div>

  <br />

  <button type="submit">Cập nhật</button>

  <a href="./index.html"> Quay lại </a>
</form>
```

JavaScript:

```js
axios.get(`http://localhost:3000/students/${id}`).then((res) => {
  const student = res.data;

  document.getElementById("name").value = student.name;
  document.getElementById("age").value = student.age;
  document.getElementById("email").value = student.email;
});
```

Ví dụ dữ liệu:

```json
{
  "id": 2,
  "name": "Trần Thị Bình",
  "age": 21,
  "email": "binh@gmail.com"
}
```

Form sẽ hiển thị:

```text
Họ tên
[ Trần Thị Bình ]

Tuổi
[ 21 ]

Email
[ binh@gmail.com ]

```

Người dùng có thể chỉnh sửa.

---

# 9. Lấy dữ liệu mới từ Form

Sau khi người dùng chỉnh sửa:

```js
const name = document.getElementById("name").value;
const age = document.getElementById("age").value;
const email = document.getElementById("email").value;
```

Ví dụ:

```text
Tên cũ:

Trần Thị Bình

        ↓

Tên mới:

Trần Thị Bình Nguyễn

```

JavaScript lấy được:

```js
console.log(name);
```

kết quả:

```text
Trần Thị Bình Nguyễn

```

---

# 10. Bắt sự kiện submit

Tương tự Lesson 5:

```js
document.getElementById("form-edit").addEventListener("submit", (e) => {
  e.preventDefault();
});
```

`preventDefault()` ngăn Form reload trang.

Luồng:

```text
Bấm Cập nhật
      ↓
submit
      ↓
preventDefault()
      ↓
Lấy dữ liệu Form
      ↓
PUT

```

---

# 11. PUT là gì?

Axios sử dụng:

```text
PUT

```

để cập nhật dữ liệu.

Ví dụ:

```js
axios.put("http://localhost:3000/students/2", {
  name: "Trần Thị Bình Nguyễn",
  age: 22,
  email: "binhnew@gmail.com",
});
```

Trong đó:

```text
/students/2

```

có nghĩa:

```text
Cập nhật student có id = 2

```

---

# 12. PUT gửi dữ liệu như thế nào?

Ví dụ dữ liệu ban đầu:

```json
{
  "id": 2,
  "name": "Trần Thị Bình",
  "age": 21,
  "email": "binh@gmail.com"
}
```

Người dùng sửa thành:

```json
{
  "name": "Trần Thị Bình Nguyễn",
  "age": 22,
  "email": "binhnew@gmail.com"
}
```

Gọi:

```js
axios.put(`http://localhost:3000/students/${id}`, {
  name,
  age,
  email,
});
```

JSON Server sẽ cập nhật bản ghi.

---

# 13. PUT và DELETE đều cần id

Có thể so sánh:

```text
DELETE

/students/2

```

và:

```text
PUT

/students/2

```

Cả hai đều cần biết:

```text
id = 2

```

Nhưng hành động khác nhau:

```text
DELETE /students/2
        ↓
      Xóa

```

```text
PUT /students/2
        ↓
     Cập nhật

```

---

# 14. PUT và PATCH

Ngoài `PUT`, HTTP còn có:

```text
PATCH

```

Hai method đều có thể dùng để cập nhật dữ liệu.

### PUT

Thường gửi toàn bộ dữ liệu cần cập nhật.

Ví dụ:

```js
axios.put(`http://localhost:3000/students/${id}`, {
  name,
  age,
  email,
});
```

### PATCH

Thường dùng để cập nhật một phần dữ liệu.

Ví dụ chỉ đổi email:

```js
axios.patch(`http://localhost:3000/students/${id}`, {
  email: "newemail@gmail.com",
});
```

Có thể hiểu đơn giản:

```text
PUT

Cập nhật toàn bộ thông tin

```

```text
PATCH

Cập nhật một phần thông tin

```

Trong Lesson 6, chúng ta sử dụng:

```text
PUT

```

để dễ hiểu quy trình CRUD.

---

# 15. Kiểm tra dữ liệu trước khi PUT

Không nên gửi dữ liệu rỗng lên API.

Ví dụ kiểm tra:

```js
if (name === "") {
  alert("Họ tên không được để trống");
  return;
}
```

Kiểm tra tuổi:

```js
if (age <= 0) {
  alert("Tuổi phải lớn hơn 0");
  return;
}
```

Kiểm tra email:

```js
if (email === "") {
  alert("Email không được để trống");
  return;
}
```

Luồng:

```text
Submit
  ↓
Kiểm tra dữ liệu
  ↓
┌───────────────┐
│               │
Hợp lệ       Không hợp lệ
│               │
↓               ↓
PUT          alert()
│               │
↓             return
Cập nhật

```

---

# 16. Code Edit hoàn chỉnh

File:

```text
edit.js

```

Code:

```js
const params = new URLSearchParams(location.search);
const id = params.get("id");

axios.get(`http://localhost:3000/students/${id}`).then((res) => {
  const student = res.data;

  document.getElementById("name").value = student.name;
  document.getElementById("age").value = student.age;
  document.getElementById("email").value = student.email;
});

document.getElementById("form-edit").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const email = document.getElementById("email").value;

  if (name === "") {
    alert("Họ tên không được để trống");
    return;
  }

  if (age <= 0) {
    alert("Tuổi phải lớn hơn 0");
    return;
  }

  if (email === "") {
    alert("Email không được để trống");
    return;
  }

  axios
    .put(`http://localhost:3000/students/${id}`, {
      name,
      age,
      email,
    })
    .then(() => {
      alert("Cập nhật thành công");

      location.replace("index.html");
    });
});
```

---

# 17. edit.html hoàn chỉnh

```html
<!DOCTYPE html>

<html>
  <head>
    <title>Chỉnh sửa sinh viên</title>
  </head>

  <body>
    <h2>Chỉnh sửa sinh viên</h2>

    <form id="form-edit">
      <div>
        <label>Họ tên</label>

        <input id="name" placeholder="Nhập họ tên" />
      </div>

      <br />

      <div>
        <label>Tuổi</label>

        <input id="age" type="number" placeholder="Nhập tuổi" />
      </div>

      <br />

      <div>
        <label>Email</label>

        <input id="email" type="email" placeholder="Nhập email" />
      </div>

      <br />

      <button type="submit">Cập nhật</button>

      <a href="./index.html"> Quay lại </a>
    </form>

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

    <script src="./edit.js"></script>
  </body>
</html>
```

---

# 18. index.js cập nhật thêm nút Sửa

File `index.js`:

```js
function loadStudents() {
  axios.get("http://localhost:3000/students").then((res) => {
    const html = res.data
      .map(
        (student) => `
            <tr>

              <td>${student.id}</td>

              <td>${student.name}</td>

              <td>${student.age}</td>

              <td>${student.email}</td>

              <td>

                <a href="./edit.html?id=${student.id}">
                  Sửa
                </a>

                <button
                  onclick="deleteStudent(${student.id})"
                >
                  Xóa
                </button>

              </td>

            </tr>
          `,
      )
      .join("");

    document.getElementById("student-list").innerHTML = html;
  });
}

function deleteStudent(id) {
  const result = confirm("Bạn có chắc chắn muốn xóa sinh viên này không?");

  if (result) {
    axios.delete(`http://localhost:3000/students/${id}`).then(() => {
      alert("Xóa thành công");

      loadStudents();
    });
  }
}

loadStudents();
```

---

# 20. Cấu trúc project sau Lesson 6

```text
project/

│
├── index.html
├── index.js
│
├── add.html
├── add.js
│
├── edit.html
├── edit.js
│
└── db.json

```

Trong đó:

```text
index.html
    ↓
Danh sách
    ↓
GET
    │
    ├──────────────┐
    ↓              ↓
   Sửa             Xóa
    ↓              ↓
edit.html        DELETE
    ↓
GET
    ↓
Hiển thị dữ liệu cũ
    ↓
Người dùng chỉnh sửa
    ↓
PUT
    ↓
index.html

```

---

# 21. Luồng hoạt động chức năng Edit

Ví dụ sinh viên có:

```text
id = 2

```

Người dùng bấm:

```text
Sửa

```

### Bước 1

Chuyển sang:

```text
edit.html?id=2

```

### Bước 2

JavaScript lấy:

```js
const params = new URLSearchParams(location.search);

const id = params.get("id");
```

Kết quả:

```text
2

```

### Bước 3

Gọi API:

```js
axios.get(`http://localhost:3000/students/${id}`);
```

### Bước 4

Nhận dữ liệu:

```json
{
  "id": 2,
  "name": "Trần Thị Bình",
  "age": 21,
  "email": "binh@gmail.com"
}
```

### Bước 5

Đưa dữ liệu lên Form:

```text
Họ tên
[ Trần Thị Bình ]

Tuổi
[ 21 ]

Email
[ binh@gmail.com ]

```

### Bước 6

Người dùng chỉnh sửa:

```text
Họ tên
[ Trần Thị Bình Nguyễn ]

Tuổi
[ 22 ]

Email
[ binhnew@gmail.com ]

```

### Bước 7

Bấm:

```text
Cập nhật

```

### Bước 8

Gọi:

```text
PUT /students/2

```

### Bước 9

Cập nhật thành công.

### Bước 10

Chuyển về:

```text
index.html

```

---

# 22. So sánh Add và Edit

Lesson 5:

```text
ADD

add.html
   ↓
Form rỗng
   ↓
Nhập dữ liệu
   ↓
POST
   ↓
Thêm mới

```

Lesson 6:

```text
EDIT

edit.html?id=2
   ↓
GET /students/2
   ↓
Form có dữ liệu cũ
   ↓
Chỉnh sửa
   ↓
PUT /students/2
   ↓
Cập nhật

```

Có thể nhớ:

```text
ADD

Form rỗng
   ↓
POST


EDIT

GET dữ liệu cũ
   ↓
Form có dữ liệu
   ↓
PUT

```

---

# 23. CRUD hoàn chỉnh

Sau Lesson 6:

```text
                 CRUD

                   │

       ┌───────────┼───────────┐
       ↓           ↓           ↓
     CREATE       READ        UPDATE
       ↓           ↓           ↓
      POST        GET         PUT
       ↓           ↓           ↓
     Thêm         Xem         Sửa
       │           │           │
       └───────────┼───────────┘
                   ↓
                DELETE
                   ↓
                  Xóa

```

Bảng tổng hợp:

| Chức năng         | HTTP Method | API             |
| ----------------- | ----------- | --------------- |
| Xem danh sách     | GET         | `/students`     |
| Xem một sinh viên | GET         | `/students/:id` |
| Thêm              | POST        | `/students`     |
| Sửa               | PUT         | `/students/:id` |
| Xóa               | DELETE      | `/students/:id` |

---

# 24. Bài tập thực hành 1 - Sửa sản phẩm

Sử dụng project sản phẩm ở Lesson 5.

`db.json`:

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
    },
    {
      "id": 4,
      "name": "Oppo Reno 12",
      "price": 12000000
    }
  ]
}
```

Yêu cầu:

Thêm nút:

```text
Sửa

```

vào danh sách sản phẩm.

Khi bấm:

```text
Sửa

```

chuyển sang:

```text
edit.html?id=:id

```

---

# 25. Bài tập thực hành 2 - Form Edit sản phẩm

Tạo:

```text
edit.html
edit.js

```

Form gồm:

```text
Tên sản phẩm

Giá

[Cập nhật]
[Quay lại]

```

Khi mở:

```text
edit.html?id=2

```

phải gọi:

```text
GET /products/2

```

và hiển thị dữ liệu cũ lên Form.

---

# 26. Bài tập thực hành 3 - Cập nhật sản phẩm

Khi bấm:

```text
Cập nhật

```

Yêu cầu:

1. Bắt sự kiện `submit`.
2. Sử dụng `preventDefault()`.
3. Lấy `id` từ URL.
4. Lấy dữ liệu từ Form.
5. Kiểm tra dữ liệu.
6. Gọi API `PUT`.
7. Thông báo cập nhật thành công.
8. Chuyển về `index.html`.

API:

```text
PUT /products/:id

```

---

# 27. Bài tập thực hành 4 - Kiểm tra dữ liệu

Trước khi gọi `PUT`:

### Tên sản phẩm

Không được để trống.

```js
if (name === "") {
  alert("Tên sản phẩm không được để trống");

  return;
}
```

### Giá

Phải lớn hơn `0`.

```js
if (price <= 0) {
  alert("Giá phải lớn hơn 0");

  return;
}
```

---

# 28. Bài tập tổng hợp CRUD

Hoàn thiện website:

```text
                 PRODUCT MANAGER

                       │
                       ↓
                  index.html
                       │
             GET /products
                       │
                       ↓
              Danh sách sản phẩm
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
        Thêm           Sửa          Xóa
          ↓            ↓            ↓
      add.html     edit.html      DELETE
          ↓            ↓
         POST          GET
                       ↓
                  Hiển thị Form
                       ↓
                    Chỉnh sửa
                       ↓
                      PUT
                       ↓
                  index.html

```

Website cần có:

```text
index.html
    ↓
Danh sách sản phẩm
    ↓
GET

add.html
    ↓
Thêm sản phẩm
    ↓
POST

edit.html
    ↓
Sửa sản phẩm
    ↓
GET
    ↓
PUT

index.html
    ↓
Xóa sản phẩm
    ↓
DELETE

```

---

# 29. Kiến thức cần nhớ

## GET danh sách

```js
axios.get("http://localhost:3000/products");
```

## GET một sản phẩm

```js
axios.get(`http://localhost:3000/products/${id}`);
```

## POST

```js
axios.post("http://localhost:3000/products", {
  name,
  price,
});
```

## PUT

```js
axios.put(`http://localhost:3000/products/${id}`, {
  name,
  price,
});
```

## DELETE

```js
axios.delete(`http://localhost:3000/products/${id}`);
```

## Lấy id từ URL

```js
const params = new URLSearchParams(location.search);

const id = params.get("id");
```

## Submit

```js
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
```

## Chuyển trang

```js
location.replace("index.html");
```

---

# 30. Tổng kết Lesson 6

Sau Lesson 6, sinh viên cần thực hiện được:

```text
GET
 ↓
Hiển thị danh sách
 ↓
POST
 ↓
Thêm dữ liệu
 ↓
GET /:id
 ↓
Lấy dữ liệu cũ
 ↓
Hiển thị Form
 ↓
PUT /:id
 ↓
Cập nhật dữ liệu
 ↓
DELETE /:id
 ↓
Xóa dữ liệu

```

Quan trọng nhất:

```text
CREATE
  ↓
POST

READ
  ↓
GET

UPDATE
  ↓
PUT

DELETE
  ↓
DELETE

```

Sinh viên cần tự làm được:

- Hiển thị danh sách.
- Thêm dữ liệu.
- Xóa dữ liệu.
- Xác nhận trước khi xóa.
- Chuyển sang trang Edit.
- Lấy `id` từ URL.
- Lấy dữ liệu cũ bằng `GET`.
- Hiển thị dữ liệu cũ lên Form.
- Chỉnh sửa dữ liệu.
- Cập nhật bằng `PUT`.
- Kiểm tra dữ liệu trước khi cập nhật.
- Chuyển về trang danh sách sau khi cập nhật.

---

# 31. Lesson 6 chưa học

Các nội dung này có thể tiếp tục ở những Lesson sau:

```text
PATCH
Search
Filter
Pagination
Async/Await
Try/Catch
Axios Instance
Axios Interceptor
Loading
Error handling
Authentication
LocalStorage
API Backend thực tế

```

Trong đó, Lesson tiếp theo có thể đi theo hướng:

```text
Lesson 7
    ↓
Async / Await + Try / Catch
    ↓
Viết code Axios dễ đọc hơn
    ↓
Xử lý Loading
    ↓
Xử lý Error

```
