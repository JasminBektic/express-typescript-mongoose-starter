import { Request, Response, NextFunction } from "express";
import * as passport from "passport";
import Mailer from "../../emailer/Mailer";
import RegisterValidator from "../../validators/RegisterValidator";
import Controller from "../Controller";


class RegisterController extends Controller {

    constructor() {
        super(new RegisterValidator);
    }

    /**
     * GET /register
     * @param req 
     * @param res 
     */
    public index(req: Request, res: Response): void {
        res.render('auth/register');
    }

    /**
     * POST /register - Using as instance method so 'this' can be used properly
     * @param req 
     * @param res 
     * @param next 
     */
    public register = (req: any, res: Response, next: NextFunction): void => {
        let errors = this.validator.validate(req);

        if (errors) {
            req.flash('errors', errors);
            return res.redirect('/register');
        }

        passport.authenticate('local-register', (err, user, info) => {
            if (err) { 
                return next(err); 
            }
            if (!user) {
                req.flash('errors', {msg: info.message});
                return res.redirect('/register');
            }
            user.save(err => {
                if (err) {
                    return next(err);
                }

                let data = {
                    from: 'Admin',
                    to: user.email,
                    subject: 'Registration',
                    html: '<b>Successfully registered!</b>'
                };

                Mailer.send(data).then((err) => {
                    res.redirect('/');
                });
            });
        })(req, res, next);
    }
}

export default new RegisterController;