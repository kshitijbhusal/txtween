import axios from 'axios';
import { FileUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react'
// import { Input } from './components/ui/input'
// import { useContext } from 'react';
// import { ImageContext } from '../contexts/ImageContext';
import html2canvas from 'html2canvas';

import useUpdateEffect from '../lib/effect'

//--------------Types Imports

//---------------Lucide Imports
import { AlignLeft } from 'lucide-react';
import { AlignCenter } from 'lucide-react';
import { AlignRight } from 'lucide-react';
// import { AlignJustify } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { RotateCcw } from 'lucide-react';
import { LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const App = () => {
    const divRef = useRef(null)
    //-----------------------
    type TextAlign = "left" | "center" | "right" | "justify"


    //---------------Other States
    const [bgRemovedImg, setBgRemovedImg] = useState("")
    interface ImageContextType {
        image: File | null;
        setImage: (file: File) => void;
    }
    // const { image, setImage } = useContext(ImageContext) as ImageContextType;

    const [image, setImage] = useState("")
    const [actualImg, setActualImg] = useState("")

    const [uploadLoading, setUploadLoading] = useState(false)
    const [backLoading, setBackLoading] = useState(false)
    const [textLoading, setTextLoading] = useState(false)

    //----------Controllers States

    const [text, setText] = useState("")
    const [fontSize, setFontSize] = useState("100px")
    const [textColor, setTextColor] = useState("")
    const [vertical, setVertical] = useState("")
    const [horizontal, setHorizontal] = useState("")
    const [font, setFont] = useState("")
    const [textAlign, setTextAlign] = useState<TextAlign>("left")
    const [lineHeight, setLineHeight] = useState("")
    const [dimenssion, setDimenssion] = useState({ imgWidth: 0, imgHeight: 0 })
    const [bgColor, setBgColor] = useState("white")
    const [bg, setBg] = useState("image")
    const [actualImgHide, setActualImgHide] = useState(false)

    const [isBgSolid, setBgSolid] = useState(false);

    const [uploadErr, setUploadErr] = useState(false)


    const navigate = useNavigate();
    // I sohould keep the if else inside useEffect

    useEffect(() => {
        if (bg === "solid") {
            setBgSolid(true)
            setActualImgHide(true)
        } else {
            setBgSolid(false)
            setActualImgHide(false)

        }

    }, [bg])




    const handleReset = () => {
        setText("");
        setFontSize("100px");
        setTextColor("")
        setVertical("")
        setHorizontal("")
        setFont("")

        setLineHeight("")

        setBgColor("white")
        setBg("image")




    }
    const handleBackBtn = () => {
        setBackLoading(true)
        setTimeout(() => {
            handleReset()

            setActualImg("")
            setBgRemovedImg("")
            navigate("../")
            setBackLoading(false)

        }, 1000)

    }

    //-----------Handle Functions



    const handleFileInput = (e: any) => {


        setImage(e.target.files[0])
        // console.log(e.target.files[0]

    }

    useUpdateEffect(() => {
        handleSubmit()
    }, [image]);



    const handleSubmit = async () => {

        console.log("image", image)

        setUploadLoading(true)
        setTextLoading(true)

        const formData = new FormData();
        if (image) {
            // console.log(image)
            formData.append('image', image)

        }

        try {

            const response = await axios.post(import.meta.env.VITE_BACKEND_URL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            if (response)
                console.log(response.data)
            setBgRemovedImg(response.data.bgRemoved)
            setActualImg(response.data.actualImg)
            setUploadLoading(false)
            setTextLoading(false)


        } catch (error) {
            setUploadErr(true)
            setUploadLoading(false)
            setTextLoading(false)
            console.log(error)

        }

    }


    const handleDownload = async () => {
        console.log("hello")
        if (!divRef.current) {
            console.log("error")
            return
        }


        try {
            console.log(divRef.current)
            const canvas = await html2canvas(divRef.current, {
                allowTaint: true,
                useCORS: true,
                scale: 4
            })

            const link = document.createElement('a');
            link.download = "img_txtween.png"

            link.href = canvas.toDataURL('image/png');

            document.body.appendChild(link);
            link.click();

            // Clean up the temporary link
            document.body.removeChild(link)

        } catch (error) {
            console.log(error)

        }
    }


    const handleImageLoad = (e: any) => {

        const img = e.target
        setDimenssion({ imgWidth: img.naturalWidth, imgHeight: img.naturalHeight })
    }

    return (
        <>
            <section style={{ height: "fit" }} className='   md:h-screen w-screen  md:flex  flex-col justify-center items-center bg-slate-100  text-black'>

                {!actualImg ? (
                    <div className=' flex flex-col   items-center h-full justify-center  '>


                        <form action="post" encType='multipart/form-data' onChange={(e) => {
                            handleFileInput(e)
                        }} className='shadow-zinc-500 shadow-xs   w-fit mx-auto rounded-2xl  '   >

                            <div className=' flex flex-col justify-around items-center '>
                                <div className='relative z-0'>
                                    <input className="rounded-md h-70 w-60 border-none opacity-0 " placeholder='none' name="image" type="file" />
                                    {uploadLoading ? < LoaderCircle className='-z-[10] absolute top-[40%] right-[30%] animate-spin  ' size={100} strokeWidth={2} absoluteStrokeWidth /> :

                                        <FileUp className='-z-[10] absolute top-[40%] right-[30%]  ' size={100} strokeWidth={1.5} absoluteStrokeWidth />}
                                </div>

                                {textLoading && <p className='relative bottom-2 text-slate-600 animate-pulse'>Processing Image</p>}
                                {uploadErr && <p className='relative bottom-2 text-red-500/80'>*Error while uploading Image</p>}
                                {/* <button className='border-1 border-slate-600 w-fit  text-black text-base rounded-md px-2 py1 cursor-pointer'>Submit</button> */}
                            </div>

                        </form>
                        <div className='dark:bg-slate-600/20 hover:bg-slate-400/20 bg-slate-200 text-black  pl-1 pr-3 py-1 w-fit rounded-md mt-2   '>
                            <button onClick={handleBackBtn} className='flex  font-bold items-center cursor-pointer '><span> {backLoading ? <LoaderCircle size={20} className='animate-spin mr-1' /> : <ChevronLeft />} </span><span>Back</span></button>
                        </div>
                    </div>

                ) : <div className=' w-full h-full bg-green-400 flex flex-col items-center justify-center  rounded-md  '>



                    <div className='w-full h-full flex items-start justify-center'>


                        <div className=' w-full h-full   bg-slate-200 rounded-md overflow-hidden  '>

                            <div className='topbar  w-full h-12 text-black px-2 flex items-center justify-between'>
                                <div className=' bg-slate-400/20 hover:bg-slate-800/20 px-2 py-1 rounded-md '>
                                    <button onClick={handleBackBtn} className='flex  font-bold items-center cursor-pointer '><span> {backLoading ? <LoaderCircle size={20} className='animate-spin mr-1' /> : <ChevronLeft />} </span><span>Back</span></button>
                                </div>

                                <div className='flex gap-x-2 '>
                                    <div className=' bg-slate-400/20 hover:bg-slate-800/20 px-2 py-1 rounded-md cursor-pointer'>
                                        <button onClick={handleReset} className='flex  font-bold items-center cursor-pointer'> <span><RotateCcw size={20} className='mr-1' /></span> <span>Reset</span> </button>
                                    </div>
                                    <div className='flex  bg-slate-400/20 hover:bg-slate-800/20 px-2 py-1 rounded-md font-bold items-center '>
                                        {/* <label htmlFor="background">Background</label> */}
                                        <select onChange={(e) => { setBg(e.target.value) }} className='outline-none cursor-pointer ' name="background" id="background">
                                            <option value="">Select Background</option>
                                            <option value="image">Image</option>
                                            <option value="solid">Solid</option>
                                        </select>
                                    </div>


                                </div>


                            </div>


                            {/* -------------------The two main divs ----------------------*/}
                            <div className=' md:h-fit bg-geen-500 md:flex justify-around items-center '>


                                {/* ----------------------------Image Div-------------------------------------- */}
                                <div ref={divRef} style={{ background: `${bgColor}`, width: dimenssion.imgWidth, height: dimenssion.imgHeight }} className=' relative overflow-hidden z-0   '>

                                    {/*--------------------- Text in middle----------------------------- */}
                                    {/* <div style={{ bottom: `${vertical}`, left: `${horizontal}`, textAlign: textAlign }} className='z-2 absolute ' >
                                        <h1 style={{ fontSize: `${fontSize}`, color: `${textColor}`, fontFamily: `${font}`, fontStyle: "normal", fontWeight: "bolder" }} className=''>{text} </h1>
                                    </div> */}

                                    <h1 style={{ fontSize: `${fontSize}`, color: `${textColor}`, fontFamily: `${font}`, fontWeight: "bolder", top: `${vertical}`, left: `${horizontal}`, position: 'absolute', lineHeight: 1, margin: 0 }} className='z-2  '>{text} </h1>


                                    {/* Acutal Image */}
                                    <img hidden={actualImgHide} style={{ width: dimenssion.imgWidth, height: dimenssion.imgHeight }} className='  absolute top-0 z-1  ' src={`data:image/jpeg;base64,${actualImg}`} alt="actualImg" />

                                    {/* BG removed image */}
                                    {/* <img onLoad={handleImageLoad} style={{ width: dimenssion.imgWidth, height: dimenssion.imgHeight }} className=' absolute top-0 z-3  ' src={`data:image/jpeg;base64,${import.meta.env.VITE_IMG}`} alt="bg-removed" /> */}

                                    <img onLoad={handleImageLoad} style={{ width: dimenssion.imgWidth, height: dimenssion.imgHeight }} className=' absolute top-0 z-3  ' src={`data:image/jpeg;base64,${bgRemovedImg}`} alt="bg-removed" />

                                </div>


                                {/* ----------------------------Controllers Div-------------------------------------- */}

                                <div className='bg-slae-800 text-slate-400 w-1/2  py-4 bg-rd-500  pl-12 flex flex-col justify-between items-start overflow-y-   '>

                                    <div className='flex flex-col gap-y-8  bg-rd-500 ' >
                                        <div className=' flex gap-x-8'>
                                            <div>
                                                <div>
                                                    <label className='bg-black text-white px-2 py-1 rounded-md border-none hover:bg-slate-900' htmlFor="">Text</label>
                                                    <input value={text} onChange={(e) => { setText(e.target.value) }} className=' px-2 py-1 border-1 border-slate-400  text-black outline-none rounded-md ml-2 ' type="text" />
                                                </div>
                                                <div className='bg-re-500 flex justify-center gap-x-6 mt-1 text-black/50'>
                                                    <button onClick={() => setTextAlign("left")} className='bg-zinc-300 px-1 rounded-md hover:bg-slate-700/30' ><AlignLeft /></button>
                                                    <button onClick={() => setTextAlign("center")} className='bg-zinc-300 px-1 rounded-md hover:bg-slate-700/30' ><AlignCenter /></button>
                                                    <button onClick={() => setTextAlign("right")} className='bg-zinc-300 px-1 rounded-md hover:bg-slate-700/30' ><AlignRight /></button>
                                                </div>
                                            </div>
                                            {isBgSolid && (<div className='flex flex-col items-start'>
                                                <label className='bg-black text-white px-2 py-1 rounded-md border-none hover:bg-slate-900' htmlFor="">BG Color</label>
                                                <input onChange={(e) => setBgColor(e.target.value)} className=' text-black outline-none ml-2  ' type="color" />
                                            </div>)}
                                        </div>


                                        <div className='text-black'>
                                            <label className='bg-black text-white px-2 py-1 rounded-md border-none hover:bg-slate-900 ' htmlFor="">Fonts</label>
                                            <select onChange={(e) => { setFont(e.target.value) }} className='px-2 py-1 border-1 border-slate-400  text-black outline-none rounded-md ml-2' name="" id="">
                                                <option disabled={true} value="">----Select Fonts-----</option>

                                                <option style={{ fontFamily: 'sans-serif' }} value='sans-serif'>sans-serif</option>
                                                <option style={{ fontFamily: 'cursive' }} value='cursive'>Cursive</option>
                                                <option style={{ fontFamily: 'fantacy' }} value='fantacy'>Fantacy</option>
                                                <option style={{ fontFamily: 'monospace' }} value='monospace'>Monospace</option>
                                                <option style={{ fontFamily: 'revert' }} value='revert'>Revert</option>
                                            </select>

                                        </div>

                                        <div className='flex items-center'>
                                            <label className='bg-black text-white px-2 py-1 rounded-md border-none hover:bg-slate-900' htmlFor="">Text Color</label>
                                            <input onChange={(e) => setTextColor(e.target.value)} className=' text-black outline-none ml-2  ' type="color" />
                                        </div>

                                        <div>
                                            <label className='bg-black text-white px-2 py-1 rounded-md border-none hover:bg-slate-900' htmlFor="">Font Size</label>
                                            <input onChange={(e) => setFontSize(e.target.value + "px")} min={"50"} max={"400"} className='border-1 border-black  text-black outline-none rounded-md ml-2  accent-black ' type="range" />
                                        </div>




                                        {/* ---------------------------Alignment Controllers----------------- */}
                                        <div>
                                            <label className='bg-black text-white px-2 py-1 rounded-md border-none hover:bg-slate-900' htmlFor="">Align Vertial</label>
                                            <input onChange={(e) => setVertical(e.target.value + "%")} max={110} min={-100} className='border-1 border-black  text-black outline-none rounded-md ml-2 accent-black' type="range" />
                                        </div>

                                        <div>
                                            <label className='bg-black text-white px-2 py-1 rounded-md border-none hover:bg-slate-900' htmlFor="">Align Horizontal</label>
                                            <input onChange={(e) => setHorizontal(e.target.value + "%")} max={100} min={-100} className='border-1 border-black  text-black outline-none rounded-md ml-2 accent-black ' type="range" />
                                        </div>

                                        {/* Line Height */}
                                        <div>
                                            <label className='bg-black text-white px-2 py-1 rounded-md border-none hover:bg-slate-900' htmlFor="">Line Height</label>
                                            <input onChange={(e) => setLineHeight(e.target.value + "rem")} min={"3"} max={"10"} className='border-1 border-black  text-black outline-none rounded-md ml-2  accent-black ' type="range" />
                                        </div>

                                        <div>
                                            <button onClick={handleDownload} className='bg-black text-white px-2 py-1 rounded-md border-none hover:bg-slate-900 mt-8'>Download</button>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
                }

                {/* To render baseImg */}

            </section >

        </>
    )
}

export default App;

