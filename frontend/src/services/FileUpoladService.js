import api from "./api";

const upload = (file, onUploadProgress) => {
    let formData = new FormData()
    formData.append("file", file)
    return api.post("/users/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    })
}

const getFiles = () => {    //lehet nincs meg
    return api.get("/users/files")
}
export default {upload, getFiles}