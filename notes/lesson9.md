# Lesson 9 - JavaScript nâng cao: Login, lưu Token và bảo vệ trang

## 1. Mục tiêu bài học

Sau bài học này, sinh viên có thể:

- Tạo Form đăng nhập bằng HTML và Tailwind CSS.
- Sử dụng JavaScript thuần để đọc và kiểm tra dữ liệu Form.
- Gửi yêu cầu đăng nhập bằng Axios đến JSON Server Auth.
- Sử dụng `async/await` và `try/catch/finally` để xử lý API.
- Lưu `accessToken` và thông tin người dùng vào `localStorage`.
- Điều hướng đến trang chủ sau khi đăng nhập thành công.
- Bảo vệ trang `add.html` bằng JavaScript.
- Đăng xuất và xóa thông tin đăng nhập.
- Phân biệt việc bảo vệ giao diện ở frontend với xác thực thực sự ở
  backend.

## 2. Ôn tập Lesson 8

Ở Lesson 8, chúng ta đã tạo chức năng đăng ký tài khoản với Axios và
JSON Server Auth.

Luồng đăng ký:

```text
register.html
    ↓
Người dùng nhập thông tin
    ↓
JavaScript kiểm tra dữ liệu
    ↓
POST /register
    ↓
JSON Server Auth tạo tài khoản
```

Trong Lesson 9, chúng ta sử dụng tài khoản đã đăng ký để đăng nhập.

Luồng đăng nhập:

```text
login.html
    ↓
Nhập email và mật khẩu
    ↓
JavaScript kiểm tra dữ liệu
    ↓
POST /login
    ↓
Nhận accessToken và thông tin người dùng
    ↓
Lưu vào localStorage
    ↓
Chuyển đến index.html
```

Khi người dùng truy cập `add.html`, JavaScript kiểm tra Token trước khi
hiển thị trang.

> Lưu ý: Cấu trúc response có thể khác nhau tùy phiên bản và cấu hình
> JSON Server Auth. Hãy kiểm tra dữ liệu thực tế trong tab Network của
> DevTools nếu response không giống ví dụ.

## 4. Cấu trúc thư mục

Tiếp tục sử dụng dự án đã tạo ở Lesson 8:

```text
lesson-08-register/
├── db.json
├── package.json
├── index.html
├── add.html
├── register.html
├── register.js
├── login.html
└── login.js
```

Trong bài này:

- `login.html`: giao diện đăng nhập.
- `login.js`: kiểm tra Form, gọi API, lưu Token và xử lý đăng xuất.
- `index.html`: trang chủ công khai.
- `add.html`: trang chỉ cho phép truy cập khi có Token.
- `register.html` và `register.js`: giữ nguyên chức năng đăng ký của
  Lesson 8.

## 5. Khởi động API

Dùng lại cấu hình JSON Server Auth đã tạo ở Lesson 8.

Trong Terminal, chạy:

```bash
npm run db
```

API mặc định chạy tại:

```text
http://localhost:3000
```

Endpoint đăng nhập:

```http
POST http://localhost:3000/login
Content-Type: application/json
```

Dữ liệu gửi lên:

```json
{
  "email": "an01@example.com",
  "password": "12345678"
}
```

Response thành công thường có `accessToken` và thông tin người dùng. Ví
dụ minh họa:

```json
{
  "accessToken": "token-example",
  "user": {
    "email": "an01@example.com",
    "id": 1
  }
}
```

## 6. Tạo giao diện `login.html`

