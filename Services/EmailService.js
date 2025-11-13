export function storeEmail(email){
    localStorage.setItem("email",email);
}

export function getEmail(){
    return localStorage.getItem("email");
}

export function removeEmail(){
    localStorage.removeItem("email");
}