import { Request, Response, NextFunction } from "express";
import * as passport from "passport";
import Mailer from "../../emailer/Mailer";


class RegisterController {
    /**
     * GET /register
     * @param req 
     * @param res 
     */
    public index(req: Request, res: Response): void {
        res.render('auth/register');
    }

    /**
     * POST /register
     * @param req 
     * @param res 
     * @param next 
     */
    public register(req: Request, res: Response, next: NextFunction): any {
        passport.authenticate('local-register', (err, user, info) => {
            if (err) { 
                return next(err); 
            }
            if (!user) {
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

                Mailer.send(data);

                res.redirect('/');
            });
        })(req, res, next);
    }
}

export default new RegisterController;