const express = require('express');
const router = express();
const cors = require('cors');

// Automatically allow cross-origin requests
router.use(cors({ origin: true }));

// use the defined routes
router.use('/machin/', require('./routes/machin.route')); // use the file machin.route.js dans /routes

// listen for requests
router.listen(process.env.port || 8080, function(){ // listen to the defined port, or 4000 otherwise
	console.log("Listening for requests");
});