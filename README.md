# Technical test for SecureEdge

## Start the application in dev mode

#### Start client
```
cd client
npm run dev
```

#### Start express server
```
cd server
npm run start
```

#### Start web socket server
```
cd server
npm run start:websocket
```

## Requirements
#### Client

Create an app that displays in real time 3 currency quotes (USD, EUR and GBP).

The app should have a login page with data validation on the server(can be mock data). All the other pages should not be reachable if the user is not authenticated.

Use Highcharts/Highstock for the charts.

Use websocket to update the page in realtime.

Also show a sortable and filterable table with the realtime latest values. Show the average and median for each currency.

Use VueJs for the framework. Use any other libraries that you need.


#### Server

Create a NodeJs/Express server that pushes the data via websockets to the client(can be random data) and manages the authentication on the frontend.

Update intervals every 5 seconds.
