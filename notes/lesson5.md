# Lesson 5 - JavaScript Cơ Bản: Thêm và Xóa dữ liệu với Axios

## Nội dung bài học

- Ôn tập gọi API với Axios
- Hiển thị danh sách từ JSON Server
- Xóa dữ liệu với `DELETE`
- Xác nhận trước khi xóa
- Lấy dữ liệu từ Form
- Xử lý sự kiện `submit`
- Sử dụng `preventDefault()`
- Thêm dữ liệu với `POST`
- Chuyển về trang danh sách sau khi thêm
- Bài tập thực hành tổng hợp

---

# 1. Ôn tập Axios và JSON Server

Ở bài trước, chúng ta đã sử dụng Axios để gọi API.

Ví dụ lấy danh sách sinh viên:

```js
axios.get("http://localhost:3000/students").then((res) => {
  console.log(res.data);
});
```

Dữ liệu trả về nằm trong:

```js
res.data;
```

Các API chính trong Lesson 5:

```text
GET     → Lấy danh sách
POST    → Thêm dữ liệu
DELETE  → Xóa dữ liệu

```

---

# 2. Hiển thị danh sách

HTML:

```html
<table border="1" cellpadding="10">
  <thead>
    <tr>
      <th>ID</th>
      <th>Họ tên</th>
      <th>Tuổi</th>
      <th>Email</th>
      <th>Thao tác</th>
    </tr>
  </thead>

  <tbody id="student-list"></tbody>
</table>
```

JavaScript:

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
                <button onclick="deleteStudent(${student.id})">
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

loadStudents();
```

Trong bài này chúng ta tiếp tục sử dụng kiến thức Lesson 4:

```text
Array Object
      ↓
map()
      ↓
Template Literal
      ↓
join("")
      ↓
innerHTML
      ↓
Hiển thị HTML

```

---

# 3. Xóa dữ liệu với Axios

Axios sử dụng method:

```text
DELETE

```

Ví dụ:

```js
axios.delete("http://localhost:3000/students/1");
```

Trong đó:

```text
/students/1

```

có nghĩa là thao tác với sinh viên có:

```text
id = 1

```

---

# 4. Tạo hàm deleteStudent()

Ở danh sách, chúng ta truyền `id` vào hàm:

```html
<button onclick="deleteStudent(1)">Xóa</button>
```

Hàm:

```js
function deleteStudent(id) {
  axios.delete(`http://localhost:3000/students/${id}`).then(() => {
    loadStudents();
  });
}
```

Sau khi xóa thành công:

```js
loadStudents();
```

được gọi lại để lấy danh sách mới.

---

# 5. Xác nhận trước khi xóa

Không nên xóa dữ liệu ngay khi người dùng bấm nút.

Sử dụng:

```js
confirm();
```

Ví dụ:

```js
const result = confirm("Bạn có chắc chắn muốn xóa không?");
```

Nếu người dùng chọn:

```text
OK

```

thì:

```js
result === true;
```

Nếu chọn:

```text
Cancel

```

thì:

```js
result === false;
```

---

# 6. Kết hợp confirm() và DELETE

```js
function deleteStudent(id) {
  const result = confirm("Bạn có chắc chắn muốn xóa không?");

  if (result) {
    axios.delete(`http://localhost:3000/students/${id}`).then(() => {
      loadStudents();
    });
  }
}
```

Luồng xử lý:

```text
Bấm Xóa
   ↓
confirm()
   ↓
┌───────────────┐
│               │
OK            Cancel
│               │
↓               ↓
DELETE        Không làm gì
│
↓
loadStudents()
│
↓
Hiển thị danh sách mới

```

---

# 7. Tạo Form thêm dữ liệu

Tạo file:

```text
add.html

```

Ví dụ:

```html
<form id="form-add">
  <input id="name" placeholder="Tên sinh viên" />

  <input id="age" placeholder="Tuổi" />

  <input id="email" placeholder="Email" />

  <button type="submit">Thêm sinh viên</button>
</form>
```

---

# 8. Lấy dữ liệu từ Form

Trong JavaScript:

```js
const name = document.getElementById("name").value;

const age = document.getElementById("age").value;

const email = document.getElementById("email").value;
```

Ví dụ kiểm tra:

```js
console.log(name);
console.log(age);
console.log(email);
```

---

# 9. Bắt sự kiện submit

Thay vì sử dụng `onclick`, chúng ta có thể bắt sự kiện submit của Form:

```js
document.getElementById("form-add").addEventListener("submit", (e) => {
  console.log("Submit form");
});
```

Khi người dùng bấm:

```text
Thêm sinh viên

```

sự kiện `submit` sẽ được gọi.

---

# 10. preventDefault()

Mặc định khi submit Form, trình duyệt có thể reload trang.

Sử dụng:

```js
e.preventDefault();
```

Ví dụ:

```js
document.getElementById("form-add").addEventListener("submit", (e) => {
  e.preventDefault();

  console.log("Submit form");
});
```

`preventDefault()` giúp ngăn hành vi mặc định của trình duyệt.

Trong bài này:

```text
Submit Form
    ↓
