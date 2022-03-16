import styled from "@emotion/styled";
import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { FormLabel, Button } from 'react-bootstrap';
import { useStore } from "../../app/stores/store";
import CustomTextInput from '../common/inputs/TextInput';

const Container = styled.div`
    display: flex;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
    height: 100vh;
`

const FormSignIn = styled.div`
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
`;

export default observer(function Login(){
    const { userStore } = useStore();
    return(
        <>
            <Container>
                <FormSignIn>
                    <Formik 
                        initialValues={{email:"", password: "", error: null}}
                        onSubmit={(values, { setErrors }) => userStore.login(values).catch((error) => setErrors({error: error.response.data}))}
                    >
                        {({handleSubmit, isSubmitting, errors}) => (
                            <Form className='form' onSubmit={handleSubmit}>
                                <div className="mb-2">
                                    <CustomTextInput 
                                    name='email' 
                                    placeholder='Email'
                                    />
                                </div>
                                
                                <div className="mb-2">
                                    <CustomTextInput 
                                    name='password' 
                                    placeholder='Password' 
                                    type='password'
                                    />
                                </div>

                                <ErrorMessage 
                                name='error' 
                                render={() => (
                                    <FormLabel color='red' />
                                )}
                                />
                                <div className="d-grid">
                                    <Button as='input' variant='outline-primary' className="mb-3" type='submit' value='Login' />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </FormSignIn>
            </Container> 
        </>
    );
});
 
