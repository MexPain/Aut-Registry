import api from './api'

class UserService {
    // csak egy pelda
    getPublicContent() {
        return api.get('/test/all');
    }
    //TODO get all info about user, not just auth stuff, like in authservice
    //de hogy jon e ide még valami vagy menjen minden az authba az ???
}
export default new UserService()