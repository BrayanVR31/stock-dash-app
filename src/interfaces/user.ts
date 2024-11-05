interface User {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  image?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export { User };
