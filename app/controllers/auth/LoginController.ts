import { Request, Response, NextFunction } from "express";
import * as passport from "passport";
import LoginValidator from "../../validators/LoginValidator";
import Controller from "../Controller";


class LoginController extends Controller {

    constructor() {
        super(new LoginValidator);
    }
    
    /**
     * GET /login
     * @param req 
     * @param res 
     */
    public index(req: Request, res: Response): void {
        res.render('auth/login');
    }

    /**
     * POST /login - Using as instance method so 'this' can be used properly
     * @param req 
     * @param res 
     * @param next 
     */
    public login = (req: any, res: Response, next: NextFunction) => {
        let errors = this.validator.validate(req);

        if (errors) {
            req.flash('errors', errors);
            return res.redirect('/login');
        }

        passport.authenticate('local-login', (err, user, info) => {
            if (err) { 
                return next(err); 
            }
            if (!user) {
                req.flash('errors', {msg: info.message});
                return res.redirect('/login');
            }
            req.login(user, (err) => {
                if (err) { 
                    return next(err); 
                }
                res.redirect('/');
            });
        })(req, res, next);
    }

    /**
     * GET /logout
     * @param req 
     * @param res 
     */
    public logout(req: Request, res: Response): void {
        req.logout();
        res.redirect('/');
    }
}

export default new LoginController;