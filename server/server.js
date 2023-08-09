const express = require("express");
const cors = require("cors");

const todoRouter = require("./routers/todoRouter");

//create express object
const app = express();

// define try to fetch from env variable PORT if not there use 8181
const PORT = process.env.PORT | 8181;

// use urlencoded and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// allows localhost to CORS
const corsOption = {
  origin: "http://localhost:8181/todo/",
};

app.use(cors());

app.get("/", (req, resp) => {
  resp.json({ message: "test" });
});

app.use("/todo", todoRouter);

app.listen(PORT, () => {
  console.log(`Server started listening at port ${PORT}`);
});
