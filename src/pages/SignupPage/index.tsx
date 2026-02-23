import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingDots } from '../../components/ui';
import { Logo } from '../../components/common';
import AuthErrorMessage from '../../components/ui/AuthErrorMessage';
import useGamesContext from '../../hooks/useGamesContext';
import { FloatingBackground } from '../../styles/GlobalStyles';

const SignupPage: FC = () => {
  const { user, isAuthLoading, handleSignupWithEmail, handleLoginWithGoogle } =
    useGamesContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorCode, setErrorCode] = useState<string>('');
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleFormValuesChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormValues((prev) => ({ ...prev, [id]: value }));
    },
    []
  );

  const handleSignupClick = useCallback(async () => {
    setErrorCode('');
    if (formValues.password !== formValues.confirmPassword) {
      setErrorCode('auth/passwords-do-not-match');
      return;
    }
    setIsLoading(true);
    try {
      await handleSignupWithEmail(formValues.email, formValues.password);
    } catch (e: unknown) {
      const code = (e as { code?: string }).code ?? 'unknown';
      setErrorCode(code);
    } finally {
      setIsLoading(false);
    }
  }, [formValues, handleSignupWithEmail]);

  const handleGoogleClick = useCallback(async () => {
    setErrorCode('');
    setIsLoading(true);
    try {
      await handleLoginWithGoogle();
    } catch (e: unknown) {
      const code = (e as { code?: string }).code ?? 'unknown';
      setErrorCode(code);
    } finally {
      setIsLoading(false);
    }
  }, [handleLoginWithGoogle]);

  useEffect(() => {
    if (!isAuthLoading && user) {
      navigate('/');
    }
  }, [user, isAuthLoading, navigate]);

  return (
    <Container>
      <div className="content">
        <Logo />
        <div className="form-container">
          <form>
            <h2>Sign Up</h2>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
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
            <div className="input-wrapper">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={formValues.confirmPassword}
                onChange={handleFormValuesChange}
              />
            </div>
            {errorCode && <AuthErrorMessage code={errorCode} />}
            <button type="button" onClick={handleSignupClick} disabled={isLoading}>
              {isLoading ? <LoadingDots center size={5} /> : 'Sign Up'}
            </button>
            <button
              type="button"
              className="google-btn"
              onClick={handleGoogleClick}
              disabled={isLoading}
            >
              Sign Up with Google
            </button>
            <p className="login-link">
              Already have an account? <Link to="/login">Log In</Link>
            </p>
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
    justify-self: start;
    background-color: #3be0bf;
    transition: background-color 0.2s;
    cursor: pointer;
    color: var(--color-body);

    &:hover {
      background-color: #46f5d2;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &.google-btn {
      background-color: rgba(255, 255, 255, 0.15);
      color: var(--color-white);
      width: 100%;

      &:hover {
        background-color: rgba(255, 255, 255, 0.25);
      }
    }
  }

  .login-link {
    font-size: 1.4rem;
    color: rgba(255, 255, 255, 0.7);

    a {
      color: #3be0bf;
      text-decoration: underline;
    }
  }
`;

export default SignupPage;
