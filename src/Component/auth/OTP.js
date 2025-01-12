import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OTP = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  // Handle OTP input change
  const handleInputChange = (e) => {
    setOtp(e.target.value);
  };

  // Handle OTP submission
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    // API Call to verify OTP
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}api/auth/verify-otp`,
        { otp }
      );

      if (response.status === 200) {
        setMessage("OTP verified successfully!");
        setIsSuccess(true);
        navigate("/dashboard");  
        window.location.reload();
      } else {
        setMessage(response.data.message || "OTP verification failed!");
        setIsSuccess(false);
      }
    } catch (error) {
      if (error.response) {
        setMessage(
          error.response.data.message ||
            "Error occurred during OTP verification."
        );
      } else {
        setMessage("An error occurred. Please try again.");
      }
      setIsSuccess(false);
    }
  };

  return (
    <Container>
      <OtpBox>
        <h2>Enter OTP</h2>
        {message && <Message isSuccess={isSuccess}>{message}</Message>}
        <Form onSubmit={handleOtpSubmit}>
          <InputWrapper>
            <label>OTP</label>
            <Input
              type="text"
              name="otp"
              placeholder="Enter your OTP"
              value={otp}
              onChange={handleInputChange}
              maxLength="6"
              required
            />
          </InputWrapper>
          <Button type="submit">Verify OTP</Button>
        </Form>
      </OtpBox>
    </Container>
  );
};

export default OTP;

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

const OtpBox = styled.div`
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

const Message = styled.div`
  margin-bottom: 20px;
  font-size: 14px;
  color: ${(props) => (props.isSuccess ? "#38ef7d" : "#ff4d4d")};
`;
