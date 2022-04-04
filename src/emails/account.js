const sgMail=require('@sendgrid/mail')

const sendgridAPIkey=(process.env.SENDGRID_API_KEY)

sgMail.setApiKey(sendgridAPIkey)



const sendWelcomeEmail=(email,name)=>{
    sgMail.send({
        to: email,
        from:'sarthak.chauhan496@gmail.com',
        subject:'Welcome to task-manager',
        text:`Welcome to the app, ${name}.`
    
    
    })  
}

const sendDeleteEmail=(email,name)=>{
    sgMail.send({
        to: email,
        from:'sarthak.chauhan496@gmail.com',
        subject:'Bye bye to task-manager',
        text:`Account deleted to the app, ${name}.`
    
    
    })  
}

module.exports={
    sendWelcomeEmail,
    sendDeleteEmail
}