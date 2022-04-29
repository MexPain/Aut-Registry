import api from './api'

const getCategories = () => {
    return api.get("/items/categories")
}

const getSubCategories = () => {
    return api.get("/items/subCategories")
}

const addNewItem = (name, category, subCategory, images, description) => {
    let imageUrl = images.toString()
    return api.post("/items/add", {
        name, category, subCategory, imageUrl, description
    })
}

const ItemService = {
    getCategories,
    getSubCategories,
    addNewItem,
}

export default ItemService