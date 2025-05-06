import express from 'express';
import * as path from 'path';
import cors from "cors"
import userRouter from './user';
import patientsRouter from "./patients"

const app = express();

app.use(cors())

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use("/api/auth", userRouter)
app.use("/api/patients", patientsRouter)

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
