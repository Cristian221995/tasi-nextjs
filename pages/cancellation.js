import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const Cancellation = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => clearTimeout(timer);
  });

  return <Layout title={"La operación ha sido cancelada"} />;
};

export default Cancellation;
