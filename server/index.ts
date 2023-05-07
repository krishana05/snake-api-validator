import express, { Express, NextFunction, Request, Response, } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { setDefaultErrorCode } from './utility';
import { newGameHandler } from './newGameHandler';
import { validateGameHandler } from './validateGameHandler';
import { CLIENT_URL } from './constants';

const app: Express = express();

// Adding this middleware to enable CORS for all endpoints
const corsOptions = {
  origin: CLIENT_URL, // Allow this client port
};
app.use(cors(corsOptions));


// create application/json parser which gets JSON bodies in req.body
var jsonParser = bodyParser.json();

const port = process.env.PORT || 5000;

// Default END_POINT
app.get('', (req: Request, res: Response) => {
  try {
    res.status(200).send("This is a home route for Node + Express snake api validator App");
  } catch {
    // Default Error Code
    setDefaultErrorCode(res);
  }
});

// END_POINT to start a new game 
app.get('/new', cors(corsOptions), (req: Request, res: Response) => {
  try {
    newGameHandler(req, res);
  } catch {
    // Default Error Code
    setDefaultErrorCode(res);
  }
});

// END_POINT to validate the state
app.post('/validate', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  // console.log('Request Body ', req.body);
  try {
    validateGameHandler(req, res);
  } catch {
    // Default Error Code
    setDefaultErrorCode(res);
  }
  next();
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});