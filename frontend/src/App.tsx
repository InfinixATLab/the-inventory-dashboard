import { Toaster } from 'react-hot-toast'
import './App.css'
import { Home } from './pages/Home'

function App() {

  return (
    <>
      <Toaster position="top-right"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <Home />
    </>
  )
}

export default App
