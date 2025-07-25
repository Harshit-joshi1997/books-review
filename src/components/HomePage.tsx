'use client';
import { useState, useMemo } from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography, FormControl, InputLabel, Select, MenuItem ,Rating} from '@mui/material';


const BOOKS = [
  { id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien', price: 15.99,published: '1997', img: '/images/hobbit.jpg' },
  { id: 2, title: '1984', author: 'George Orwell', price: 12.49,published: '1998', img: '/images/1984.jpg' },
  { id: 3, title: 'Animal Farm', author: 'George Orwell', price: 9.99,published: '1999', img: '/images/animal-farm.jpg' },
  { id: 4, title: 'The Silmarillion', author: 'J.R.R. Tolkien', price: 18.5,published: '2000', img: '/images/silmarillion.jpg' },
  { id: 5, title: 'You Can Win', author: 'Shiv Khera', price: 15.99,published: '1990', img: '/images/Winners.jpg' },
  { id: 6, title: 'On the Calculation of Volume', author: 'Solvej Balle', price: 14.99,published: '1995', img: '/images/calculation-volume.jpg' },
  { id: 7, title: 'Heart Lamp', author: 'Banu Mushtaq', price: 14.00,published: '1992', img: '/images/heartlamp.jpg' },
  { id: 8, title: 'Small Boat', author: 'Vincent Delecroix', price: 14.29,published: '1991', img: '/images/smallboat.jpg' },
  { id: 9, title: 'Hunchback', author: 'Saou Ichikawa', price: 15.99,published: '1990', img: '/images/hunchbhak.jpg' },
  { id: 10, title: 'Perfection', author: 'Vincenzo Latronico', price: 12.99,published: '2002', img: '/images/perfection.jpg' },
  { id: 11, title: 'Under the eye of Big Bird', author: 'Hiromi kawakami', price: 14.99,published: '1993', img: '/images/bigbird.jpg' },
  { id: 13, title: 'Eurotrash', author: 'Christian Kracht', price: 44.99,published: '1987', img: '/images/eurotrash.jpg' },
  { id: 14, title: 'On a Womens Madness', author: 'Astried Roemer', price: 24.99,published: '1977', img: '/images/women.jpg' },
  { id: 15, title: 'There is a monster behind the door', author: 'Gaelle beelem', price: 40.99,published: '1967', img: '/images/monster.jpg' },
  { id: 16, title: 'Playground', author: 'Richard Powers', price: 34.21,published: '1967', img: '/images/playground.jpg' },
];
const HomePage = () => {
    const [authorFilter, setAuthorFilter] = useState('all');

  
  const authors = useMemo(() => ['all', ...new Set(BOOKS.map(b => b.author))], []);

 
  const filtered = useMemo(
    () => (authorFilter === 'all' ? BOOKS : BOOKS.filter(b => b.author === authorFilter)),
    [authorFilter]
  );
  const [reviews, setReviews] = useState<{ [key: number]: number | null }>({});

  const handleRatingChange = (bookId: number, value: number | null) => {
    if (value !== null) {
      setReviews(prev => ({ ...prev, [bookId]: value }));
    }
  };
  return (
    <div style={{ backgroundColor: '#f1f5f7ff', minHeight: '100vh', padding: '20px' , width:'100%'  }}>
    <Box sx={{ p: 4, bgColor: '#213e49ff' }}>
      <FormControl fullWidth sx={{ mb: 4 ,  bgColor: '#410c15ff'}}>
        <InputLabel>Filter by Author</InputLabel>
        <Select
          value={authorFilter}
          label="Filter by Author"
          onChange={(e) => setAuthorFilter(e.target.value)}
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
    </div>
  );
}


export default HomePage