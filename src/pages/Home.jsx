import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

function Home() {
  const title = 'MedLink';
  const [agenda, setAgenda] = useState(null);

  const options = {
    day: 'numeric',
    month: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  useEffect(() => {
    fetch('https://miniature-orbit-q64wrq577wh99q6-8090.app.github.dev/agenda')
      .then((response) => response.json())
      .then((data) => setAgenda(data));
  }, []);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <main className="container-fluid">
        <div className="px-4 py-5 my-5 text-center">
          <h1 className="display-5 fw-bold text-info">{title}</h1>

          <div className="col-lg-12 mx-auto">
            {agenda ? (
              <>
                <div className="mx-auto my-5">
                  <h5 className="text-muted">Paciente: {agenda[0].paciente.nome}!</h5>
                  <h6 className="text-muted mt-4">Próximas consultas:</h6>
                </div>

                <div className="d-flex flex-column align-items-center mb-3">
                  {agenda.map((item, index) => (
                    <ul className="list-group list-group-horizontal mb-3" key={index}>
                      <div className="d-flex flex-row">
                        <div className="col-3">
                          <li className="list-group-item">
                            {new Date(item.dataConsulta).toLocaleString('pt-BR', options).replace(',', ' -')}
                          </li>
                        </div>

                        <div className="col-3">
                          <li className="list-group-item">{item.medico.hospital}</li>
                        </div>

                        <div className="col-3">
                          <li className="list-group-item">{item.medico.nome}</li>
                        </div>

                        <div className="col-3">
                          <li className="list-group-item">{item.medico.especialidade}</li>
                        </div>
                      </div>
                    </ul>
                  ))}
                </div>
              </>
            ) : (
              <p className="fw-bold">'Carregando...'</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
