import nodemailer from 'nodemailer'

const handler = async (req, res) => {

    const {first, last, email, phone, message } = req.body;
    
    const transporter = nodemailer.createTransport ({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    });

    try{
        const emailRes = await transporter.sendMail({
            from: email,
            to: 'pizza.marconi.ottawa@gmail.com',
            subject: `Formulaire de contact de la part de ${first} ${last}`,
            html: `<p>Vous avez reçu une soumission de formulaire</p><br>
                  <p><strong>Prénom:</strong>${first}</p><br>
                  <p><strong>Nom:</strong>${last}</p><br>
                  <p><strong>Courriel:</strong>${email}</p><br>
                  <p><strong>Téléphone:</strong>${phone}</p><br>
                  <p><strong>Message:</strong>${message}</p><br>
                `
            }
        );
        console.log("Message sentttttttttttttttttttttttttttttt", emailRes.messageId);
    }
    catch (err) {

    }
    res.status(200).json(req.body);

}
export default handler;