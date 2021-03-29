import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { Row, Col, Button, Input } from "reactstrap";
import Layout from "../components/Layout";
import ConfirmModal from "../components/ConfirmModal";
import Keyboard from "../components/Keyboard";

const initialAmounts = [
  { amount: 100, quantity: "" },
  { amount: 200, quantity: "" },
  { amount: 500, quantity: "" },
  { amount: 1000, quantity: "" },
];

const Deposit = () => {
  const router = useRouter();
  // Boolean que sirve para mostrar el modal de confirmación.
  const [showModal, setShowModal] = useState(false);
  // Array con los valores y cantidades de los billetes a depositar.
  const [amounts, setAmounts] = useState(initialAmounts);
  // Monto total a depositar.
  const [totalAmount, setTotalAmount] = useState(0);
  // Indice del input actualmente en foco.
  const [index, setIndex] = useState(null);
  // Usuario logueado traído del localStorage.
  const user = JSON.parse(localStorage.getItem("user"));
  // Array de usuarios traido del localStorage
  const users = JSON.parse(localStorage.getItem("users"));
  // Array de usuarios hecho string para que el dependency
  // array pueda comparar mas eficientemente.
  const amountsSt = JSON.stringify(amounts);

  /**
   * Este metodo recorre el array de valores y cantidades
   * y se calcula el monto total a depositar.
   */
  const calculateTotalAmount = useCallback(() => {
    totalAmount !== 0 && setTotalAmount(0);
    let totalValue = 0;
    amounts.forEach((obj) => {
      if (obj.quantity !== "") {
        const value = obj.quantity * obj.amount;
        totalValue = totalValue + value;
      }
    });
    setTotalAmount(totalValue);
  }, [amountsSt, totalAmount]);

  useEffect(() => {
    const timer = setTimeout(() => {
      redirect("/");
    }, 30000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    calculateTotalAmount();
  }, [calculateTotalAmount]);

  const redirect = (url) => {
    router.push(url);
  };

  /**
   * Este metodo setea value en el array de valores y cantidades
   * usando la variable index.
   * @param {number} value - valor proveniente del componente Keyboard,
   * perteneciente al numero que selecciona el usuario
   */
  const onChangeValue = (value) => {
    const newAmounts = [...amounts];
    newAmounts[index].quantity = value;
    setAmounts(newAmounts);
  };

  /**
   * Borra un caracter del inuput perteneciente al index previamente seleccionado
   */
  const deleteCharacter = () => {
    const val = amounts[index].quantity && amounts[index].quantity.slice(0, -1);
    const newAmounts = [...amounts];
    newAmounts[index].quantity = val;
    setAmounts(newAmounts);
  };

  /**
   * Al hacer click en el boton continuar, se suma el valor a depósitar (totalAmount)
   * al saldo del usuario cargado en localStorage, y se vuelve a setear el usuario con
   * el saldo modificado.
   */
  const onClickContinue = () => {
    const index = users.findIndex((u) => u.account === user.account);
    user.balance = user.balance + totalAmount;
    users[index] = user;
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("amount", totalAmount);
    redirect("/success");
  };

  return (
    <Layout title={`Depósito`}>
      <Row className="mt-5">
        <Col className="text-center vertical-center">
          <Row>
            <Col>{"Pesos"}</Col>
            <Col>{"Cantidad"}</Col>
          </Row>
          {amounts.map((am, i) => (
            <Row key={i} className="mt-2">
              <Col className="mt-1">{"$" + am.amount}</Col>
              <Col>
                <Input
                  type="number"
                  name="input"
                  id="input"
                  className="text-center"
                  placeholder={"0"}
                  value={am.quantity}
                  onClick={() => setIndex(i)}
                  onChange={() => {}}
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>
          ))}
        </Col>
        <Col>
          <div className="text-center">{"Monto a depositar"}</div>
          <div className="text-center mb-3 mt-2">
            {"$" + new Intl.NumberFormat("en-IN").format(totalAmount)}
          </div>
          <Keyboard
            onChangeValue={onChangeValue}
            onDeleteCharacter={deleteCharacter}
            onClickContinue={onClickContinue}
            disabled={!totalAmount}
            value={index ? amounts[index].quantity : ""}
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
    </Layout>
  );
};

export default Deposit;
