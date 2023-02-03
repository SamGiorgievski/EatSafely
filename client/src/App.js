import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Alert, Breadcrumb, Card} from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Breadcrumb>
        <Breadcrumb.Item>Login</Breadcrumb.Item>
        <Breadcrumb.Item>Register</Breadcrumb.Item>
        <Breadcrumb.Item>Logout</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Card.Img src="https://picsum.photos/id/18/1000/500" />
        <Card.Body>
          <Card.Title>
            Image Results
          </Card.Title>
          <Alert variant="danger">Danger!</Alert>
          <Card.Text>
            Wheat contains gluten!
          </Card.Text>
          <Button variant="secondary">Read More</Button>
        </Card.Body>
      </Card>
      <Alert variant="primary">This is a button</Alert>
      <Button>Next</Button>
      </header>
    </div>
  );
}

export default App;
