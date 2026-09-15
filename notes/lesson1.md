# Lesson 1 - JavaScript cơ bản & Chuẩn bị môi trường

## 1. Mục tiêu

Sau bài học, sinh viên có thể:

- Cài đặt và kiểm tra môi trường JavaScript.
- Hiểu cách khai báo biến trong JavaScript.
- Biết sử dụng `let` và `const`.
- Biết các kiểu dữ liệu cơ bản.
- Biết khai báo và gọi hàm.
- Biết truyền tham số vào hàm.
- Biết sử dụng `return` để trả về kết quả từ hàm.
- Viết được các chương trình JavaScript đơn giản.

---

# 2. Chuẩn bị môi trường

## Bước 1. Cài đặt phần mềm

Cài đặt các phần mềm sau:

- **Node.js (LTS)**
- **Visual Studio Code**
- **Git**

Kiểm tra sau khi cài đặt:

```bash
node -v
```

```bash
npm -v
```

```bash
git --version
```

Nếu các lệnh trên hiển thị phiên bản thì môi trường đã được cài đặt thành công.

---

# 3. Tải source code

Clone project:

```bash
git clone https://github.com/vanhoa690/jsnc_fa26
```

Di chuyển vào project:

```bash
cd jsnc_fa26
```

Mở project bằng VS Code:

```bash
code .
```

---

# 4. Cài đặt thư viện

Mở Terminal trong VS Code:

```text
Ctrl + `
```

Chạy:

```bash
npm install
```

Sau khi cài đặt thành công, project sẽ xuất hiện thư mục:

```text
node_modules/
```

`node_modules` chứa các thư viện mà project sử dụng.

---

# 5. Chạy JSON Server

Project đã được cấu hình trong `package.json`.

Chạy:

```bash
npm run db
```

Kiểm tra API:

```text
http://localhost:3000/students
```

Mở URL trên trình duyệt để kiểm tra dữ liệu.

---

# 6. Cài đặt Live Server

Trong VS Code:

1. Mở **Extensions**.
2. Tìm:

```text
Live Server
```

3. Cài extension của **Ritwick Dey**.

---

# 7. Chạy website

Mở file:

```text
index.html
```

Chuột phải → **Open with Live Server**

Website sẽ chạy tại:

```text
http://127.0.0.1:5500
```

---

# 8. Cấu trúc project

```text
jsnc_fa26
│
├── index.html
├── add.html
├── db.json
├── package.json
├── .gitignore
└── node_modules/
```

---

# 9. Làm quen với JavaScript

JavaScript được sử dụng để xây dựng **logic và tương tác cho website**.

Có thể viết JavaScript trực tiếp trong HTML:

```html
<script>
  console.log("Hello JavaScript!");
</script>
```

Mở **F12 → Console** để xem kết quả:

```text
Hello JavaScript!
```

Hoặc có thể viết JavaScript trong file `.js` riêng.

Ví dụ tạo file:

```text
js/
└── main.js
```

Trong HTML:

```html
<script src="./js/main.js"></script>
```

Trong `main.js`:

```javascript
console.log("Hello JavaScript!");
```

---

# 10. Khai báo biến

Biến được sử dụng để **lưu trữ dữ liệu** trong chương trình.

JavaScript thường sử dụng:

```text
let
const
```

## 10.1. Khai báo với `let`

`let` được sử dụng khi giá trị của biến **có thể thay đổi**.

```javascript
let name = "Hòa";

console.log(name);

name = "Nam";

console.log(name);
```

Kết quả:

```text
Hòa
Nam
```

Ví dụ:

```javascript
let age = 20;

age = 21;

console.log(age);
```

Kết quả:

```text
21
```

---

## 10.2. Khai báo với `const`

`const` được sử dụng khi biến **không được gán lại giá trị**.

```javascript
const school = "FPT Polytechnic";

console.log(school);
```

Không thể gán lại:

```javascript
const age = 20;

age = 21;
```

Trong JavaScript hiện đại, nên ưu tiên sử dụng `const`.

Nếu cần thay đổi giá trị của biến thì sử dụng `let`.

Ví dụ:

```javascript
const name = "Hòa";

let age = 20;

