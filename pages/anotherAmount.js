import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Row, Col, Button } from "reactstrap";
import Layout from "../components/Layout";
import Keyboard from "../components/Keyboard";
import InsufficientBalanceModal from "../components/InsufficientBalanceModal";
import ConfirmModal from "../components/ConfirmModal";

const AnotherAmount = () => {
  const router = useRouter();
  // Monto que el usuario va a extraer de la cuenta.
  const [amount, setAmount] = useState("");
  // Boolean que se utiliza para motrar el modal de confirmacion.
  const [showModal, setShowModal] = useState("");
  // Boolean que se utiliza para motrar el modal de saldo insuficiente
  const [insufficientBalance, setInsufficientBalance] = useState(false);
  // Usuario logueado traído del localStorage.
  const user = JSON.parse(localStorage.getItem("user"));
  // Array de usuarios traido del localStorage
  const users = JSON.parse(localStorage.getItem("users"));

  let timer = null;

  useEffect(() => {
    timer = setTimeout(() => {
      redirect("/");
    }, 30000);
    return () => clearTimeout(timer);
  });

  const redirect = (url) => {
    router.push(url);
  };

  const onChangeValue = (val) => {
    clearTimeout(timer);
    setAmount(val);
  };

  const deleteCharacter = () => {
    setAmount("");
  };

  /**
   * Funcion que verifica si el usuario logueado posee el monto a extraer
   * seleccionado, si no posee saldo suficiente se muestra el modal de saldo
   * insuficiente y si todo esta correcto se modifica el valor del saldo
   * en el localStorage y se redirige a la vista de exito.
   */
  const validateAmount = () => {
    const balance = user.balance;
    if (amount > balance) {
      setInsufficientBalance(true);
    } else {
      const index = users.findIndex((u) => u.account === user.account);
      user.balance = user.balance - amount;
      users[index] = user;
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("amount", amount);
      redirect("/success");
    }
  };

  return (
    <Layout title={`Otro monto`}>
      <Row className="mt-5">
        <Col className="text-center">
          <h4>{"$" + (amount === "" ? "0" : amount)}</h4>
        </Col>
        <Col>
          <Keyboard
            onChangeValue={onChangeValue}
            onDeleteCharacter={deleteCharacter}
            onClickContinue={validateAmount}
            disabled={amount === ""}
            value={amount}
          />
        </Col>
      </Row>
      <Button
        color="warning"
        className="text-white border"
        onClick={() => setShowModal(true)}
      >
        {"Cancelar"}
      </Button>
      {showModal && (
        <ConfirmModal
          onDone={() => redirect("/cancellation")}
          isOpen={showModal}
          message={"¿Está seguro que desea cancelar la operación?"}
        />
      )}
      {insufficientBalance && (
        <InsufficientBalanceModal
          onDone={() => setInsufficientBalance(false)}
          isOpen={insufficientBalance}
        />
      )}
    </Layout>
  );
};

export default AnotherAmount;
