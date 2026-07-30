import express from 'express';
import imageRouter from './routes/image-route.js';

const app = express();

app.use(express.json());
app.use('/goal', imageRouter);

app.use((_, res) => {
  res.status(404).json({ "message": "non-existent" });
})

export default app;
