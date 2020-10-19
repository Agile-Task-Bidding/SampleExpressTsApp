const dotenv = require('dotenv');
const express = require( "express" );
const path = require('path');
const bodyParser = require('body-parser');

// Read environment variables
dotenv.config();

// Grab port
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

const app = express();

// This will be useful for POST requests
app.use(bodyParser.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle api requests
app.get("/api/*", (req: any, res: any) => {
    res.send(JSON.stringify({data: 'alive', error: ''}));
});

// Serve the primary React app for any other path
app.get( "*", ( req: any, res: any ) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});