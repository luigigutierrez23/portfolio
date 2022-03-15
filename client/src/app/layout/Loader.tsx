import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

interface IProps {
    inverted?: boolean;
    content?: string;
}

const Loader: React.FC<IProps> = ({ inverted, content }) => {
    return (
        <Container fluid className='d-flex justify-content-center align-items-center' style={{'height': '100vh'}}>
            <Spinner animation='border'>
                <span className="visually-hidden">{content}</span>
            </Spinner> 
        </Container>
    );
  };
  
export default Loader;