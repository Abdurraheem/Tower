
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import CONST from './config';
import APIs from './routes';
import session from 'express-session';


const app = express();


app.use(
    session({
        secret: 'sessionSecretKey',
        name: 'deep-x-ct',
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60, // 1 hour
            sameSite: true,
            secure: false,
        },
    })
);

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(cookieParser());

app.use('/api', APIs);

// HANDLING CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use((req, res, next) => {
  console.log('404:', req.originalUrl);
  res.status(404).send('404');
});

// eslint-disable-next-line consistent-return
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  // send the error page
  return res.status(400).json({
    status: 400,
    message: err.message,
  });
}

function logErrors(err, req, res, next) {
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  next(err);
}

app.use(logErrors);
app.use(errorHandler);

//module.exports = app ;
export default app;