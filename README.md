# Team #11
## Subject: Application Interface Development
```
DHKTPM18B - 420301541302
Instructor: Từ Thị Xuân Hiền
```
## Project: Building a Tour Booking Website
### (Timeline: 08/02/2025 - 19/03/2025)
## 🤝 Team Members
- `Nguyễn Văn Minh` - `22003405` - STT 53 (Project Manager)
- `Bùi Quang Minh` - `22664411` - STT 51
- `Nguyễn Tấn Minh` - `22001075` - STT 52
- `Trần Công Minh` - `22638121` - STT 54
- `Trần Vũ Uyên My` - `22002045` - STT 55

  **[Class List DHKTPM18B](https://docs.google.com/spreadsheets/d/1gaygAMW25scOlaIoXddVJZmmhO2n-DJ-/edit?usp=sharing&ouid=101662654548516828365&rtpof=true&sd=true)**

## Production deployment: [fe-tour-app.vercel.app](https://fe-tour-app.vercel.app)

### Home Page
![Home Page](/readme/home-page.png)
### Cruise Booking Page
![Tour Booking Page](/readme/cruise-page.png)
### Cruise Filter Page 
![Cruise Filter Page](/readme/cruise-page-2.png)
### Hotel booking Page 
![Hotel booking Page](/readme/hotel-page.png)

## 📚 Let clone project, Setup & Run the Project  

### 1. Clone Repo  
```sh  
git clone https://github.com/nvminh162/fe-tour-app.git  
```
```sh  
cd fe-tour-app 
```

### 2. Install Dependencies  
```sh  
npm install  
```

### 3. Run the Project  
```sh  
npm run dev  
```

## 🌟 Introduction to TourX
TourX is a platform that helps users easily search, book, and manage their tours conveniently. With an intuitive interface, smooth experience, and detailed information about destinations, TourX brings you the best journeys.

## 🚀 Technologies Used  
- **Frontend**: ReactJS, Vite, SWC  
- **UI Library**: TailwindCSS
- **CSS Preprocessor**: SCSS
- **State Management**: Redux Toolkit / Context API
- **Routing**: React Router  
- **API**: RESTful API  
- **Authentication**: Firebase Auth

## 🔥 Main Features  
- 📌 Search and book tours by location, price, rating  
- 📝 Manage orders and personal schedules  
- 💳 Secure online payment  
- ⭐ Customer reviews and ratings  
- 📢 Notification system for promotions and offers  

# <span style="color:red;">----- </ Development > ---------------------</span>
# Code Convention

## 📢 Working Language
- Use `English` 100% when working: `variable names`, `code comments`, `commit messages` ...

## 🎯 Code Convention  
### 1️⃣ **Project Structure**  
- **components/**: Contains reusable components:
  + Each component should have its own folder. For example: `Button.jsx`.
  + Each component folder should have an `index.jsx` file to export the main component.
- **pages/**: Contains the main pages of the application, each page should have its own folder containing files like: `.jsx`, `.scss`, and `index.jsx`  
- **hooks/**: Contains custom hooks, each hook should have its own file and be named according to the `useSomething.js` convention.  
- **utils/**: Contains utility functions, each function should have its own file and be named according to the `somethingUtils.js` convention.  
- **services/**: Contains API requests, each service should have its own file and be named according to the `somethingService.js` convention. 
- **[Read more ...](https://www.facebook.com/share/18ZzsYovom/)**

### 2️⃣ **Naming Conventions**

- Variables and functions use **camelCase** (`fetchUserData`)
- Components use **PascalCase** (`UserProfile`)
- Constants and action types use **UPPER_CASE** (`API_URL`)
- Component file names use **PascalCase** (`UserProfile.js`)
- Helper functions use **camelCase** (`formatDate.js`)
- Folders use **kebab-case** (`user-profile/`)
- CSS classes use **kebab-case** (`header-container`)
- Custom hooks start with "use" (`useAuth`)
- API instances use **PascalCase** (`ApiClient`)

### 3️⃣ **Code Writing Rules**
- Use **ESLint** and **Prettier** to ensure code quality
- Follow **React JSX Syntax** standards
- Use **PascalCase** for component file names (`HeaderComponent.js`)
- Variables and functions use **camelCase** (`fetchUserData`)
- Use **async/await** instead of `.then().catch()` 

### 4️⃣ **CSS Writing Rules**  
- Use **TailwindCSS** for most styling  
- Avoid writing `inline-style` directly in JSX  
- If custom CSS is needed, use a separate `.scss` file  

### 5️⃣ **Commit Rules**  
- Use the standard format: `type(scope): message`  
- Common commit types:  
  + `feat`: New feature  
  + `fix`: Bug fix  
  + `refactor`: Code improvement  
  + `style`: Style changes that do not affect logic  
  + `docs`: Documentation updates 

## VSCode Extensions 
```
  Simple react snippets
  Htmltagwrap
  Prettier - Code formatter
  PostCSS Language Support
  Tailwind CSS IntelliSense
  Headwind
```

## Chrome Extensions for Redux 
```
  React Developer Tools
  Redux DevTools
```

## Tools and Libraries
```
Essential tools and libraries to know for the project
- Knowledge of responsive website techniques
- Syntax and usage of JavaScript programming language
- Use Tailwind throughout the project
- Use Redux Toolkit for state management
- Use scss/sass for module styling
- Clsx or classnames (recommend using clsx) to combine with SCSS/SASS
- Basic knowledge of React hooks
```

## 🤝 Contributions
All contributions are welcome! To simplify, only use the `main` branch so that members with no experience with `git` can still work. Please check carefully before pushing commits to avoid unnecessary mistakes. Thank you!

## 📝 Team  
The project is built and developed by team 11 - (2025-2026) - IUH.

## Source Reference:
Get ideas from [Mixivivu](https://mixivivu.com/) for reference purposes only and not for business purposes.

📢 *If you like this project, please ⭐ on GitHub!*