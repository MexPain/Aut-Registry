import api from './api'

class UserService {

    lendItemToUser(itemId) {
        return api.post(`/users/lend/${itemId}`)
    }

    getProfileDetails() {
        return api.get(`/users/profile`)
    }

    getBorrowedItemsOfUser() {
        return api.get(`/users/borrowedItems`)
    }

    getAllUsers() {
        return api.get(`/users/all`)
    }
}
export default new UserService()