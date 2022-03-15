import { useEffect, useState } from 'react';

/** Styles */
import 'react-toastify/dist/ReactToastify.css';

/** Components */
import Loader from './Loader';
import { Button, Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import agent from '../api/agent';
import { User } from '../models/Users';



function App() { 
  const [user, setUser] = useState([] as User[])
  const [loadingInitial, setLoadingInitial] = useState(false)
  useEffect(() => {
    loadUsers();
  }, []);

  // Methods
  const loadUsers = async () => {
    setLoadingInitial(true);
    try {
      const result = await agent.Users.list();
      setUser(result);
      
      setLoadingInitial(false);
    } catch (err) {
      console.error(err);
      setLoadingInitial(false);
    }
  };
  

  if(loadingInitial) return <Loader />

  return (
    <>
      <ToastContainer position='bottom-right' theme='colored' autoClose={1500} hideProgressBar />
      <Container className='p-3'>
        <Container className="p-5 mb-4 bg-light rounded-3">
          <h1 className="header">
            Welcome To React-Bootstrap TypeScript Example
            {user.map((u: User) => (
              <li key={u.uid}>{u.name}</li>
            ))}
          </h1>
        </Container>
        <Button variant="outline-primary">Primary</Button>{' '}
      </Container>
    </>
    
  );
}

export default App;
