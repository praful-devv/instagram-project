const express = require("express")
const Router = require("./routes/auth.routes")
const app = express()
app.use(express.json())
app.use("/api/auth",Router)

module.exports = app