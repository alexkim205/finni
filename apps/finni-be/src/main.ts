import express from 'express';
import * as path from 'path';
import cors from "cors"
import humps from "humps"
import userRouter from './user';
import patientsRouter from "./patients"

const app = express();
app.use(express.json())
// camelize keys before sending off to JS
app.use((req, res, next) => {
  const originalSend = res.json;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  res.json = function(body) {
    if (typeof body === 'object' && body !== null) {
      body = humps.camelizeKeys(body);
    }
    originalSend.call(this, body);
  };
  next();
});
app.use(cors())

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use("/api/auth", userRouter)
app.use("/api/patients", patientsRouter)

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
