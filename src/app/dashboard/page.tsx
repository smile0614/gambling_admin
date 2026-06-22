"use client";
import Dashboard from "@/components/Dashboard/Dashborad";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import withAuth from "@/hooks/withAuth";
import { ReactElement } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

// export const metadata: Metadata = {
//   title: "Admin | Bonenza",
//   description: "This is Admin Dashboard of Bonenza",
// };

const Home = () => {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="" />
        <Dashboard />
      </DefaultLayout>
    </>
  );
};

const HomePageAuth = withAuth(Home);

export default HomePageAuth;
