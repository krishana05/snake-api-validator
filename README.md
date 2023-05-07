# This is Snake API validator App

# BackEnd - Node + Express + TypeScript
# FrontEnd - React + TypeScript

## How to run the app
1. BackEnd
> cd snake-api-validator
> cd server
> npm i
> npm run build
> npm run start
> open http://localhost:5000/ and hit the respective endpoints
> We can use any api testing tool like postman
> We can test using frontend app as well
2. FrontEnd
> cd snake-api-validator
> npm i
> npm run start
> open http://localhost:3000/
> Default view is to test get /new endpoint by passing the width and height
> Click on Validate button to test validate api by passing a valid input like:
{
    "GameID": "2fe78bd1-bcb8-4f38-a8f6-bf2d61a13730",
    "Width": 10,
    "Height": 20,
    "Score": 0,
    "Fruit": {
        "X": 3,
        "Y": 6
    },
    "Snake": {
        "X": 2,
        "Y": 6,
        "VelX": 1,
        "VelY": 0
    },
    "ticks": [
        {
         "VelX": 1,
         "VelY": 0
        }
    ]
}

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
