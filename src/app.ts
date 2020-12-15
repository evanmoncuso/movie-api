import express from 'express';
import * as bp from 'body-parser';
import cors from 'cors';

import logger  from './middleware/logger';
import { 
  createMovie,
  getMovieByUUID,
  getMovies,
} from './routes/movies';

const environment = process.env.ENVIRONMENT || 'development';

const app = express();

app.use(cors());

app.use(bp.urlencoded({ extended: false }));
app.use(bp.text());

app.use(bp.json({
  type: [
    'application/json',
    'application/vnd.api+json',
  ]
}));

app.use(logger);

/* Unauthenticated Routes */
app.get('/health', (_, res: express.Response) => { 
  res.status(200).send({
    status: 'ok',
    environment,
  })
});

app.get('/movies', getMovies);
app.post('/movies', createMovie);

app.get('/movie/:uuid', getMovieByUUID);

export default app;