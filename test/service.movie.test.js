const assert = require('assert')
const proxyquire = require('proxyquire')

const { MongoLibMock, getAllStub, getOneStub } = require('../utils/mocks/mongoLib')

const { moviesMock } = require('../utils/mocks/movies')
const { deepEqual } = require('assert')

describe("services - movies", function() {
    const MoviesServices = proxyquire('../services/movies', {
        '../lib/mongo': MongoLibMock
    });

    const moviesServices = new MoviesServices();

    describe("when getmovies method is called", async function() {
        it('should call the getall MongoLib method', async function() {
            await moviesServices.getMovies({});
            assert.strictEqual(getAllStub.called, true)
        })

        it('should return an array of movies', async function() {
            const result = await moviesServices.getMovies({});
            const expected = moviesMock;

            assert.deepEqual(result, expected);
        })
    })

    describe("when the getMovie methos is called", async function() {
        it('should call get mongolib method', async function() {
            await moviesServices.getMovie();
            assert.strictEqual(getOneStub.called, true)
        })

        it('should return a one single movie', async function() {
            const result = await moviesServices.getMovie();
            const expected = moviesMock[0]

            assert.deepEqual(result, expected)
        })
    })
})