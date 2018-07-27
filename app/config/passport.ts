import * as passport from "passport";
import * as passportLocal from "passport-local";
import * as bcrypt from "bcrypt";
import User from "../models/User";


const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

/**
 * Passport login strategy
 */
passport.use('local-login', 
             new LocalStrategy({usernameField: 'email'}, 
             (email, password, done) => {
                User.findOne({email: email}, (err, user: any) => {
                    if (err) { 
                        return done(err); 
                    }
                    if (!user) {
                        return done(null, false, { message: `Email ${email} not found.` });
                    }
                    bcrypt.compare(password, user.password)
                          .then((res) => {
                                if (!res) {
                                    return done(null, false, { message: `Wrong password.` });
                                }
                                return done(null, user);
                            });
                });
}));

/**
 * Passport register strategy
 */
passport.use('local-register', 
             new LocalStrategy({usernameField: 'email'}, 
             (email, password, done) => {
                User.findOne({email: email}, (err, user: any) => {
                    if (err) { 
                        return done(err); 
                    }
                    if (user) {
                        return done(null, false, { message: 'That email is already taken.' });
                    } 
                    bcrypt.hash(password, 8)
                          .then((hash) => {
                                let input = {
                                    email: email,
                                    password: hash
                                }
                                return done(null, new User(input));
                            });
                    
                });
}));