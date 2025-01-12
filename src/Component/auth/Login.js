import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State for error/success messages
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}api/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.status === 200) {
          localStorage.setItem("token", response.data.authtoken); 
        navigate("/otp", { state: { user: response.data } });
      } else {
        setMessage(response.data.message || "Login failed!");
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Login failed!");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Container>
      <LoginBox>
        <h2>Login</h2>
        {message && <Message>{message}</Message>}
        <Form onSubmit={handleLogin}>
          <InputWrapper>
            <label>Email</label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <label>Password</label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </InputWrapper>
          <Button type="submit">Login</Button>
          <RegisterLink>
            Don't have an account? <a href="/register">Register</a>
          </RegisterLink>
        </Form>
      </LoginBox>
    </Container>
  );
};

export default Login;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom, #0f2027, #203a43, #2c5364);
  color: #fff;
`;

const LoginBox = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  text-align: center;
  width: 300px;
  color: #fff;

  h2 {
    margin-bottom: 20px;
    color: #fff;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
  text-align: left;

  label {
    font-size: 14px;
    margin-bottom: 5px;
    display: block;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  outline: none;

  &::placeholder {
    color: #ccc;
  }
`;

const Button = styled.button`
  background: linear-gradient(to right, #11998e, #38ef7d);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: linear-gradient(to right, #38ef7d, #11998e);
  }
`;

const RegisterLink = styled.div`
  margin-top: 10px;
  font-size: 14px;

  a {
    color: #1e90ff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Message = styled.div`
  margin-bottom: 20px;
  font-size: 14px;
  color: #ff4d4d;
`;
