import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

export default function Cita({ citas, guardarCita }) {
    const titulo = citas.length ? "Administra tus Citas" : "No hay Citas";

    function eliminarCita(id) {
        const cita = citas.filter((cita) => cita.id !== id);
        guardarCita(cita);
    }

    return (
        <Fragment>
            <h2>{titulo}</h2>
            {citas.map(({ id, mascota, propietario, fecha, hora, sintomas }) => (
                <div className="cita" key={id}>
                    <p>
                        Mascota: <span>{mascota}</span>
                    </p>
                    <p>
                        Dueño: <span>{propietario}</span>
                    </p>
                    <p>
                        Fecha: <span>{fecha}</span>
                    </p>
                    <p>
                        Hora: <span>{hora}</span>
                    </p>
                    <p>
                        Síntomas: <span>{sintomas}</span>
                    </p>
                    <Button type="button" className="button eliminar" color="danger" block onClick={() => eliminarCita(id)}>
                        Eliminar
                    </Button>
                </div>
            ))}
        </Fragment>
    );
}

Cita.propTypes = {
    citas: PropTypes.array.isRequired,
    guardarCita: PropTypes.func.isRequired,
};
