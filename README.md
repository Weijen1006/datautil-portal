# DataUtil Portal

Welcome to **DataUtil Portal**, your go-to suite for powerful data utilities—JSON, Base64, JWT, and more. Simplify your workflow with easy-to-use tools, built for developers, data analysts, and tech enthusiasts.

## Tech Stack

- **Frontend**: [React.js](https://react.dev/) + [Typescript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vite.dev/)
- **UI Framework**: [MaterialUI](https://mui.com/material-ui/)
- **Hosting**: [GitHub Pages](https://pages.github.com/)

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js v22.14.0** (Install using [nvm (Linux/Mac)](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows) if needed)

## Project Structure

```graphql
datautil-portal/
├── .gitignore                  # Git ignore file to exclude unwanted files from version control
├── eslint.config.js            # ESLint configuration for JavaScript/TypeScript linting
├── folder_structure1.txt       # Text file documenting folder structure
├── index.html                  # Main HTML file
├── package-lock.json           # Automatically generated for any operations where npm modifies the node_modules directory
├── package.json                # Contains metadata relevant to the project and its dependencies
├── README.md                   # Project documentation
├── tsconfig.app.json           # TypeScript configuration specific to the app
├── tsconfig.json               # Base TypeScript configuration
├── tsconfig.node.json          # TypeScript configuration for Node.js
├── vite.config.ts              # Vite build tool configuration
├── public/                     # Folder containing static assets served by the app (images, fonts, etc.)
└── src/                        # Source code for the application
    ├── App.css                 # Global styling for the app
    ├── App.tsx                 # Main component that serves as the root of the app
    ├── index.css               # Styling for the index page
    ├── main.tsx                # Main entry point for the app
    ├── vite-env.d.ts           # Vite TypeScript environment declaration
    ├── components/             # Folder containing reusable React components used throughout the app
    ├── configs/                # Folder containing configuration files 
    │   └── constant.ts         # Constants for the application
    ├── features/               # Folder for feature-specific code, e.g., components and services related to a specific app feature
    ├── layouts/                # Layout components for structuring pages or sections
    │   ├── MainContent.tsx     # Main content layout
    │   ├── MainLayout.tsx      # Main layout component
    │   ├── MuiThemeProvider.tsx # Material UI theme provider component
    │   └── ThemeToggle.tsx     # Theme toggle component
    ├── models/                 # Folder for TypeScript models/interfaces used throughout the app
    └── utils/                  # Utility functions for common operations 
        └── localStorageUtil.ts # Utility functions for local storage operations
```

## Setup and Installation

1. **Clone the repository**:

```bash
git clone https://github.com/your-username/datautil-portal.git
cd datautil-portal
```
2. **Install dependencies**:

Use the following command to install all necessary dependencies:

```bash
npm install
```
3. **Start development**:

To run the app in development mode, use:

```bash
npm run dev
```
This will start the development server and open the app in your browser.

## Deployment
1. **Build the project**:

Once you're ready to deploy, first build the project with:

```bash
npm run build
```
2. **Deploy to GitHub Pages**:

After building the app, deploy it to GitHub Pages using:

```bash
npm run deploy
```
This will automatically deploy your app to GitHub Pages.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
