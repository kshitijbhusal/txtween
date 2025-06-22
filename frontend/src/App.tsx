

// import React from 'react'
import { FileUpload } from './components/ui/FileUpload'
import { Input } from './components/ui/input'

const App = () => {
  return (
    <>
      <section className='h-screen flex justify-center items-center bg-zinc-900 text-white'>

        <div>
          <h1 className='text-xl'>
            Insert text to your photo, Get you Asthetics Done.
          </h1>
          <div className='bg-rd-500 flex p-6 backdrop-blur-md border-2 rounded-md'>

            <div className='canvas w-1/2 h-full '>
              <div>

                <FileUpload />
              </div>


            </div>

            <div className='tools w-1/2 h-full  '>


              <div>
                <p>Font</p>
                <Input id='font' />
              </div>

              <button className='bg-black px-2 py-1 text-base rounded-md mt-2 '>Submit</button>


            </div>




          </div>
        </div>
      </section >

    </>
  )
}

export default App