import { Request, Response } from "express";


class HomeController {
    /**
     * GET /
     * @param req 
     * @param res 
     */
    public index(req: Request, res: Response) {
        res.render('index');
    }
}

export { HomeController };