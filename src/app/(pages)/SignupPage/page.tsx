"use client";
import { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Tabs, Tab, Card } from 'react-bootstrap';
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  updateProfile, signInWithPopup, GoogleAuthProvider, onAuthStateChanged,

} from "firebase/auth";
import { app } from '@/app/firebaseConnect';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider(); // 🔽 Google Auth Provider
  const route = useRouter();

  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
  });

  const [activeTab, setActiveTab] = useState('signup');

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const { displayName, email, password } = formData;

    if (activeTab === 'signup') {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });
        console.log("User signed up successfully:", userCredential.user);
      } catch (error: any) {
        console.error("Signup error:", error.code, error.message);
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in successfully:", userCredential.user);
      } catch (error: any) {
        console.error("Login error:", error.code, error.message);
      }
    }
  };

  // 🔽 Google Login Handler
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google sign-in successful:", user);
    } catch (error: any) {
      console.error("Google login error:", error.code, error.message);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User login:", user);
        route.push('/ProfilePage')
      } else {
        console.error("User logout:", user);
      }
    })
  }, [])

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Tabs
            activeKey={activeTab}
            onSelect={(k: any) => {
              setActiveTab(k);
              setFormData({ displayName: '', email: '', password: '' }); // clear form
            }}
            className="mb-3"
          >
            <Tab eventKey="signup" title="Sign Up">
              <form onSubmit={handleSubmit}>
                {activeTab === 'signup' && <Form.Group className="mb-3" controlId="signupDisplayName">
                  <Form.Label>Display Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>}

                <Form.Group className="mb-3" controlId="signupEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="signupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Sign Up
                </Button>
              </form>
              {/* 🔽 Sign up with Google Card */}
              <Card className="mt-3 text-center">
                <Card.Body>
                  <Card.Text>Or</Card.Text>
                  <Button variant="danger" onClick={handleGoogleLogin}>
                    Sign up with Google
                  </Button>
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="login" title="Login">
              <form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="success" type="submit" className="w-100">
                  Login
                </Button>
              </form>
              {/* 🔽 Google Login Card */}
              <Card className="mt-3 text-center">
                <Card.Body>
                  <Card.Text>Or</Card.Text>
                  <Button variant="danger" onClick={handleGoogleLogin}>
                    Sign in with Google
                  </Button>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}
