import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

declare const axios: any;

const AddBookForm: React.FC = () => {
  const [title, setTitle] = React.useState<string>('');
  const [author, setAuthor] = React.useState<string>('');
  const [genre, setGenre] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddBook = async () => {
    if (!auth?.user) {
      setError('You must be logged in');
      return;
    }
    try {
      await axios.post(
        'http://localhost:3000/books',
        { title, author, genre },
        { headers: { Authorization: `Bearer ${auth.user.token}` } }
      );
      navigate('/books');
    } catch (err) {
      setError('Failed to add book');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGenre(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button
        onClick={handleAddBook}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Book
      </button>
    </div>
  );
};

export default AddBookForm;