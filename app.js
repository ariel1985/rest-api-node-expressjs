const express = require('express')
const filters = require('./filters')
const app = express()
const port = 3000
app.use(express.json())
const data = require('../db.json')

app.post('/', (req, res) => {

    // console.log('request body', req.body)
    filtered_data = filters.apply_filters(data, req.body)
    // console.log(filtered_data)
    res.send(filtered_data)
})

app.get('/', (req, res) => {
    res.send('Hello World!')
    console.log('request body', req.body)

})

app.listen(port, () => {

    console.log(`Example app listening on port ${port}`)
    // console.log('data', data)
})