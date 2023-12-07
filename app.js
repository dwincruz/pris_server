require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.use(express.json()); // parse json bodies in request object
app.use(express.urlencoded({ extended: false }));

//define endpoints
app.use("/api/public_concerns", require("./routes/internal/concernRoutes"));

//check connection
app.use((err, req, res, next) => {
  console.log(err.back);
  console.log(err.name);
  console.log(err.code);

  switch (res.status) {
    case 200:
      res.status(200).json({
        status: "API is running properly",
      });
      break;
    case 500:
      res.status(500).json({
        status: "failed to run server API",
      });

      break;
  }
});

const PORT = process.env.NODE_PORT || 3001;
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
