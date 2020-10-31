const sinon = require('sinon');

const { moviesMock, filteredMoviesMocks } = require('./movies')

const getAllStub = sinon.stub();
getAllStub.withArgs('movies').resolves(moviesMock);

const tagQuery = { tags: { $in: ["Drama"] } }

getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMocks("Drama"))

const getOneStub = sinon.stub().resolves(moviesMock[0]);

const createStub = sinon.stub().resolves(moviesMock[0].id)

class MongoLibMock {
    getAll(collection, query) {
        return getAllStub(collection, query)
    }

    get(collection, data) {
        return getOneStub(collection, data)
    } 

    create(collection, data) {
        return createStub(collection, data)
    }
}

module.exports = {
    getAllStub,
    getOneStub,
    createStub,
    MongoLibMock
}