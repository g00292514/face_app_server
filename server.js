const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
var bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const pgres = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATEBASE_URL,
		ssl: true,
	}
});


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {res.send('it is running') })
app.post('/signin', (req, res) => { signIn.handleSignIn(req, res, pgres, bcrypt)});
app.post('/register', (req, res) => { register.handleRegister(req, res, pgres, bcrypt)});
app.get('/profile/:id', (req , res) => { profile.handleProfileGet(req, res, pgres)});
app.put('/image', (req, res) => { image.handleImage(req, res, pgres)});
app.post('/imageurl', (req, res) => { image.handleAPICall(req, res)});

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`)
})