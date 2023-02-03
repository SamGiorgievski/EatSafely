import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Container, Row, Col, Button, Alert, Breadcrumb, Card, Form} from 'react-bootstrap';

function App(props) {

// Enter states, functions, effects..

  return (
    <main className="layout">
      <section className="nav">
        <img src="images/eatsafely_logo.png"></img>
        
        
        {/* <Container>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="example.gmail.com" />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="passexample" />
            </Form.Group>
            <Button variant="secondary" type="submit">Submit</Button>
          </Form>


          <Breadcrumb>
            <Breadcrumb.Item>Feature 1</Breadcrumb.Item>
            <Breadcrumb.Item>Feature 2</Breadcrumb.Item>
            <Breadcrumb.Item>Feature 3</Breadcrumb.Item>
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
          <Button>Next</Button>
        </Container> */}
      </section>

      <section className = "ocr">
        <img src="/images/yogurt.jpg"></img>
        <div className = "cam_buttons">
          <button type="button">Upload</button>
          <button type="button">Camera</button>
        </div>
      </section>

    </main>
  );
}

export default App;
