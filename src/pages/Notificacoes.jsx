import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Table, Form, Button } from 'react-bootstrap';

function Notificacoes() {
  const [newAppointmentDate, setNewAppointmentDate] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');

  const handleCreateNotification = async () => {
    const data = {
      dataConsulta: new Date(newAppointmentDate),
      idMedico: Number(selectedDoctorId),
      idPaciente: 1,
    };

    await fetch('https://hackathon-332-api-production.up.railway.app/agenda', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(data),
    });

    // TO-DO: snackbar
    // setShowModal(false);
  };

  return (
    <>
      <Helmet>
        <title>Notificações</title>
      </Helmet>
      <main className="container-fluid">
        <div className="col-lg-4 mx-auto mt-5">
          <h1 className="display-5 fw-bold text-info">Notificações</h1>
          <div className="mx-auto mt-5">
            <h6 className="text-muted mt-5">Envia uma nova notificação para um paciente:</h6>
          </div>
          <div className="mt-3 border p-2">
            <Form.Group controlId="newAppointmentDate">
              <Form.Label>Selecione data e horário:</Form.Label>
              <Form.Control
                type="datetime-local"
                value={newAppointmentDate}
                onChange={(e) => setNewAppointmentDate(e.target.value)}
              />

              <Form.Label className="mt-4">Especialidade:</Form.Label>
              <Form.Select value={selectedDoctorId} onChange={(e) => setSelectedDoctorId(e.target.value)}>
                <option value="">Selecione uma especialidade</option>
                <option key={1} value={1}>
                  'Dr. João - Cardiologista'
                </option>
              </Form.Select>
            </Form.Group>
            <div className="d-grid gap-2 my-5">
              <Button variant="btn btn-success" onClick={handleCreateNotification}>
                Novo agendamento
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Notificacoes;
