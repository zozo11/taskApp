const express = require('express');
require('./db/mongoos')

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// app.use((req, res, next) => {
//     console.log(req.method, req.path);
//     next()
// });
// app.use((req, res, next) => {
//     if((req.method == 'GET') || (req.method == 'POST')){
//         res.status(503).send('Website is in maintenance')
//     }
// });
const userRoute = require('./route/user');
const taskRoute = require('./route/task');
app.use(userRoute);
app.use(taskRoute);

app.listen(port, () => { console.log('Server are listen ' + port)});

