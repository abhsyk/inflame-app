import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LoadingDots } from '../../components/ui';
import { Logo } from '../../components/common';
import useGamesContext from '../../hooks/useGamesContext';
import { FloatingBackground } from '../../styles/GlobalStyles';

const LoginPage: FC = () => {
  const { isLoggedIn, handleLogin } = useGamesContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<{
    email: string;
    password: string;
  }>({ email: 'johnsmith@example.com', password: '123456' });
  const navigate = useNavigate();

  const handleLoginClick = useCallback(() => {
    handleLogin();
  }, [handleLogin]);

  const handleFormValuesChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormValues((prev) => ({ ...prev, [id]: value }));
    },
    []
  );

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        navigate('/');
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, navigate]);

  return (
    <Container>
      <div className="content">
        <Logo />
        <div className="form-container">
          <form>
            <h2>
              Log In
              <span> (Dummy form)</span>
            </h2>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Name"
                value={formValues.email}
                onChange={handleFormValuesChange}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleFormValuesChange}
              />
            </div>
            <button type="button" onClick={handleLoginClick}>
              {isLoading ? <LoadingDots center size={5} /> : 'Log In'}
            </button>
          </form>
        </div>
      </div>
      <FloatingBackground />
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  .content {
    height: calc(100% - 2rem);
    width: calc(100% - 2rem);
    padding: 3rem;

    margin: auto;
    background: linear-gradient(
      200.44deg,
      rgba(31, 52, 240, 0.25) 13.57%,
      rgba(208, 13, 13, 0.22) 98.38%
    );
    background-color: rgba(0, 0, 0, 0.9);
    position: relative;
    /* border: 0.1rem solid rgba(255, 255, 255, 0.4); */
    border-radius: 1rem;
    box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.25);

    .form-container {
      display: grid;
      place-items: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  form {
    display: grid;
    gap: 2rem;
    padding: 3rem;
    margin: auto;
    background-color: rgba(90, 90, 90, 0.3);
    width: 40rem;
    border-radius: 0.5rem;
    color: var(--color-white);
    box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.25);
    border: 0.1rem solid rgba(255, 255, 255, 0.1);

    .input-wrapper {
      display: flex;
      flex-direction: column;
    }
  }

  h2 {
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 1rem;

    span {
      font-size: 1.4rem;
    }
  }

  label {
    font-size: 1.6rem;
    margin-bottom: 0.2rem;
  }

  input,
  button[type='button'] {
    font-size: 1.6rem;
    padding: 0.8rem 1.5rem;
    border: none;
    outline: none;
    border-radius: 0.5rem;
  }

  button[type='button'] {
    height: 3.6rem;
    width: 7.5rem;
    justify-self: start;
    background-color: #3be0bf;
    transition: background-color 0.2s;
    cursor: pointer;
    color: var(--color-body);

    &:hover {
      background-color: #46f5d2;
    }
  }
`;

export default LoginPage;
