const nodemailer = require("nodemailer");


const sendEmail = (email, url, txt, txt2) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: 'lab.kids05@gmail.com',
      pass: '97516320a'
    }
  });


  // Step 3
  let mailOptions = {
    from: 'lab.kids05@gmail.com', // TODO: email sender
    to: email,   // TODO: email receiver
    subject: 'Welcome to KidsLab',
    text: '',
    html: `<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
    <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to KidsLab.</h2>
    <p>${txt2}</p>
    
    <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
  
    <p>Si le bouton ne fonctionne pas pour une raison quelconque, vous pouvez également cliquer sur le lien ci-dessous:</p>
  
    <div><a href='${url}'>${url}</a></div>
    </div> `
  };

  // Step 4
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      return log('Error occurs', err);
    }
    return log('Email sent!!!');
  });

}
module.exports = sendEmail;