import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import SideBar from './components/SideBar.jsx'
import ExplorePage from './Pages/ExplorePage.jsx'
import PatternListPage from './Pages/PatternListPage.jsx'
import LearningCoursesPage from './Pages/LearningCoursesPage.jsx'
import CourseLearningDetailPage from './Pages/CourseLearningDetailPage.jsx'
import CurriculumDetailPage from './Pages/CurriculumDetailPage.jsx'
import PatternDetailPage from './Pages/PatternDetailPage.jsx'
import PaymentPage from './Pages/PaymentPage.jsx'
import MyAccountPage from './Pages/MyAccountPage.jsx'
import SettingsPage from './Pages/SettingsPage.jsx'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/SignUp.jsx'
import SearchPage from './Pages/SearchPage.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F9F6F0', overflow: 'hidden' }}>
      <SideBar />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header />
        
        <main style={{ flex: 1, overflowY: 'auto', borderTop: '1px solid #EDE8DF', borderLeft: '1px solid #EDE8DF' }}>
          <Routes>
            <Route path="/" element={<ExplorePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/patterns" element={<PatternListPage />} />
            <Route path="/learning-course" element={<LearningCoursesPage />} />
            <Route path="/course/:courseId" element={<CourseLearningDetailPage />} />
            <Route path="/curriculum/:curriculumId" element={<CurriculumDetailPage />} />
            <Route path="/pattern/:patternId" element={<PatternDetailPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/my-account" element={<MyAccountPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
