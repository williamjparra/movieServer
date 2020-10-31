const express = require('express');
const app = express();
const cors = require('cors')

const { config } = require('./config/index')
const moviesApi = require('./routes/movies.js');

const { logErrors, errorHandlers, wrapErrors } = require('./utils/middleware/errorHandlers.js')
const notFoundHandler = require('./utils/middleware/notFoundHandler')
const userMoviesApi = require('./routes/userMovies')
const authApi = require('./routes/auth')

app.use(cors())

//body parser
app.use(express.json())

// routers
moviesApi(app);
userMoviesApi(app)
authApi(app)

// catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors)
app.use(errorHandlers);

app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`)
});