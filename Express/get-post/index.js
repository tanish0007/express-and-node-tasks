const express = require('express');
const app = express();
const PORT = 3030;

app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method}: ${req.url}`);
    next();
})

app.get('/', (req,res)=> {
    res.sendFile(__dirname+`/index.html`);
})

function getVowels(string){
    let word = '';
    for(let i=0; i<string.length; i++){
        if(string[i].toLowerCase() == 'a' || string[i].toLowerCase() == 'e' || string[i].toLowerCase() == 'i' || string[i].toLowerCase() == 'o'  || string[i].toLowerCase() == 'u'){
            word += string[i];
        }
    }
    return word;
}

app.post('/vowels', (req,res) => {
    const { username, email } = req.body;
    if(!username || !email){
        res.status(400).json({
            success: false,
            error: 'Important fields are missing..'
        })
    }
    const vowel = getVowels(username) + getVowels(email);
    return res.status(200).json({
        success: true,
        message: vowel
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})