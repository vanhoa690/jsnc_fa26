# Lesson 7 - Async/Await, Try/Catch và xử lý Loading, Error với Axios

## 1. Mục tiêu bài học

Sau bài học này, sinh viên có thể:

-   Hiểu `Promise` trong JavaScript.
-   Hiểu `async/await`.
-   Sử dụng `async/await` khi gọi API bằng Axios.
-   Sử dụng `try/catch` để xử lý lỗi.
-   Hiển thị trạng thái `Loading`.
-   Hiển thị thông báo `Error`.
-   Sử dụng `finally` để tắt Loading.
-   Viết code Axios dễ đọc và dễ bảo trì hơn.

------------------------------------------------------------------------

# 2. Ôn tập Lesson 6

Ở Lesson 6, chúng ta đã xây dựng chức năng:

``` text
Danh sách
   ↓
Click Edit
   ↓
edit.html?id=2
   ↓
GET /students/2
   ↓
Hiển thị dữ liệu cũ
   ↓
Người dùng sửa
   ↓
PUT /students/2
```

Ví dụ gọi API:

``` js
axios.get("http://localhost:3000/students/2")
  .then((response) => {
    console.log(response.data);
  });
```

Cách viết này sử dụng `.then()`.

Trong Lesson 7, chúng ta chuyển sang:

``` js
async function getStudent() {
  const response = await axios.get("http://localhost:3000/students/2");

  console.log(response.data);
}
```

Code dễ đọc hơn và gần với cách viết code tuần tự.

------------------------------------------------------------------------

# 3. Promise là gì?

Khi gọi API, kết quả không trả về ngay lập tức.

Ví dụ:

``` js
axios.get("http://localhost:3000/students")
```

Axios trả về một `Promise`.

Có thể hiểu đơn giản:

``` text
Gọi API
   ↓
Đang chờ Server
   ↓
Có kết quả
   ↓
Tiếp tục xử lý
```

Promise thường có 3 trạng thái:

``` text
Pending
   ↓
Đang xử lý

Fulfilled
   ↓
Thành công

Rejected
   ↓
Thất bại
```

------------------------------------------------------------------------

# 4. Gọi API với .then()

Ví dụ:

``` js
axios.get("http://localhost:3000/students")
  .then((response) => {
    console.log(response.data);
  });
```

Khi API thành công:

``` js
.then((response) => {
  console.log(response.data);
});
```

`response.data` là dữ liệu Server trả về.

------------------------------------------------------------------------

# 5. async là gì?

`async` dùng để khai báo một hàm bất đồng bộ.

Ví dụ:

``` js
async function getStudents() {
  console.log("Hello");
}
```

Có thể hiểu:

``` text
async
↓
Hàm này có thể sử dụng await
```

Ví dụ:

``` js
async function getStudents() {
  const response = await axios.get(
    "http://localhost:3000/students"
  );

  console.log(response.data);
}
```

------------------------------------------------------------------------

# 6. await là gì?

`await` dùng để chờ một `Promise` hoàn thành.

Ví dụ:

``` js
const response = await axios.get(
  "http://localhost:3000/students"
);
```

Có thể hiểu:

``` text
Gọi API
   ↓
await
   ↓
Chờ API trả kết quả
   ↓
Lấy response
```

Lưu ý:

`await` phải được sử dụng bên trong hàm `async`.

Đúng:

``` js
async function getStudents() {
  const response = await axios.get(
    "http://localhost:3000/students"
  );
}
```

Sai:

``` js
function getStudents() {
  const response = await axios.get(
    "http://localhost:3000/students"
  );
}
```

------------------------------------------------------------------------

# 7. So sánh .then() và async/await

## Cách 1: .then()

``` js
axios.get("http://localhost:3000/students")
  .then((response) => {
    console.log(response.data);
  });
```

## Cách 2: async/await

``` js
async function getStudents() {
  const response = await axios.get(
    "http://localhost:3000/students"
  );

  console.log(response.data);
}
```

Cách `async/await` thường dễ đọc hơn khi có nhiều bước xử lý.

------------------------------------------------------------------------

# 8. GET với async/await

Ví dụ:

``` js
async function getStudents() {
  const response = await axios.get(
    "http://localhost:3000/students"
  );

  console.log(response.data);
}

getStudents();
```

Có thể xử lý dữ liệu:

``` js
async function getStudents() {
  const response = await axios.get(
    "http://localhost:3000/students"
  );

  const students = response.data;

  console.log(students);
}
```

------------------------------------------------------------------------

# 9. POST với async/await

Ví dụ thêm sinh viên:

``` js
async function addStudent() {
  const student = {
    name: "Nguyễn Văn A",
    age: 20,
    email: "a@gmail.com"
  };

  const response = await axios.post(
    "http://localhost:3000/students",
    student
  );

  console.log(response.data);
}
```

