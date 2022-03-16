import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Spinner } from 'react-bootstrap';
import { useStore } from "../../app/stores/store";
import CustomTextInput from '../common/inputs/TextInput';
import * as yup from "yup";
import styled from "styled-components";

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

let schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(6)
})

export default observer(function Login() {
    const { userStore } = useStore();
    return (
        <>
            <Container>
                <FormSignIn>
                    <Formik
                        initialValues={{ email: "", password: "", error: null }}
                        onSubmit={(values, { setErrors }) => userStore.login(values).catch((error) => setErrors({ error: error.response.data.msg }))}
                        validationSchema={schema}
                    >
                        {({ handleSubmit, isSubmitting, errors }) => (
                            <Form className='form' onSubmit={handleSubmit} autoComplete='off'>
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
                                <div className="d-grid">
                                    <Button variant='outline-primary' className="mb-3" type='submit'>
                                        {isSubmitting ? (
                                            <>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                <span className="visually-hidden">Loading...</span>
                                            </>
                                        ) : (
                                            <>
                                                Login
                                            </>
                                        )}
                                    </Button>

                                </div>
                            </Form>
                        )}
                    </Formik>
                </FormSignIn>
            </Container>
        </>
    );
});

