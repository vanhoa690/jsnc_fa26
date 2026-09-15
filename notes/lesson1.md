# Lesson 1 - Chuẩn bị môi trường

## Mục tiêu

- Tải source code từ GitHub.
- Mở project bằng VS Code.
- Cài đặt thư viện.
- Chạy JSON Server.
- Chạy website bằng Live Server.

---

# Bước 1. Cài đặt phần mềm

Cài đặt các phần mềm sau:

- Node.js (LTS): https://nodejs.org
- Visual Studio Code: https://code.visualstudio.com
- Git: https://git-scm.com

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

---

# Bước 2. Tải source code

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

# Bước 3. Cài đặt thư viện

Mở Terminal trong VS Code:

```
Ctrl + `
```

Chạy lệnh:

```bash
npm install
```

---

# Bước 4. Chạy JSON Server

Project đã được cấu hình sẵn trong `package.json`.

Chạy:

```bash
npm run db
```

Kiểm tra API:

```
http://localhost:3000/students
```

---

# Bước 5. Cài đặt Live Server

Trong VS Code:

- Mở **Extensions**
- Tìm **Live Server**
- Cài đặt extension của **Ritwick Dey**

---

# Bước 6. Chạy website

Mở file:

```
index.html
```

Chuột phải chọn:

```
Open with Live Server
```

Website sẽ chạy tại:

```
http://127.0.0.1:5500
```

---

# Cấu trúc project

```text
project
│
├── index.html
├── add.html
├── db.json
├── package.json
└── .gitignore
```

---

# package.json

```json
{
  "scripts": {
    "db": "json-server db.json --port 3000"
  },
  "devDependencies": {
    "json-server": "^0.17.4"
  }
}
```

Chạy server:

```bash
npm run db
```

---

# Kết quả

- ✅ Clone được source code.
- ✅ Mở project bằng VS Code.
- ✅ Chạy được `npm install`.
- ✅ Chạy được `npm run db`.
- ✅ Mở được website bằng Live Server.
- ✅ Truy cập được API tại `http://localhost:3000/books`.

---

# Bài tập

## Bài 1

Clone source code từ GitHub.

## Bài 2

```bash
npm install
```

## Bài 3

```bash
npm run db
```

Kiểm tra:

```
http://localhost:3000/books
```

## Bài 4

Mở `index.html` bằng **Live Server** và kiểm tra website hiển thị thành công.
