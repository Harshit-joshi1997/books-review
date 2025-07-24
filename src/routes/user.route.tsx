import { Routes, Route } from 'react-router-dom';
import LoginFinal from  '../components/LoginFinal';
import SignUp from '../components/signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginFinal />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
}

export default App;