import LoginController from "../app/controllers/auth/LoginController";
import RegisterController from "../app/controllers/auth/RegisterController";
import ForgotPasswordController from "../app/controllers/auth/ForgotPasswordController";
import ResetPasswordController from "../app/controllers/auth/ResetPasswordController";
import HomeController from "../app/controllers/HomeController";
import RedirectIfAuthenticated from "../app/middleware/RedirectIfAuthenticated";


export let route = (app) => {
    app.get('/', RedirectIfAuthenticated.handle, HomeController.index);
    app.get('/login', LoginController.index);
    app.post('/login', LoginController.login);
    app.get('/logout', LoginController.logout);
    app.get('/register', RegisterController.index);
    app.post('/register', RegisterController.register);
    app.get('/forgot', ForgotPasswordController.index);
    app.post('/forgot', ForgotPasswordController.forgot);
    app.get('/reset/:token', ResetPasswordController.index);
    app.post('/reset/:token', ResetPasswordController.reset);
};