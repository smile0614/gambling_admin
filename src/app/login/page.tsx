import { Metadata } from "next";

import LoginForm from "@/components/Login/Login";

export const metadata: Metadata = {
  title: "Admin | Bonenza",
  description: "This is Admin Dashboard of Bonenza",
};

export default function Login() {
  return <LoginForm />;
}
