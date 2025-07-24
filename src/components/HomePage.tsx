import { useState, useMemo } from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


const BOOKS = [
  { id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien', price: 15.99,published: '1997', img: '/assests/hobbit.jpg' },
  { id: 2, title: '1984', author: 'George Orwell', price: 12.49,published: '1997', img: '/assests/1984.jpg' },
  { id: 3, title: 'Animal Farm', author: 'George Orwell', price: 9.99,published: '1997', img: '/assests/animal-farm.jpg' },
  { id: 4, title: 'The Silmarillion', author: 'J.R.R. Tolkien', price: 18.5,published: '1997', img: '/assests/silmarillion.jpg' },
  { id: 5, title: 'Winners', author: 'Shiv Khera', price: 15.99,published: '1997', img: '/assests/foundation.jpg' },
  { id: 5, title: 'Foundation', author: 'Isaac Asimov', price: 14.99,published: '1997', img: '/assests/foundation.jpg' },
  { id: 5, title: 'Foundation', author: 'Isaac Asimov', price: 14.99,published: '1997', img: '/assests/foundation.jpg' },
  { id: 5, title: 'Foundation', author: 'Isaac Asimov', price: 14.99,published: '1997', img: '/assests/foundation.jpg' },
  { id: 5, title: 'Foundation', author: 'Isaac Asimov', price: 14.99,published: '1997', img: '/assests/foundation.jpg' },
];
const HomePage = () => {
    const [authorFilter, setAuthorFilter] = useState('all');

  
  const authors = useMemo(() => ['all', ...new Set(BOOKS.map(b => b.author))], []);

 
  const filtered = useMemo(
    () => (authorFilter === 'all' ? BOOKS : BOOKS.filter(b => b.author === authorFilter)),
    [authorFilter]
  );
    
  return (
    <Box sx={{ p: 4 }}>
      <FormControl fullWidth sx={{ mb: 4 }}>
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}


export default HomePage