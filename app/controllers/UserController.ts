import User from "../models/User";
import { Request, Response } from "express";


class UserController {
    /**
     * GET /api/users/get
     * @param req 
     * @param res 
     */
    public get(req: Request, res: Response): any {
        User.schema.methods.getUsers()
                           .then((users) => {
                                return res.status(200).json(users);
                            });
    }
}

export default new UserController;