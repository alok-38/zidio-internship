# Resume Builder Web App

Welcome to the Resume Builder Web App! This project, developed by Zidio Development, is a comprehensive tool designed to streamline the process of creating professional resumes. It features a user-friendly interface with customizable templates, allowing users to effortlessly input and format their personal and professional information.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- **User-Friendly Interface**: Intuitive design for easy navigation and use.
- **Customizable Templates**: Choose from various design themes and templates.
- **Sections**: Include sections for work experience, education, skills, and achievements.
- **Tips and Examples**: Helpful tips and examples for each section.
- **Rearrange Sections**: Easily rearrange sections to suit your needs.
- **Download Options**: Download your resume in multiple formats (PDF, DOCX).
- **LinkedIn Integration**: Import professional details directly from LinkedIn.
- **Real-Time Previews**: See a real-time preview of your resume as you edit.
- **Spell Checker**: Built-in spell checker to ensure error-free resumes.
- **Secure Cloud Storage**: Your data is protected and accessible anytime, anywhere.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Firebase (for secure cloud storage)
- **Third-Party Libraries**:
  - `jspdf` for PDF generation
  - `docx` for DOCX generation
  - `react-linkedin-login-oauth2` for LinkedIn integration
  - `react-simple-spellchecker` for spell checking
- **Build Tool**: Vite

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (>= 14.x)
- npm (>= 6.x)

### Installation

1. **Scaffold the project using Vite:**

   ```bash
   npm create vite@latest resume-builder --template react
   cd resume-builder
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Starting the App:**

  ```npm run dev```

### Environment Variables

Create a `.env` file in the root directory and add your Firebase and LinkedIn credentials:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_LINKEDIN_CLIENT_ID=your_linkedin_client_id
VITE_LINKEDIN_REDIRECT_URI=http://localhost:3000/linkedin
```

### Usage

1. __Building a Resume__: Navigate through the different sections (Work Experience, Education, Skills, Achievements) and add your details.

2. __Customizing Templates__: Choose from a variety of templates and themes to customize the look of your resume.

3. __Importing from LinkedIn__: Use the LinkedIn integration to import your professional details.

4. __Real-Time Preview__: View the real-time preview of your resume as you edit.

5. __Spell Checking__: Utilize the built-in spell checker to avoid errors.

6. __Downloading__: Download your resume in PDF or DOCX format.

### Project Structure

The project directory is organized as follows:

```
resume-builder/
├── public/
│   ├── index.html
│   ├── ...
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ResumeBuilder.jsx
│   │   ├── Section.jsx
│   │   ├── LinkedInImport.jsx
│   │   ├── Preview.jsx
│   │   ├── SpellCheckInput.jsx
│   ├── assets/
│   │   ├── templates.js
│   │   ├── styles/
│   │   │   ├── main.css
│   │   │   ├── ...
│   ├── App.jsx
│   ├── main.jsx
│   ├── ...
├── .env
├── package.json
├── README.md
├── ...
```

#### Contributing

We welcome contributions from the community. To contribute:

#### Fork the repository.

- Create a new branch (git checkout -b feature/your-feature-name).

- Commit your changes (git commit -am 'Add new feature').

- Push to the branch (git push origin feature/your-feature-name).

- Create a new Pull Request.

#### License

This project is licensed under the MIT License. See the LICENSE file for details.

#### Acknowledgements

We would like to thank the following libraries and services for making this project possible:

- React.js
- Firebase
- Vite
- jspdf
- docx
- react-linkedin-login-oauth2
- react-simple-spellchecker