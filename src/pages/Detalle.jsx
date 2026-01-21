import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const Detalle = () => {

  const { store, dispatch } = useGlobalReducer()
  const { uid } = useParams()


  const [detallesPersonajes, setDetallesPersonajes] = useState({});

  //  CARGAR DATOS 
  useEffect(() => {
    fetch(`https://www.swapi.tech/api/people/${uid}`)
      .then(res => res.json())
      .then(data => {
        // SWAPI.tech guarda los datos en data.result.properties
        if (data.result) {
          setDetallesPersonajes(data.result.properties);
        }
      })
      .catch(err => console.error("Error:", err));

    if (uid && store.personajes.length > 0) {
      const detalleDePersonaje = store.personajes.find(personaje => personaje.uid === Number(uid));
      if (detalleDePersonaje) {
        setDetallesPersonajes(detalleDePersonaje);
      }
    }
  }, [uid]);
  
  const generarDescripcion = (personaje) => {
    // 1. Extraemos las propiedades
    const { name, birth_year, gender, height, mass, eye_color } = personaje;

    // 2. Traducción simple de términos técnicos
    const tradGenero = gender === "male" ? "a man" : gender === "female" ? "a woman" : "an individual";

    // 3. Construcción del string dinámico
    return `${name} is ${tradGenero} born in the year ${birth_year}.
    Physically, they stand out with a height of ${height} cm and a weight of ${mass} kg, featuring distinctive ${eye_color} eyes.`
  };


  return (
    <div className="container bg-dark ">
      <div className="card h-100 text-white bg-dark">
        <div className='row'>
          <div className='imagen col-12 col-md-3 col-lg-3 p-3 '>
            <img src={`https://raw.githubusercontent.com/dsmora/star-wars-guide/refs/heads/master/build/assets/img/characters/${uid}.jpg`} className="card-img-top " alt="..." />
          </div>
          <div className="card-body col-12 col-md-9 col-lg-9 d-flex row">
            <h3 className="nombre-detalle card-title fw-bold fs-3"> {detallesPersonajes.name}</h3>
            <p className="card-text text-white-50">
              {generarDescripcion(detallesPersonajes)}
            </p>
            <div className='button d-flex justify-content-center'>
              <Link to="/" className="btn btn-sm w-100 p-0 mt-auto btn-primary btn-outline-danger btn-info">Back to home</Link>
            </div>
          </div>
          <div className=" row mt-3 py-3 m-auto">
            <div className="col-md-3 col-6" style={{ overflowX: 'auto' }}>
              <h6 className=''>Films:</h6>
              <p className='text-break text-secondary text-truncate'>{detallesPersonajes.films}</p>
            </div>
            <div className="col-md-3 col-6" style={{ overflowX: 'auto' }}>
              <h6 className=''>Homeworld:</h6>
              <p className='text-break text-secondary text-truncate'>{detallesPersonajes.homeworld}</p>
            </div>
            
             <div className="col-md-3 col-6" style={{ overflowX: 'auto' }}>
              <h6 className=''>Created:</h6>
              <p className='text-break text-secondary text-truncate'>{detallesPersonajes.created}</p>
            </div>
             <div className="col-md-3 col-6" style={{ overflowX: 'auto' }}>
              <h6 className=''>Edited:</h6>
              <p className='text-break text-secondary text-truncate'>{detallesPersonajes.edited}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}