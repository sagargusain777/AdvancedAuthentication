import { sender, mailtrapClient } from "./mailtrap.config.js"
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE , PASSWORD_RESET_REQUEST_TEMPLATE } from "./emailTemplate.js"
export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }]
    try {

        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email address",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })
        console.log("Email sent successfully", response)

    } catch (error) {
        console.error(`Error sending verification`, error)
        throw new Error(`Error sending verification email : ${error}`)
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }]


    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "WELCOME AT ADVANCED AUTH",
            html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", name),
            category: "Welcome Email"

        })


        console.log("Email sent successfully", response)

    } catch (error) {
        console.error(`Error sending Welcome email`, error)
        throw new Error(`Error sending Welcome email : ${error}`)
    }

}


export const sendPasswordResetEmail = async(email ,reseturl) =>{
    const recipient =[{email}]
    try {

        const response = mailtrapClient.send({
            to : recipient,
            from : sender,
            subject : "Password Reset Email",
            html : PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", reseturl),
            category : "Password Reset Email"
        })

        console.log("Password Reset Email Sent Successfully",response)
        
    } catch (error) {

        console.error(`Error sending in Password Reset Email`,error)
        throw new Error(`Error sending in Password Reset Email : ${error}`)
        
    }

}