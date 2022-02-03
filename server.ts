import express, {Request, Response} from 'express';

const app = express();


const dbUrl = 'mongodb+srv://cs5500:<cs5500pw>@cluster0.gw6e0.mongodb.net/cs5500-assignment?retryWrites=true&w=majority'

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) => {
    res.send(req.params.a + req.params.b);
})

const PORT = 4000;
app.listen(process.env.PORT || PORT);