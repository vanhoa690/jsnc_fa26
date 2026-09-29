# BÀI KIỂM TRA LAB Giai đoạn 1

## JavaScript - GET API với Axios và JSON Server

**Thời gian: 30 phút**  
**Tổng điểm: 10 điểm**

---

## 1. Dữ liệu API

Tạo file `db.json`:

```json
{
  "products": [
    {
      "id": 1,
      "name": "iPhone 15",
      "price": 22000000,
      "category": "Điện thoại",
      "brand": "Apple",
      "stock": 10
    },
    {
      "id": 2,
      "name": "Samsung Galaxy S25",
      "price": 21000000,
      "category": "Điện thoại",
      "brand": "Samsung",
      "stock": 15
    },
    {
      "id": 3,
      "name": "MacBook Air M3",
      "price": 28000000,
      "category": "Laptop",
      "brand": "Apple",
      "stock": 5
    }
  ]
}
```

Chạy JSON Server và sử dụng API:

```text
http://localhost:3000/products
```

---

## 2. Câu 1 - Hiển thị danh sách sản phẩm (4 điểm)

Dùng **Axios** gọi:

```text
GET /products
```

Hiển thị dữ liệu lên Table.

Các cột:

```text
STT | ID | Tên sản phẩm | Giá | Danh mục | Thương hiệu | Tồn kho
```

Yêu cầu:

- Dữ liệu phải lấy từ API.
- Sử dụng `map()`.
- Sử dụng Template Literal.
- Sử dụng `innerHTML`.
- Tách phần gọi API thành:

```js
function loadProducts() {
  // ...
}
```

---

## 3. Câu 2 - Trạng thái tồn kho (2 điểm)

Thêm cột:

```text
Trạng thái
```

Quy định:

```text
stock > 0  → Còn hàng
stock = 0  → Hết hàng
```

---

## 4. Câu 3 - Tìm kiếm sản phẩm (3 điểm)

Tạo giao diện:

```text
Tìm kiếm: [________________] [Tìm kiếm]
```

Khi nhập từ khóa và bấm **Tìm kiếm**, chỉ hiển thị các sản phẩm phù hợp.

Ví dụ:

```text
iphone
```

→ tìm được:

```text
iPhone 15
```

### Yêu cầu quan trọng

**Không được lấy toàn bộ `/products` rồi dùng `filter()` để tìm kiếm trên JavaScript.**

Phải tìm kiếm **thông qua API của JSON Server bằng query parameter**.

Sinh viên tự nghiên cứu tài liệu JSON Server về:

```text
JSON Server query parameters
JSON Server filtering/search
```

Ví dụ kiểm tra:

```text
apple
samsung
macbook
abcxyz
```

Nếu không có kết quả, hiển thị:

```text
Không tìm thấy sản phẩm
```

---

## 5. Câu 4 - Tổ chức code (1 điểm)

Code cần có tối thiểu:

```js
loadProducts();
```

và một function riêng để xử lý tìm kiếm, ví dụ:

```js
searchProducts();
```

Không viết toàn bộ chương trình trong một đoạn code duy nhất.

---

## 6. Giao diện tối thiểu

```text
              QUẢN LÝ SẢN PHẨM

Tìm kiếm: [________________] [Tìm kiếm]


---------------------------------------------------------------------------
| STT | ID | Tên sản phẩm | Giá | Danh mục | Thương hiệu | Tồn kho | Trạng thái |
---------------------------------------------------------------------------
|  1  |  1 | iPhone 15    | ... | Điện thoại | Apple    | 10      | Còn hàng   |
---------------------------------------------------------------------------
```

Có thể sử dụng CSS để trang trí nhưng không bắt buộc.

---

## 7. Thang điểm

| Nội dung                           |   Điểm |
| ---------------------------------- | -----: |
| GET API + hiển thị danh sách       |      4 |
| Trạng thái tồn kho                 |      2 |
| Tìm kiếm thông qua JSON Server API |      3 |
| Tổ chức code bằng function         |      1 |
| **Tổng**                           | **10** |

---

## 8. Nộp bài

Cấu trúc:

```text
HoTen_Lesson4
├── index.html
├── index.js
├── db.json
└── package.json
```

## Lưu ý

Phần **tìm kiếm thông qua API** là phần yêu cầu sử dụng JSON Server. Không sử dụng `filter()` trên toàn bộ dữ liệu đã lấy về để thay thế cho yêu cầu này.
