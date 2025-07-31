'use client';
import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from 'next/link';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import axios from 'axios';
import { useState, useEffect } from 'react';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
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

export default function SignUp(props: any) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:8000/sign-up', formData);
      console.log('✅ Signup success:', response.data);
      // Optional: Redirect after success
      // router.push('/home-page');
    } catch (error: any) {
      console.error('❌ Signup failed:', error.response?.data || error.message);
    }
  };

  return (
    <main>
      <CssVarsProvider {...props}>
        <CssBaseline />
        <Sheet
          sx={{
            width: 300,
            mx: 65,
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
              <b>Signup!</b>
            </Typography>
            <Typography level="body-sm">Fill all details</Typography>
          </div>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              value={formData.email}
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </FormControl>

          <Button sx={{ mt: 1, mx: 12 }} onClick={handleClick}>
            Submit
          </Button>

          <Typography>
            Already have an account?{' '}
            <Link href="/" passHref>
              Log in
            </Link>
          </Typography>
        </Sheet>
      </CssVarsProvider>
    </main>
  );
}