// import './App.css'
// import { Button } from '@/components/ui/button'
import LoginPage from './pages/login'
import ChatPage from './pages/chat'
import { Toaster } from "@/components/ui/toaster"

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthRoute from './lib/authRoute'
function App() {

  return (
    // <div className="min-h-screen flex items-center justify-center">
    //   你好👋，Tailwind CSS！
    //   <Button>按钮</Button>
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthRoute><ChatPage /></AuthRoute>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>

  )
}

export default App
