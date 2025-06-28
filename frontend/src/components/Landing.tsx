import React from 'react'
//-------------Image imports
import Image1 from "../assets/img_txtween (16)sjdsd.png"
import Image2 from "../assets/img_txtween (13).png"
import Image3 from "../assets/seedhe maut dl91.png"
import stan from "../assets/mc stan.png"
import { Link, useNavigate } from 'react-router-dom'
import { GridPatternLinearGradient } from './GradientBackground'
import { Github } from 'lucide-react';




const App = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='h-screen w-screen  bg-transparent text-black'>



                <div className='relative'>

                    <div className='absolute -z-[2] w-full h-full inset-0 bg-white  '>

                        <GridPatternLinearGradient />
                    </div>

                    <div className='h-[80px] backdrop-blur-xl  px-16  flex items-center  ' >
                        <header className=' w-full flex justify-between items-center px-8 py-2  drop-shadow-slate-400 drop-shadow-3xl'>
                            <h1 className='text-4xl text-yellow-400 font-extrabold font-[Outfit] '>textween</h1>

                            <button className='bg-slate-200 hover:bg-black/20 hover:text-white text-black text-base font-semibold cursor-pointer  px-1.5 py-1.5 rounded-full '> <Link to={"http://github.com/kshitijbhusal"} target='_blank'> <Github size={25} /></Link> </button>


                        </header>
                    </div>

                    <div className=' h-[calc(100vh-80px)] relative   flex flex-col  items-center'>
                        <h1 className='text-3xl font-bold my-8 '>
                            Create <span className='text-yellow-400'>Astonishing</span> Image with <span className=' '>txtween</span>.
                        </h1>

                        <button onClick={() => {
                            navigate("./editor")
                        }} className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50   ">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                Create Now
                            </span>
                        </button>



                        <div className=" flex items-center justify-center gap-x-4 mt-10">

                            <div className="w-50 blur- hover:animate-pulse opacity-50 transition-all duration-300">
                                <img src={Image1} alt="Side Image" className="rounded-lg" />
                            </div>


                            <div className="w-72 scale-90 hover:animate-pulse z-10 transition-all duration-300">
                                <img src={stan} alt="Center Image" className="rounded-xl shadow-lg" />
                            </div>


                            <div className="w-50 blur- hover:animate-pulse opacity-50 transition-all duration-300">
                                <img src={Image3} alt="Side Image" className="rounded-lg" />
                            </div>
                        </div>




                    </div>

                </div>




            </div>

        </>
    )
}

export default App



