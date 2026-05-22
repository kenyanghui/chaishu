import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import HotBooks from './pages/HotBooks'
import HotBookDetail from './pages/HotBookDetail'
import HotMemoirDetail from './pages/HotMemoirDetail'
import Skills from './pages/Skills'
import HDGallery from './pages/HDGallery'

function RedirectBook() {
  const { title } = useParams()
  return <Navigate to={`/hot/book/${encodeURIComponent(title)}`} replace />
}

function RedirectMemoir() {
  const { id } = useParams()
  return <Navigate to={`/hot/memoir/${id}`} replace />
}

function App() {
  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:title" element={<RedirectBook />} />
          <Route path="/memoir/:id" element={<RedirectMemoir />} />
          <Route path="/about" element={<About />} />
          <Route path="/hot" element={<HotBooks />} />
          <Route path="/hot/book/:title" element={<HotBookDetail />} />
          <Route path="/hot/memoir/:id" element={<HotMemoirDetail />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/hd-gallery" element={<HDGallery />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
