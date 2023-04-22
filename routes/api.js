const express = require('express')
const router = express.Router()  // routing function
const DATA = require('../models/book')  // db for book
const USER_DATA = require('../models/user')  // db for user
const jwt = require('jsonwebtoken')
const { response } = require('express')
var fs = require('fs');
var path = require('path');

const multer = require('multer');
const UserData = require('../models/user')

//img storage
var Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
    //    ,
    //     filename: (req, file, cb) => {
    //         cb(null, file.fieldname + '-' + Date.now())
    //     }
});

const upload = multer({ storage: Storage }).single('testImage')

function verifyToken(req, res, next) {
    try {
        if (!req.headers.authorization) throw ('unauthorized JWT - req.headers.authorization not available')
        let token = req.headers.authorization.split(' ')[1]
        if (!token) throw ('unauthorized JWT - token not available after split')

        let payload = jwt.verify(token, 'indiaismycountry')

        if (!payload) throw ('unauthorized JWT - jwt verify failed')

        next()

    } catch (error) {
        console.log(error.message)
        res.status(401).send(error)
    }
}

// books full list read
// router.get('/api/booklist', async (req, res) => {
    router.get("/api/booklist", async (req, res) => {

    try {

        const list = await DATA.find()
        res.send(list)

    } catch (error) {
        console.log(error)
    }
})

// add book
// router.post('/api/addbook', async (req, res) => {   //to fetch and save data in server
router.post("/apiaddbook", async (req, res) => {   //to fetch and save data in server


    try {
        let item = req.body

        // upload(req, res, (err) => {
        //     if (err) {
        //         console.log(err)
        //     } else {
        //         const newImage = new DATA({
        //             name: req.body.name,
        //             author: req.body.author,
        //             image: {
        //                 data: req.file.filename,
        //                 contentType: 'image/png'
        //             }
        //         })
        //         newImage.save()
        //             .then(() => res.send('data successfully uploaded'))
        //             .catch(err => console.log(err))
        //     }
        // })

            let token = req.headers
            console.log('In API:token from frontend', token)

            const newBook = new DATA(item)  //to check incoming data
            const saveBook = await newBook.save()

            res.send(saveBook)
        } catch (error) {
            console.log(error)
        }


})

//delete book
// router.delete('/api/deletebook/:id', async (req, res) => {
    router.delete("/api/deletebook/:id", async (req, res) => {


    try {
        let id = req.params.id

        let token = req.headers.authorization
        console.log('In API:token from frontend:', token)

        const deleteBook = await DATA.findByIdAndDelete(id)
        res.send(deleteBook)
    } catch (error) {
        console.log(error)
    }
})

//book update
// router.put('/api/updatebook/:id', async (req, res) => {
    router.put("/api/updatebook/:id", async (req, res) => {


    try {
        let id = req.params.id
        let item = req.body

        let token = req.headers.authorization
        console.log('token from front end', token)

        let updateData = {
            $set: item
        }

        let updateBook = await DATA.findByIdAndUpdate({ _id: id }, updateData, { new: true })

        res.status(200).json(updateBook)

    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message)
    }
})

//single book details
// router.get('/api/singlebook/:id', async (req, res) => {
    router.get("/api/singlebook/:id", async (req, res) => {

    try {

        let id = req.params.id
        const singleBook = await DATA.findById(id)
        res.send(singleBook)
    } catch (error) {
        console.log(error)
    }
})

// User Signup
// router.post('/api/adduser', async (req, res) => {   //to fetch and save data in server
    router.post("/api/adduser", async (req, res) => {   //to fetch and save data in server

    try {
        console.log(req.body)

        let item = {
            email: req.body.email,
            password: req.body.password
        }

        const newUser = new USER_DATA(item)  //to check incoming data
        const saveUser = await newUser.save()

        res.send(saveUser)

    } catch (error) {
        console.log(error)
    }
})

//User Login
// router.post('/api/auth', async (req, res) => {
    router.post("/api/auth", async (req, res) => {

    try {
        email = req.body.email
        password = req.body.password
        console.log(email, password + ' In API: from api')
        if (await USER_DATA.findOne({ email: email, password: password })) {

            let payload = { email: email, password: password }
            let token = jwt.sign(payload, 'indiaismycountry')
            console.log('In API: token generated in api', token)

            res.status(200).json({ message: 'Success', status: 200, token: token })

        } else {
            throw ('In API User Login: Unauthorised Access')
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error })
    }
})


module.exports = router