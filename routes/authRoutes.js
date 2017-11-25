const passport = require("passport");
const env = require('env2')('./../config.env');


module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"), (req, res)=>{
    res.send("authenticaed")
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
  app.get("/", (req, res)=>{
   res.send("app")
  })
};
