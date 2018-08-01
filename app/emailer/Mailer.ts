import * as nodemailer from "nodemailer";


class Mailer {
    /**
     * Send email
     * @param data 
     */
    public async send(data) {
        await this.transporter().sendMail(data);
    }

    /**
     * Nodemailer config
     */
    private transporter(): nodemailer.transporter {
        return nodemailer.createTransport({
            service: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            // secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });
    }
}

export default new Mailer;