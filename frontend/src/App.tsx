

// import Editor from './components/Editor'
import Editor from './components/Editor'
import Landing from './components/Landing'
import { BrowserRouter, Routes, Route } from "react-router-dom";



const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path='/' element={<Landing />} />
          <Route path='/editor' element={<Editor />} />

        </Routes>


      </BrowserRouter>
    </>
  )
}

export default App



