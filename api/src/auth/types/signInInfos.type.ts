import { Tokens } from './tokens.type';
export type SignInInfos = {
  tokens: Tokens;
  user: {
    id: string;
    username: string;
    email: string;
  };
};
