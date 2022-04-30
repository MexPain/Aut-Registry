import api from "./api";

const upload = (file, onUploadProgress) => {    //TODO handle errors
    let formData = new FormData()
    formData.append("file", file)
    return api.post("/files/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    })
}

const getFiles = () => {    //lehet nincs meg
    return api.get("/files")
}
export default {upload, getFiles}