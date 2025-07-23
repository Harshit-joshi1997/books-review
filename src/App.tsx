import * as React from 'react';
import {  Routes, Route, Link } from 'react-router-dom';
import Login from '../src/components/Login';
import Signup from '../src/components/Signup';
import AddBookForm from '../src/components/AddBookForm';
import BookList from '../src/components/BookList';
import BookDetails from '../src/components/BookDetails';
import { AuthContext } from '../src/context/AuthContext';
import './App.css'

function App() {

const auth = React.useContext(AuthContext);
  return (
       
    <div className="App">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-3xl font-bold">Book Treasury</h1>
            <div>
            {auth?.user ? (
              <button
                onClick={() => auth.logout()}
                className="hover:underline"
                         
              >
                Logout
              </button>
            ) : (
              <>
              <Link to="/login" className="hover:underline mr-4">Login</Link>
              <Link to="/signup" className="hover:underline">Signup</Link>
              </>
            )}
          </div>
        </div>
      
      
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-book" element={<AddBookForm />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/" element={<BookList />} />
      </Routes>
      </div>
   
  )
}

export default App
