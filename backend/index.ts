import express from "express"
import ImageRouter from "./routes/route.image"
const app = express();



//-------PORT
const port = process.env.PORT || 3000


app.get("/", (req, res)=> {
    res.json({
        message:"server is healthy"
    })
})


app.use("/v1", ImageRouter)

app.listen(port, ()=>{
    console.log("server started!")
})