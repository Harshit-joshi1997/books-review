import { Routes, Route } from 'react-router-dom';
import LoginFinal from  '../components/LoginFinal';
import SignUp from '../components/SignUp';
import HomePage from '../components/HomePage';

function App() {
  return (

    <Routes>
      
      <Route path="/" element={<LoginFinal />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/home-page" element={<HomePage />} />
      
    </Routes>
  
  );
}

export default App;