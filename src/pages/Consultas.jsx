/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button, Table, Modal, Form } from 'react-bootstrap';

function Consultas() {
  const title = 'Consultas';

  const options = {
    day: 'numeric',
    month: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  const [appointments, setAppointments] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newAppointmentDate, setNewAppointmentDate] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedAppointmentId, setEditedAppointmentId] = useState('');
  const [editedAppointmentDate, setEditedAppointmentDate] = useState('');
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [deletionAppointmentId, setDeletionAppointmentId] = useState('');
  const [selectedPatientFilter, setSelectedPatientFilter] = useState('');

  const fetchAppointments = async () => {
    let fetchUrl = 'https://hackathon-332-api-production.up.railway.app/agenda';

    if (selectedPatientFilter !== '') {
      fetchUrl = `https://hackathon-332-api-production.up.railway.app/agenda/paciente/${selectedPatientFilter}`;
    }

    try {
      const response = await fetch(fetchUrl);
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetch('https://hackathon-332-api-production.up.railway.app/agenda')
      .then((response) => response.json())
      .then((data) => setAppointments(data));
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [selectedPatientFilter]);

  const handleEditAppointment = async () => {
    await fetch(`https://hackathon-332-api-production.up.railway.app/agenda/${editedAppointmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dataConsulta: new Date(editedAppointmentDate) }),
    });

    fetchAppointments();
    setSelectedPatientFilter('');
    handleEditModalClose();
  };

  const handleCreateAppointment = async () => {
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
      body: JSON.stringify(data),
    });

    fetchAppointments();
    setSelectedPatientFilter('');
    setShowModal(false);
  };

  const handleConfirmDelete = async () => {
    await fetch(`https://hackathon-332-api-production.up.railway.app/agenda/${deletionAppointmentId}`, {
      method: 'DELETE',
    });

    fetchAppointments();
    setSelectedPatientFilter('');
    handleDeleteModalClose();
  };

  const handleNew = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditModalOpen = (appointmentId, appointmentDate) => {
    setEditedAppointmentId(appointmentId);
    setEditedAppointmentDate(appointmentDate);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditedAppointmentId('');
    setEditedAppointmentDate('');
  };

  const handleDeleteModalOpen = (appointmentId) => {
    setDeletionAppointmentId(appointmentId);
    setShowDeleteConfirmationModal(true);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteConfirmationModal(false);
    setDeletionAppointmentId('');
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <main className="container-fluid">
        <div className="col-lg-6 mx-auto mt-5">
          <h1 className="display-5 fw-bold text-info">Agendamentos</h1>

          <div className="d-grid gap-2 my-5">
            <Button variant="btn btn-success" onClick={handleNew}>
              Novo agendamento
            </Button>
          </div>

          {/*   <div className="mb-3">
            <Form.Label className="mt-4">Paciente:</Form.Label>
            <Form.Select value={selectedPatientFilter} onChange={(e) => setSelectedPatientFilter(e.target.value)}>
              <option value="">Listar todos pacientes</option>

              <option key={1} value={1}>
                João Ricardo Rocha
              </option>

              <option key={2} value={2}>
                Paciente com id 2
              </option>
            </Form.Select>
          </div> */}

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
            {appointments ? (
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.paciente.id}</td>
                    <td>{new Date(appointment.dataConsulta).toLocaleString('pt-BR', options).replace(',', ' -')}</td>
                    <td>{appointment.medico.hospital}</td>
                    <td>
                      {appointment.medico.nome} - {appointment.medico.especialidade}
                    </td>

                    <td>
                      <div className="d-grid gap-2">
                        <Button
                          variant="btn btn-primary btn-sm"
                          onClick={() => handleEditModalOpen(appointment.id, appointment.dataConsulta)}
                        >
                          Editar
                        </Button>

                        <Button variant="btn btn-danger btn-sm" onClick={() => handleDeleteModalOpen(appointment.id)}>
                          Cancelar
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

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Novo agendamento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleCreateAppointment}>
                Confirmar agendamento
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Edit Appointment Modal */}
          <Modal show={showEditModal} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Editar agendamento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="editedAppointmentDate">
                <Form.Label>Selecione nova data e horário:</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={editedAppointmentDate}
                  onChange={(e) => setEditedAppointmentDate(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleEditModalClose}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleEditAppointment}>
                Atualizar agendamento
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Delete Confirmation Modal */}
          <Modal show={showDeleteConfirmationModal} onHide={handleDeleteModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Cancelamento de agendamento</Modal.Title>
            </Modal.Header>
            <Modal.Body>Você tem certeza que deseja cancelar esse agendamento?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleDeleteModalClose}>
                Desistir
              </Button>
              <Button variant="danger" onClick={handleConfirmDelete}>
                Confirmar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </main>
    </>
  );
}

export default Consultas;
