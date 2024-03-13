# Note Doctor

This website is created using [Vite](https://vitejs.dev/) and [React](https://react.dev/)\
The Backend was done using [Firebase](https://firebase.google.com/) using their Hosting, Firestore Database, and storage for large image files.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
This is run using [Vitest](https://vitest.dev/), which is similar to Jest.\
See the section about [running tests](https://vitest.dev/guide/) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
This production build in the build folder can be deployed into most hosting providers.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://vitejs.dev/guide/static-deploy) for more information.

### `npm run serve`

This is similar to npm start, but is less efficient, as it will use a production build to display in the Localhost

### `npm run coverage`

This is similar to npm test, but does not activate a GUI and will instead display the code coverage in the terminal

## Migrating to your own products

We have provided a `data.json` which contains the data from the database that we were using. This data can be cleaned to work generally for other databases, although this one is formatted to work best for **Firestore** Database from Firebase.

To use this data for free on firebase there are community npm packages to help.\
`npm install -g node-firestore-import-export`\
This will activate the command `firestore-import` globally on your system

If you were to use Firebase, create a project, and under the **Project Settings** -> **Service Accounts**, generate a new private key and save the resulting json into `credentials.json` in your new repository. While in your terminal in your new repository you can run, `firestore-import -a credentials.json -b data.json ` to import the data into firestore
