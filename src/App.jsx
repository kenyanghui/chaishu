import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import BookDetail from './pages/BookDetail'
import MemoirDetail from './pages/MemoirDetail'
import About from './pages/About'

function App() {
  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:title" element={<BookDetail />} />
          <Route path="/memoir/:id" element={<MemoirDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
