import { createContext, useState } from 'react'

export const ImageContext: any = createContext("");

export const ImageContextProvider = ({ children }: any) => {
    const [image, setImage] = useState("");
    return <ImageContext.Provider value={{ image, setImage }} >
        {children}
    </ImageContext.Provider >

}
