const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require('cookie-session');
const passport = require('passport');
const env = require('env2')('./config.env');
require("./models/User");
require("./services/passport");


mongoose.connect(process.env.MONGODB_URI);

const app = express();
app.use(
    cookieSession({
        maxAge : 30 * 24 * 60 * 1000,
        keys : [process.env.COOKIE_KEY]
    })
)
app.use(passport.initialize());
app.use(passport.session());
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Running on :", PORT));
