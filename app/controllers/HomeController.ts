import { Request, Response } from "express";


class HomeController {
    /**
     * GET /
     * @param req 
     * @param res 
     */
    public index(req: Request, res: Response): void {
        res.render('index');
    }
}

export default new HomeController;