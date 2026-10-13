# Lesson 8 - JavaScript nâng cao: Đăng ký tài khoản với Axios và JSON Server Auth

## 1. Mục tiêu bài học

Sau bài học này, sinh viên có thể:

- Tạo giao diện đăng ký tài khoản bằng HTML và Tailwind CSS.
- Sử dụng JavaScript để đọc dữ liệu từ form.
- Kiểm tra dữ liệu trước khi gửi lên máy chủ.
- Sử dụng Axios gửi yêu cầu `POST` đến API.
- Kết hợp JSON Server Auth để tạo tài khoản.
- Hiển thị thông báo thành công, lỗi và trạng thái đang xử lý.
- Xử lý các trường hợp email đã tồn tại hoặc API không hoạt động.

## 2. Công nghệ sử dụng

- HTML5
- Tailwind CSS
- JavaScript thuần
- Axios
- JSON Server 0.17.4
- JSON Server Auth

Trong bài này, toàn bộ logic đăng ký được viết trong `register.js` để sinh viên dễ theo dõi. Khi thực hành, có thể đặt mã HTML trong `register.html` và mã JavaScript trong `register.js`.

## 3. Cấu trúc thư mục

```text
lesson-08-register/
├── db.json
├── package.json
├── index.html
├── add.html
├── register.html
└── register.js
```

- `db.json`: dữ liệu JSON dùng làm cơ sở dữ liệu giả lập.
- `register.html`: giao diện đăng ký.
- `register.js`: kiểm tra form và gọi API.
- `package.json`: khai báo lệnh chạy JSON Server.

## 4. Cài đặt JSON Server Auth

### Bước 2: Cập nhật `package.json`

Thêm script `db` vào phần `scripts`:

```json
{
  "scripts": {
    "db": "json-server db.json -m ./node_modules/json-server-auth --port 3000"
  },
  "dependencies": {
    "json-server": "^0.17.4",
    "json-server-auth": "^2.1.0"
  }
}
```

Nếu `package.json` đã có các trường khác, chỉ cần bổ sung script `db` và giữ nguyên các thông tin cần thiết.

### Bước 3: Tạo `db.json`

```json
{
  "users": []
}
```

JSON Server Auth sử dụng collection `users` để lưu tài khoản. Không lưu mật khẩu người dùng dưới dạng văn bản thuần trong ứng dụng thật. Với bài thực hành, hãy để thư viện xác thực xử lý theo cơ chế của nó.

### Bước 4: Chạy API

```bash
npm run db
```

Mặc định API chạy tại:

```text
http://localhost:3000
```

Giữ Terminal này mở trong khi thực hành.

## 5. Tạo giao diện đăng ký `register.html`

