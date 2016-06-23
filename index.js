'use strict';

let app = require('express')();
let http = require('http').Server(app);
let cors = require('cors');
let fileUpload = require('express-fileupload');
const moment = require('moment');
const fs = require('fs');

app.use(cors());
app.use(fileUpload());

app.post('/uploads', (request, response) => {
    if (!request.files) {
       response.status(400).send('no files uploaded');
    }

    let picture = request.files.picture;
    let path = 'picture-' + moment().format('YYYYMMDD-HHmmss') + '-' + picture.name;

    picture.mv('uploads/' + path, (err) => {
        if (err) {
           response.status(500).send(err);
        }

        console.log(path + ' moved in uploads');
        response.send('file uploaded');
    });
});

app.get('/uploads', (request, response) => {
    let pictures = [];

    pictures = fs.readdirSync('uploads');
    response.send(pictures);
});

http.listen(3000, () => {
    console.log('listenning on *: 3000');
});