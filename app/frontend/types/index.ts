export type FlashData = {
  notice?: string;
  alert?: string;
};

export interface AuthUser {
  id: number;
  email: string;
}

export interface PageProps {
  auth?: {
    user?: AuthUser;
  };
  flash?: FlashData;
  [key: string]: unknown;
}

export type SharedProps = PageProps;
