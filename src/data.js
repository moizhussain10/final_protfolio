export const profile = {
  name: 'Moiz Hussain',
  roles: ['MERN stack developer', 'React interface builder', 'Operations coordinator'],
  location: 'Karachi, Pakistan',
  email: 'moizh6000@gmail.com',
  phone: '+92 314 2971773',
  summary:
    'I build responsive web apps with MongoDB, Express, React and Node. Outside the code, I run daily logistics: stock counts, dispatch records and cash reconciliation. Both jobs reward the same habit, which is getting the details right.',
}

export const projects = [
  { name: 'MiniHackathon-Delta', url: 'minihackathon-delta.vercel.app', desc: 'An AI tool that writes startup taglines and shows live previews of web code.', stack: ['React', 'Express', 'MongoDB'] },
  { name: 'React Todo App', url: 'react-todo-frontedpart.vercel.app', desc: 'A fast CRUD app on React and Vite, with tasks stored in MongoDB Atlas.', stack: ['React', 'Vite', 'MongoDB Atlas'] },
  { name: 'React Air-for-Share', url: 'react-air-for-share.vercel.app', desc: 'Share text and media between your devices in real time.', stack: ['React', 'Firebase', 'Cloudinary'] },
  { name: 'Ride Sharing App', url: 'unroute.vercel.app', desc: 'Schedule rides in real time and optimize the route.', stack: ['React'] },
]

export const experience = [
  {
    role: 'Operations & Logistics Executive', org: 'Rushhrr, Karachi', when: 'Mar 2026 to present',
    points: [
      'Supervise stock and manage daily inbound and outbound parcels, verifying weights so shipments are accurate.',
      'Keep live records in Google Sheets of pickups, dispatched orders and returned shipments.',
      'Reconcile the amounts collected by couriers and riders each day, with zero errors in the accounts.',
    ],
  },
  {
    role: 'MERN Stack Developer Intern', org: 'Pente Prime, Karachi', when: 'Dec 2025 to Feb 2026',
    points: [
      'Built responsive interfaces with React, Tailwind CSS and Bootstrap.',
      'Managed data flow with React Hooks and connected RESTful APIs for dynamic content.',
      'Supported server logic and MongoDB schemas, using Git and GitHub for version control.',
    ],
  },
]

export const skills = {
  Development: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript (ES6+)', 'Tailwind CSS', 'Firebase', 'Git and GitHub'],
  Operations: ['Inventory management', 'Google Sheets', 'Cash reconciliation', 'Dispatch tracking'],
}

export const education = [
  { name: 'Diploma in Software Engineering (ACCP)', org: 'Aptech Computer Education', when: 'Jan 2026 to present' },
  { name: 'MERN Stack Development Course', org: 'Saylani Mass IT Training (SMIT)', when: '' },
]
