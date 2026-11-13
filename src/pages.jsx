import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, animate, motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { profile, projects, experience, skills, education } from './data.js'

const Reveal = ({ children, delay = 0, className }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.55, delay, ease: 'easeOut' }}>
    {children}
  </motion.div>
)

const Head = ({ title, sub }) => (
  <div className="head">
    <motion.h1 initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} transition={{ duration: 0.7, delay: 0.15 }}>{title}</motion.h1>
    <p>{sub}</p>
  </div>
)

function Rotator({ words }) {
  const [i, setI] = useState(0)
  useEffect(() => { const t = setInterval(() => setI((n) => (n + 1) % words.length), 2400); return () => clearInterval(t) }, [words])
  return (
    <span className="rotator">
      <AnimatePresence mode="wait">
        <motion.span key={words[i]} initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -28, opacity: 0 }} transition={{ duration: 0.3 }}>
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Count({ to }) {
  const ref = useRef(null)
  const seen = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!seen) return
    const c = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [seen, to])
  return <span ref={ref}>{n}</span>
}

function Tilt({ children, className, ...rest }) {
  const x = useMotionValue(0), y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 20 })
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  return (
    <motion.a className={className} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }} {...rest}>{children}</motion.a>
  )
}

const services = [
  ['Build web apps', 'Responsive React interfaces with Tailwind CSS and Bootstrap that feel quick on any screen.'],
  ['Connect the data', 'REST APIs, MongoDB schemas and Firebase, wired to the interface with React Hooks.'],
  ['Keep it accurate', 'Daily operations discipline: tracked records, verified numbers and zero-error reconciliation.'],
]

const tech = ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Firebase', 'Vite', 'REST APIs', 'Git']

export function Home() {
  const [first, last] = profile.name.split(' ')
  const letters = (word, off) => word.split('').map((c, k) => (
    <motion.span key={k} className="ch" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.6, delay: 0.1 + (off + k) * 0.05, ease: [0.2, 0.8, 0.2, 1] }}>{c}</motion.span>
  ))
  return (
    <>
      <section className="hero">
        <div>
          <motion.p className="hello" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>Hi, I'm</motion.p>
          <h1 className="big"><span className="mask">{letters(first, 0)}</span><span className="mask">{letters(last, first.length)}</span></h1>
          <p className="line">I'm a <Rotator words={profile.roles} /></p>
          <motion.p className="lead" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>{profile.summary}</motion.p>
          <motion.div className="actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }}>
            <Link className="btn solid" to="/projects">View my work</Link>
            <Link className="btn" to="/contact">Contact me</Link>
            <a className="btn ghost" href={`${import.meta.env.BASE_URL}Moiz_Hussain_CV.pdf`} download>Download CV</a>
          </motion.div>
        </div>
        <motion.div className="code" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.7 }}>
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
            <motion.span className="badge b1" animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }}>React</motion.span>
            <motion.span className="badge b2" animate={{ y: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity }}>Node.js</motion.span>
            <div className="dots"><i /><i /><i /></div>
            <pre>{`const moiz = {
  stack: ["MongoDB", "Express",
          "React", "Node"],
  location: "Karachi",
  learning: "Software Eng.",
  available: true,
};`}</pre>
          </motion.div>
        </motion.div>
      </section>

      <div className="marquee" aria-hidden="true"><div>{[...tech, ...tech].map((t, k) => <span key={k}>{t}</span>)}</div></div>

      <section className="stats">
        {[[projects.length, 'live projects'], [experience.length, 'roles so far'], [8, 'core technologies']].map(([n, l], k) => (
          <Reveal key={l} delay={k * 0.1}><b><Count to={n} /></b><span>{l}</span></Reveal>
        ))}
      </section>

      <section className="services">
        <Reveal><h2>What I do</h2></Reveal>
        <div className="cards3 flat">
          {services.map(([t, d], k) => (
            <Reveal key={t} delay={k * 0.1}><div className="svc"><h3>{t}</h3><p>{d}</p></div></Reveal>
          ))}
        </div>
      </section>

      <section className="cards3">
        {[['/projects', 'Projects', `${projects.length} live apps you can open and try.`],
          ['/experience', 'Experience', 'Development and operations, side by side.'],
          ['/about', 'About', 'Skills, education and how I work.']].map(([to, t, d], k) => (
          <Reveal key={to} delay={k * 0.1}>
            <Link to={to} className="navcard"><h3>{t}</h3><p>{d}</p><span className="go">Open</span></Link>
          </Reveal>
        ))}
      </section>
    </>
  )
}

