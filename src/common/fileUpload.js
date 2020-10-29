import api from "./api";

const fileUpload = (file, onUploadProgress, url) => {
let formData = new FormData();

formData.append("file", file);

return api.post(url, formData, {
    headers: {
    "Content-Type": "multipart/form-data"
    },
    onUploadProgress
});
}


export default fileUpload