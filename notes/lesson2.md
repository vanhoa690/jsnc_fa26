# Lesson 2 - JavaScript Cơ Bản: Array, Object và Xử lý dữ liệu

## 1. Mục tiêu

Sau bài học, sinh viên có thể:

- Thêm, sửa, xóa dữ liệu trong Array.
- Hiểu Object trong JavaScript.
- Hiểu Array Object.
- Sử dụng vòng lặp `for` để duyệt Array.
- Viết chương trình quản lý danh sách sinh viên đơn giản.

---

# 2. Ôn tập Lesson 1

Ở Lesson 1, chúng ta đã học:

- `let`, `const`
- String, Number, Boolean
- Toán tử số học
- Function
- Tham số
- `return`

Ví dụ:

```javascript
function calculateTotal(price, quantity) {
  return price * quantity;
}

const total = calculateTotal(50000, 3);

console.log(total);
```

Ở Lesson 2, chúng ta sẽ bắt đầu làm việc với **nhiều dữ liệu**.

```text
Một sinh viên
      ↓
   Object

Nhiều sinh viên
      ↓
 Array Object
```

---

# 3. Array là gì?

Array là kiểu dữ liệu dùng để **lưu nhiều giá trị trong một biến**.

Ví dụ:

```javascript
const students = ["Nguyễn Văn An", "Trần Văn Bình", "Lê Văn Nam"];
```

Thay vì:

```javascript
const student1 = "Nguyễn Văn An";
const student2 = "Trần Văn Bình";
const student3 = "Lê Văn Nam";
```

Chúng ta có thể sử dụng:

```javascript
const students = ["Nguyễn Văn An", "Trần Văn Bình", "Lê Văn Nam"];
```

---

# 4. Index trong Array

Các phần tử trong Array được đánh số từ `0`.

Ví dụ:

```javascript
const students = ["Nguyễn Văn An", "Trần Văn Bình", "Lê Văn Nam"];
```

Có thể hình dung:

```text
Index:     0                 1                 2

           ↓                 ↓                 ↓

       Nguyễn Văn An   Trần Văn Bình      Lê Văn Nam
```

Truy cập phần tử:

```javascript
console.log(students[0]);
console.log(students[1]);
console.log(students[2]);
```

Kết quả:

```text
Nguyễn Văn An
Trần Văn Bình
Lê Văn Nam
```

---

# 5. Kiểm tra số lượng phần tử

Sử dụng thuộc tính `length`.

```javascript
const students = ["An", "Bình", "Nam"];

console.log(students.length);
```

Kết quả:

```text
3
```

Ví dụ:

```javascript
const names = ["An", "Bình", "Nam", "Hòa"];

console.log("Số sinh viên:", names.length);
```

---

# 6. Thay đổi phần tử trong Array

Có thể thay đổi giá trị của một phần tử.

```javascript
const students = ["An", "Bình", "Nam"];

students[1] = "Hòa";

console.log(students);
```

Kết quả:

```text
["An", "Hòa", "Nam"]
```

---

# 7. Thêm phần tử với push()

`push()` dùng để thêm phần tử vào **cuối Array**.

```javascript
const students = ["An", "Bình"];

students.push("Nam");

console.log(students);
```

Kết quả:

```text
["An", "Bình", "Nam"]
```

Có thể thêm nhiều phần tử:

```javascript
students.push("Hòa", "Lan");
```

---

# 8. Xóa phần tử cuối với pop()

`pop()` dùng để xóa phần tử cuối cùng.

```javascript
const students = ["An", "Bình", "Nam"];

students.pop();

console.log(students);
```

Kết quả:

```text
["An", "Bình"]
```

---

# 9. Thêm phần tử đầu Array với unshift()

```javascript
const students = ["Bình", "Nam"];

students.unshift("An");

console.log(students);
```

Kết quả:

```text
["An", "Bình", "Nam"]
```

---

# 10. Xóa phần tử đầu Array với shift()

```javascript
const students = ["An", "Bình", "Nam"];

students.shift();

console.log(students);
```

Kết quả:

```text
["Bình", "Nam"]
```

---

# 11. Duyệt Array bằng for

Khi có nhiều dữ liệu, chúng ta thường cần duyệt qua từng phần tử.

Ví dụ:

```javascript
const students = ["An", "Bình", "Nam"];

for (let i = 0; i < students.length; i++) {
  console.log(students[i]);
}
```

Kết quả:

```text
An
Bình
Nam
```

## Giải thích

```javascript
for (let i = 0; i < students.length; i++)
```

Có thể hiểu:

```text
i = 0
 ↓
students[0]

i = 1
 ↓
students[1]

i = 2
 ↓
students[2]
```

---

# 12. Object là gì?