Tạo file `login.html`:

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Đăng nhập - WEB2064 JSNC</title>
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
          <a href="register.html" class="hover:text-indigo-200">Đăng ký</a>
          <a href="login.html" class="font-semibold underline">Đăng nhập</a>
        </div>
      </div>
    </nav>

    <main
      class="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl items-center justify-center px-4 py-10"
    >
      <section
        class="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8"
      >
        <div class="mb-6 text-center">
          <h1 class="text-3xl font-bold text-indigo-700">Đăng nhập</h1>
          <p class="mt-2 text-sm text-slate-500">
            Nhập email và mật khẩu để tiếp tục.
          </p>
        </div>

        <form id="loginForm" novalidate>
          <div class="mb-4">
            <label for="email" class="mb-1 block text-sm font-medium">
              Email
            </label>

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
            <label for="password" class="mb-1 block text-sm font-medium">
              Mật khẩu
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              placeholder="Nhập mật khẩu"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <p id="passwordError" class="mt-1 hidden text-sm text-red-600"></p>
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
            Đăng nhập
          </button>

          <p
            id="loading"
            class="mt-3 hidden text-center text-sm text-slate-500"
          >
            Đang đăng nhập, vui lòng chờ...
          </p>

          <p class="mt-5 text-center text-sm text-slate-600">
            Chưa có tài khoản?
            <a
              href="register.html"
              class="font-semibold text-indigo-600 hover:underline"
            >
              Đăng ký ngay
            </a>
          </p>
        </form>
      </section>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.7.7/dist/axios.min.js"></script>
    <script src="./login.js"></script>
  </body>
</html>
```

### Giải thích

- `id="loginForm"` giúp JavaScript lấy Form.
- `novalidate` tắt thông báo validation mặc định của trình duyệt để
  chúng ta tự hiển thị lỗi.
- Axios được nạp trước `login.js`, vì vậy JavaScript có thể sử dụng
  biến `axios`.

## 7. Xử lý đăng nhập trong `login.js`

Tạo file `login.js` và viết toàn bộ logic đăng nhập như sau:

```javascript
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault(); // chan reload
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const userLogin = {
    email,
    password,
  };
  if (!email) {
    alert("Nhap email");
    return;
  }
  axios
    .post("http://localhost:3000/login", userLogin)
    .then((res) => {
      // Lưu Token và thông tin người dùng.
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("user", JSON.stringify(res.user));
      location.replace("index.html");
      alert("Đăng nhập thành công");
    })
    .catch(() => {
      alert("Đăng nhập thất bại");
    });
});
```

### Giải thích các phần quan trọng

**1. Ngăn Form tải lại trang**

```javascript
document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
  });
```

`preventDefault()` ngăn hành vi submit mặc định. JavaScript có thể kiểm
tra dữ liệu và gọi API mà không tải lại trang.

**3. Gửi yêu cầu đăng nhập**

```javascript
const response = await axios.post(`${API_URL}/login`, {
  email,
  password,
});
```

- `axios.post()` gửi HTTP POST.
- `await` đợi API trả kết quả.
- `response.data` chứa dữ liệu trả về từ API.

**4. Lưu Token**

```javascript
localStorage.setItem("accessToken", accessToken);
localStorage.setItem("user", JSON.stringify(user));
```

- `localStorage` lưu dữ liệu trong trình duyệt và vẫn tồn tại sau khi
  đóng/mở lại trình duyệt, cho đến khi bị xóa.
- `JSON.stringify()` chuyển object thành chuỗi để lưu.
- Khi đọc lại object, dùng `JSON.parse()`.

**5. Điều hướng**

```javascript
location.replace("index.html");
```

Sau khi đăng nhập thành công, trình duyệt chuyển đến trang chủ.
`replace()` thay thế mục hiện tại trong lịch sử duyệt web.

## 8. Bảo vệ trang `add.html`

Mục tiêu là khi người dùng chưa đăng nhập mà mở trực tiếp `add.html`,
trang sẽ chuyển về `login.html`.

Tạo file `add.html` hoặc cập nhật file hiện có. Đặt đoạn kiểm tra sau
ngay đầu phần `<head>`, trước khi trình duyệt hiển thị nội dung trang:

```html
<script>
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    window.location.replace("login.html");
  }
</script>
```

Ví dụ cấu trúc tối thiểu của `add.html`:

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Thêm dữ liệu</title>

    <script>
      if (!localStorage.getItem("accessToken")) {
        window.location.replace("login.html");
      }
    </script>

    <script src="https://cdn.tailwindcss.com"></script>
  </head>

  <body class="min-h-screen bg-slate-100 text-slate-800">
    <nav class="bg-indigo-700 p-4 text-white">
      <a href="index.html" class="font-bold">WEB2064 JSNC</a>
    </nav>

    <main class="mx-auto max-w-4xl p-6">
      <h1 class="text-2xl font-bold">Trang thêm dữ liệu</h1>
      <p class="mt-2">Chỉ người đã đăng nhập mới được truy cập trang này.</p>
    </main>
  </body>
</html>
```

