# Resume Builder App

This repository contains the source code for a full-stack resume builder application. The app allows users to create, edit, and save their resumes online using a user-friendly interface.

## Table of Contents

- [Environment Setup](#environment-setup)
- [GitHub Configuration](#github-configuration)
- [Create React App](#create-react-app)
- [TailwindCSS](#tailwindcss)
- [React Router](#react-router)
- [React Icons](#react-icons)
- [Firebase](#firebase)
- [Framer Motion](#framer-motion)
- [Firebase Project](#firebase-project)

## Environment Setup

1. **Node.js and npm**: Ensure you have Node.js and npm installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

2. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/resume-builder-app.git
    cd resume-builder-app
    ```

3. **Install Dependencies**:
    ```bash
    npm install
    ```

## GitHub Configuration

1. **Create a GitHub Repository**: Go to GitHub and create a new repository.

2. **Push Local Repository to GitHub**:
    ```bash
    git remote add origin https://github.com/your-username/resume-builder-app.git
    git branch -M main
    git push -u origin main
    ```

3. **Set Up GitHub Actions (Optional)**: You can set up GitHub Actions for CI/CD by creating a `.github/workflows` directory and adding a workflow file, e.g., `main.yml`.

## Create React App

1. **Initialize React App**:
    ```bash
    npx create-react-app resume-builder-app
    cd resume-builder-app
    ```

2. **Start Development Server**:
    ```bash
    npm start
    ```

## TailwindCSS

1. **Install TailwindCSS**:
    ```bash
    npm install -D tailwindcss
    npx tailwindcss init
    ```

2. **Configure TailwindCSS**:
    Update `tailwind.config.js`:
    ```js
    module.exports = {
      purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
      darkMode: false,
      theme: {
        extend: {},
      },
      variants: {
        extend: {},
      },
      plugins: [],
    }
    ```

    Update `src/index.css`:
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

## React Router

1. **Install React Router**:
    ```bash
    npm install react-router-dom
    ```

2. **Configure Routes**:
    Update `src/App.js`:
    ```jsx
    import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

    function App() {
      return (
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/resume" component={Resume} />
            <Route path="/about" component={About} />
          </Switch>
        </Router>
      );
    }

    export default App;
    ```

## React Icons

1. **Install React Icons**:
    ```bash
    npm install react-icons
    ```

2. **Usage**:
    ```jsx
    import { FaBeer } from 'react-icons/fa';

    function IconExample() {
      return <h3> Cheers! <FaBeer /> </h3>
    }

    export default IconExample;
    ```

## Firebase

1. **Install Firebase**:
    ```bash
    npm install firebase
    ```

2. **Firebase Configuration**:
    Create a `firebase.js` file in `src`:
    ```js
    import firebase from 'firebase/app';
    import 'firebase/firestore';
    import 'firebase/auth';

    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();
    const auth = firebase.auth();

    export { db, auth };
    ```

## Framer Motion

1. **Install Framer Motion**:
    ```bash
    npm install framer-motion
    ```

2. **Usage**:
    ```jsx
    import { motion } from 'framer-motion';

    function AnimatedComponent() {
      return (
        <motion.div
          animate={{ scale: 1.2 }}
          transition={{ duration: 0.5 }}
        >
          <p>Animate me!</p>
        </motion.div>
      );
    }

    export default AnimatedComponent;
    ```

## Firebase Project

1. **Create Firebase Project**:
    - Go to [Firebase Console](https://console.firebase.google.com/).
    - Click on "Add project" and follow the instructions to create a new project.

2. **Add Firebase to Your Web App**:
    - In the Firebase Console, go to Project Settings.
    - Under "Your apps", click on the web icon to get your Firebase configuration.

3. **Enable Firestore and Authentication**:
    - In the Firebase Console, go to Firestore Database and create a new database.
    - Go to Authentication and enable Email/Password sign-in method.

## Conclusion

You now have a basic setup for your resume builder application. Feel free to customize and expand the app as per your requirements. Happy coding!
