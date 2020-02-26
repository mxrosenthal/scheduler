# Interview Scheduler

The Scheduler client application created using Create React App. Express is the basis for the Scheduler API server application.

Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

Technical Specifications
* React
* Webpack, Babel
* Axios, WebSockets
* Axios
* Storybook, Webpack Dev Server, Jest, Testing Library


## Setup

Create a directory for this project and install dependencies with `npm install`.

## Running Webpack Development Server and API server

You will need to run two separate servers, one for the Webpack and one for the Scheduler API.
After installing the required npm packages this repo can start running the Webpack server from a Host (non-virtual machine) terminal with the following command.
```sh
npm start
```

Fork and clone this repo into a second directory (not inside this project directory) https://github.com/lighthouse-labs/scheduler-api. Lighthouse Labs provides these files to build the back end which will act as our API server. 
```sh
npm install
npm run
```
It may be helpful to boot up the API server BEFORE the Webpack server. 

## Running Jest Test Framework

This testing suite has over 90% coverage and implements unit tests as well as end to end testing.
```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Final Product

!["Home Screen"](https://github.com/mxrosenthal/scheduler/blob/master/docs/startScreen.png?raw=true)
!["Add Appointment"](https://github.com/mxrosenthal/scheduler/blob/master/docs/enterApt.png?raw=true)
!["Updated Page"](https://github.com/mxrosenthal/scheduler/blob/master/docs/scheduleAfterAdding.png?raw=true)
!["Confirm Delete"](https://github.com/mxrosenthal/scheduler/blob/master/docs/deleteConfirm.png?raw=true)

Pictured above depicts the home screen followed by what the user would see as they enter an appointment. The home screen updates dynamically once a change in state is triggered. Users will be confronted with a confirm step prior to deleting their appointments. 
