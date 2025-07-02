import React from 'react'
//-------------Image imports
import Image1 from "../assets/img_txtween (16)sjdsd.png"
import Image2 from "../assets/img_txtween (13).png"
import Image3 from "../assets/seedhe maut dl91.png"
import stan from "../assets/mc stan.png"
import virat from "../assets/virat 2.png"
import yabi from "../assets/yabi2.png"
import luke from "../assets/matrix.png"


import { Link, useNavigate } from 'react-router-dom'
import { GridPatternLinearGradient } from './GradientBackground'
import { Github } from 'lucide-react';




const App = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className=' w-screen text-black'>



                <div className='relative  '>

                    <div className='absolute -z-[2] w-full inset-0 bg-slate-100  '>

                        <GridPatternLinearGradient />

                    </div>

                    <div className='h-[80px] backdrop-blur-xl  flex items-center   ' >
                        <header className=' w-[90%] mx-auto  flex justify-between items-center py-2  drop-shadow-slate-400 drop-shadow-3xl'>
                            <h1 className='text-3xl text-yelow-400 font-extrabold font-[Outfit] '>textween</h1>

                            <button className='bg-slate-200 hover:bg-black/20 hover:text-white text-black text-base font-semibold cursor-pointer  px-1.5 py-1.5 rounded-full '> <Link to={"http://github.com/kshitijbhusal"} target='_blank'> <Github size={20} /></Link> </button>


                        </header>
                    </div>

                    <div className='px-4 container mx-auto h-[calc(100vh-80px)] relative flex flex-col  items-center md:mt-4 mt-10'>
                        <div className='px-4 container   flex flex-col '>
                            <h1 className='md:text-4xl text-2xl font-bold mt-6 mb-2  text-center'>
                                Create <span className='text-yellow-400'>Astonishing</span> Image with <span className=' '>txtween</span>.
                            </h1>
                            <p className='bg-re-500 md:text-base text-xs text-center md:font-semibold '>Add eye-catching text between your photo's background and subject. <br /> Perfect for boosting 🚀 views and impressions on social media.</p>

                            <button onClick={() => {
                                navigate("./editor")
                            }} className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50  mt-8 w-fit mx-auto ">
                                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                    Create Now
                                </span>
                            </button>
                        </div>



                        <div className=" w-full  flex items-center justify-center gap-x-4 ">

                            <div className="w-50 blur- hover:animate-pulse opacity-100 transition-all duration-300 hidden ">
                                <img src={Image1} alt="Side Image" className="rounded-lg" />
                            </div>


                            <div className="w-72 scale-80 hover:animate-pulse z-10 transition-all duration-300">
                                <img src={stan} alt="Center Image" className="rounded-xl shadow-lg" />
                            </div>


                            <div className="w-50 blur- hover:animate-pulse opacity-100 transition-all duration-300">
                                <img src={Image3} alt="Side Image" className="rounded-lg" />
                            </div>

                            <div className="w-72 scale-80 hover:animate-pulse z-10 transition-all duration-300">
                                <img src={virat} alt="Center Image" className="rounded-xl shadow-lg" />
                            </div>

                            <div className="w-50 blur- hover:animate-pulse opacity-100 transition-all duration-300">
                                <img src={luke} alt="Side Image" className="rounded-lg" />
                            </div>





                            <div className="w-50 blur- hover:animate-pulse opacity-100 transition-all duration-300 hidden">
                                <img src={yabi} alt="Side Image" className="rounded-lg" />
                            </div>


                        </div>



                    </div>

                </div>




            </div>

        </>
    )
}

export default App



