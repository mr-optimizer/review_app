const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('db is connected! online', )
    })
    .catch((ex) => {
        console.log('db connection failed: ', ex)
    })