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

## Usage

The Note Doctor app is designed with a clear and intuitive user interface, comprising several screens, each catering to different roles and functionalities within the healthcare workflow.

### Screen 1: Patient Display View

- **Purpose**: This view is specifically designed for patients. It provides them with a comprehensive overview of their upcoming appointments, care team details, and treatment history.
- **Privacy First**: Before accessing their medical information, patients are required to verify their identity by providing their birthdate. This step ensures that sensitive health information remains confidential and is only accessible to the appropriate individuals.

### Screen 2: Nurse Check-In View

- **Purpose**: Nurses utilize this screen to efficiently manage patient flow. They can assign patients to rooms, track the occupancy of rooms, and update patient statuses to optimize the allocation of hospital resources.
- **Workflow Optimization**: By streamlining the process of patient room assignment, this view aids in reducing wait times and enhances the overall efficiency of the healthcare facility.

### Screen 3: Backdoor View

- **Demonstration Only**: The backdoor view is included to showcase the application's capabilities to stakeholders. It offers a behind-the-scenes look at the system's operation and is not intended for actual medical use.


## Roadmap

- [x] Week 1 (2/9-2/15)
  - [x] Meet the developers
  - [x] Overview of Concept
  - [x] Requirements Refinement
  - [ ] Product team to create UI mock to enable engineering team for build phase


- [x] Week 2 (2/16-2/22)
  - [x] Product team to create UI mock to enable engineering team for build phase
  - [ ] Engineering team to create MVP version of app- (2x) meeting with product team


- [X] Week 3 (2/23-2/29)
  - [x] Engineering team to create MVP version of app- (2x) meeting with product team
    
- [X] Week 4 (3/1-3/7)
  - [x] Go/no go decision with product team
  - [ ] 

## Contributing

Contributions to NoteDoctor are greatly appreciated! 

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". 

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/YourFeature)
3. Commit your Changes (git commit -m 'Add some YourFeature')
4. Push to the Branch (git push origin feature/YourFeature)
5. Open a Pull Request

## License
MT License Copyright (c) 2022 Christopher

## Contact

Professor Christopher Riesbeck: c-riesbeck@northwestern.edu <br/>
CS394 Team Roster:

- Benyella,Perry
- Gonzalez,Aldiery Rene
- Li,Zhuoyuan
- Reichert,Rodney David
- Shu,Dong
- Xie,Quanyue
- Haoyang, Yuan
- Kelly,Mei

MPD Team Roster:

- Emily Zarefsky
- Salonen, Dani
- Bennett, Sarah

## Acknowledgements

Christopher K Riesbeck

W24 CS 394 Team Red
