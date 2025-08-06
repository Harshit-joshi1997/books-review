
'use client';
import { useState, useMemo, useEffect } from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography, FormControl, InputLabel, Select, MenuItem ,Rating} from '@mui/material';
import BookForm from './BookForm';

interface Book {
  id?: string;      // or `id?: number` based on your backend
  title: string;
  author: string;
  price: number;
  published: string;
  img: string;
}


const BOOKS = [
   
  {  author: 'George Orwell' },
  {  title: 'The Silmarillion' },
  {  title: 'You Can Win' },
  {  title: 'On the Calculation of Volume' },
  {  author: 'Banu Mushtaq' },
  {  author: 'Vincent Delecroix' },
  {  author: 'Saou Ichikawa'},
  {  author: 'Vincenzo Latronico'},
  {  author: 'Hiromi kawakami'},
  {  author: 'Christian Kracht'},
  {  author: 'Astried Roemer' },
  {  author: 'Gaelle beelem' },
  {  author: 'Richard Powers'},
];
const HomePage = () => {
    const [authorFilter, setAuthorFilter] = useState('all');
    const authors = useMemo(() => ['all', ...new Set(BOOKS.map(b => b.author))], []);
  
  const [books, setBooks] = useState([]);
// const [authorFilter, setAuthorFilter] = useState('all');
// const [authors, setAuthors] = useState([]);

// useEffect(() => {
//   fetch('http://localhost:8000/books')
//     .then(res => res.json())
//     .then(data => {
//       setBooks(data);
//       setAuthors(['all', ...new Set(data.map(b => b.author))]);
//     })
//     .catch(console.error);
// }, []);

useEffect(() => {
  const url = authorFilter === 'all'
    ? 'http://localhost:8000/books'
    : `http://localhost:8000/books?author=${encodeURIComponent(authorFilter)}`;

  fetch(url)
    .then(res => res.json())
    .then(setBooks)
    .catch(console.error);
}, [authorFilter]);

const filtered = books;
  // const filtered = useMemo(
  //   () => (authorFilter === 'all' ? BOOKS : BOOKS.filter(b => b.author === authorFilter)),
  //   [authorFilter]
  // );
  const [reviews, setReviews] = useState<{ [key: number]: number | null }>({});

  const handleRatingChange = (bookId: number, value: number | null) => {
    if (value !== null) {
      setReviews(prev => ({ ...prev, [bookId]: value }));
    }
  };
  return (
    <div style={{ backgroundColor: '#f8fcfdff', minHeight: '100vh', padding: '20px' , width:'100%'  }}>
    <Box sx={{ p: 4, bgColor: '#02151dff' }}>
      <FormControl fullWidth sx={{ mb: 4 ,  bgColor: '#410c15ff'}}>
        <InputLabel>Filter by Author</InputLabel>
        <Select
          value={authorFilter}
          label="Filter by Author"
          onChange={(e => setAuthorFilter(e.target.value))}
        >
          {authors.map(author => (
            <MenuItem key={author} value={author}>
              {author === 'all' ? 'All Authors' : author}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Grid container spacing={4}>
        {filtered.map(book => (
          <Grid item key={book.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={book.img}
                alt={book.title} 
              />
              
              <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  by {book.author}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  ${book.price.toFixed(2)}
                </Typography>
                                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  Year: {book.published}
                </Typography>
                 <Box sx={{ mt: 2 }}>
                  <Rating
                    name={`rating-${book.id}`}
                    value={reviews[book.id] || null}
                    precision={0.5}
                    onChange={(_, newValue) => handleRatingChange(book.id, newValue)}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
        ))}
        
      </Grid>
    </Box>
    <BookForm />
    </div>
  );
}


export default HomePage