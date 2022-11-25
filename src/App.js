import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer'
import Home from './pages/Home';
import About from './pages/About';
import Notfound from './pages/Notfound';
import { GithubProvider } from './context/github/GithubContext';
import { AlertProvider } from './context/alert/AlertContext';
import User from './components/users/User';


function App() {
  return (
    
    <GithubProvider>
      <AlertProvider>
    <Router>
      <div className="flex flex-col justify-between h-screen">
        <Navbar />
        <main className='container mx-auto
        px-3 pb-12'>
          
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/user/:login' element={<User />} />
            <Route path='/notfound' element= {<Notfound />} />
            <Route path='/*' element= {<Notfound />} />
          </Routes>
        </main>
        <Footer />
      </div>     
    </Router>
    </AlertProvider>
    </GithubProvider>
   
  );
}

export default App;
