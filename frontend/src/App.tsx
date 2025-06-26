import axios from 'axios';
import { FileUp } from 'lucide-react';
import React, { useState } from 'react'
// import { Input } from './components/ui/input'
import { useContext } from 'react';
import { ImageContext } from './contexts/ImageContext';

const App = () => {

  const [bgRemovedImg, setBgRemovedImg] = useState()

  const { image, setImage }: any = useContext(ImageContext)
  const [actualImg, setActualImg] = useState()
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



  return (
    <>
      <section className='h-screen flex justify-center items-center bg-zinc-900 text-white'>

        {bgRemovedImg && actualImg ? (<form action="post" encType='multipart/form-data' onSubmit={handleSubmit} className=' border-1 border-slate-500 rounded-lg drop-shadow-blue-400 drop-shadow-2xl'   >

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
        ) : <div className=' h-[80%] bg-slate-100 w-[60%] flex rounded-md p-4 '>


          <div className=' bg-re-500 relative  w-1/2 p-4 overflow-hidden z-0'>

            {/* Text in middle */}
            <div className='z-2 absolute top-22  ' >
              <h1 className='text-yellow-500 text-[120px] font-bold  inline-block leading-30  stroke-1 '>STEEZ CODES </h1>
            </div>

            {/* Acutal Image */}
            <img className='bg-bue-300  absolute top-0 z-1  ' src={`data:image/jpeg;base64,${actualImg}`} alt="actualImg" />

            {/* BG removed image */}
            <img className='bg-transparent absolute top-0 z-3  ' src={`data:image/jpeg;base64,${import.meta.env.VITE_IMG}`} alt="bg-removed" />

          </div>
          {/* Controllers Div */}
          <div className='w-1/2 bg-geen-500 p-4 flex flex-col justify-between items-end '>
            <div className='flex flex-col gap-y-2' >
              <div>
                <label className='bg-black text-white px-2 py-1 rounded-md border-none hover:bg-slate-900' htmlFor="">Fonts</label>
                <input className='border-1 border-black  text-black outline-none rounded-md' type="text" />
              </div>

              <div>
                <label className='bg-black text-white px-2 py-1 rounded-md border-none hover:bg-slate-900' htmlFor="">Text</label>
                <input className='border-1 border-black  text-black outline-none rounded-md' type="text" />
              </div>

              <div>
                <label className='bg-black text-white px-2 py-1 rounded-md border-none hover:bg-slate-900' htmlFor="">Color</label>
                <input className='border-1 border-black  text-black outline-none rounded-md' type="text" />
              </div>
            </div>
            <div>
              <button className='bg-black text-white px-2 py-1 rounded-md border-none hover:bg-slate-900'>Download</button>
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