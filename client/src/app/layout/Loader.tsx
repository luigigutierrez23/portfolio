import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

interface IProps {
    inverted?: boolean;
    content?: string;
}

const LoadingComponent: React.FC<IProps> = ({ inverted, content }) => {
    return (
        <Spinner animation='border'>
            <span className="visually-hidden">{content}</span>
        </Spinner>
    );
  };
  
export default LoadingComponent;