Object dùng để **mô tả một đối tượng thông qua các thuộc tính**.

Ví dụ một sinh viên:

```javascript
const student = {
  name: "Nguyễn Văn An",
  age: 20,
  email: "an@gmail.com",
  major: "CNTT",
};
```

Object gồm các thuộc tính:

```text
name
age
email
major
```

Mỗi thuộc tính có một giá trị.

---

# 13. Truy cập thuộc tính Object

Sử dụng dấu `.`

```javascript
console.log(student.name);
console.log(student.age);
console.log(student.email);
```

Kết quả:

```text
Nguyễn Văn An
20
an@gmail.com
```

---

# 14. Thay đổi dữ liệu Object

Có thể thay đổi giá trị của thuộc tính.

```javascript
const student = {
  name: "Nguyễn Văn An",
  age: 20,
};

student.age = 21;

console.log(student.age);
```

Kết quả:

```text
21
```

---

# 15. Thêm thuộc tính vào Object

Có thể thêm thuộc tính mới.

```javascript
const student = {
  name: "Nguyễn Văn An",
  age: 20,
};

student.email = "an@gmail.com";

console.log(student);
```

Object lúc này có:

```text
name
age
email
```

---

# 16. Xóa thuộc tính

Sử dụng `delete`.

```javascript
const student = {
  name: "Nguyễn Văn An",
  age: 20,
  email: "an@gmail.com",
};

delete student.email;

console.log(student);
```

Sau khi xóa, Object chỉ còn:

```text
name
age
```

---

# 17. Object chứa nhiều kiểu dữ liệu

Một Object có thể chứa nhiều kiểu dữ liệu.

```javascript
const student = {
  name: "Nguyễn Văn An",
  age: 20,
  isStudent: true,
  score: 8.5,
};
```

Trong đó:

```text
name       → String
age        → Number
isStudent  → Boolean
score      → Number
```

---

# 18. Array Object

Trong các ứng dụng thực tế, chúng ta thường có **danh sách các Object**.

Ví dụ:

```javascript
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
    name: "Lê Văn Nam",
    age: 20,
  },
];
```

Đây được gọi là:

```text
Array Object
```

Có thể hình dung:

```text
students
   │
   ├── Object 1
   │     ├── id
   │     ├── name
   │     └── age
   │
   ├── Object 2
   │     ├── id
   │     ├── name
   │     └── age
   │
   └── Object 3
         ├── id
         ├── name
         └── age
```

---

# 19. Truy cập Array Object

Muốn lấy sinh viên đầu tiên:

```javascript
console.log(students[0]);
```

Muốn lấy tên sinh viên đầu tiên:

```javascript
console.log(students[0].name);
```

Muốn lấy tuổi:

```javascript
console.log(students[0].age);
```

Ví dụ:

```javascript
console.log(students[1].name);
```

Kết quả:

```text
Trần Văn Bình
```

---

# 20. Duyệt danh sách Array Object

Sử dụng vòng lặp `for`.

```javascript
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
    name: "Lê Văn Nam",
    age: 20,
  },
];

for (let i = 0; i < students.length; i++) {
  console.log(students[i].name);
}
```

Kết quả:

```text
Nguyễn Văn An
Trần Văn Bình
Lê Văn Nam
```

---

# 21. Hiển thị Array Object lên HTML

HTML:

```html
<div id="students"></div>
```

JavaScript:

```javascript
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
];

let html = "";

for (let i = 0; i < students.length; i++) {
  html += `
    <div>
      <h3>${students[i].name}</h3>
      <p>Tuổi: ${students[i].age}</p>
    </div>
  `;
}

document.getElementById("students").innerHTML = html;
```

---

# 22. Tạo Function hiển thị danh sách

Có thể kết hợp kiến thức Function của Lesson 1.

```javascript
function showStudents(students) {
  let html = "";

  for (let i = 0; i < students.length; i++) {
    html += `
      <div>
        <h3>${students[i].name}</h3>
        <p>Tuổi: ${students[i].age}</p>
      </div>
    `;
  }

  document.getElementById("students").innerHTML = html;
}
```

Gọi hàm:

```javascript
showStudents(students);
```

---

# 23. Ví dụ quản lý danh sách sản phẩm

Tạo danh sách sản phẩm:

```javascript
const products = [
  {
    id: 1,
    name: "iPhone 15",
    price: 20000000,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: 18000000,
  },
  {
    id: 3,
    name: "Xiaomi 14",
    price: 12000000,
  },
];
```

Duyệt danh sách:

```javascript
for (let i = 0; i < products.length; i++) {
  console.log(products[i].name);
  console.log(products[i].price);
}
```

---

# 24. Tính tổng giá trị sản phẩm

