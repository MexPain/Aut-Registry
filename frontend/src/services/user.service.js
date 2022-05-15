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

    deleteUser(userId) {
        return api.delete(`/users/${userId}`)
    }

    changeUserRoles(userId, newRoles) {
        return api.put(`/users/update/roles?id=${userId}`, {
            newRoles
        })
    }
}
export default new UserService()