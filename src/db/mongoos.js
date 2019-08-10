const mongoose = require('mongoose');
const connectionclineURL = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(connectionclineURL, {
    useNewUrlParser: true,
    useCreateIndex: true
})
