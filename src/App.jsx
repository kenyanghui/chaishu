import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import BookDetail from './pages/BookDetail'
import MemoirDetail from './pages/MemoirDetail'
import About from './pages/About'
import HotBooks from './pages/HotBooks'
import HotBookDetail from './pages/HotBookDetail'
import HotMemoirDetail from './pages/HotMemoirDetail'

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
          <Route path="/hot" element={<HotBooks />} />
          <Route path="/hot/book/:title" element={<HotBookDetail />} />
          <Route path="/hot/memoir/:id" element={<HotMemoirDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
