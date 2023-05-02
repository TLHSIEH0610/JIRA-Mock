module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "arnie" && req.body.password === "123") {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      return res.status(400).json({ message: "Username or Password error" });
    }
  }

  if (req.method === "POST" && req.path === "/register") {
    if (req.body.username === "arnie" && req.body.password === "123") {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    }
  }

  if (req.method === "POST" && req.path === "/getUser") {
    if (req.headers?.authorization?.replace("Bear ", "") === "123") {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      return res.status(400).json({ message: "Invalid token" });
    }
  }

  next();
};
