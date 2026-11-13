import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, MotionConfig, useScroll, useSpring } from 'framer-motion'
import { Home, About, Projects, Experience, Contact } from './pages.jsx'
import { profile } from './data.js'

const links = [['/', 'Home'], ['/about', 'About'], ['/projects', 'Projects'], ['/experience', 'Experience'], ['/contact', 'Contact']]

function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => {
    setOpen(false)
  }, [pathname])
  return (
    <header className="nav">
      <Link to="/" className="logo">MH<span>.</span></Link>
      <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span /><span />
      </button>
      <nav className={open ? 'open' : ''}>
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === '/'}>
            {({ isActive }) => (
              <>
                {isActive && <motion.i layoutId="pill" className="pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <b>{label}</b>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

function Shell() {
  const location = useLocation()
  const { scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  useEffect(() => {
    const move = (e) => {
      document.documentElement.style.setProperty('--mx', e.clientX + 'px')
      document.documentElement.style.setProperty('--my', e.clientY + 'px')
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <>
      <motion.div className="progress" style={{ scaleX: bar }} />
      <div className="bg" aria-hidden="true" />
      <Nav />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <footer className="foot">© {new Date().getFullYear()} {profile.name}. Built with React and Vite.</footer>
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Shell /></HashRouter>
    </MotionConfig>
  )
}
