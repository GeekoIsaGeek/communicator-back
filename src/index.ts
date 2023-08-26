import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/dbConnection';
import mongoose from 'mongoose';

connectDB();

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send(`
		<h1 style="text-align:center; font-family:system-ui">
			REST API for a messaging app
		</h1>
	`);
});

mongoose.connection.once('open', () => {
	app.listen(process.env.PORT, () => {
		console.log('Server has run');
	});
});
