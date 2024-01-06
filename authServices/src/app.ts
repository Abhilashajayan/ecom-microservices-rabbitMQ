import express from 'express';
import cors from 'cors';
import nocache from 'nocache';
import  {dbConnection} from './config/database.config';



const app = express();
const port =  process.env.PORT || 3000;


app.use(
  cors({
    origin: [`http://localhost:5173`],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
app.use(nocache());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnection();
app.listen(port, () => {
    console.log(`Server Running on ${port}`);
  });