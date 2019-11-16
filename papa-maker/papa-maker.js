const express = require('express')
const app = express()

app.get('/', (req, res) => res.send("I'm making PAPAPAPAPAPAPPA"))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
