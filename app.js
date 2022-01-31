const express = require('express')
const filters = require('./filters')
const app = express()
const port = 3000
app.use(express.json())
const data = require('../db.json')

app.post('/', (req, res) => {
    filtered_data = filters.apply_filters(data, req.body)
    res.send(filtered_data)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})