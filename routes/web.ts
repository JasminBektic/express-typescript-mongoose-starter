import { LoginController } from "../app/controllers/auth/LoginController";
import { RegisterController } from "../app/controllers/auth/RegisterController";
import { HomeController } from "../app/controllers/HomeController";
import { RedirectIfAuthenticated } from "../app/middleware/RedirectIfAuthenticated";


let loginController = new LoginController;
let registerController = new RegisterController;
let homeController = new HomeController;

export let web = app => {
    app.get('/', (new RedirectIfAuthenticated).handle, homeController.index);
    app.get('/login', loginController.index);
    app.post('/login', loginController.login)
    app.get('/logout', loginController.logout);
    app.get('/register', registerController.index);
    app.post('/register', registerController.register)
};