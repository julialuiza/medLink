import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Table, Form } from 'react-bootstrap';

function Historico() {
  const [historico, setHistorico] = useState(null);

  const options = {
    day: 'numeric',
    month: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  useEffect(() => {
    fetch('https://hackathon-332-api-production.up.railway.app/historico/1')
      .then((response) => response.json())
      .then((data) => setHistorico(data));
  }, []);

  return (
    <>
      <Helmet>
        <title>Histórico</title>
      </Helmet>
      <main className="container-fluid">
        <div className="col-lg-6 mx-auto mt-5">
          <h1 className="display-5 fw-bold text-info">Histórico médico</h1>

          {historico ? (
            <>
              <div className="mb-3">
                <Form.Label className="mt-4">Paciente:</Form.Label>
                <Form.Select value={''}>
                  <option key={1} value={1}>
                    {historico[0].paciente.nome}
                  </option>
                </Form.Select>
              </div>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Data</th>
                    <th>Local</th>
                    <th>Especialidade</th>
                    <th>Diagnóstico</th>
                    <th>Tratamento</th>
                  </tr>
                </thead>

                <tbody>
                  {historico.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{appointment.paciente.id}</td>
                      <td>{new Date(appointment.dataConsulta).toLocaleString('pt-BR', options).replace(',', ' -')}</td>

                      <td>{appointment.medico.hospital}</td>
                      <td>
                        {appointment.medico.nome} - {appointment.medico.especialidade}
                      </td>
                      <td>{appointment.diagnostico}</td>
                      <td>{appointment.tratamento}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <p className="fw-bold">'Carregando...'</p>
          )}
        </div>
      </main>
    </>
  );
}

export default Historico;
