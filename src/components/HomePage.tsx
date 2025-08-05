
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
   
  {  title: 'Animal Farm', author: 'George Orwell', price: 9.99,published: '1999', img: '/images/animal-farm.jpg' },
  {  title: 'The Silmarillion', author: 'J.R.R. Tolkien', price: 18.5,published: '2000', img: '/images/silmarillion.jpg' },
  {  title: 'You Can Win', author: 'Shiv Khera', price: 15.99,published: '1990', img: '/images/Winners.jpg' },
  {  title: 'On the Calculation of Volume', author: 'Solvej Balle', price: 14.99,published: '1995', img: '/images/calculation-volume.jpg' },
  {  title: 'Heart Lamp', author: 'Banu Mushtaq', price: 14.00,published: '1992', img: '/images/heartlamp.jpg' },
  {  title: 'Small Boat', author: 'Vincent Delecroix', price: 14.29,published: '1991', img: '/images/smallboat.jpg' },
  {  title: 'Hunchback', author: 'Saou Ichikawa', price: 15.99,published: '1990', img: '/images/hunchbhak.jpg' },
  {  title: 'Perfection', author: 'Vincenzo Latronico', price: 12.99,published: '2002', img: '/images/perfection.jpg' },
  {  title: 'Under the eye of Big Bird', author: 'Hiromi kawakami', price: 14.99,published: '1993', img: '/images/bigbird.jpg' },
  {  title: 'Eurotrash', author: 'Christian Kracht', price: 44.99,published: '1987', img: '/images/eurotrash.jpg' },
  {  title: 'On a Womens Madness', author: 'Astried Roemer', price: 24.99,published: '1977', img: '/images/women.jpg' },
  {  title: 'There is a monster behind the door', author: 'Gaelle beelem', price: 40.99,published: '1967', img: '/images/monster.jpg' },
  {  title: 'Playground', author: 'Richard Powers', price: 34.21,published: '1967', img: '/images/playground.jpg' },
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