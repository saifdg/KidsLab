const express = require('express');
const connectDB = require('./config/db');
const fileupload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

const app = express();

//connect to db
connectDB();


//Init middleware
app.use(express.json({ extended: false }));


//Cookie parser
app.use(cookieParser())

//body parser
//app.use(express.urlencoded({ extended: false }))
// parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));


app.get('/', (req, res) => res.send('API RUNNING'));

//File uploading
app.use(fileupload());


// Upload Endpoint



//Set static folder
app.use('/public', express.static(path.join(__dirname)));

//Define route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/categorie', require('./routes/api/categories'));
app.use('/api/competance', require('./routes/api/competances'));
app.use('/api/forgotpassword', require('./routes/api/forgotpassword'));
app.use('/api/jeux1', require('./routes/api/jeux1'));
app.use('/api/jeux2', require('./routes/api/jeux2'));
app.use('/api/jeux3', require('./routes/api/jeux3'));
app.use('/api/admin', require('./routes/api/admin'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running in port ${PORT} `));
