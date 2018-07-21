import { Request, Response, NextFunction } from "express";
import * as passport from "passport";


class LoginController {
    /**
     * GET /login
     * @param req 
     * @param res 
     */
    public index(req: Request, res: Response): void {
        res.render('auth/login');
    }

    /**
     * POST /login
     * @param req 
     * @param res 
     * @param next 
     */
    public login(req: Request, res: Response, next: NextFunction): any {
        passport.authenticate('local-login', (err, user, info) => {
            if (err) { 
                return next(err); 
            }
            if (!user) {
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