let app = require('express')();
let http = require('http').Server(app);

http.listen(3000, () => {
    console.log('listenning on *: 3000');
});