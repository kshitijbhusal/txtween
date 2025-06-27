import axios from 'axios';
import { FileUp, Target } from 'lucide-react';
import React, { useRef, useState } from 'react'
// import { Input } from './components/ui/input'
import { useContext } from 'react';
import { ImageContext } from './contexts/ImageContext';
import html2canvas from 'html2canvas';

//--------------Types Imports
import { type CSSProperties } from 'react';

//---------------Lucide Imports
import { AlignLeft } from 'lucide-react';
import { AlignCenter } from 'lucide-react';
import { AlignRight } from 'lucide-react';
import { AlignJustify } from 'lucide-react';



const App = () => {
  const divRef = useRef(null)
  //-----------------------
  type TextAlign = "left" | "center" | "right" | "justify"

  const [bgRemovedImg, setBgRemovedImg] = useState()

  const { image, setImage }: any = useContext(ImageContext)
  const [actualImg, setActualImg] = useState(null)

  //----------Controllers States

  const [text, setText] = useState("")
  const [fontSize, setFontSize] = useState("100px")
  const [textColor, setTextColor] = useState("")
  const [vertical, setVertical] = useState("")
  const [horizontal, setHorizontal] = useState("")
  const [font, setFont] = useState("")
  const [textAlign, setTextAlign] = useState<TextAlign>()
  const [lineHeight, setLineHeight] = useState("")



  //------------Fonts
  const fonts = []



  //-----------Handle Functions

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.append('image', image)
    }

    try {

      const response = await axios.post("http://localhost:3000/v1/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      if (response)
        setBgRemovedImg(response.data.bgRemoved)
      setActualImg(response.data.actualImg)


    } catch (error) {

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
        scale: 2
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


  return (
    <>
      <section className='h-screen flex justify-center items-center bg-zinc-900 text-white'>

        {actualImg ? (
          <form action="post" encType='multipart/form-data' onSubmit={handleSubmit} className=' border-1 border-slate-500 rounded-lg drop-shadow-blue-400 drop-shadow-2xl'   >

            <div className='p-6 flex flex-col justify-between items-center'>

              <div className='relative'>
                <input className=" rounded-md h-80 " placeholder='none' onChange={(e: any) => {
                  setImage(e.target.files[0])
                }} name="image" type="file" />
                <FileUp className='-z-[10] absolute top-[40%] right-[30%] ' size={100} strokeWidth={1.5} absoluteStrokeWidth />
              </div>
              <button className='border-1 border-slate-600 w-fit  text-white text-base rounded-md px-2 py1 cursor-pointer'>Submit</button>
            </div>



          </form>
        ) : <div className='h-full  bg-sate-100 w-full flex flex-col items-center justify-center  rounded-md  '>



          <div className='w-full h-full bg-rd-500 flex items-center justify-center'>


            <div className='h-[90%] w-[60%]   bg-slate-200 rounded-md overflow-hidden '>
              <div className='topbar bg-yelow-500 w-full h-12 text-black'>
                <h1>kei pani xaina</h1>

              </div>

              <div className='w-full h-full bg-geen-500 flex '>

                <div ref={divRef} style={{ background: "brown" }} className='  relative  w-1/2 p-4  z-0'>

                  {/*--------------------- Text in middle----------------------------- */}
                  <div style={{ bottom: `${vertical}`, left: `${horizontal}`, textAlign: textAlign }} className='z-2 absolute ' >
                    <h1 style={{ fontSize: `${fontSize}`, color: `${textColor}`, fontFamily: `${font}`, fontStyle: "normal", fontWeight: "bolder", lineHeight: `${lineHeight}` }} className=' '>{text} </h1>
                  </div>

                  {/* Acutal Image */}
                  <img className='bg-bue-300  absolute top-0 z-1  ' src={`data:image/jpeg;base64,${actualImg}`} alt="actualImg" />

                  {/* BG removed image */}
                  <img className='bg-transparent absolute top-0 z-3  ' src={`data:image/jpeg;base64,${import.meta.env.VITE_IMG}`} alt="bg-removed" />

                </div>


                {/* ----------------------------Controllers Div-------------------------------------- */}

                <div className=' text-black w-1/2  py-4 bg-rd-500  pl-12 flex flex-col justify-between items-start  bg-geen-400  '>

                  <div className='flex flex-col gap-y-8  bg-rd-500 ' >
                    <div >
                      <div>
                        <label className='bg-black text-white px-2 py-1 rounded-md border-none hover:bg-slate-900' htmlFor="">Text</label>
                        <input onChange={(e) => { setText(e.target.value) }} className=' px-2 py-1 border-1 border-slate-400  text-black outline-none rounded-md ml-2 ' type="text" />
                      </div>
                      <div className='bg-re-500 flex justify-center gap-x-6 mt-1'>
                        <button onClick={() => setTextAlign("left")} className='bg-zinc-300 px-1 rounded-md hover:bg-slate-700/30' ><AlignLeft /></button>
                        <button onClick={() => setTextAlign("center")} className='bg-zinc-300 px-1 rounded-md hover:bg-slate-700/30' ><AlignCenter /></button>
                        <button onClick={() => setTextAlign("right")} className='bg-zinc-300 px-1 rounded-md hover:bg-slate-700/30' ><AlignRight /></button>
                      </div>
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
                      <label className='bg-black text-white px-2 py-1 rounded-md border-none hover:bg-slate-900' htmlFor="">Color</label>
                      <input onChange={(e) => setTextColor(e.target.value)} className=' text-black outline-none ml-2  ' type="color" />
                    </div>

                    <div>
                      <label className='bg-black text-white px-2 py-1 rounded-md border-none hover:bg-slate-900' htmlFor="">Font Size</label>
                      <input onChange={(e) => setFontSize(e.target.value + "px")} min={"50"} max={"200"} className='border-1 border-black  text-black outline-none rounded-md ml-2  accent-black ' type="range" />
                    </div>

                    <div>
                      <label className='bg-black text-white px-2 py-1 rounded-md border-none hover:bg-slate-900' htmlFor="">Line Height</label>
                      <input onChange={(e) => setLineHeight(e.target.value + "rem")} min={"3"} max={"10"} className='border-1 border-black  text-black outline-none rounded-md ml-2  accent-black ' type="range" />
                    </div>


                    {/* ---------------------------Alignment Controllers----------------- */}
                    <div>
                      <label className='bg-black text-white px-2 py-1 rounded-md border-none hover:bg-slate-900' htmlFor="">Align Vertial</label>
                      <input onChange={(e) => setVertical(e.target.value + "%")} max={100} min={-100} className='border-1 border-black  text-black outline-none rounded-md ml-2 accent-black' type="range" />
                    </div>

                    <div>
                      <label className='bg-black text-white px-2 py-1 rounded-md border-none hover:bg-slate-900' htmlFor="">Align Horizontal</label>
                      <input onChange={(e) => setHorizontal(e.target.value + "%")} max={100} min={-100} className='border-1 border-black  text-black outline-none rounded-md ml-2 accent-black ' type="range" />
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