import api from "./api";

const fileUpload = (file, onUploadProgress, url) => {
let formData = new FormData();

if(file.length > 0){
    for(var i = 0; i < file.length; i++){
        formData.append(`file[${i}]`, file[i]);
    }
}else{
    formData.append("file", file);
}

return api.post(url, formData, {
    headers: {
    "Content-Type": "multipart/form-data"
    },
    onUploadProgress
});
}


export default fileUpload