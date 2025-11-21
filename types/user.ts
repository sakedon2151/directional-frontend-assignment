export type UserRequest = {
  email: string;
  password: string;
};

export type UserResponse = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};