Gọi hàm:

``` js
addStudent();
```

------------------------------------------------------------------------

# 10. PUT với async/await

Ví dụ sửa sinh viên có ID là `2`:

``` js
async function updateStudent() {
  const student = {
    name: "Nguyễn Văn B",
    age: 21,
    email: "b@gmail.com"
  };

  const response = await axios.put(
    "http://localhost:3000/students/2",
    student
  );

  console.log(response.data);
}
```

------------------------------------------------------------------------

# 11. DELETE với async/await

Ví dụ:

``` js
async function deleteStudent(id) {
  await axios.delete(
    `http://localhost:3000/students/${id}`
  );

  console.log("Xóa thành công");
}
```

Gọi:

``` js
deleteStudent(2);
```

------------------------------------------------------------------------

# 12. Vấn đề khi API bị lỗi

Ví dụ:

``` js
async function getStudents() {
  const response = await axios.get(
    "http://localhost:3000/studentss"
  );

  console.log(response.data);
}
```

API bị sai:

``` text
/students
```

nhưng chúng ta viết:

``` text
/studentss
```

Khi đó Axios có thể trả về lỗi.

Nếu không xử lý lỗi, ứng dụng có thể xuất hiện lỗi trong Console.

Chúng ta cần:

``` text
try
  ↓
Thử thực hiện code
  ↓
Nếu lỗi
  ↓
catch
  ↓
Xử lý lỗi
```

------------------------------------------------------------------------

# 13. try/catch

Cú pháp:

``` js
try {
  // Code có thể xảy ra lỗi
} catch (error) {
  // Xử lý lỗi
}
```

Ví dụ:

``` js
try {
  console.log("Hello");
} catch (error) {
  console.log("Có lỗi");
}
```

------------------------------------------------------------------------

# 14. async/await + try/catch

Đây là pattern rất quan trọng khi làm việc với API.

``` js
async function getStudents() {
  try {
    const response = await axios.get(
      "http://localhost:3000/students"
    );

    console.log(response.data);
  } catch (error) {
    console.log("Có lỗi xảy ra");
  }
}
```

Flow:

``` text
getStudents()
      ↓
    try
      ↓
Gọi API
      ↓
   Thành công
      ↓
Xử lý response

Nếu lỗi
      ↓
    catch
      ↓
Hiển thị lỗi
```

------------------------------------------------------------------------

# 15. Hiển thị thông báo Error

HTML:

``` html
<p id="error"></p>
```

JavaScript:

``` js
function showError(message) {
  document.querySelector("#error").textContent = message;
}
```

Khi API lỗi:

``` js
catch (error) {
  showError("Không thể tải dữ liệu");
}
```

------------------------------------------------------------------------

# 16. Kiểm tra lỗi từ Axios

Có thể kiểm tra:

``` js
catch (error) {
  console.log(error);
}
```

Hoặc:

``` js
catch (error) {
  if (error.response) {
    console.log(error.response.status);
    console.log(error.response.data);
  }
}
```

Ví dụ:

``` js
catch (error) {
  showError(
    "Server trả về lỗi: " + error.response.status
  );
}
```

Tuy nhiên với bài học cơ bản, có thể sử dụng thông báo đơn giản:

``` js
catch (error) {
  showError("Không thể kết nối đến Server");
}
```

------------------------------------------------------------------------

# 17. Loading là gì?

Khi gọi API, người dùng có thể phải chờ Server phản hồi.

Nếu không có thông báo, người dùng có thể nghĩ:

``` text
Website bị đứng?
```

Vì vậy cần hiển thị:

``` text
Loading...
```

Flow:

``` text
User click
   ↓
Loading ON
   ↓
Gọi API
   ↓
Chờ Server
   ↓
API hoàn thành
   ↓
Loading OFF
```

------------------------------------------------------------------------

# 18. Tạo Loading trong HTML

Ví dụ:

``` html
<p id="loading">Loading...</p>
```

CSS:

``` css
#loading {
  display: none;
}
```

Khi bắt đầu gọi API:

``` js
document.querySelector("#loading").style.display = "block";
```

Khi API hoàn thành:

``` js
document.querySelector("#loading").style.display = "none";
```

------------------------------------------------------------------------

# 19. Tạo hàm showLoading()

Thay vì viết nhiều lần:

``` js
document.querySelector("#loading").style.display = "block";
```

Chúng ta tạo function:

``` js
function showLoading() {
  document.querySelector("#loading").style.display = "block";
}
```

Ẩn Loading:

``` js
function hideLoading() {
  document.querySelector("#loading").style.display = "none";
}
```

------------------------------------------------------------------------

# 20. finally là gì?

Khi sử dụng:

``` js
try {

} catch (error) {

}
```

Có thể thêm:

``` js
finally {

}
```

Cấu trúc:

``` js
try {
  // Code
} catch (error) {
  // Xử lý lỗi
} finally {
  // Luôn chạy
}
```

`finally` chạy trong cả hai trường hợp:

``` text
API thành công
      ↓
    finally

