// BookForm.tsx
import React from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';


interface BookFormData {
  title: string;
  author: string;
  price: number;
  published: string;
  img: string;
}

const BookForm: React.FC = () => {
  const { control,handleSubmit,reset,formState: { errors },
  } = useForm<BookFormData>({
    defaultValues: { title: '', author: '',price: 0,published: '',img: '',
    },
  });

  const onSubmit = async(data: BookFormData) => {
    try {
      console.log('Book Data:', data);
      const response = await axios.post('http://localhost:8000/books', data);
      console.log('Response:', response.data);
      alert('Book added successfully');
      reset();
    } catch (error) {
      console.error('Failed to add book:', error);
      alert('Failed to add book. Please check the console for more details.');
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Add a New Book
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={3}>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Title is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                error={!!errors.title}
                helperText={errors.title?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="author"
            control={control}
            rules={{ required: 'Author is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Author"
                error={!!errors.author}
                helperText={errors.author?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            rules={{
              required: 'Price is required',
              min: { value: 0, message: 'Price must be positive' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price"
                type="number"
                error={!!errors.price}
                helperText={errors.price?.message}
                InputLabelProps={{ shrink: true }}
                
                fullWidth
              />
            )}
          />
          <Controller
            name="published"
            control={control}
            rules={{ required: 'Published date is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Published Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                error={!!errors.published}
                helperText={errors.published?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="img"
            control={control}
            rules={{ required: 'Image URL is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Image URL"
                error={!!errors.img}
                helperText={errors.img?.message}
                fullWidth
              />
            )}
          />
          <Button type="submit" variant="contained" color="primary">
            Add Book
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default BookForm;