Sử dụng biến để lưu tổng:

```javascript
const products = [
  {
    name: "iPhone 15",
    price: 20000000,
  },
  {
    name: "Samsung Galaxy S24",
    price: 18000000,
  },
  {
    name: "Xiaomi 14",
    price: 12000000,
  },
];

let total = 0;

for (let i = 0; i < products.length; i++) {
  total = total + products[i].price;
}

console.log(total);
```

Kết quả:

```text
50000000
```

---

# 25. Một số phương thức Array cơ bản

Ở bài này chỉ cần làm quen với các phương thức:

```text
push()
pop()
shift()
unshift()
```

| Phương thức | Chức năng            |
| ----------- | -------------------- |
| `push()`    | Thêm cuối Array      |
| `pop()`     | Xóa cuối Array       |
| `unshift()` | Thêm đầu Array       |
| `shift()`   | Xóa đầu Array        |
| `length`    | Lấy số lượng phần tử |

---

# 26. Bài tập thực hành

## Bài 1 – Array cơ bản

Tạo Array:

```javascript
const names = ["An", "Bình", "Nam", "Hòa", "Lan"];
```

Yêu cầu:

- In Array ra Console.
- In phần tử đầu tiên.
- In phần tử cuối cùng.
- In số lượng phần tử.
- Thêm một tên mới.
- Xóa phần tử cuối.

---

## Bài 2 – Duyệt Array

Cho:

```javascript
const names = ["An", "Bình", "Nam", "Hòa", "Lan"];
```

Sử dụng `for` để in từng tên ra Console.

Kết quả:

```text
An
Bình
Nam
Hòa
Lan
```

---

## Bài 3 – Object Student

Tạo Object:

```javascript
const student = {
  id: 1,
  name: "Nguyễn Văn An",
  age: 20,
  email: "an@gmail.com",
  major: "CNTT",
};
```

Yêu cầu:

- In Object.
- In tên sinh viên.
- In tuổi.
- In email.
- Thay đổi tuổi.
- Thêm thuộc tính `phone`.

---

## Bài 4 – Array Object

Tạo danh sách:

```javascript
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
    name: "Lê Văn Nam",
    age: 20,
  },
];
```

Yêu cầu:

- In danh sách ra Console.
- In tên sinh viên đầu tiên.
- In tuổi sinh viên thứ hai.
- Duyệt danh sách bằng `for`.
- In tên của tất cả sinh viên.

---

## Bài 5 – Hiển thị danh sách lên HTML

HTML:

```html
<div id="students"></div>
```

Cho danh sách:

```javascript
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
    name: "Lê Văn Nam",
    age: 20,
  },
];
```

Yêu cầu hiển thị:

```text
Nguyễn Văn An
Tuổi: 20

Trần Văn Bình
Tuổi: 21

Lê Văn Nam
Tuổi: 20
```

---

# 27. Bài tập tổng hợp

Viết chương trình quản lý danh sách sản phẩm.

## Dữ liệu

```javascript
const products = [
  {
    id: 1,
    name: "iPhone 15",
    price: 20000000,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: 18000000,
  },
  {
    id: 3,
    name: "Xiaomi 14",
    price: 12000000,
  },
];
```

## Yêu cầu

### Bước 1

In danh sách sản phẩm ra Console.

### Bước 2

Duyệt Array bằng `for`.

### Bước 3

In:

```text
Tên sản phẩm - Giá
```

Ví dụ:

```text
iPhone 15 - 20000000
Samsung Galaxy S24 - 18000000
Xiaomi 14 - 12000000
```

### Bước 4

Tính tổng giá của tất cả sản phẩm.

### Bước 5

Hiển thị danh sách sản phẩm lên HTML.

HTML:

```html
<div id="products"></div>
```

---

# 28. Kết quả sau Lesson 2

Sinh viên cần hoàn thành được:

- [ ] Hiểu Array.
- [ ] Khai báo Array.
- [ ] Truy cập phần tử bằng index.
- [ ] Sử dụng `length`.
- [ ] Sử dụng `push()`.
- [ ] Sử dụng `pop()`.
- [ ] Sử dụng `shift()`.
- [ ] Sử dụng `unshift()`.
- [ ] Duyệt Array bằng `for`.
- [ ] Hiểu Object.
- [ ] Truy cập thuộc tính Object.
- [ ] Thay đổi thuộc tính Object.
- [ ] Thêm thuộc tính Object.
- [ ] Xóa thuộc tính Object.
- [ ] Hiểu Array Object.
- [ ] Truy cập dữ liệu trong Array Object.
- [ ] Duyệt Array Object.
- [ ] Hiển thị Array Object lên HTML.
- [ ] Kết hợp Function + Array Object.
