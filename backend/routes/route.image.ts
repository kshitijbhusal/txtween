import express from 'express';
const router = express.Router();

router.post("/upload", (req, res)=> {
    res.json({
        message:"this is a post upload route"
    })

})



export default router