const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = new Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
     //imagepath: { type: String, required: true },
    // image:
    // {
    //     data: Buffer,
    //     contentType: String
    // },
    date: { type: Date, default: Date.now() }
    // cover: { type: Image}
})


let BookData = mongoose.model('bookdetail', BookSchema)

module.exports = BookData