preventDefault()
    ↓
Lấy dữ liệu
    ↓
Gọi API POST

```

---

# 11. Thêm dữ liệu với Axios POST

Axios sử dụng:

```text
POST

```

Ví dụ:

```js
axios.post("http://localhost:3000/students", {
  name: "Nguyễn Văn An",
  age: 20,
  email: "an@gmail.com",
});
```

Sau khi gọi API, JSON Server sẽ thêm bản ghi mới vào `db.json`.

---

# 12. Lấy dữ liệu và POST

Hoàn chỉnh:

```js
document.getElementById("form-add").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const email = document.getElementById("email").value;

  axios
    .post("http://localhost:3000/students", {
      name: name,
      age: age,
      email: email,
    })
    .then(() => {
      alert("Thêm sinh viên thành công");
    });
});
```

Có thể viết ngắn hơn:

```js
axios.post("http://localhost:3000/students", {
  name,
  age,
  email,
});
```

---

# 13. Chuyển về trang danh sách

Sau khi thêm thành công, có thể chuyển về:

```text
index.html

```

Sử dụng:

```js
location.replace("index.html");
```

Ví dụ:

```js
axios
  .post("http://localhost:3000/students", {
    name,
    age,
    email,
  })
  .then(() => {
    alert("Thêm sinh viên thành công");

    location.replace("index.html");
  });
```

---

# 14. File add.js hoàn chỉnh

```js
document.getElementById("form-add").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const email = document.getElementById("email").value;

  axios
    .post("http://localhost:3000/students", {
      name,
      age,
      email,
    })
    .then(() => {
      alert("Thêm sinh viên thành công");

      location.replace("index.html");
    });
});
```

---

# 15. Nhúng Axios

Trong `index.html` hoặc `add.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="./index.js"></script>
```

Đối với trang thêm:

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="./add.js"></script>
```

Axios phải được nhúng trước file JavaScript sử dụng Axios.

---

# 16. Cấu trúc bài thực hành

Có thể tổ chức project:

```text
project/
│
├── index.html
├── index.js
│
├── add.html
├── add.js
│
└── db.json

```

Trong đó:

```text
index.html
    ↓
Hiển thị danh sách
    ↓
GET

index.js
    ↓
Xóa dữ liệu
    ↓
DELETE

add.html
    ↓
Form thêm dữ liệu

add.js
    ↓
Lấy dữ liệu Form
    ↓
POST
    ↓
db.json

```

---

# 17. db.json

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
      "name": "Nguyễn Văn An",
      "age": 20,
      "email": "an@gmail.com"
    },
    {
      "id": 2,
      "name": "Trần Thị Bình",
      "age": 21,
      "email": "binh@gmail.com"
    },
    {
      "id": 3,
      "name": "Lê Văn Cường",
      "age": 22,
      "email": "cuong@gmail.com"
    }
  ]
}
```

Chạy JSON Server:

```bash
npx json-server --watch db.json

```

API:

```text
GET     http://localhost:3000/students
POST    http://localhost:3000/students
DELETE  http://localhost:3000/students/:id

```

---

# 18. index.html hoàn chỉnh

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Student Manager</title>
  </head>

  <body>
    <h2>Danh sách sinh viên</h2>

    <a href="./add.html"> Thêm sinh viên </a>

    <br /><br />

    <table border="1" cellpadding="10">
      <thead>
        <tr>
          <th>ID</th>
          <th>Họ tên</th>
          <th>Tuổi</th>
          <th>Email</th>
          <th>Thao tác</th>
        </tr>
      </thead>

      <tbody id="student-list"></tbody>
    </table>

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="./index.js"></script>
  </body>
</html>
```

---

# 19. index.js hoàn chỉnh

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
                <button onclick="deleteStudent(${student.id})">
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

# 20. add.html hoàn chỉnh

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Thêm sinh viên</title>
  </head>

  <body>
    <h2>Thêm sinh viên</h2>

    <form id="form-add">
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

      <button type="submit">Thêm sinh viên</button>

      <a href="./index.html"> Quay lại </a>
    </form>

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="./add.js"></script>
  </body>
</html>
```

---

# 21. add.js hoàn chỉnh

```js
document.getElementById("form-add").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const email = document.getElementById("email").value;

  axios
    .post("http://localhost:3000/students", {
      name,
      age,
      email,
    })
    .then(() => {
      alert("Thêm sinh viên thành công");

      location.replace("index.html");
    });
});
```

---

# 22. Luồng hoạt động chức năng Thêm

```text
add.html
   ↓
Nhập thông tin
   ↓
Bấm "Thêm sinh viên"
   ↓
submit
   ↓
preventDefault()
   ↓
Lấy dữ liệu Form
   ↓
Axios POST
   ↓
JSON Server
   ↓
db.json
   ↓
Thêm bản ghi
   ↓
