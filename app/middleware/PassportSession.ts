import { Middleware } from "../middleware/Middleware";


class PassportSession {
    /**
     * Save logged user
     * @param app 
     */
    public handle(app): void {
        app.use((req, res, next) => {
            res.locals.user = req.user;

            next();
        });
    }
}

export { PassportSession };