const express = require('express');
const nodemailer = require("nodemailer");
const cors = require("cors")

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let smtp_login = process.env.SMTP_LOGIN
let smtp_password = process.env.SMTP_PASSWORD

let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false, // true for 465, false for other ports
    port: 25,//587,
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
app.post('/sendMessage', async function (req, res) {
    let {name, email, message} = req.body
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: "My profile page", // sender address
        to: "sanechek_1987@mail.ru", // list of receivers
        subject: "тестирую", // Subject line
        html: `<b>сообщение с моего portfolio</b>
<div>
<div>
name: ${name}
</div>
<div>
email: ${email}
</div>
<div>
message: ${message}
</div>
</div>`,
    });

    res.send("HELLO");
});
let port = process.env.PORT || 3010
app.listen(port, function () {
    console.log("Example")
})