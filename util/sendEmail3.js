const nodemailer = require("nodemailer");

const sendEmail3 = (email, url, txt2, txt3, image, description, name) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'lab.kids05@gmail.com',
            pass: '97516320a'
        }
    });



    // Step 3
    let mailOptions = {
        from: email, // TODO: email sender
        to: 'lab.kids05@gmail.com',   // TODO: email receiver
        subject: email,
        text: '',
        attachments: [{
            filename: name,
            path: (__dirname + `/../my-project/public/cv/${name}`),
            contentType: 'application/pdf'
        }],
        html: `<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
      <h2 style="text-align: center;color: teal;">${email}</h2>
      <p style="margin-top:20px;">${txt2}</p>
      <h2><b>Description de demandeur</b></h2>
      <p style="margin-top:20px;">${description}</p>
      <a href=${url} style="margin-left:500px;background: crimson;margin-top:20px; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Accepter la Demande !</a>
      </div> `
    };
    
    // Step 4
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log('Error occurs', err);
        }
        console.log('Email sent!!!');
    });

}

module.exports = sendEmail3;