const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let smtp_login = process.env.SMTP_LOGIN || "___";
let smtp_password = process.env.SMTP_PASSWORD || "___";

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
    let {name, email, message} = req.body
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
contacts: ${email}
</div>
<div>
message:${message}
</div>

<a href='https://www.codewars.com/users/Zebych/completed_solutions'>codewars</a>
</div>`,
    });
    res.send('ok');
})

let port = process.env.PORT || 3010;

app.listen(port, function () {
    console.log("Example");
})