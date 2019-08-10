const express = require('express');
require('./db/mongoos')

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const userRoute = require('./route/user');
const taskRoute = require('./route/task');
app.use(userRoute);
app.use(taskRoute);

app.listen(port, () => { console.log('Server are listen ' + port)});