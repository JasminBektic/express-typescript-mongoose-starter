import { Request, Response, NextFunction } from "express";
import { Middleware } from "../middleware/Middleware";


class RedirectIfAuthenticated extends Middleware {
    /**
     * Logged user redirection
     * @param req 
     * @param res 
     * @param next 
     */
    public handle(req: Request, res: Response, next: NextFunction): void {
        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }

        next();
    }
}

export { RedirectIfAuthenticated };