export interface Tag {
  name: string;
  value: string | number | boolean;
  show?: boolean;
  date?: string;
  description?: string;
  type?: string;
  address?: string;
  displayName?: string;
}

export interface Credentials {
  username: string;
  password: string;
}
