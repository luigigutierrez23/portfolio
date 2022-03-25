import { Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

/** Styles */
import 'react-toastify/dist/ReactToastify.css';

/** Components */
import { ToastContainer } from 'react-toastify';
import { Row, Col, Container } from 'react-bootstrap';


/** Custom components */
import Login from '../../components/login/Login';
import Home from '../../components/home/Home';
import NotFound from '../../components/common/errors/NotFound';
import Sidebar from './sidebar/Sidebar';
import NavBar from './NavBar';
import ProjectDetails from '../../components/projects/details/ProjectDetails';
import ProjectDashboard from '../../components/projects/dashboard/ProjectDashboard';

const App = () => {
  return (
    <>
      <ToastContainer position='bottom-right' theme='colored' autoClose={1500} hideProgressBar />
      <Route exact path="/" component={Login} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>   
            <Row className='g-0'>
              <Col xs={2}>
                <Sidebar />
              </Col>
              <Col xs={10}>
                <NavBar />
                <Container style={{ marginTop: "7em" }}>
                  <Switch>
                    <Route path="/overview" component={Home} />
                    <Route exact path="/projects" component={ProjectDashboard} />
                    <Route path="/projects/:id" component={ProjectDetails} />
                    <Route component={NotFound} />
                  </Switch>
                </Container>
              </Col>
            </Row>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
