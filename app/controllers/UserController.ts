import { User } from "../models/User";
import { Request, Response } from "express";


class UserController {
    /**
     * GET /api/users/get
     * @param req 
     * @param res 
     */
    public get(req: Request, res: Response): any {
        User.find()
            .limit(20)
            .select('name email password')
            .then(user => {
                return res.status(200).json(user);
            });
    }
}

export { UserController };