Chuyển về index.html
   ↓
GET danh sách
   ↓
Hiển thị dữ liệu mới

```

---

# 23. Luồng hoạt động chức năng Xóa

```text
index.html
   ↓
GET danh sách
   ↓
Hiển thị dữ liệu
   ↓
Bấm "Xóa"
   ↓
confirm()
   ↓
┌───────────────┐
│               │
OK            Cancel
│               │
↓               ↓
DELETE        Không làm gì
│
↓
JSON Server
│
↓
db.json
│
↓
loadStudents()
│
↓
GET lại danh sách
│
↓
Hiển thị danh sách mới

```

---

# 24. Bài tập thực hành 1 - Quản lý sản phẩm

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
    },
    {
      "id": 4,
      "name": "Oppo Reno 12",
      "price": 12000000
    }
  ]
}
```

Hiển thị danh sách sản phẩm dưới dạng Table.

Yêu cầu:

- ID
- Tên sản phẩm
- Giá
- Thao tác

---

# 25. Bài tập thực hành 2 - Xóa sản phẩm

Thêm nút:

```text
Xóa

```

Khi bấm **Xóa**:

1. Hiển thị `confirm()`.
2. Nếu chọn **OK** → gọi API `DELETE`.
3. Nếu chọn **Cancel** → không xóa.
4. Sau khi xóa thành công → gọi lại API lấy danh sách.

API:

```text
DELETE /products/:id

```

---

# 26. Bài tập thực hành 3 - Thêm sản phẩm

Tạo trang:

```text
add.html

```

Form gồm:

```text
Tên sản phẩm
Giá

```

Khi bấm:

```text
Thêm sản phẩm

```

Yêu cầu:

1. Bắt sự kiện `submit`.
2. Sử dụng `preventDefault()`.
3. Lấy dữ liệu từ Form.
4. Gọi API:

```text
POST /products

```

5. Hiển thị thông báo thêm thành công.
6. Chuyển về trang danh sách.

---

# 27. Bài tập thực hành 4 - Kiểm tra dữ liệu

Trước khi gọi API `POST`, kiểm tra:

### Tên sản phẩm

Không được để trống.

### Giá

Phải lớn hơn `0`.

Ví dụ:

```js
if (name === "") {
  alert("Tên sản phẩm không được để trống");
  return;
}

if (price <= 0) {
  alert("Giá phải lớn hơn 0");
  return;
}
```

---

# 28. Bài tập tổng hợp

Hoàn thiện website quản lý sản phẩm:

```text
              index.html
                   │
          GET danh sách sản phẩm
                   │
                   ↓
        ┌─────────────────────┐
        │ Danh sách sản phẩm  │
        └─────────────────────┘
             │           │
             │           │
           Thêm         Xóa
             │           │
             ↓           ↓
         add.html     confirm()
             │           │
             ↓           ↓
           POST        DELETE
             │           │
             └─────┬─────┘
                   ↓
              db.json

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
Form thêm sản phẩm
    ↓
POST

index.html
    ↓
Xóa sản phẩm
    ↓
DELETE

```

---

# 29. Kiến thức cần nhớ

## GET

Lấy dữ liệu:

```js
axios.get("http://localhost:3000/products");
```

## POST

Thêm dữ liệu:

```js
axios.post("http://localhost:3000/products", {
  name,
  price,
});
```

## DELETE

Xóa dữ liệu:

```js
axios.delete(`http://localhost:3000/products/${id}`);
```

## confirm()

Xác nhận trước khi xóa:

```js
const result = confirm("Bạn có chắc chắn muốn xóa?");
```

## submit

Bắt sự kiện Form:

```js
form.addEventListener("submit", (e) => {});
```

## preventDefault()

Ngăn Form reload trang:

```js
e.preventDefault();
```

## Chuyển trang

```js
location.replace("index.html");
```

---

# 30. Tổng kết Lesson 5

Sau Lesson 5, sinh viên cần thực hiện được:

```text
                 Axios
                   │
          ┌────────┼────────┐
          ↓        ↓        ↓
         GET      POST    DELETE
          │        │        │
          ↓        ↓        ↓
       Hiển thị   Thêm     Xóa
       danh sách  dữ liệu  dữ liệu
                   │        │
                   └────┬───┘
                        ↓
                     db.json

```

Quan trọng nhất:

```text
GET
 ↓
Hiển thị danh sách
 ↓
Thêm → POST
 ↓
Xóa → DELETE

```

Sinh viên cần tự làm được chức năng:

- Hiển thị danh sách.
- Thêm dữ liệu.
- Xóa dữ liệu.
- Xác nhận trước khi xóa.
- Reload danh sách sau khi thêm/xóa.

**Lesson 5 chưa học:**

- Edit dữ liệu.
- `PUT`
- `PATCH`
- Tìm kiếm nâng cao.
- Phân trang.
- API Backend thực tế.
- Authentication.
- LocalStorage.

Các nội dung này có thể tiếp tục ở các Lesson sau.
