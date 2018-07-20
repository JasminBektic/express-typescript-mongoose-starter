import { UserController } from "../app/controllers/UserController";
import { VerifyApiKey } from "../app/middleware/VerifyApiKey";


let userController = new UserController;

export let api = app => {
    app.get(`/${process.env.API_PREFIX}/users/get`, (new VerifyApiKey).handle, userController.get);
};