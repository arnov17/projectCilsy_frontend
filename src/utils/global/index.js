let TOKEN = JSON.parse(localStorage.getItem("userToken"));
console.log(TOKEN);
let Userdata = JSON.parse(localStorage.getItem("saveUserdata"));
console.log(Userdata);

export const ENDPOINT = "http://localhost:6003/api/v1";
export const access_token = TOKEN;
export const storageData = Userdata;
