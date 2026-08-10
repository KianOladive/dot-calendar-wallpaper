import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import imageRouter from './routes/image-route.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, '../frontend/dist');

const app = express();

app.use(express.json());
app.use('/goal', imageRouter);

app.use(express.static(distPath));

app.use((_, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

export default app;
