const MongoLib = require('../lib/mongo');

class UserMoviesService {
    constructor() {
        this.collection = "user-movies";
        this.mongoDB = new MongoLib()
    }

    async getUserMovies({ userId }) {
        const query = userId && { userId };
        const userMovie = await this.mongoDB.getAll(this.collection, query)

        return userMovie || [];
    }

    async createUserMovie({ userMovie }) {
        const createdUserMovieId = await this.mongoDB.create(this.collection, userMovie)

        return createdUserMovieId;
    }

    async deleteUserMovie({ userMovieId }) {
        const deltedUserMovieId = await this.mongoDB.delete(
            this.collection,
            userMovieId
        )

        return deltedUserMovieId
    }
}

module.exports = UserMoviesService