const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const hbs = require("hbs")
const path = require("path")
const body_parser = require("body-parser")
require("../SRC/connecttomongodb")
const register = require("../SRC/register")

const views_path = path.join(__dirname, "../templates")

app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: false }))

app.set("view engine", "hbs")
app.set("views", views_path)

app.listen(port, () => {
    console.log(`App running on port: ${port}`)
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/save", async (req, res) => {
    try {
        const registerSchema = new register({
            username: req.body.username,
            password: req.body.password
        })
        const data = await registerSchema.save()
        res.render("return")
    } catch (e) {
        console.log(e)
    }
})

app.get("/fetch", async (req, res) => {
    const fetch_data = await register.find()
    res.send(fetch_data)
})

