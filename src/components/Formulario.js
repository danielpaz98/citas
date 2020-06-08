import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, FormGroup, FormFeedback, Label, Input } from "reactstrap";
import { v4 as uuidv4 } from "uuid";

export default function Formulario({ citas, guardarCita }) {
    const citaInicial = { mascota: "", propietario: "", fecha: "", hora: "", sintomas: "" };
    const [cita, actualizarCita] = useState(citaInicial);
    const [validacion, validacionFormulario] = useState({});
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    function crearCita(cita) {
        guardarCita([...citas, cita]);
    }

    function onChange(e) {
        actualizarCita({ ...cita, [e.target.name]: e.target.value });
        // SE REEMPLAZA EL STATE (VALIDACION) CREANDO UNA COPIA
        // CADA VEZ QUE EL USUARIO ESCRIBA EN EL CAMPO
        validacionFormulario({ ...validacion, [e.target.name]: e.target.value.trim() ? { valid: true } : {} });
    }

    function onSubmit(e) {
        e.preventDefault();
        // SE CONSTRUYE UN OBJETO QUE VA A CONTENER LA VALIDACIÓN DE LOS CAMPOS DEL FORMULARIO
        const validaciones = {};
        Object.keys(cita).forEach((key) => {
            if (cita[key].trim()) {
                validaciones[key] = { valid: true };
                validaciones.enviarFormulario = true;
            } else {
                validaciones[key] = { invalid: true };
                validaciones.enviarFormulario = false;
            }
        });
        // SE ASIGNA ESE OBJETO AL STATE (VALIDACION)
        validacionFormulario(validaciones);
        // SE CREA LA CITA
        if (validaciones.enviarFormulario) {
            cita.id = uuidv4();
            crearCita(cita);
            actualizarCita(citaInicial);
            validacionFormulario({});
        }
    }

    return (
        <Fragment>
            <h2>Crear Cita</h2>
            <Form autoComplete="off" onSubmit={onSubmit}>
                <FormGroup>
                    <Label for="mascota">Nombre Mascota *</Label>
                    <Input id="mascota" name="mascota" onChange={onChange} {...validacion.mascota} value={mascota}></Input>
                    <FormFeedback>Este campo es obligatorio</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="propietario">Nombre Dueño *</Label>
                    <Input
                        id="propietario"
                        name="propietario"
                        onChange={onChange}
                        {...validacion.propietario}
                        value={propietario}
                    ></Input>
                    <FormFeedback>Este campo es obligatorio</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="fecha">Fecha *</Label>
                    <Input
                        type="date"
                        id="fecha"
                        name="fecha"
                        onChange={onChange}
                        {...validacion.fecha}
                        value={fecha}
                    ></Input>
                    <FormFeedback>Este campo es obligatorio</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="hora">Hora *</Label>
                    <Input type="time" id="hora" name="hora" onChange={onChange} {...validacion.hora} value={hora}></Input>
                    <FormFeedback>Este campo es obligatorio</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="sintomas">Síntomas *</Label>
                    <Input
                        type="textarea"
                        id="sintomas"
                        name="sintomas"
                        onChange={onChange}
                        {...validacion.sintomas}
                        value={sintomas}
                    ></Input>
                    <FormFeedback>Este campo es obligatorio</FormFeedback>
                </FormGroup>

                <Button type="submit" color="info" block>
                    Agregar Cita
                </Button>
            </Form>
        </Fragment>
    );
}

Formulario.propTypes = {
    citas: PropTypes.array.isRequired,
    guardarCita: PropTypes.func.isRequired,
};
