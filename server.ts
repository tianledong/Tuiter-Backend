import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import UserController from "./controllers/UserController";
import UserDao from "./daos/UserDao";
import TuitController from "./controllers/TuitController";
import TuitDao from "./daos/TuitDao";

const app = express();
app.use(express.json())
const dbUrl = 'mongodb+srv://cs5500:<cs5500pw>@cluster0.gw6e0.mongodb.net/cs5500-assignment?retryWrites=true&w=majority'
mongoose.connect(dbUrl);

const userController = new UserController(app, new UserDao());
const tuitController = new TuitController(app, new TuitDao());
app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) => {
    res.send(req.params.a + req.params.b);
})


const PORT = 4000;
app.listen(process.env.PORT || PORT);