import { useRouter } from "next/router";
import { Row, Col, Button } from "reactstrap";
import Layout from "../components/Layout";

const Balance = () => {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user"));

  const redirect = (url) => {
    router.push(url);
  };

  return (
    <Layout title={`Su saldo es`}>
      <h5 className="text-center mt-3 mb-3">
        {"$" + new Intl.NumberFormat("en-IN").format(user.balance)}
      </h5>
      <div className="text-center">{"¿Desea realizar otra operación?"}</div>
      <Row className="text-center mt-3">
        <Col>
          <Button
            color="primary"
            className="border"
            onClick={() => redirect("/operations")}
          >
            {"Si"}
          </Button>{" "}
          <Button
            color="warning"
            className="border text-white"
            onClick={() => redirect("/cancellation")}
          >
            {"No"}
          </Button>
        </Col>
      </Row>
    </Layout>
  );
};

export default Balance;
