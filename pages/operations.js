import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Row, Col, Button } from "reactstrap";
import Layout from "../components/Layout";
import ConfirmModal from "../components/ConfirmModal";

const Operations = () => {
  const router = useRouter();
  // Boolean que sirve para mostrar el modal de confirmación.
  const [showModal, setShowModal] = useState(false);
  // Usuario logueado traído del localStorage.
  const user = JSON.parse(localStorage.getItem("user"));

  let timer = null;

  useEffect(() => {
    timer = setTimeout(() => {
      router.push("/");
    }, 30000);
    return () => clearTimeout(timer);
  });

  const redirect = (url) => {
    clearTimeout(timer);
    router.push(url);
  };

  const cancel = () => {
    router.push("/cancellation");
    localStorage.removeItem("user");
  };

  return (
    <Layout title={`Bienvenido ${user.name}`}>
      <h6 className="text-center">{"¿Que operación deseas realizar?"}</h6>
      <Row className="mb-2 mt-3 text-center">
        <Col>
          <Button
            color="primary"
            className="w-75 border"
            onClick={() => redirect("/extraction")}
          >
            {"Extracción"}
          </Button>
        </Col>
        <Col>
          <Button
            className="w-75 border"
            color="primary"
            onClick={() => redirect("/deposit")}
          >
            {"Depósito"}
          </Button>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <Button
            className="w-50 mt-2 border"
            color="primary"
            onClick={() => redirect("/balance")}
          >
            {"Consulta de saldo"}
          </Button>
        </Col>
      </Row>
      <Button
        className="position-relative mt-4 text-white border"
        color="warning"
        onClick={() => setShowModal(true)}
      >
        {"Cancelar"}
      </Button>
      {showModal && (
        <ConfirmModal
          onDone={cancel}
          isOpen={showModal}
          message={"¿Está seguro que desea cancelar la operación?"}
        />
      )}
    </Layout>
  );
};

export default Operations;
