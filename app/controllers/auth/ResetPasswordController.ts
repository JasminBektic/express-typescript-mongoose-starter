import { Request, Response, NextFunction } from "express";
import * as async from "async";
import User from "../../models/User";
import ResetPasswordValidator from "../../validators/ResetPasswordValidator";
import Controller from "../Controller";
import Mailer from "../../emailer/Mailer";
import Crypt from "../../helpers/Crypt";


class ResetPasswordController extends Controller {

    constructor() {
        super(new ResetPasswordValidator);
    }

    /**
     * GET /reset/:token
     * @param req 
     * @param res 
     * @param next 
     */
    public index(req: any, res: Response, next: NextFunction): void {
        User.findOne({token: req.params.token}, (err, user) => {
            if (err) { 
                return next(err); 
            }
            if (!user) {
                req.flash('errors', {msg: 'Token is invalid.'});
                return res.redirect('/forgot');
            }

            res.render('auth/reset');
        });
    }

    /**
     * POST /reset/:token
     * @param req 
     * @param res 
     * @param next 
     */
    public reset = (req: any, res: Response, next: NextFunction): void => {
        let errors = this.validator.validate(req);

        if (errors) {
            req.flash('errors', errors);
            return res.redirect('back');
        }

        async.waterfall([
            async.apply(this.resetPassword, req, res),
            this.sendResetPasswordEmail
        ], (err) => {
            if (err) { 
                return next(err); 
            }
            res.redirect('/');
        });
    }

    /**
     * Reset password
     * @param req 
     * @param res 
     * @param done 
     */
    private resetPassword(req: any, res: Response, done: Function): void {
        Crypt.hash(req.body.password)
             .then((hash) => {
                let updateData = {
                    password: hash,
                    token: null
                };
                return updateData;
            })
            .then((updateData) => {
                User.findOneAndUpdate({token: req.params.token}, {$set: updateData}, {new: true}, (err, user) => {
                    if (!user) {
                        req.flash('errors', {msg: 'Token is invalid.'});
                        return res.redirect('back');
                    }
                    req.login(user, (err) => {
                        done(err, req, user);
                    });
                });
            });
    }

    /**
     * Send mail to notify user about changed password
     * @param req 
     * @param user 
     * @param done 
     */
    private sendResetPasswordEmail(req: any, user: any, done: Function): void {
        let data = {
            from: 'Admin',
            to: user.email,
            subject: 'Your password has been changed',
            html: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
        };

        Mailer.send(data).then((err) => {
            req.flash('info', {msg: 'Success! Your password has been changed.'});
            done(err);
        });
    }
}

export default new ResetPasswordController;