age = 21;
```

---

# 11. Kiểu dữ liệu cơ bản

Ở bài học này, chỉ cần làm quen với một số kiểu dữ liệu cơ bản.

## String

Chuỗi ký tự:

```javascript
const name = "Nguyễn Văn An";
```

## Number

Số:

```javascript
const age = 20;
const price = 100000;
```

## Boolean

Giá trị đúng hoặc sai:

```javascript
const isStudent = true;
const isAdmin = false;
```

Có thể kiểm tra kiểu dữ liệu bằng:

```javascript
console.log(typeof name);
console.log(typeof age);
console.log(typeof isStudent);
```

Kết quả:

```text
string
number
boolean
```

---

# 12. Toán tử số học cơ bản

JavaScript hỗ trợ các phép tính cơ bản:

```javascript
const a = 10;
const b = 3;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);
```

Các toán tử:

```text
+   Cộng
-   Trừ
*   Nhân
/   Chia
%   Chia lấy dư
```

Ví dụ:

```javascript
const price = 50000;
const quantity = 3;

const total = price * quantity;

console.log(total);
```

Kết quả:

```text
150000
```

---

# 13. Hàm trong JavaScript

Hàm là một **khối lệnh được đặt tên để thực hiện một công việc cụ thể**.

Cú pháp:

```javascript
function tenHam() {
  // code
}
```

Ví dụ:

```javascript
function sayHello() {
  console.log("Hello JavaScript!");
}
```

Khai báo hàm chưa làm hàm chạy.

Muốn thực thi hàm cần **gọi hàm**:

```javascript
sayHello();
```

Kết quả:

```text
Hello JavaScript!
```

---

# 14. Hàm có tham số

Có thể truyền dữ liệu vào hàm thông qua **tham số**.

Ví dụ:

```javascript
function sayHello(name) {
  console.log("Xin chào " + name);
}
```

Gọi hàm:

```javascript
sayHello("An");
sayHello("Bình");
```

Kết quả:

```text
Xin chào An
Xin chào Bình
```

Trong ví dụ trên:

```text
name
```

là tham số của hàm.

Khi gọi:

```javascript
sayHello("An");
```

`"An"` là giá trị được truyền vào tham số `name`.

---

# 15. Hàm có nhiều tham số

Một hàm có thể nhận nhiều tham số.

Ví dụ:

```javascript
function sum(a, b) {
  console.log(a + b);
}
```

Gọi hàm:

```javascript
sum(10, 20);
```

Kết quả:

```text
30
```

Ví dụ tính tiền:

```javascript
function calculateTotal(price, quantity) {
  console.log(price * quantity);
}

calculateTotal(50000, 3);
```

Kết quả:

```text
150000
```

---

# 16. Hàm trả về kết quả với `return`

Hàm có thể trả về một kết quả bằng `return`.

Ví dụ:

```javascript
function sum(a, b) {
  return a + b;
}
```

Có thể lưu kết quả vào biến:

```javascript
const result = sum(10, 20);

console.log(result);
```

Kết quả:

```text
30
```

Có thể hình dung:

```text
sum(10, 20)
     ↓
  xử lý a + b
     ↓
    return
     ↓
     30
```

Ví dụ tính tiền:

```javascript
function calculateTotal(price, quantity) {
  return price * quantity;
}

const total = calculateTotal(50000, 3);

console.log(total);
```

Kết quả:

```text
150000
```

---

# 17. Phân biệt `console.log()` và `return`

Đây là điểm cần nhớ.

## `console.log()`

Dùng để **in dữ liệu ra Console**.

```javascript
function sum(a, b) {
  console.log(a + b);
}

sum(10, 20);
```

Kết quả được in ra:

```text
30
```

## `return`

Dùng để **trả kết quả ra khỏi hàm**.

```javascript
function sum(a, b) {
  return a + b;
}

const result = sum(10, 20);

console.log(result);
```

Có thể tiếp tục sử dụng kết quả:

```javascript
const result = sum(10, 20);

const newResult = result * 2;

