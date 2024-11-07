const nodemailer = require("nodemailer");


const sendEmail2 = (email, txt2, firstName, lastName) => {
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
    from: email, // TODO: email sender
    to: 'lab.kids05@gmail.com',   // TODO: email receiver
    subject: email,
    text: '',
    html: `<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
      <h2 style="text-align: center;color: teal;">${email}</h2>
      <p>${txt2}</p>
      
      
    
      <div><a href="http://localhost:5000/api/activate/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBhYmZmYWFmNGQ0MTcyZTcwZDJjZWZhIn0sImlhdCI6MTYyMTg4NDg0MiwiZXhwIjoxNjIxODg1MjYyfQ.1Jd2PBosxaGmqQJQNjtPUwHiQ1rNmlUeBk7QoPHhHU4"></a></div>
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

module.exports = sendEmail2;