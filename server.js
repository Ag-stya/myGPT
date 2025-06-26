const fetch = require('node-fetch');

const PORT= 8000;
const express = require('express');
const cors= require('cors');
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

const API_KEY= process.env.API_KEY;
app.post('/completions', async (req,res,next)=>{
    const options= {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body:JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: req.body.message
                }
            ],
            temperature: 0.7,
            max_tokens: 500
        })
            
    }
    try{
        const response= await fetch("https://api.openai.com/v1/chat/completions",options);
        const data= await response.json();
        if (!response.ok) {
            return res.status(response.status).json({ error: data });
        }
        res.send(data);
    }
    catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(PORT,() =>console.log( "Server is running on port "+ PORT));