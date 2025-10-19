import {Routes, Route} from 'react-router-dom'
import Landing from './pages/Landing'
import AboutMe from './pages/AboutMe'
import MyJourney from './pages/MyJourney'
import Projects from './pages/Projects'
import NotFound from './pages/NotFound'
import ContactMe from './pages/ContactMe'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/AboutMe" element={<AboutMe />} />
      <Route path="/MyJourney" element={<MyJourney />} />
      <Route path="/Projects" element={<Projects />} />
      <Route path="/ContactMe" element={<ContactMe />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App