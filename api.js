const express = require('express');
const api = express();

api.get('/', (req,res) => {
    res.send("Success breeds success!!!!!!!");
})

api.listen(9090, () => console.log('Listning on port 9090'));