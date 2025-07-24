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
import  Link  from 'next/link';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
 // Ensure you have this file for global styles


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

export default function SignUp(props:any) {
   
 
  
  const handleSubmit = async () => {
    try {
      const res = await axios.post('/api/signup', { email, password });
      if (res.data.success) {
        router.push('/home-page');
      }
    } catch (err: any) {
      setError(err.response?.data?.error ?? 'Signup failed');
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
            <FormLabel>Email</FormLabel>
            <Input
              // html input attribute
              name="email"
              type="email"
              placeholder="johndoe@email.com"
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              // html input attribute
              name="password"
              type="password"
              placeholder="password"
              autoComplete='current-password'
            />
          </FormControl>
             <Link href="/home-page" passHref>
      <Button component="a" sx={{ mt: 1 ,mx:12}} onClick={handleSubmit}>
        Submit
      </Button>
      </Link>
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
