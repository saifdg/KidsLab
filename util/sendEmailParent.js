const nodemailer = require("nodemailer");


const sendEmailParent = (nom, prenom, email, txt2, score, jeuxTraiter, nbf, fault) => {

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
    subject: 'Les statistiques de votre apprenant',
    text: '',
    html: `<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
    <h2 style="text-align: center; text-transform: uppercase;color: teal;">Bienvenu à KidsLab.</h2>
    <h2>${txt2}</h2> 
    <center><table border="1px solid black" ><tr >
    <th width="300px">le score</th>
    <th width="300px">les jeux traitées </th>
    <th width="300px">les réponses invalides </th></tr>
    <tr><td><center>${score}</center></td><td > <center>${jeuxTraiter}</center></td><td><center>${nbf}</center></td><tr>
    </table></center><br> <strong><p style="color:blue"> Appuyez sur le bouton pour voir les jeux invalides de votre apprenant:</p> </strong><br>
    ${fault.map((f, i) => (
      `<div><a href="http://localhost:3000/Statistics/${f.fault}/${f.type}" style="margin-left:500px;background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">fault ${i + 1}</a></div>`
    ))}
    </div>
    
    
    `

  };

  // Step 4
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      return log('Error occurs', err);
    }
    return log('Email sent!!!');
  });

}
module.exports = sendEmailParent;