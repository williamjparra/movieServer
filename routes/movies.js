const express = require('express')
const MoviesServices = require('../services/movies')
const {
    movieIdSchema,
    createMovieSchema,
    updateMoviesSchema
} = require('../utils/schemas/movies')

const validationHandler = require('../utils/middleware/validationHandler')

const caheResponse = require('../utils/cacheResponse')
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } =require('../utils/time')

function moviesApi(app) {
    const router = express.Router();
    app.use("/api/movies", router);

    const moviesServices = new MoviesServices();
    
    router.get("/", async function(req, res, next ) {
        caheResponse(res, FIVE_MINUTES_IN_SECONDS)
        const { tags } = req.query;

        try {
            const movies = await moviesServices.getMovies({ tags })

            res.status(200).json({
                data: movies,
                message: 'movies listed'
            })
        }
        catch(err) {
            next(err)
        }
    })

    router.get(
        "/:movieId",
        validationHandler({movieId: movieIdSchema}, 'params'),
        async function(req, res, next ) {
            caheResponse(res, SIXTY_MINUTES_IN_SECONDS)
            const { movieId } = req.params

            try {
                const movies = await moviesServices.getMovie(movieId)

                res.status(200).json({
                    data: movies,
                    message: 'movie retrieved'
                })
            }
            catch(err) {
                next(err)
            }
    })

    router.post("/", validationHandler(createMovieSchema), async function(req, res, next ) {
        const { body: movie } = req;

        try {
            const createMovieId = await moviesServices.createMovie({ movie })

            res.status(201).json({
                data: createMovieId,
                message: 'movie created'
            })
        }
        catch(err) {
            next(err)
        }
    })

    router.put("/:movieId", validationHandler({ movieId: movieIdSchema }, 'params'), validationHandler(updateMoviesSchema),  async function(req, res, next ) {
        const { movieId } = req.params
        const { body: movie } = req;

        try {
            const updatedMovieId = await moviesServices.updateMovie({ movieId, movie })

            res.status(200).json({
                data: updatedMovieId,
                message: 'movie updated succesfully'
            })
        }
        catch(err) {
            next(err)
        }
    })

    router.delete("/:movieId", validationHandler({ movieId: movieIdSchema }, 'params'),async function(req, res, next ) {
        const { movieId } = req.params

        try {
            const deletedMovieId = await moviesServices.deleteMovie({ movieId })

            res.status(200).json({
                data: deletedMovieId,
                message: 'movie deleted succesfully'
            })
        }
        catch(err) {
            next(err)
        }
    })
}

module.exports = moviesApi;