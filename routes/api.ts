import UserController from "../app/controllers/UserController";
import VerifyApiKey from "../app/middleware/VerifyApiKey";


export let route = (app) => {
    app.get(`/${process.env.API_PREFIX}/users/get`, VerifyApiKey.handle, UserController.get);
};