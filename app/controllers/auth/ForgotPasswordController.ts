import { Request, Response, NextFunction } from "express";
import * as async from "async";
import * as crypto from "crypto";
import User from "../../models/User";
import ForgotPasswordValidator from "../../validators/ForgotPasswordValidator";
import Controller from "../Controller";
import Mailer from "../../emailer/Mailer";


class ForgotPasswordController extends Controller {

    constructor() {
        super(new ForgotPasswordValidator);
    }

    /**
     * GET /forgot
     * @param req 
     * @param res 
     */
    public index(req: Request, res: Response): void {
        res.render('auth/forgot');
    }

    /**
     * POST /forgot
     * @param req 
     * @param res 
     * @param next 
     */
    public forgot = (req: any, res: Response, next: NextFunction): void => {
        let errors = this.validator.validate(req);

        if (errors) {
            req.flash('errors', errors);
            return res.redirect('/forgot');
        }

        async.waterfall([
                this.generateToken,
                async.apply(this.setToken, req, res),  // passing Request and Response
                async.apply(this.sendForgotPasswordEmail, req)
            ], (err) => {
                if (err) { 
                    return next(err); 
                }
                res.redirect('/forgot');
            });
    }

    /**
     * Generate token
     * @param done 
     */
    private generateToken(done: Function): void {
        crypto.randomBytes(20, (err, buf) => {
            let token = buf.toString('hex');
            done(err, token);
        });
    }

    /**
     * Set token
     * @param req 
     * @param res 
     * @param token 
     * @param done 
     */
    private setToken(req: any, res: Response, token: string, done: Function): void {
        User.findOneAndUpdate({email: req.body.email}, {$set: {token: token}}, {new: true}, (err, user) => {
            if (!user) {
                req.flash('errors', {msg: 'Account with that email address does not exist.'});
                return res.redirect('/forgot');
            }
            done(err, token, user);
        });

    }

    /**
     * Send email with link attached
     * @param req 
     * @param token 
     * @param user 
     * @param done 
     */
    private sendForgotPasswordEmail(req: any, token: string, user: any, done: Function): void {
        let data = {
            from: 'Admin',
            to: user.email,
            subject: 'Password reset',
            html: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
                Please click on the following link, or paste this into your browser to complete the process:\n\n
                http://${req.headers.host}/reset/${token}\n\n
                If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        Mailer.send(data).then((err) => {
            req.flash('info', {msg: `An e-mail has been sent to ${user.email} with further instructions.`});
            done(err);
        });
    }
}

export default new ForgotPasswordController;