Tạo file `register.html` với nội dung sau:

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Đăng ký tài khoản - WEB2064 JSNC</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="min-h-screen bg-slate-100 text-slate-800">
    <nav class="bg-indigo-700 text-white shadow">
      <div
        class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4"
      >
        <a href="index.html" class="text-xl font-bold">WEB2064 JSNC</a>
        <div class="flex gap-4 text-sm">
          <a href="index.html" class="hover:text-indigo-200">Trang chủ</a>
          <a href="add.html" class="hover:text-indigo-200">Thêm dữ liệu</a>
          <a href="register.html" class="font-semibold underline">Đăng ký</a>
        </div>
      </div>
    </nav>

    <main
      class="mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl items-center justify-center px-4 py-10"
    >
      <section
        class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg sm:p-8"
      >
        <div class="mb-6 text-center">
          <h1 class="text-3xl font-bold text-indigo-700">Tạo tài khoản</h1>
          <p class="mt-2 text-sm text-slate-500">
            Điền thông tin bên dưới để đăng ký tài khoản mới.
          </p>
        </div>

        <form id="registerForm" novalidate>
          <div class="mb-4">
            <label for="fullName" class="mb-1 block text-sm font-medium"
              >Họ và tên</label
            >
            <input
              id="fullName"
              name="fullName"
              type="text"
              autocomplete="name"
              placeholder="Nguyễn Văn An"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
            <p id="fullNameError" class="mt-1 hidden text-sm text-red-600"></p>
          </div>

          <div class="mb-4">
            <label for="email" class="mb-1 block text-sm font-medium"
              >Email</label
            >
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              placeholder="an@example.com"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
            <p id="emailError" class="mt-1 hidden text-sm text-red-600"></p>
          </div>

          <div class="mb-4">
            <label for="password" class="mb-1 block text-sm font-medium"
              >Mật khẩu</label
            >
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="new-password"
              placeholder="Nhập mật khẩu"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
            <p id="passwordError" class="mt-1 hidden text-sm text-red-600"></p>
          </div>

          <div class="mb-5">
            <label for="confirmPassword" class="mb-1 block text-sm font-medium"
              >Xác nhận mật khẩu</label
            >
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autocomplete="new-password"
              placeholder="Nhập lại mật khẩu"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
            <p
              id="confirmPasswordError"
              class="mt-1 hidden text-sm text-red-600"
            ></p>
          </div>

          <div
            id="message"
            class="mb-4 hidden rounded-lg px-4 py-3 text-sm"
            role="status"
            aria-live="polite"
          ></div>

          <button
            id="submitButton"
            type="submit"
            class="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Đăng ký
          </button>

          <p
            id="loading"
            class="mt-3 hidden text-center text-sm text-slate-500"
          >
            Đang tạo tài khoản, vui lòng chờ...
          </p>

          <p class="mt-5 text-center text-sm text-slate-600">
            Đã có tài khoản?
            <a
              href="index.html"
              class="font-semibold text-indigo-600 hover:underline"
              >Quay lại trang chủ</a
            >
          </p>
        </form>
      </section>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.7.7/dist/axios.min.js"></script>
    <script src="./register.js"></script>
  </body>
