
import { Blob } from 'buffer';
import express from 'express';

import multer from 'multer'
import { error, log } from 'node:console';
const router = express.Router();

const storage = multer.memoryStorage()

const upload = multer({ storage })


router.post("/upload", upload.single('image'), async (req, res, next) => {


    const buffer: any = req.file?.buffer


    async function removeBg(blob: any) {


        const formData = new FormData();
        formData.append("size", "auto");
        formData.append("image_file", blob);


        const response = await fetch("https://api.remove.bg/v1.0/removebg", {
            method: "POST",
            headers: { "X-Api-Key": `${process.env.REMOVEBG_API}` },
            body: formData,
        });

        if (response.ok) {
            return await response.arrayBuffer();
        } else {
            console.log(error)
            throw new Error(`${response.status}: ${response.statusText}`);
        }
    }

    const blob = new Blob([buffer], { type: 'image/jpeg' });
    const rbgResultData = await removeBg(blob);
    const imgBase = rbgResultData ? Buffer.from(rbgResultData).toString("base64") : undefined
    const actualImg = buffer?.toString("base64")
    // fs.writeFileSync("no-bg.png", Buffer.from(rbgResultData));
    res.json({
        bgRemoved: imgBase,
        actualImg: actualImg

    })
}
)

export default router;
// const bgRemovedBase64 = bgRemovedImgBuffer?.toString("base64")