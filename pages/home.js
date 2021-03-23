import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Row, Col, Button, Input } from "reactstrap";
import { users as usersArray } from "../users";
import Keyboard from "../components/Keyboard";
import Layout from "../components/Layout";

const regexDni = /[0-9]{0,8}/;
const regexKey = /[0-9]{0,4}/;

const Home = ({}) => {
  const router = useRouter();
  const [dni, setDni] = useState("");
  const [key, setKey] = useState("");
  // String que permite saber el campo en el cual esta
  // escribiendo el usuario en ese momento.
  const [focus, setFocus] = useState("dni");
  // Dendiendo el valor de focus, value toma el contenido de dni o key.
  const value = focus === "dni" ? dni : key;
  // Dendiendo el valor de focus, se cambia el regex para el input.
  const regex = focus === "dni" ? regexDni : regexKey;

  let timer = null;

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(usersArray));
  }, []);

  useEffect(() => {
    timer = setTimeout(() => {
      setDni("");
      setKey("");
    }, 20000);
    return () => clearTimeout(timer);
  });

  const setValue = (val) => {
    focus === "dni" ? setDni(val) : setKey(val);
  };

  const onChangeValue = (val) => {
    clearTimeout(timer);
    const validatedValue = val.match(regex);
    setValue(validatedValue[0]);
  };

  const deleteCharacter = () => {
    const val = value.slice(0, -1);
    setValue(val);
  };

  /**
   * Se valida si los valores en dni y key, corresponden a un usuario registrado,
   * si no es asi, se muestra un alert, si todo esta bien, se redirige a la
   * vista de operaciones y se setea el usuario logueado en localStorage
   */
  const validateUser = () => {
    const user = usersArray.find((obj) => obj.dni === dni && obj.key === key);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/operations");
    } else {
      window.alert("Datos incorrectos");
    }
  };

  return (
    <Layout title={"Cajero Automático TASI"}>
      <Row className="mt-4">
        <Col xs={6}>
          <Row>
            <Col>
              <div className="text-center mt-2 mb-2">Ingrese dni y clave</div>
              <Row className="text-center">
                <Col>
                  <Button
                    color="primary"
                    className="w-50 mt-2 border"
                    onClick={() => setFocus("dni")}
                  >
                    {"DNI"}
                  </Button>
                </Col>
              </Row>
              <Row className="text-center">
                <Col>
                  <Button
                    color="primary"
                    className="w-50 mt-2 border"
                    onClick={() => setFocus("key")}
                  >
                    {"Clave"}
                  </Button>
                </Col>
              </Row>{" "}
            </Col>
          </Row>
        </Col>
        <Col xs={6} className="mb-3 text-center">
          <div className="d-flex justify-content-center">
            <Input
              type="number"
              name="input"
              id="input"
              placeholder={focus === "dni" ? "Dni" : "Clave"}
              className="mb-2 w-55"
              value={value}
              onChange={(e) => onChangeValue(e.target.value)}
            />
          </div>
          <Keyboard
            onChangeValue={onChangeValue}
            onDeleteCharacter={deleteCharacter}
            onClickContinue={validateUser}
            disabled={key === "" || dni === ""}
            value={value}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default Home;
