import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    number: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
console.log(process.env.REACT_APP_SERVER_URL);
  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    // Validation: Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      setIsSuccess(false);
      return;
    }


    // API Call to register the user
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}api/auth/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          number: formData.number,
        }
      );

      if (response.status === 201) {
        setMessage("Registration successful!");
        setIsSuccess(true);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          number: "",
        });
            navigate("/login");
      } else {
        setMessage(response.data.message || "Registration failed!");
        setIsSuccess(false);
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Registration failed!");
      } else {
        setMessage("An error occurred. Please try again.");
      }
      setIsSuccess(false);
    }
  };

  return (
    <Container>
      <RegisterBox>
        <h2>Register</h2>
        {message && <Message isSuccess={isSuccess}>{message}</Message>}
        <Form onSubmit={handleRegister}>
          <InputWrapper>
            <label>Username</label>
            <Input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </InputWrapper>
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
            <label>Phone Number</label>
            <Input
              type="tel"
              name="number"
              placeholder="Enter your phone number"
              value={formData.number}
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
          <InputWrapper>
            <label>Confirm Password</label>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </InputWrapper>
          <Button type="submit">Register</Button>
          <LoginLink>
            Already have an account? <a href="/login">Login</a>
          </LoginLink>
        </Form>
      </RegisterBox>
    </Container>
  );
};

export default Register;

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

const RegisterBox = styled.div`
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

const LoginLink = styled.div`
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
  color: ${(props) => (props.isSuccess ? "#38ef7d" : "#ff4d4d")};
`;
