import React, { Fragment, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

export default function App() {
    const citasIniciales = JSON.parse(localStorage.getItem("citas")) ? JSON.parse(localStorage.getItem("citas")) : [];
    const [citas, guardarCita] = useState(citasIniciales);
    localStorage.setItem("citas", JSON.stringify(citas));

    return (
        <Fragment>
            <h1>Administrador de Pacientes</h1>
            <Container>
                <Row className="justify-content-center">
                    <Col xs="4">
                        <Formulario citas={citas} guardarCita={guardarCita} />
                    </Col>
                    <Col xs="4">
                        <Cita citas={citas} guardarCita={guardarCita} />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}
