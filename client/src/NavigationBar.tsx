import { Container, Nav,NavDropdown, Navbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAJhWJKGhwln-9VnNvI1bnHJpOc2GkWkfk",
    authDomain: "fcm-test-client-app.firebaseapp.com",
    projectId: "fcm-test-client-app",
    storageBucket: "fcm-test-client-app.appspot.com",
    messagingSenderId: "847414833906",
    appId: "1:847414833906:web:74372bb02da078c490966b"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);


function handleClick(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    alert("test");
}


function getTokenValue(){
    getToken(messaging, {vapidKey: "BOfVDcgzi3_TRWLRzwe-6L6mV2JRzTB2SvbYf1UuUM7aixpn0Hs0IEjCGUaNZGaBgqFymgz-IhU9ldpSpLZyBXI"}).then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
          console.log("Get Fcm token successfully Token, " + currentToken);
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          // ...
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
}

function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    });
}

function NavigationBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features" onClick={getTokenValue}>Register</Nav.Link>
            <Nav.Link href="#pricing" onClick={requestPermission}>RequestPermission</Nav.Link>
            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;