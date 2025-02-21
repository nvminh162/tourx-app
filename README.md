
# Nhóm #11
## Môn học: Phát triển giao diện ứng dụng
```
DHKTPM18B - 420301541302
GV: Từ Thị Xuân Hiền
```
## Đề tài: Xây dựng ứng dụng website đặt tour du lịch
## 🤝 Thành viên tham gia phát triển
- `Nguyễn Văn Minh` - `22003405` - STT`53` (PM)
- `Bùi Quang Minh` - `22664411` - STT`51`
- `Nguyễn Tấn Minh` - `22001075` - STT`52`
- `Trần Công Minh` - `22638121` - STT`54`
- `Trần Vũ Uyên My` - `22002045` - STT`55`

  **[Danh sách nhóm](https://docs.google.com/spreadsheets/d/1gaygAMW25scOlaIoXddVJZmmhO2n-DJ-/edit?usp=sharing&ouid=101662654548516828365&rtpof=true&sd=true)**

## 🌟 Giới Thiệu TourX
TourX là một nền tảng giúp người dùng dễ dàng tìm kiếm, đặt và quản lý các chuyến du lịch một cách tiện lợi. Với giao diện trực quan, trải nghiệm mượt mà và thông tin chi tiết về các điểm đến, TourX mang đến cho bạn những hành trình tuyệt vời nhất.  

## 🚀 Công Nghệ Sử Dụng  
- **Frontend**: ReactJS, Vite, SWC  
- **UI Library**: TailwindCSS
- **CSS Preprocessor**: SCSS
- **State Management**: Redux Toolkit / Context API
- **Routing**: React Router  
- **API**: RESTful API  
- **Authentication**: Firebase Auth

## 🔥 Tính Năng Chính  
- 📌 Tìm kiếm và đặt tour du lịch theo địa điểm, giá cả, đánh giá  
- 📝 Quản lý đơn hàng và lịch trình cá nhân  
- 💳 Thanh toán trực tuyến an toàn  
- ⭐ Đánh giá, nhận xét từ khách hàng  
- 📢 Hệ thống thông báo về khuyến mãi và ưu đãi  

## 📚 Cài Đặt & Chạy Dự Án  

### 1. Clone Repo  
```sh  
git clone https://github.com/nvminh162/fe-tour-app.git  
```
```sh  
cd fe-tour-app 
```

### 2. Cài đặt Dependencies  
```sh  
npm install  
```

### 3. Chạy Dự Án  
```sh  
npm run dev  
```

# <span style="color:red;">----- </ Development > ---------------------</span>
# Quy ước khi viết code - code convention

## 📢 Ngôn ngữ khi làm việc
- Sử dụng `Tiếng Anh` 100% khi làm việc: `đặt tên biến`, `comment code`, `commit code` ...

## 🎯 Code Convention  
### 1️⃣ **Cấu Trúc Dự Án**  
- **components/**: Chứa các component tái sử dụng:
  + Mỗi component nên có một thư mục riêng. Ví dụ: `Button.jsx`.
  + Trong mỗi thư mục component, cần có file `index.jsx` để export component chính.
- **pages/**: Chứa các trang chính của ứng dụng, mỗi trang nên có một thư mục riêng chứa file gồm: `.jsx`, `.scss` và `index.jsx`  
- **hooks/**: Chứa các custom hooks, mỗi hook nên có một file riêng và đặt tên theo quy tắc `useSomething.js`.  
- **utils/**: Chứa các hàm tiện ích, mỗi hàm nên có một file riêng và đặt tên theo quy tắc `somethingUtils.js`.  
- **services/**: Chứa các request API, mỗi service nên có một file riêng và đặt tên theo quy tắc `somethingService.js`. 
- **[Đọc thêm ...](https://www.facebook.com/share/18ZzsYovom/)**

### 2️⃣ **Quy Tắc Đặt Tên Biến**

- Biến và hàm sử dụng **camelCase** (`fetchUserData`)
- Component sử dụng **PascalCase** (`UserProfile`)
- Hằng số và action types sử dụng **UPPER\_CASE** (`API_URL`)
- Tên file component sử dụng **PascalCase** (`UserProfile.js`)
- Helper function sử dụng **camelCase** (`formatDate.js`)
- Thư mục sử dụng **kebab-case** (`user-profile/`)
- Class CSS sử dụng **kebab-case** (`header-container`)
- Hook custom bắt đầu với "use" (`useAuth`)
- API instance sử dụng **PascalCase** (`ApiClient`)

### 3️⃣ **Quy Tắc Viết Code**
- Sử dụng **ESLint** và **Prettier** để đảm bảo chất lượng code
- Tuân thủ **JSX Syntax** chuẩn của React
- Đặt tên file **PascalCase** cho component (`HeaderComponent.js`)
- Biến và hàm sử dụng **camelCase** (`fetchUserData`)
- Sử dụng **async/await** thay vì `.then().catch()` 

### 4️⃣ **Quy Tắc Viết CSS**  
- Sử dụng **TailwindCSS** cho phần lớn styling  
- Tránh viết `inline-style` trực tiếp trong JSX  
- Nếu cần CSS tùy chỉnh, sử dụng file `.scss` riêng  

### 5️⃣ **Quy Tắc Commit**  
- Sử dụng format chuẩn: `type(scope): message`  
- Các loại commit phổ biến:  
  + `feat`: Tính năng mới  
  + `fix`: Sửa lỗi  
  + `refactor`: Cải tiến code  
  + `style`: Chỉnh sửa style không ảnh hưởng logic  
  + `docs`: Cập nhật tài liệu 

## Extension using VSCode 
```
  Simple react snippets
  Htmltagwrap
  Prettier - Code formatter
  PostCSS Language Support
  Tailwind CSS IntelliSense
```

## Extension chrome for Redux library 
```
  React Developer Tools
  Redux DevTools
```

## Một số website tham khảo
```
https://mixivivu.com
```
```
https://travel.com.vn
```
```
https://fiditour.com
```
```
https://www.ivivu.com
```
```
Updating ...
```

## 📚 Thư Viện Sử Dụng
- `react` ^19.0.0: Thư viện UI chính
- `react-dom` ^19.0.0: Hỗ trợ render React vào DOM
- `react-router-dom` ^7.1.5: Quản lý định tuyến trong ứng dụng
- `axios` ^1.7.9: Gửi request HTTP
- `tailwindcss` ^4.0.4: Framework CSS tiện lợi
- `@fortawesome/fontawesome-svg-core` ^6.7.2: Hỗ trợ icon FontAwesome
- `@fortawesome/free-brands-svg-icons` ^6.7.2: Icon thương hiệu từ FontAwesome
- `@fortawesome/free-regular-svg-icons` ^6.7.2: Icon dạng regular từ FontAwesome
- `@fortawesome/free-solid-svg-icons` ^6.7.2: Icon dạng solid từ FontAwesome
- `@fortawesome/react-fontawesome` ^0.2.2: Hỗ trợ FontAwesome trong React
- `@tailwindcss/vite` ^4.0.4: Plugin TailwindCSS cho Vite
- `@tippyjs/react` ^4.2.6: Tooltip component cho React
- `classnames` ^2.5.1 & `clsx` ^2.1.1: Hỗ trợ xử lý className linh hoạt
- `vite` ^6.1.0: Công cụ build nhanh
- `@vitejs/plugin-react-swc` ^3.5.0: Plugin React sử dụng SWC
- `eslint` ^9.19.0: Kiểm tra code chất lượng
- `eslint-plugin-react` ^7.37.4: Plugin ESLint cho React
- `eslint-plugin-react-hooks` ^5.0.0: Kiểm tra hook trong React
- `eslint-plugin-react-refresh` ^0.4.18: Hỗ trợ React Refresh
- `sass` ^1.84.0: Hỗ trợ viết SCSS
- `@types/react` ^19.0.8 & `@types/react-dom` ^19.0.3: Định nghĩa TypeScript cho React
- `@eslint/js` ^9.19.0: Cấu hình ESLint chuẩn
- `globals` ^15.14.0: Tập hợp các biến global hữu ích
- ..........
- `Cập nhật tiếp khi phát triển...`

## List những thứ quan trọng thường sử dụng
```
Những thư viện và tool chính cần biết để thực hiện dự án
- Biết cú pháp và sử dụng ngôn ngữ lập trình Javascript
- Dùng Tailwind xuyên suốt dự án
- Dùng Redux Toolkit quản lí state
- Dùng scss/sass module hoá
- Clsx or classnames (recommend dùng clsx) để kết hợp với SCSS/SASS
- Biết cơ bản các hooks trong react
```

## 🤝 Đóng Góp
Mọi sự đóng góp đều được hoan nghênh! Để đơn giản hoá chỉ sử dụng nhánh `main` để thành viên chưa chưa có kinh nghiệm về `git` vẫn có thể làm việc. Vui lòng kiểm tra thật kỹ trước khi push commit tránh sai sót không đáng có. Xin cảm ơn!

## 📝 Đội ngũ  
Dự án được xây dựng và phát triển bởi nhóm 11 - (2025-2026) - IUH.

📢 *Nếu bạn thích dự án này, hãy ⭐ trên GitHub!*