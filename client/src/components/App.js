import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Container, Row, Col, Button, Alert, Breadcrumb, Card, Form} from 'react-bootstrap';

function App(props) {

// Enter states, functions, effects..

  return (
    <main className="layout">
      <section className="nav">
        <img src="images/eatsafely_logo.png"></img>
        
      </section>

      <section className = "ocr">
        <img src="/images/yogurt.jpg"></img>
        <div className = "cam_buttons">
          <button type="button" class="btn btn-primary">Upload</button>
          <button type="button" class="btn btn-primary">Camera</button>
        </div>
        <div className="scanner">
          <alert class="alert alert-secondary" role="alert">Upload your image</alert>
        </div>
        <div className="user_ingredients">
          <p>Searching image for...</p>
        </div>
        <div className="navigation">
          <button type="button" class="btn btn-primary">Back</button>
          <button type="button" class="btn btn-primary" disabled>Next</button>
        </div>
      </section>

    </main>
  );
}

export default App;
