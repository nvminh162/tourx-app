# TourX App Frontend

## 🚀 Technologies Used  
- **Frontend**: ReactJS, Vite, SWC  
- **UI Library**: TailwindCSS
- **CSS Preprocessor**: SCSS
- **State Management**: Redux Toolkit / Context API
- **Routing**: React Router  
- **API**: RESTful API  
<!-- - **Authentication**: Firebase Auth -->

## 🔥 Main Features  
- 📌 Search and book tours by location, price, rating  
- 📝 Manage orders and personal schedules  
- 💳 Secure online payment  
- ⭐ Customer reviews and ratings  
- 📢 Notification system for promotions and offers  

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