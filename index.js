'use strict';

let app = require('express')();
let http = require('http').Server(app);
const io = require('socket.io')(http);
let cors = require('cors');
let fileUpload = require('express-fileupload');
const moment = require('moment');
const fs = require('fs');
const thumbGenerator = require('node-thumbnail').thumb;


app.use(cors());
app.use(fileUpload());

app.post('/uploads', (request, response) => {
    if (!request.files) {
       response.status(400).send('no file provided for upload.');
    }

    let picture = request.files.picture;
    let path = 'picture-' + moment().format('YYYYMMDD-HHmmss') + '-' + picture.name;

    picture.mv('uploads/' + path, (err) => {
        if (err) {
           response.status(500).send(err);
        }

        thumbGenerator({
            source: 'uploads/' + path,
            destination: 'uploads',
            concurrency: 4,
            height: 360
        },
        function (err) {
            console.log(path + ' moved in uploads thumb generated');
            io.emit('upload', {path: path.replace(/.(jpg|jpeg|png)$/i, '_thumb$&')});
            response.send('file uploaded');
        });
    });
});

app.get('/uploads', (request, response) => {

    let thumbs = fs.readdirSync('uploads')
      .reverse()
      .filter(function(picture){
         return /_thumb./.test(picture);
      })
      .slice(0,10);

    response.send(thumbs);
});

http.listen(3000, () => {
    console.log('listenning on *: 3000');
});