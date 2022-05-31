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