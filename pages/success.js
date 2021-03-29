import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const Balance = () => {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user"));
  const amount = JSON.parse(localStorage.getItem("amount"));

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => clearTimeout(timer);
  });

  return (
    <Layout
      title={`Su (extracción o depósito) de monto $${new Intl.NumberFormat(
        "en-IN"
      ).format(amount)}, en la cuenta ${user.account}, fue realizado con éxito`}
    />
  );
};

export default Balance;
