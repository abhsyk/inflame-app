import { FC } from 'react';
import styled from 'styled-components';

const errorMessages: Record<string, string> = {
  'auth/user-not-found': 'メールアドレスまたはパスワードが正しくありません',
  'auth/wrong-password': 'メールアドレスまたはパスワードが正しくありません',
  'auth/invalid-credential': 'メールアドレスまたはパスワードが正しくありません',
  'auth/email-already-in-use': 'このメールアドレスは既に登録されています',
  'auth/weak-password': 'パスワードは6文字以上にしてください',
  'auth/popup-closed-by-user': 'Googleログインがキャンセルされました',
  'auth/passwords-do-not-match': 'パスワードが一致しません',
};

type Props = { code: string };

const AuthErrorMessage: FC<Props> = ({ code }) => {
  const message = errorMessages[code] ?? 'エラーが発生しました。もう一度お試しください。';
  return <StyledError>{message}</StyledError>;
};

const StyledError = styled.p`
  font-size: 1.4rem;
  color: #ff6b6b;
`;

export default AuthErrorMessage;
