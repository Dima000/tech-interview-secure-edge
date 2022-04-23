require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

const app = express();
app.use(express.json());


app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        if (email === process.env.TEST_EMAIL && password === process.env.TEST_PASSWORD) {
            const token = jwt.sign({
                    user_id: 1,
                    email,
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "12h",
                }
            );

            res.status(200).json(token);
        }

        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
});

app.post("/verify", auth, (req, res) => {
    res.status(200).send("User is logged");
});


// This should be the last route else any after it won't work
app.use("*", (req, res) => {
    res.status(404).json({
        success: "false",
        message: "Page not found",
        error: {
            statusCode: 404,
            message: "You reached a route that is not defined on this server",
        },
    });
});

module.exports = app;
