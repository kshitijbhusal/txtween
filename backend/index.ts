import express from "express"
import ImageRouter from "./routes/route.image"
import cors from 'cors';
import dotenv from 'dotenv'
const app = express();
app.use(cors())

dotenv.config()


app.use("/v1", ImageRouter)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//-------PORT
const port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.json({
        message: "server is healthy"
    })
})



app.listen(port, () => {
    console.log("server started!")
})