console.log(newResult);
```

Kết quả:

```text
60
```

---

# 18. Bài tập thực hành

## Bài 1 – Khai báo biến

Khai báo các biến:

```text
name
age
address
isStudent
```

Yêu cầu:

- `name`: tên sinh viên.
- `age`: tuổi.
- `address`: địa chỉ.
- `isStudent`: trạng thái sinh viên.

In các biến ra Console.

Ví dụ:

```text
Họ tên: Nguyễn Văn An
Tuổi: 20
Địa chỉ: Hà Nội
Sinh viên: true
```

---

## Bài 2 – Thay đổi giá trị biến

Khai báo:

```javascript
let age = 20;
```

Thực hiện:

1. In `age`.
2. Thay đổi `age` thành `21`.
3. In `age` lần nữa.

Kết quả:

```text
20
21
```

---

## Bài 3 – Tính toán với biến

Khai báo:

```javascript
const a = 10;
const b = 5;
```

In ra:

```text
Tổng: 15
Hiệu: 5
Tích: 50
Thương: 2
```

---

## Bài 4 – Hàm chào hỏi

Tạo hàm:

```javascript
sayHello(name);
```

Yêu cầu hàm in ra:

```text
Xin chào An
```

Khi gọi:

```javascript
sayHello("An");
```

Thử gọi hàm với ít nhất 3 tên khác nhau.

---

## Bài 5 – Hàm tính tổng

Tạo hàm:

```javascript
sum(a, b);
```

Yêu cầu:

- Nhận vào 2 số.
- Trả về tổng của 2 số.

Ví dụ:

```javascript
const result = sum(10, 20);

console.log(result);
```

Kết quả:

```text
30
```

---

## Bài 6 – Hàm tính tiền

Tạo hàm:

```javascript
calculateTotal(price, quantity);
```

Yêu cầu:

```text
Tiền = giá × số lượng
```

Ví dụ:

```javascript
const total = calculateTotal(50000, 3);

console.log(total);
```

Kết quả:

```text
150000
```

---

## Bài 7 – Hàm tính điểm trung bình

Cho:

```javascript
const math = 8;
const english = 7;
const javascript = 9;
```

Tạo hàm:

```javascript
calculateAverage(math, english, javascript);
```

Yêu cầu:

- Nhận vào 3 điểm.
- Tính điểm trung bình.
- `return` kết quả.

Ví dụ:

```javascript
const average = calculateAverage(8, 7, 9);

console.log(average);
```

Kết quả:

```text
8
```

---

# 19. Bài tập tổng hợp

Viết chương trình quản lý thông tin cơ bản của một sinh viên.

### Bước 1

Khai báo:

```text
name
age
className
```

### Bước 2

Tạo hàm:

```javascript
showStudent(name, age, className);
```

Hàm nhận thông tin sinh viên và in ra Console.

Ví dụ:

```javascript
showStudent("Nguyễn Văn An", 20, "WD01");
```

Kết quả:

```text
Họ tên: Nguyễn Văn An
Tuổi: 20
Lớp: WD01
```

### Bước 3

Tạo hàm:

```javascript
calculateAverage(math, javascript);
```

Hàm trả về điểm trung bình của 2 môn.

Ví dụ:

```javascript
const average = calculateAverage(8, 9);

console.log("Điểm trung bình:", average);
```

Kết quả:

```text
Điểm trung bình: 8.5
```

---

# 20. Kết quả sau Lesson 1

Sinh viên cần hoàn thành được:

- [ ] Cài đặt Node.js, VS Code, Git.
- [ ] Clone project từ GitHub.
- [ ] Chạy `npm install`.
- [ ] Chạy `npm run db`.
- [ ] Kiểm tra API `/students`.
- [ ] Chạy website bằng Live Server.
- [ ] Biết khai báo biến với `let`.
- [ ] Biết khai báo biến với `const`.
- [ ] Hiểu String, Number, Boolean.
- [ ] Biết các toán tử số học cơ bản.
- [ ] Biết khai báo hàm bằng `function`.
- [ ] Biết gọi hàm.
- [ ] Biết truyền tham số vào hàm.
- [ ] Biết sử dụng `return`.
- [ ] Phân biệt được `console.log()` và `return`.
- [ ] Hoàn thành các bài tập thực hành.

> **Chưa học trong Lesson 1:** Array, Object, Arrow Function, DOM, Event, API/Fetch. Các nội dung này sẽ được triển khai ở các bài tiếp theo.
