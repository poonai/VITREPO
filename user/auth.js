let jwt = require('jsonwebtoken')

exports.authLevel =  (req, res, next) => {
    let apiKey = req.get('Authorization')
    if (apiKey == undefined) {
      res.json({
        status: true,
        err: "no api key"
      })
    } else {
      jwt.verify(apiKey, 'secret' , (err, decoded) => {
        console.log("1");
        if (err) {
          console.log("2");
          res.json({
            status: false,
            err: 'pls send correct api key'
          })
        } else {
          console.log("3");
            req.decoded = decoded
            next()
        }
      })
    }
  }