Nếu `add.html` đã có Form thêm dữ liệu, giữ nguyên nội dung hiện tại và
chỉ bổ sung đoạn kiểm tra Token ở phần `<head>`.

### Giải thích

```javascript
if (!localStorage.getItem("accessToken")) {
  window.location.replace("login.html");
}
```

- `localStorage.getItem()` đọc Token.
- Nếu không có Token, trình duyệt chuyển về trang đăng nhập.
- Nếu có Token, đoạn kiểm tra này không chuyển trang.

**Lưu ý bảo mật:** Đây chỉ là kiểm tra giao diện ở frontend. Người dùng
có thể tự sửa `localStorage`, vì vậy cách này không đủ để bảo vệ dữ liệu
thật. Backend phải xác minh Token và quyền truy cập trên từng API cần
bảo vệ. Token có thể hết hạn hoặc không hợp lệ dù vẫn tồn tại trong
`localStorage`.

## 11. Kiểm tra chức năng

### Trường hợp 1 -- Đăng nhập thành công

1.  Chạy `npm run db`.
2.  Mở `login.html` bằng Live Server.
3.  Nhập email và mật khẩu đã đăng ký ở Lesson 8.
4.  Nhấn **Đăng nhập**.
5.  Kiểm tra trình duyệt chuyển đến `index.html`.
6.  Mở DevTools → Application → Local Storage.
7.  Kiểm tra có khóa `accessToken` và `user`.

Kết quả mong đợi: đăng nhập thành công và Token được lưu.

### Trường hợp 2 -- Đăng nhập sai

1.  Mở `login.html`.
2.  Nhập email đúng nhưng mật khẩu sai.
3.  Nhấn **Đăng nhập**.

Kết quả mong đợi: hiển thị thông báo lỗi, không chuyển trang và không
ghi đè thông tin đăng nhập bằng response thất bại.

Nếu trước đó đã đăng nhập thành công, hãy đăng xuất hoặc xóa dữ liệu
phiên trước khi thử để tránh nhầm lẫn với Token cũ.

### Trường hợp 3 -- Bỏ trống dữ liệu

1.  Xóa email và mật khẩu.
2.  Nhấn **Đăng nhập**.

Kết quả mong đợi: hiển thị lỗi tại từng trường và không gửi request đăng
nhập.

### Trường hợp 4 -- Truy cập `add.html` khi chưa đăng nhập

1.  Mở DevTools → Application → Local Storage.
2.  Xóa `accessToken` và `user`.
3.  Truy cập trực tiếp `add.html`.

Kết quả mong đợi: trình duyệt chuyển về `login.html`.

### Trường hợp 5 -- Truy cập `add.html` khi đã đăng nhập

1.  Đăng nhập thành công.
2.  Truy cập `add.html`.

Kết quả mong đợi: đoạn kiểm tra frontend không chuyển người dùng về
trang đăng nhập.

### Trường hợp 6 -- Đăng xuất

1.  Đăng nhập thành công.
2.  Nhấn **Đăng xuất**.
3.  Kiểm tra Local Storage.
4.  Truy cập lại `add.html`.

Kết quả mong đợi: Token và thông tin người dùng đã bị xóa; `add.html`
chuyển về trang đăng nhập.

### Trường hợp 7 -- API không hoạt động

1.  Dừng JSON Server.
2.  Thử đăng nhập.

Kết quả mong đợi: giao diện thông báo không thể kết nối API và nút đăng
nhập được bật lại.

## 12. Các lỗi thường gặp

---

Lỗi Nguyên nhân cần kiểm tra

---

`Network Error` JSON Server chưa chạy hoặc sai URL

Không chuyển đến trang chủ Kiểm tra response API và lệnh
`location.replace()`

`add.html` luôn chuyển về Login Không có Token hoặc lưu sai tên
khóa

---

## 13. Bài tập thực hành

### Bài 1 -- Nâng cấp Form đăng nhập

