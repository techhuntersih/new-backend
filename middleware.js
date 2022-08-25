const jwt = require("jsonwebtoken");

const verifyHODToken = async(req, res, next) => {
    const authHeaader = req.headers.authorization;
    console.log("AUTH : ", authHeaader);
    let result;
    if (authHeaader) {
      const token = req.headers.authorization.split(" ")[1];
      try {
        result = jwt.verify(token, process.env.ADIP_SECRET);
        console.log(result);
        if(result.user_type !== 2) {
            res.status(401).json({
                error: [
                  { message: "Authentication error. Token required" },
                ],
            });
        }
        next();
      } catch (err) {
        console.log("err : ", err);
        res.status(401).json({
          error: [{ message: "Token Expired" }],
        });
      }
    } else {
      res.status(401).json({
        error: [
          { message: "Authentication error. Token required" },
        ],
      });
    }
}
const verifyZCToken = async(req, res, next) => {
  const authHeaader = req.headers.authorization;
  console.log("AUTH : ", authHeaader);
  let result;
  if (authHeaader) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      result = jwt.verify(token, process.env.ADIP_SECRET);
      console.log(result);
      if(result.user_type !== 3) {
          res.status(401).json({
              error: [
                { message: "Authentication error. Token required" },
              ],
          });
      }
      next();
    } catch (err) {
      console.log("err : ", err);
      res.status(401).json({
        error: [{ message: "Token Expired" }],
      });
    }
  } else {
    res.status(401).json({
      error: [
        { message: "Authentication error. Token required" },
      ],
    });
  }
}

const verifyHospitalToken = async(req, res, next) => {
  const authHeaader = req.headers.authorization;
  console.log("AUTH : ", authHeaader);
  let result;
  if (authHeaader) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      result = jwt.verify(token, process.env.ADIP_SECRET);
      console.log(result);
      req.user_id=result.id;
      next();
    } catch (err) {
      console.log("err : ", err);
      res.status(401).json({
        error: [{ message: "Token Expired" }],
      });
    }
  } else {
    res.status(401).json({
      error: [
        { message: "Authentication error. Token required" },
      ],
    });
  }
}

module.exports = { verifyHODToken,verifyZCToken,verifyHospitalToken }