</html>
```

## 6. Xử lý đăng ký trong `register.js`

Tạo file `register.js`:

```javascript
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault(); // chan reload
  const fullName = document.getElementById("fullName").value; // data input
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const newUser = {
    name: fullName,
    email,
    password,
  };
  if (!email) {
    alert("Nhap email");
    return;
  }
  axios
    .post("http://localhost:3000/register", newUser)
    .then(() => {
      location.replace("index.html");
      alert("Đăng ký thành công");
    })
    .catch(() => {
      alert("Đăng ký thất bại");
    });
});
```

### Giải thích các phần quan trọng

**1. Ngăn form tải lại trang**

```javascript
registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
});
```

`preventDefault()` ngăn hành vi submit mặc định của trình duyệt. Nhờ vậy, JavaScript có thể kiểm tra dữ liệu và gửi yêu cầu API.

**2. Kiểm tra dữ liệu trước khi gửi**

Hàm `validateForm()` kiểm tra:

- Họ tên không được để trống.
- Email phải đúng định dạng cơ bản.
- Mật khẩu có ít nhất 6 ký tự.
- Mật khẩu xác nhận phải trùng với mật khẩu ban đầu.

Đây là kiểm tra ở phía trình duyệt nhằm cải thiện trải nghiệm người dùng. Trong hệ thống thực tế, máy chủ vẫn phải tự kiểm tra dữ liệu.

**3. Gửi yêu cầu bằng Axios**

```javascript
const response = await axios.post("http://localhost:3000/register", {
  name: fullName,
  email,
  password,
});
```

- `axios.post()` gửi yêu cầu HTTP POST.
- URL `/register` là endpoint đăng ký của JSON Server Auth.
- Dữ liệu được gửi trong phần body dưới dạng JSON.
- `await` đợi API trả kết quả trước khi chạy tiếp.

**4. Bắt lỗi API**

```javascript
try {
  // Gửi yêu cầu đăng ký
} catch (error) {
  // Xử lý lỗi
} finally {
  // Khôi phục giao diện
}
```

- `try`: thực hiện yêu cầu.
- `catch`: xử lý khi yêu cầu thất bại.
- `finally`: luôn chạy, dùng để bật lại nút và ẩn trạng thái chờ.

## 7. Kiểm tra chức năng

### Bước 1: Mở trang

Chạy JSON Server:

```bash
npm run db
```

Mở `register.html` bằng Live Server trong VS Code. Không mở bằng cách nhấp đúp nếu trình duyệt gặp vấn đề với môi trường chạy.

### Bước 2: Thử dữ liệu không hợp lệ

Lần lượt thử:

1. Bỏ trống toàn bộ trường.
2. Nhập email sai định dạng, ví dụ `abc`.
3. Nhập mật khẩu ngắn hơn 6 ký tự.
4. Nhập hai mật khẩu không trùng nhau.

Kết quả mong đợi: các thông báo lỗi xuất hiện và API không được gọi.

### Bước 3: Đăng ký hợp lệ

Ví dụ:

- Họ và tên: Nguyễn Văn An
- Email: `an01@example.com`
- Mật khẩu: `12345678`
- Xác nhận mật khẩu: `12345678`

Kết quả mong đợi: giao diện hiển thị thông báo đăng ký thành công.

### Bước 4: Kiểm tra email trùng

Đăng ký lại bằng cùng một email. Kết quả mong đợi: giao diện hiển thị thông báo không thể đăng ký.

### Bước 5: Kiểm tra dữ liệu

Mở:

```text
http://localhost:3000/users
```

Kiểm tra tài khoản mới đã được lưu hay chưa. Không chia sẻ dữ liệu tài khoản hoặc mật khẩu thật trong bài thực hành.

## 8. Kiến thức cần nhớ

| Thành phần           | Công dụng                                          |
| -------------------- | -------------------------------------------------- |
| `querySelector()`    | Lấy phần tử HTML                                   |
| `addEventListener()` | Lắng nghe sự kiện                                  |
| `preventDefault()`   | Ngăn hành vi mặc định của form                     |
| `trim()`             | Loại bỏ khoảng trắng ở đầu và cuối chuỗi           |
| `async/await`        | Viết mã bất đồng bộ dễ đọc                         |
| `axios.post()`       | Gửi yêu cầu POST                                   |
| `try/catch/finally`  | Xử lý thành công, lỗi và khôi phục giao diện       |
| `textContent`        | Hiển thị nội dung văn bản an toàn                  |
| `disabled`           | Ngăn người dùng gửi form nhiều lần trong lúc xử lý |

## 9. Bài tập thực hành

### Bài 1: Bổ sung điều kiện mật khẩu

Yêu cầu mật khẩu có ít nhất 8 ký tự. Cập nhật phần kiểm tra trong `validateForm()`.

### Bài 2: Thêm trường số điện thoại

- Thêm input số điện thoại trong `register.html`.
- Kiểm tra người dùng đã nhập số điện thoại.
- Gửi số điện thoại cùng dữ liệu đăng ký.
- Hiển thị lỗi nếu số điện thoại không hợp lệ.

### Bài 3: Tự động chuyển trang

Sau khi đăng ký thành công, hiển thị thông báo trong 2 giây rồi chuyển về `index.html`.

Gợi ý:

```javascript
setTimeout(() => {
  window.location.href = "index.html";
}, 2000);
```

### Bài 4: Nâng cấp trải nghiệm người dùng

- Thêm nút hiện/ẩn mật khẩu.
- Xóa thông báo lỗi của một trường khi người dùng sửa trường đó.
- Hiển thị trạng thái đang gửi yêu cầu.
- Không cho phép gửi form nhiều lần liên tiếp.

## 10. Lưu ý khi sử dụng JSON Server Auth

JSON Server Auth phù hợp để học cách gọi API và thử nghiệm luồng xác thực trong môi trường thực hành. Đây không phải giải pháp backend production. Khi triển khai thực tế, cần sử dụng backend có xác thực và phân quyền phù hợp, kiểm tra dữ liệu ở máy chủ, bảo vệ mật khẩu, dùng HTTPS và không để lộ thông tin bí mật.

Cấu trúc dữ liệu bổ sung như `name` hoặc `fullName` có thể phụ thuộc vào phiên bản/cấu hình thư viện. Nếu trường bổ sung không được lưu, hãy kiểm tra response của API và tài liệu của phiên bản đang cài.

---

**Kết thúc Lesson 8:** Sinh viên đã tạo được giao diện đăng ký tài khoản, kiểm tra dữ liệu bằng JavaScript và gửi yêu cầu đăng ký bằng Axios đến JSON Server Auth.
