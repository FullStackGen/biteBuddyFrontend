export type Theme = "light" | "dark";

export interface ButtonsData {
  id: string;
  name: string;
  route: string;
  component: string;
  icon?: string; // Optional icon property
}

export interface SignUpPayload {
    name:string,
    email:string,
    phoneNumber:string,
    password:"{{userPassword}}",
    addresses?:any[],
    role:string
}