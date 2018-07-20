import { Request, Response, NextFunction } from "express";
import * as passport from "passport";


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
                res.redirect('/');
            });
        })(req, res, next);
    }
}

export { RegisterController };