API thất bại
      ↓
    finally
```

------------------------------------------------------------------------

# 21. Loading + try/catch/finally

Đây là pattern rất quan trọng:

``` js
async function getStudents() {
  try {
    showLoading();

    const response = await axios.get(
      "http://localhost:3000/students"
    );

    console.log(response.data);
  } catch (error) {
    showError("Không thể tải dữ liệu");
  } finally {
    hideLoading();
  }
}
```

Flow:

``` text
             getStudents()
                   ↓
                 try
                   ↓
             showLoading()
                   ↓
                axios
                   ↓
          ┌────────┴────────┐
          ↓                 ↓
      Thành công           Lỗi
          ↓                 ↓
     xử lý data           catch
          │                 │
          └────────┬────────┘
                   ↓
                finally
                   ↓
             hideLoading()
```

------------------------------------------------------------------------

# 22. Tạo các hàm hỗ trợ

Có thể tạo:

``` js
function showLoading() {
  document.querySelector("#loading").style.display = "block";
}

function hideLoading() {
  document.querySelector("#loading").style.display = "none";
}

function showError(message) {
  document.querySelector("#error").textContent = message;
}

function clearError() {
  document.querySelector("#error").textContent = "";
}
```

------------------------------------------------------------------------

# 23. Full index.js

Ví dụ hoàn chỉnh:

``` js
const API_URL = "http://localhost:3000/students";

const studentList = document.querySelector("#studentList");

function showLoading() {
  document.querySelector("#loading").style.display = "block";
}

function hideLoading() {
  document.querySelector("#loading").style.display = "none";
}

function showError(message) {
  document.querySelector("#error").textContent = message;
}

function clearError() {
  document.querySelector("#error").textContent = "";
}

async function getStudents() {
  try {
    clearError();
    showLoading();

    const response = await axios.get(API_URL);

    studentList.innerHTML = "";

    response.data.forEach((student) => {
      studentList.innerHTML += `
        <tr>
          <td>${student.id}</td>
          <td>${student.name}</td>
          <td>${student.age}</td>
          <td>${student.email}</td>
          <td>
            <a href="edit.html?id=${student.id}">
              Edit
            </a>

            <button onclick="deleteStudent(${student.id})">
              Delete
            </button>
          </td>
        </tr>
      `;
    });
  } catch (error) {
    console.log(error);
    showError("Không thể tải danh sách sinh viên");
  } finally {
    hideLoading();
  }
}

async function deleteStudent(id) {
  const result = confirm("Bạn có chắc muốn xóa?");

  if (!result) {
    return;
  }

  try {
    clearError();
    showLoading();

    await axios.delete(`${API_URL}/${id}`);

    await getStudents();
  } catch (error) {
    console.log(error);
    showError("Không thể xóa sinh viên");
  } finally {
    hideLoading();
  }
}

getStudents();
```

------------------------------------------------------------------------

# 24. Full index.html

``` html
<!DOCTYPE html>
<html lang="vi">

<head>
  <meta charset="UTF-8">
  <title>Student Management</title>

  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>

<body>

  <h1>Danh sách sinh viên</h1>

  <a href="add.html">
    Thêm sinh viên
  </a>

  <p id="loading">
    Loading...
  </p>

  <p id="error"></p>

  <table border="1">
    <thead>
      <tr>
        <th>ID</th>
        <th>Tên</th>
        <th>Tuổi</th>
        <th>Email</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody id="studentList"></tbody>
  </table>

  <script src="index.js"></script>

</body>

</html>
```

------------------------------------------------------------------------

# 25. POST + Loading + Error

Ví dụ Form thêm sinh viên:

``` html
<form id="studentForm">

  <input
    type="text"
    id="name"
    placeholder="Tên"
  >

  <input
    type="number"
    id="age"
    placeholder="Tuổi"
  >

  <input
    type="email"
    id="email"
    placeholder="Email"
  >

  <button type="submit">
    Thêm
  </button>

</form>

<p id="loading">
  Loading...
</p>

