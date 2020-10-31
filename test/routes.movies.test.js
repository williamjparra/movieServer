const assert = require('assert')
const proxyquire = require('proxyquire')

const { moviesMock, 
    MovieServicesMock,} = require('../utils/mocks/movies')

const testServer = require('../utils/testServer')

describe('route - movies', function () {
    const route = proxyquire('../routes/movies', {
        '../services/movies': MovieServicesMock
    });

    const request = testServer(route);

    describe('GET /movies', function() {
        it('should respond with status 200', function(done) {
            request.get('/api/movies').expect(200, done)
        })

        it('should respond with the list of movies', function(done) {
            request.get('/api/movies').end((err, res) => {
                assert.deepEqual(res.body, {
                    data: moviesMock,
                    message: 'movies listed'
                })

                done();
            })  
        })

        it('shoudl respond with a single movie', function(id ,done) {
            request.get(`/api/movies/:${id}`).end((err, res) => {
                assert.strictEqual(res.body, {
                    data: moviesMock[0] ,
                    message: 'movie retrieved'
                })

                done();
            })
        })
    })
})