- Thêm nút hiện/ẩn mật khẩu.
- Xóa thông báo lỗi khi người dùng sửa dữ liệu.
- Hiển thị trạng thái đang gửi yêu cầu.
- Không cho gửi Form nhiều lần liên tiếp.

### Bài 2 -- Hiển thị thông tin người dùng

- Đọc thông tin `user` từ `localStorage`.
- Hiển thị email người dùng trên trang chủ.
- Nếu chưa đăng nhập, hiển thị liên kết đến `login.html`.

### Bài 3 -- Bảo vệ trang

- Bảo vệ `add.html`.
- Thử mở trang trực tiếp khi chưa đăng nhập.
- Đăng nhập và thử mở lại trang.
- Đăng xuất rồi kiểm tra lại.

### Bài 4 -- Hoàn thiện đăng xuất

- Thêm nút đăng xuất vào trang chủ.
- Xóa `accessToken` và `user`.
- Cập nhật giao diện sau khi đăng xuất.
- Kiểm tra người dùng không thể tiếp tục vào `add.html` theo cơ chế
  kiểm tra frontend.

### Bài 5 -- Phân biệt Token tồn tại và Token hợp lệ

Viết phần giải thích ngắn:

1.  Vì sao có `accessToken` trong `localStorage` chưa chứng minh người
    dùng đã đăng nhập hợp lệ?
2.  Vì sao backend cần xác minh Token?
3.  Điều gì xảy ra khi Token hết hạn nhưng vẫn còn trong `localStorage`?

## 14. Kiến thức cần nhớ

Thành phần Công dụng

---

`addEventListener()` Lắng nghe sự kiện
`preventDefault()` Ngăn hành vi mặc định của Form
`trim()` Loại bỏ khoảng trắng ở đầu và cuối chuỗi
`async/await` Xử lý mã bất đồng bộ dễ đọc
`axios.post()` Gửi yêu cầu POST đến API
`try/catch/finally` Xử lý thành công, lỗi và khôi phục giao diện
`localStorage.setItem()` Lưu dữ liệu
`localStorage.getItem()` Đọc dữ liệu
`localStorage.removeItem()` Xóa dữ liệu
`JSON.stringify()` Chuyển object thành chuỗi JSON
`JSON.parse()` Chuyển chuỗi JSON thành object
`window.location.replace()` Điều hướng sang trang khác
`classList.add()` / `classList.remove()` Thêm hoặc xóa class CSS

### Phân biệt các khái niệm

- **Authentication -- Xác thực:** kiểm tra người dùng là ai.
- **Authorization -- Phân quyền:** kiểm tra người dùng được phép làm
  gì.
- **Frontend route guard:** kiểm tra điều kiện trước khi hiển thị
  trang ở trình duyệt.
- **Backend authorization:** xác minh Token và quyền hạn ở máy chủ
  trước khi trả dữ liệu hoặc thực hiện thao tác.

`localStorage` phù hợp cho bài thực hành để hiểu cách lưu dữ liệu phía
trình duyệt. Trong ứng dụng thực tế, cần cân nhắc rủi ro XSS khi lưu
Token ở đây, sử dụng HTTPS và thiết kế xác thực phía máy chủ phù hợp.

## 15. Tổng kết

Trong Lesson 8, sinh viên đã tạo chức năng đăng ký tài khoản. Trong
Lesson 9, sinh viên tiếp tục xây dựng luồng đăng nhập và bảo vệ giao
diện bằng JavaScript thuần.

```text
Lesson 8: Register
    ↓
Tạo tài khoản
    ↓
Lesson 9: Login
    ↓
POST /login
    ↓
Nhận accessToken và user
    ↓
Lưu localStorage
    ↓
Chuyển đến index.html
    ↓
Truy cập add.html
    ↓
Kiểm tra accessToken
    ├── Có Token → Cho hiển thị giao diện
    └── Không có Token → Chuyển đến login.html
```

**Kết thúc Lesson 9:** Sinh viên đã biết đăng nhập bằng Axios, lưu
Token, điều hướng trang, bảo vệ trang ở frontend và đăng xuất bằng
JavaScript thuần.

JSON Server Auth chỉ phù hợp cho mục đích học tập và thử nghiệm. Kiểm
tra Token ở frontend không thay thế việc xác thực và phân quyền ở
backend.
