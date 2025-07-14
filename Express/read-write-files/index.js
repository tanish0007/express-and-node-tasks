const express = require('express');
const app = express();
const FS = require('node:fs');
const PORT = 3030;

app.use(express.json());

app.get('/', (req,res)=> {
    res.sendFile(__dirname+`/index.html`);
})

app.post('/sendUser', (req,res) => {
    const { username, email } = req.body;
    if(!username || !email){
        res.status(400).json({
            success: false,
            error: 'Important fields are missing..'
        })
    }
    FS.readFile(__dirname+`/users.json`, 'utf8', (err, data) => {
        if(err){
            return res.status(500).json({
                "success": false,
                "error": "Server error"
            });
        }
        const users = JSON.parse(data);
        const newUser = { username, email };
        const isExist = users.some(user => user.email === newUser.email)

        if(isExist){
            res.json({
                "success": false,
                "error": "User already exists with this email"
            }).status(500);
            return;
        }
        users.push(newUser);
        FS.writeFile(__dirname+`/users.json`, JSON.stringify(users, null, 2), (err) => {
            if(err){
                return res.status(500).json({
                    "success": false,
                    "error": "Failed to save new user detail"
                });
            }
            return res.status(201).json({
                "success": true, 
                "user": newUser
            });
        });
    })
})

app.get('/getFileData', (req, res) => {
    FS.readFile(__dirname+`/users.json`, 'utf8', (err, data) => {
        if(err){
            return res.status(500).json({
                "success": false,
                "error": "Unable to readFile"
            });
        }
        return res.status(200).json({
            "success": true,
            "data": data
        })
        
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})