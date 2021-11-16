// import * as nodemailer from 'nodemailer'
const express = require('express');
// const cors = require('cors');
const nodemailer = require("nodemailer");

const app = express();

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let smtp_login = process.env.SMTP_LOGIN
let smtp_password = process.env.SMTP_PASSWORD

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 25,//587,
    secure: false, // true for 465, false for other ports
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password, // generated ethereal password
    },
});
app.get('/', function (req, res) {
    res.send("HELLO");
})
app.post('/send', async function (req, res) {
    let {message, contacts, name} = req.body
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: "My profile page", // sender address
        to: "sanechek_1987@mail.ru", // list of receivers
        subject: "тестирую", // Subject line
        html: `<b>сообщение с моего portfolio</b>
<div>
<div>
name:${name}
</div>
<div>
contacts: ${contacts}
</div>
<div>
message:${message}
</div>

<a href='https://www.codewars.com/users/Zebych/completed_solutions'>codewars</a>
</div>`,
    });
    res.send('yes')
})
const port = process.env.PORT || 3010
app.listen(port, function () {
    console.log("Example")
})