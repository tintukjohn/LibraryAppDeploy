const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now()}
   // cover: { type: Image}
})


let UserData = mongoose.model('userdetail',UserSchema)

module.exports = UserData