export function About() {
  return (
    <section className="page">
      <Head title="About me" sub="A developer who also runs a real operation." />
      <div className="two">
        <Reveal><p className="lead">{profile.summary}</p><p className="lead">I'm based in {profile.location}, studying for a Diploma in Software Engineering at Aptech while working full time.</p></Reveal>
        <Reveal delay={0.1}>
          <h3>Education</h3>
          <ul className="edu">{education.map((e) => <li key={e.name}><b>{e.name}</b><span>{e.org}{e.when ? `, ${e.when}` : ''}</span></li>)}</ul>
        </Reveal>
      </div>
      {Object.entries(skills).map(([g, items]) => (
        <Reveal key={g} className="sk">
          <h3>{g}</h3>
          <motion.ul className="chips" initial="h" whileInView="s" viewport={{ once: true }} transition={{ staggerChildren: 0.06 }}>
            {items.map((s) => <motion.li key={s} variants={{ h: { opacity: 0, scale: 0.8 }, s: { opacity: 1, scale: 1 } }} whileHover={{ y: -4 }}>{s}</motion.li>)}
          </motion.ul>
        </Reveal>
      ))}
    </section>
  )
}

export function Projects() {
  return (
    <section className="page">
      <Head title="Projects" sub="Each one is live. Open it and click around." />
      <div className="grid">
        {projects.map((p, k) => (
          <Reveal key={p.name} delay={(k % 2) * 0.1}>
            <Tilt className="proj" href={`https://${p.url}`} target="_blank" rel="noreferrer">
              <div className="bar"><i /><i /><i /><span>{p.url}</span></div>
              <div className={`shot v${k}`} aria-hidden="true"><em /><em /><em /></div>
              <div className="pbody"><h3>{p.name}</h3><p>{p.desc}</p>
                <ul className="chips sm">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
                <span className="go">Visit live site</span></div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section className="page">
      <Head title="Experience" sub="Where I've built things and kept things running." />
      <div className="tl">
        <motion.div className="tl-line" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
        {experience.map((e, k) => (
          <Reveal key={e.role} delay={k * 0.1} className="job">
            <i className="node" />
            <p className="when">{e.when}</p>
            <h3>{e.role}</h3>
            <p className="org">{e.org}</p>
            <ul>{e.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Contact() {
  const [f, setF] = useState({ name: '', message: '' })
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard?.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800) }
  const send = (e) => {
    e.preventDefault()
    const body = encodeURIComponent(`${f.message}\n\nFrom: ${f.name}`)
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent('Portfolio message from ' + f.name)}&body=${body}`
  }
  return (
    <section className="page">
      <Head title="Let's talk" sub="I'm open to developer roles and internships." />
      <div className="two">
        <Reveal>
          <a className="contact-card" href={`mailto:${profile.email}`}><span>Email</span><b>{profile.email}</b></a>
          <a className="contact-card" href={`tel:${profile.phone.replace(/\s/g, '')}`}><span>Phone</span><b>{profile.phone}</b></a>
          <button type="button" className="btn copy" onClick={copy}>{copied ? 'Email copied' : 'Copy email address'}</button>
          <div className="contact-card"><span>Location</span><b>{profile.location}</b></div>
        </Reveal>
        <Reveal delay={0.1}>
          <form className="form" onSubmit={send}>
            <label>Your name<input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
            <label>Message<textarea required rows="5" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} /></label>
            <button className="btn solid" type="submit">Send by email</button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
