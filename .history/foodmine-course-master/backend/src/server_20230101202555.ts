import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import express from "express";
import cors from "cors";
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';
import orderRouter from './routers/order.router';
import { dbConnect } from './configs/database.config';
import { SMTPClient } from 'emailjs';
dbConnect();

const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.use(express.static('public'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'))
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})

sendMail:  async (req: any, res:any)=> {
    const client = new SMTPClient({
        user: 'irshadalik4n@gmail.com',
        password: 'password',
        host: 'smtp.your-email.com',
        ssl: true,
    });
    
    try {
        const message = await client.sendAsync({
            text: 'i hope this works',
            from: 'you <username@your-email.com>',
            to: req.body.name,
            cc: 'else <else@your-email.com>',
            subject: 'testing emailjs',
        });
        return res.json
    } catch (err) {
        console.error(err);
    }
}