<p id="error"></p>
```

JavaScript:

``` js
const form = document.querySelector("#studentForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    clearError();
    showLoading();

    const student = {
      name: document.querySelector("#name").value,
      age: Number(document.querySelector("#age").value),
      email: document.querySelector("#email").value
    };

    await axios.post(
      "http://localhost:3000/students",
      student
    );

    alert("Thêm thành công");

    form.reset();
  } catch (error) {
    console.log(error);
    showError("Không thể thêm sinh viên");
  } finally {
    hideLoading();
  }
});
```

------------------------------------------------------------------------

# 26. PUT + Loading + Error

Ví dụ:

``` js
async function updateStudent(id, student) {
  try {
    clearError();
    showLoading();

    await axios.put(
      `http://localhost:3000/students/${id}`,
      student
    );

    alert("Cập nhật thành công");
  } catch (error) {
    console.log(error);
    showError("Không thể cập nhật sinh viên");
  } finally {
    hideLoading();
  }
}
```

------------------------------------------------------------------------

# 27. DELETE + Loading + Error

``` js
async function deleteStudent(id) {
  const result = confirm("Bạn có chắc muốn xóa?");

  if (!result) {
    return;
  }

  try {
    clearError();
    showLoading();

    await axios.delete(
      `http://localhost:3000/students/${id}`
    );

    alert("Xóa thành công");

    await getStudents();
  } catch (error) {
    console.log(error);
    showError("Không thể xóa sinh viên");
  } finally {
    hideLoading();
  }
}
```

------------------------------------------------------------------------

# 28. Một pattern cần nhớ

Khi làm việc với API bằng Axios:

``` js
async function functionName() {
  try {

    // Loading ON

    // Gọi API

    // Xử lý dữ liệu

  } catch (error) {

    // Xử lý lỗi

  } finally {

    // Loading OFF

  }
}
```

Có thể ghi nhớ:

``` text
async
  ↓
try
  ↓
await API
  ↓
catch
  ↓
finally
```

------------------------------------------------------------------------

# 29. CRUD với Async/Await

## GET

``` js
const response = await axios.get(API_URL);
```

## POST

``` js
await axios.post(API_URL, data);
```

## PUT

``` js
await axios.put(`${API_URL}/${id}`, data);
```

## DELETE

``` js
await axios.delete(`${API_URL}/${id}`);
```

------------------------------------------------------------------------

# 30. Cấu trúc project

``` text
lesson-7/
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

Chạy JSON Server:

``` bash
npx json-server --watch db.json
```

API:

``` text
http://localhost:3000/students
```

------------------------------------------------------------------------

# 31. Bài tập thực hành

## Bài 1 - GET

Viết function:

``` js
async function getProducts() {

}
```

Yêu cầu:

-   GET danh sách sản phẩm.
-   Hiển thị ra Console.
-   Có Loading.
-   Có Error.

------------------------------------------------------------------------

## Bài 2 - POST

Tạo Form:

``` text
Tên sản phẩm
Giá
Danh mục
```

Yêu cầu:

-   Lấy dữ liệu Form.
-   POST lên JSON Server.
-   Hiển thị Loading.
-   Xử lý Error.
-   Thông báo thêm thành công.

------------------------------------------------------------------------

## Bài 3 - PUT

Tạo trang:

``` text
edit-product.html?id=2
```

Yêu cầu:

``` text
GET /products/2
      ↓
Hiển thị dữ liệu
      ↓
Người dùng sửa
      ↓
PUT /products/2
```

Phải có:

-   `async/await`
-   `try/catch`
-   `finally`
-   Loading
-   Error

------------------------------------------------------------------------

## Bài 4 - DELETE

Tạo nút:

``` text
Delete
```

Yêu cầu:

``` text
Click Delete
      ↓
confirm()
      ↓
DELETE API
      ↓
GET lại danh sách
```

Có:

-   Loading
-   Error
-   `async/await`
-   `try/catch`
-   `finally`

------------------------------------------------------------------------

# 32. Tổng kết Lesson 7

Sau Lesson 7, sinh viên đã biết:

``` text
Axios
  ↓
Promise
  ↓
async/await
  ↓
try/catch
  ↓
finally
  ↓
Loading
  ↓
Error
```

CRUD:

``` text
GET
POST
PUT
DELETE
```

Pattern chính:

``` js
async function getData() {
  try {
    showLoading();

    const response = await axios.get(API_URL);

    // xử lý dữ liệu
  } catch (error) {
    showError("Có lỗi xảy ra");
  } finally {
    hideLoading();
  }
}
```

------------------------------------------------------------------------

# 33. Lộ trình các bài

``` text
Lesson 5
CRUD với Axios
GET / POST / DELETE
        ↓
Lesson 6
PUT + Edit
Query String
        ↓
Lesson 7
Async/Await
Try/Catch
Finally
Loading
Error
        ↓
Lesson 8
JavaScript + API Service
Tách code gọi API
        ↓
React + TypeScript
```

## Kết luận

Sau Lesson 7, sinh viên không chỉ biết gọi API bằng Axios mà còn biết xử
lý tình huống thực tế:

``` text
Đang tải dữ liệu
      ↓
Loading

API thành công
      ↓
Hiển thị dữ liệu

API lỗi
      ↓
Hiển thị Error

API hoàn thành
      ↓
Tắt Loading
```

Đây là nền tảng quan trọng trước khi chuyển sang xây dựng ứng dụng
React.
