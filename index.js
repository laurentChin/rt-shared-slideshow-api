'use strict';

let app = require('express')();
let http = require('http').Server(app);
let cors = require('cors');
let fileUpload = require('express-fileupload');

app.use(cors());
app.use(fileUpload());

http.listen(3000, () => {
    console.log('listenning on *: 3000');
});