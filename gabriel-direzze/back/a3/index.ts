import express, { type Request, type Response} from 'express';
import tasksRouter from '@/routers/routes.js';

const app = express();
const port = 3008;

app.use(express.json());

app.use(tasksRouter);

app.listen(port, () => {
    console.log(`Running on localhost:${port}...`);
})
