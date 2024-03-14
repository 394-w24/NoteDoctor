## NoteDoctor

<p align="center">
  <img src="https://github.com/394-w24/NoteDoctor/assets/85666623/f577c7d6-9239-478b-bf38-6dd5c187c43c" alt="Note Doctor Logo">
</p>

## Introduction
github repo name: 394-w24 / NoteDoctor

The project is created by team Red in CS394 course taught by Professor Riesbeck in winter 2024, in collaboration with Northwestern Master of Product Design and Development Management MPD program.

The project "NoteDoctor" is an innovative web application designed to revolutionize the healthcare experience by prioritizing patient privacy and streamlining the consultation process. Our application offers a secure platform for displaying patients' medical conditions and history through a user-friendly interface, ensuring sensitive information is protected while making medical consultations more convenient. Additionally, NoteDoctor enhances clinic operations by monitoring the availability of consultation rooms, thereby organizing the flow of patients and reducing wait times. Developed with cutting-edge technologies such as Vite and React for the frontend, and Firebase for the backend, NoteDoctor is committed to delivering a seamless, efficient, and secure healthcare service for both patients and healthcare providers.

## Features:

- Dynamic room assignment system
- Patient privacy verification
- Customized welcome page for patients
- Symptom add-on functionality

## Prerequisites
```
node version >= 16
```

### Installation and Running the App
1. **Clone the repository:**
   ```bash
   git clone https://github.com/394-w24/NoteDoctor.git
   cd note-doctor
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the application:**
   ```bash
   npm start
   ```
   This command runs the app in development mode. Visit [http://localhost:5173](http://localhost:5173) in your browser. The app will automatically reload if you change any of the source files.

### Detailed Firebase Setup

1. **Create a Firebase Account and Project:**
   - Visit [Firebase](https://firebase.google.com/) and sign up or log in.
   - Click on "Go to console" at the top right corner.
   - Click on "Add project" and follow the steps to create a new Firebase project.

2. **Get Your Firebase Configuration:**
   - In the Firebase console, select your project.
   - Click on "Project settings" in the left menu.
   - Find your Firebase project's configuration in the "General" tab under the "Your apps" section by adding a new web app if necessary.
   - Click on the "</>" icon to register a new web app and follow the prompts.
   - After the app is registered, you will see your Firebase configuration keys which look like this:
     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_PROJECT_ID.appspot.com",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
       measurementId: "YOUR_MEASUREMENT_ID"
     };
     ```

3. **Configure Firebase in Your Application:**
   - Create a file named `firebase.js` in your project's source directory (e.g., `/src`).
   - Paste the Firebase configuration code snippet you obtained from the Firebase console into `firebase.js`.
   - Make sure to replace the placeholder values in the configuration with your actual Firebase project details.

4. **Install Firebase SDK:**
   - Run the following command in your project directory to install the Firebase package:
     ```bash
     npm install firebase
     ```
   - In `firebase.js`, initialize Firebase using the config object:
     ```javascript
     import { initializeApp } from 'firebase/app';
     // Your firebaseConfig from step 2
     const app = initializeApp(firebaseConfig);
     ```

5. **Import Starting Data into Firestore:**
   - Ensure you have a `data.json` file with the data you want to import into Firestore.
   - Install the `node-firestore-import-export` tool:
     ```bash
     npm install -g node-firestore-import-export
     ```
   - Generate a new private key for your Firebase service account in the Firebase console under "Project settings" > "Service accounts" and download it.
   - Import your data into Firestore using the command line:
     ```bash
     firestore-import -a path/to/your/credentials.json -b path/to/your/data.json
     ```
     Replace `path/to/your/credentials.json` and `path/to/your/data.json` with the actual paths to your files.

## Additional Notes
- **Running Tests:** To run tests, use `npm test`.
