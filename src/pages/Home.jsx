import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button, Table, Toast } from 'react-bootstrap';

function Home() {
  const title = 'MedLink';
  const [agenda, setAgenda] = useState(null);
  const [showToast, setShowToast] = useState(false); // State for toast visibility

  const options = {
    day: 'numeric',
    month: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  useEffect(() => {
    fetch('https://hackathon-332-api-production.up.railway.app/agenda')
      .then((response) => response.json())
      .then((data) => setAgenda(data));
  }, []);

  const handleSendNotification = async () => {
    try {
      await fetch('https://hackathon-332-api-production.up.railway.app/notificacao/lembrete/1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setShowToast(true);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <main className="container-fluid">
        <div className="col-lg-8 mx-auto mt-5">
          <h1 className="display-5 fw-bold text-info">{title}</h1>
          <h5 className="text-muted">Bem vindo(a)!</h5>
          <div className="mx-auto mt-5">
            <h6 className="text-muted mt-5">Próximos agendamentos:</h6>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID - Paciente</th>
                <th>Data</th>
                <th>Local</th>
                <th>Especialidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            {agenda ? (
              <tbody>
                {agenda.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>
                      {appointment.paciente.id} - {appointment.paciente.nome}
                    </td>
                    <td>{new Date(appointment.dataConsulta).toLocaleString('pt-BR', options).replace(',', ' -')}</td>
                    <td>{appointment.medico.hospital}</td>
                    <td>
                      {appointment.medico.nome} - {appointment.medico.especialidade}
                    </td>

                    <td>
                      <div className="d-grid gap-2">
                        <Button variant="btn btn-secondary btn-sm" onClick={handleSendNotification}>
                          Enviar lembrete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <p className="fw-bold">'Carregando...'</p>
            )}
          </Table>
        </div>
      </main>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        className=" text-white bg-success  position-absolute bottom-10 start-50 translate-middle-x"
        autohide
        delay={2000}
      >
        <Toast.Body>Lembrete enviado com sucesso!</Toast.Body>
      </Toast>
    </>
  );
}

export default Home;
