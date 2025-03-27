const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}));

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Service 1</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          h1 { color: #333; }
        </style>
      </head>
      <body>
        <h1>Welcome to Service 1</h1>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Service 1 running on port 3000");
});