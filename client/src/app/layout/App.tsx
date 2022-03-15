import { Button, Container } from 'react-bootstrap';

function App() {
  return (
    <Container className='p-3'>
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">
          Welcome To React-Bootstrap TypeScript Example
        </h1>
      </Container>
     <Button variant="outline-primary">Primary</Button>{' '}
    </Container>
  );
}

export default App;
