import * as React from 'react';
import { Link } from 'react-router-dom';

declare const axios: any;

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  averageRating?: number;
}

const BookList: React.FC = () => {
  const [books, setBooks] = React.useState<Book[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const [genre, setGenre] = React.useState<string>('');
  const [author, setAuthor] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  React.useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books', {
          params: { page, limit: 10, genre, author }
        });
        setBooks(response.data.books);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError('Failed to fetch books');
      }
    };
    fetchBooks();
  }, [page, genre, author]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Books</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Filter by genre"
          value={genre}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGenre(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Filter by author"
          value={author}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <ul className="space-y-4">
        {books.map((book) => (
          <li key={book._id} className="p-4 bg-gray-100 rounded">
            <Link to={`/books/${book._id}`} className="text-blue-500 hover:underline">
              <h3 className="text-lg font-bold">{book.title}</h3>
            </Link>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Average Rating: {book.averageRating?.toFixed(1) || 'N/A'} / 5</p>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;