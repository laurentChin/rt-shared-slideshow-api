'use strict';

let app = require('express')();
let http = require('http').Server(app);
let cors = require('cors');

app.use(cors());

http.listen(3000, () => {
    console.log('listenning on *: 3000');
});