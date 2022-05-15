import api from './api'

const imgHeader = "http://localhost:8080/api"

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

const addNewCategory = (name) => {
    return api.post("/items/categories/addCategory", {
        name
    })
}

const addNewSubCategory = (name, parentCategory) =>{
    return api.post("/items/categories/addSubCategory", {
        name, parentCategory
    })
}

const getAllItems = () => {
    return api.get("/items/all")
}

const getItemById = (id) => {
    return api.get(`/items/${id}`)
}

const getAvailableItems = () => {
    return api.get("/items/available")
}

const getAllBorrowedItems = () => {
    return api.get("/items/borrowed/all")
}

const getAllPendingItems = () => {
    return api.get("/items/borrowed/pending")
}

const searchItems = (textParam, categoryParam) => {
    return api.get(`/items/search?text=${textParam}&category=${categoryParam}`)
}

const changeItemStatus = (itemId) => {
    return api.put(`/items/status/accept?id=${itemId}`)
}

const reclaimItem = (itemId) => {
    return api.delete(`/items/reclaim?id=${itemId}`)
}

const ItemService = {
    getCategories,
    getSubCategories,
    addNewItem,
    addNewCategory,
    addNewSubCategory,
    getAllItems,
    getItemById,
    getAvailableItems,
    getAllBorrowedItems,
    getAllPendingItems,
    searchItems,
    changeItemStatus,
    reclaimItem,
    imgHeader,
}

export default ItemService