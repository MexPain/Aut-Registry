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

const ItemService = {
    getCategories,
    getSubCategories,
    addNewItem,
    addNewCategory,
    addNewSubCategory,
    getAllItems,
}

export default ItemService