export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  username: string;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'other';
  age: number;
};
