import * as React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

// It's a good practice to define the shape of your API responses.
interface LoginResponse {
  success: boolean;
  message: string;
}

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

 
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <Button variant="soft">Change mode</Button>;
  }

  return (
    <Select
      variant="soft"
      value={mode}
      onChange={(event, newMode) => {
        setMode(newMode);
      }}
      sx={{ width: 'max-content' }}
    >
      <Option value="system">System</Option>
      <Option value="light">Light</Option>
      <Option value="dark">Dark</Option>
    </Select>
  );
}

export default function LoginFinal() {

const [formData, setFormData] = useState({  email: '', password: '' });
const [error, setError] = useState<string | null>(null);
const navigate = useNavigate();

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
  };
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

       if (!formData.email || !formData.password) {
         setError('Enter both email & password');
          return;
    }
    setError(null);

    try {
      // Using the LoginResponse interface makes your code more type-safe.
      const response = await axios.post<LoginResponse>('http://localhost:8000/login', formData);
      const { success, message } = response.data;

      if (success) {
        navigate('/home-page');
      } else {
        setError(message || 'Invalid credentials');
      }
    } catch (err) { // `err` is of type `unknown`
      let errorMessage = 'Login failed. Please try again.';
      // We check if the error is an Axios error to safely access its properties.
      if (axios.isAxiosError<LoginResponse>(err) && err.response) {
        errorMessage = err.response.data.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    }
  };


  return (
    <main>
      <CssVarsProvider>
        <CssBaseline />
        <Sheet
          sx={{
            width: 300,
            mx: 60, // Using 'auto' for horizontal margin centers the element.
            my: 4, 
            py: 3, 
            px: 2, 
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
            position: 'relative',
          }}
          variant="outlined"
        >
          <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
            <ModeToggle />
          </Box>
          <div style={{ textAlign: 'center' }}>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body-sm">Sign in to continue.</Typography>
          </div>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="johndoe@email.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </FormControl>
            {error && <Typography color="danger" sx={{ mt: 1 }} textAlign="center">{error}</Typography>}
            <Button type="submit" sx={{ mt: 1 }}>Log in</Button>
          </form>
          <Typography
            endDecorator={<Link to="/sign-up">Sign up</Link>}
            sx={{ fontSize: 'sm', alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>
        </Sheet>
      </CssVarsProvider>
    </main>
  );
}
 
