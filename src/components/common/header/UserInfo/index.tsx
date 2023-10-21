import { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameProvider } from '../../../../context';
import {
  BookmarkIcon,
  ChevronDownIcon,
  CrossIcon,
  LogoutIcon,
} from '../../../ui';
import avator from '../../../../assets/images/avatar-icon.png';
import styled from 'styled-components';

type Props = { isLoggedIn: boolean };

const UserInfo: FC<Props> = ({ isLoggedIn }) => {
  const [message, setMessage] = useState(
    'You can use bookmarks by logging in!'
  );

  const { handleLogin, isUserInfoOpen, handleUserInfoOpen, bookmarks } =
    useGameProvider();

  const handleClickInside = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      handleUserInfoOpen(!isUserInfoOpen);
    },
    [handleUserInfoOpen, isUserInfoOpen]
  );

  return (
    <>
      {isLoggedIn ? (
        <StyledUserInfo onClick={handleClickInside}>
          <img src={avator} className="avatar-icon" alt="Avatar" />
          <p className="username">John Smith</p>
          <ChevronDownIcon className="chevron-icon" />
          <ul className={`user-info__list ${isUserInfoOpen ? 'active' : ''}`}>
            <Link to="/user">
              <li className="bookmarks">
                <BookmarkIcon />
                Bookmarks ({bookmarks.length})
              </li>
            </Link>
            <li onClick={handleLogin}>
              <LogoutIcon />
              Log Out
            </li>
          </ul>
        </StyledUserInfo>
      ) : (
        <StyledLogin>
          <Link to="/login" className="login">
            Log In
          </Link>
          {!isLoggedIn && message ? (
            <motion.div
              className="message-container"
              onClick={() => setMessage('')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 2 } }}
            >
              <p>{message}</p>
              <CrossIcon />
            </motion.div>
          ) : null}
        </StyledLogin>
      )}
    </>
  );
};

const StyledUserInfo = styled.div`
  display: flex;
  gap: 1rem;
  color: var(--color-white);
  align-items: center;
  padding: 1rem;
  position: relative;
  cursor: pointer;

  .user-info__list {
    display: flex;
    flex-direction: column;
    width: 20rem;
    position: absolute;
    top: 100%;
    right: 0;
    color: var(--color-body);
    background-color: var(--color-white);
    z-index: 100;
    box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.25);
    border-radius: 0 0 0.5rem 0.5rem;
    overflow: hidden;
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s;

    li {
      display: flex;
      align-items: center;
      padding: 1.2rem 2rem;
      gap: 1rem;
      font-size: 1.6rem;
      list-style: none;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #ccc;
      }

      svg {
        font-size: 2rem;
      }
    }

    &.active {
      visibility: visible;
      opacity: 1;
    }
  }

  .avatar-icon {
    width: 4rem;
  }

  .username {
    font-size: 1.6rem;
  }

  .chevron-icon {
    font-size: 2rem;
    color: var(--color-white);
  }
`;

const StyledLogin = styled.div`
  position: relative;

  .login {
    font-size: 1.6rem;
    padding: 1rem 2rem;
    background-color: #3be0bf;
    border-radius: 0.5rem;
    transition: background-color 0.2s;
    margin-left: 10.3rem;

    &:hover {
      background-color: #46f5d2;
    }
  }
  .message-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    position: absolute;
    width: 35rem;
    padding: 1rem;
    font-size: 1.4rem;
    background-color: #e7fef0;
    right: 0;
    top: 150%;
    z-index: 20;
    border-radius: 1rem;
    cursor: pointer;

    svg {
      border: 0.1rem solid var(--color-body);
      color: var(--color-body);
      font-size: 2rem;
      border-radius: 50%;
      padding: 0.2rem;
    }
  }
`;

export default UserInfo;
