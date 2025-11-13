export function storeId(id){
    localStorage.setItem("id",id);
}

export function getId(){
    return localStorage.getItem("id");
}

export function removeId(){
    localStorage.removeItem("id");
}