const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './build', 'index.html'));
})

app.listen(PORT, () => {
    console.log('server listening on; ', PORT);
})

// json start script 
//"start": "node server.js && npm rebuild node-sass && npm run build-css && npm react-app-rewired start",

/**
maybe background restyle 
background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(14,14,125,1) 37%, rgba(107,180,195,1) 100%);
 */