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

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      dataConsulta: '2023-08-25T10:00:00.000Z',
      idMedico: 1,
      idPaciente: 2,
    },
    {
      id: 2,
      dataConsulta: '2023-08-26T14:30:00.000Z',
      idMedico: 2,
      idPaciente: 3,
    },
    // ... other appointments
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newAppointmentDate, setNewAppointmentDate] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedAppointmentId, setEditedAppointmentId] = useState('');
  const [editedAppointmentDate, setEditedAppointmentDate] = useState('');
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [deletionAppointmentId, setDeletionAppointmentId] = useState('');

  const fetchAppointments = async () => {
    // Fetch appointments using GET request
    // For simplicity, let's assume you have a function called fetchAppointments
    // const appointmentsData = await fetchAppointments();
    // setAppointments(appointmentsData);
  };

  useEffect(() => {
    //    fetchAppointments();
  }, []);

  const handleEditAppointment = async () => {
    // Implement logic to edit appointment time
    // Use the PUT endpoint for editing
    await fetch(`https://miniature-orbit-q64wrq577wh99q6-8090.app.github.dev/agenda/${editedAppointmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dataConsulta: editedAppointmentDate }),
    });

    // Refresh the appointments list
    fetchAppointments();
    handleEditModalClose();
  };

  const handleCancel = async (appointmentId) => {
    // Implement logic to cancel appointment
    // Use the DELETE endpoint for canceling
    await fetch(`https://miniature-orbit-q64wrq577wh99q6-8090.app.github.dev/agenda/${appointmentId}`, {
      method: 'DELETE',
    });

    // Refresh the appointments list
    fetchAppointments();
  };

  const handleCreateAppointment = async () => {
    // Implement logic to create a new appointment
    // Use the POST endpoint for creating a new appointment
    const data = {
      dataConsulta: newAppointmentDate,
      idMedico: selectedDoctorId,
      idPaciente: 1,
    };

    await fetch('https://miniature-orbit-q64wrq577wh99q6-8090.app.github.dev/agenda', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Refresh the appointments list
    fetchAppointments();
    setShowModal(false); // Close the modal after creating appointment
  };

  const handleConfirmDelete = async () => {
    // Implement logic to delete appointment
    // Use the DELETE endpoint for deleting
    await fetch(`https://miniature-orbit-q64wrq577wh99q6-8090.app.github.dev/agenda/${deletionAppointmentId}`, {
      method: 'DELETE',
    });

    // Refresh the appointments list
    fetchAppointments();
    handleDeleteModalClose();
  };

  const handleNew = () => {
    setShowModal(true); // Show the modal when the "New Appointment" button is clicked
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
      <main className="container-fluid text-center">
        <div className="col-lg-6 mx-auto">
          <Table striped bordered hover>
            <thead>
              <tr>
                <td colSpan="3">
                  <Button variant="success" onClick={handleNew}>
                    Novo agendamento
                  </Button>
                </td>
              </tr>
              <tr>
                <th>ID</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{new Date(appointment.dataConsulta).toLocaleString('pt-BR', options).replace(',', ' -')}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleEditModalOpen(appointment.id, appointment.dataConsulta)}
                    >
                      Editar
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteModalOpen(appointment.id)}>
                      Cancelar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
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
