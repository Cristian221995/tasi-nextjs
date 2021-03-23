import { Row, Col, Button } from "reactstrap";
import PropTypes from "prop-types";

const Keyboard = ({
  onChangeValue,
  onClickContinue,
  onDeleteCharacter,
  disabled,
  value,
}) => {
  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col xs="auto" style={{ width: 110 }}>
          <Button
            color="warning"
            className="text-white w-100 border"
            onClick={() => onChangeValue(value + "1")}
          >
            {"1"}
          </Button>
        </Col>
        <Col xs="auto" style={{ width: 110 }}>
          <Button
            color="warning"
            className="text-white w-100 border"
            onClick={() => onChangeValue(value + "2")}
          >
            {"2"}
          </Button>
        </Col>
        <Col xs="auto" style={{ width: 110 }}>
          <Button
            color="warning"
            className="text-white w-100 border"
            onClick={() => onChangeValue(value + "3")}
          >
            {"3"}
          </Button>
        </Col>
      </Row>
      <Row className="mt-2 d-flex justify-content-center">
        <Col xs="auto" style={{ width: 110 }}>
          <Button
            color="warning"
            className="text-white w-100 border"
            onClick={() => onChangeValue(value + "4")}
          >
            {"4"}
          </Button>
        </Col>
        <Col xs="auto" style={{ width: 110 }}>
          <Button
            color="warning"
            className="text-white w-100 border"
            onClick={() => onChangeValue(value + "5")}
          >
            {"5"}
          </Button>
        </Col>
        <Col xs="auto" style={{ width: 110 }}>
          <Button
            color="warning"
            className="text-white w-100 border"
            onClick={() => onChangeValue(value + "6")}
          >
            {"6"}
          </Button>
        </Col>
      </Row>
      <Row className="mt-2 d-flex justify-content-center">
        <Col xs="auto" style={{ width: 110 }}>
          <Button
            color="warning"
            className="text-white w-100 border"
            onClick={() => onChangeValue(value + "7")}
          >
            {"7"}
          </Button>
        </Col>
        <Col xs="auto" style={{ width: 110 }}>
          <Button
            color="warning"
            className="text-white w-100 border"
            onClick={() => onChangeValue(value + "8")}
          >
            {"8"}
          </Button>
        </Col>
        <Col xs="auto" style={{ width: 110 }}>
          <Button
            color="warning"
            className="text-white w-100 border"
            onClick={() => onChangeValue(value + "9")}
          >
            {"9"}
          </Button>
        </Col>
      </Row>
      <Row className="mt-2 d-flex justify-content-center">
        <Col xs="auto" style={{ width: 110 }}>
          <Button
            color="warning"
            className="text-white w-100 border"
            onClick={onDeleteCharacter}
          >
            {"Borrar"}
          </Button>
        </Col>
        <Col xs="auto" style={{ width: 110 }}>
          <Button
            color="warning"
            className="text-white w-100 border"
            onClick={() => onChangeValue(value + "0")}
          >
            {"0"}
          </Button>
        </Col>
        <Col xs="auto" style={{ width: 110 }}>
          <Button
            color="warning"
            className="text-white w-100 border"
            onClick={onClickContinue}
            style={{ fontSize: 13, height: "100%" }}
            disabled={disabled}
          >
            {"Continuar"}
          </Button>
        </Col>
      </Row>
    </>
  );
};

Keyboard.proptypes = {
  onChangeValue: PropTypes.func,
  onClickContinue: PropTypes.func,
  onDeleteCharacter: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.string,
};

export default Keyboard;
