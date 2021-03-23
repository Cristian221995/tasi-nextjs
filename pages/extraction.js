import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Row, Col, Button, Input, Label } from "reactstrap";
import Layout from "../components/Layout";
import ConfirmModal from "../components/ConfirmModal";
import InsufficientBalanceModal from "../components/InsufficientBalanceModal";

const Extraction = () => {
  const router = useRouter();
  // Boolean que sirve para mostrar el modal de confirmación.
  const [showModal, setShowModal] = useState(false);
  // Boolean que sirve para mostrar el modal de saldo insuficiente.
  const [insufficientBalance, setInsufficientBalance] = useState(false);
  // Monto que el usuario va a extraer de la cuenta.
  const [amount, setAmount] = useState(0);
  // Boolean que sirve para saber si el usuario eligio Otro monto, y asi
  // redirigirlo a dicha vista.
  const [anotherAmount, setAnotherAmount] = useState(false);
  // Usuario logueado traído del localStorage.
  const user = JSON.parse(localStorage.getItem("user"));
  // Array de usuarios traido del localStorage
  const users = JSON.parse(localStorage.getItem("users"));

  let timer = null;

  useEffect(() => {
    timer = setTimeout(() => {
      router.push("/");
    }, 30000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    (amount || anotherAmount) && clearTimeout(timer);
  }, [amount, anotherAmount]);

  /**
   * Funcion que verifica si el usuario logueado posee el monto a extraer
   * seleccionado, si el usuario eligio Otro monto, es redirigido a dicha
   * vista, si no posee saldo suficiente se muestra el modal de saldo
   * insuficiente y si todo esta correcto se modifica el valor del saldo
   * en el localStorage y se redirige a la vista de exito.
   */
  const verifyAmount = () => {
    if (anotherAmount) {
      router.push("/anotherAmount");
    } else {
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
        router.push("/success");
      }
    }
  };

  return (
    <Layout title={"Extracción"}>
      <Row className="mt-4">
        <Col className="h-100 border mx-3 bg-white">
          <Row className="mt-2 mb-1">
            <Col>
              <Input
                type="radio"
                name="radio1"
                id="radio1-option2"
                onClick={() => setAmount(500)}
              />{" "}
              <Label check for="radio1-option2">
                $500
              </Label>
            </Col>
          </Row>
          <Row className="mt-1 mb-1">
            <Col>
              <Input
                type="radio"
                name="radio1"
                id="radio1-option2"
                onClick={() => setAmount(2000)}
              />{" "}
              <Label check for="radio1-option2">
                $2000
              </Label>
            </Col>
          </Row>
          <Row className="mt-1 mb-2">
            <Col>
              <Input
                type="radio"
                name="radio1"
                id="radio1-option2"
                onClick={() => setAmount(3000)}
              />{" "}
              <Label check for="radio1-option2">
                $3000
              </Label>
            </Col>
          </Row>
        </Col>
        <Col className="h-100 border mx-3 bg-white">
          <Row className="mt-2 mb-1">
            <Col>
              <Input
                type="radio"
                name="radio1"
                id="radio1-option2"
                onClick={() => setAmount(5000)}
              />{" "}
              <Label check for="radio1-option2">
                $5000
              </Label>
            </Col>
          </Row>
          <Row className="mt-1 mb-1">
            <Col>
              <Input
                type="radio"
                name="radio1"
                id="radio1-option2"
                onClick={() => setAmount(6000)}
              />{" "}
              <Label check for="radio1-option2">
                $6000
              </Label>
            </Col>
          </Row>
          <Row className="mt-1 mb-2">
            <Col>
              <Input
                type="radio"
                name="radio1"
                id="radio1-option2"
                onClick={() => setAnotherAmount(true)}
              />{" "}
              <Label check for="radio1-option2" className="ml-5">
                Otro Monto
              </Label>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="h-100">
        <Col className="text-center">
          <Button
            className="mt-4 text-white border"
            color="warning"
            onClick={() => setShowModal(true)}
          >
            Cancelar
          </Button>
        </Col>
        <Col className="text-center">
          <Button
            className="mt-4 text-white float-right border"
            color="warning"
            onClick={verifyAmount}
            disabled={!anotherAmount && !amount}
          >
            Continuar
          </Button>
        </Col>
      </Row>
      {showModal && (
        <ConfirmModal
          onDone={() => router.push("/cancellation")}
          isOpen={showModal}
          message={"¿Está seguro que desea cancelar la operación?"}
        />
      )}
      {insufficientBalance && (
        <InsufficientBalanceModal
          onDone={() => {}}
          isOpen={insufficientBalance}
        />
      )}
    </Layout>
  );
};

export default Extraction;
