import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const Detalle = () => {

    const { store, dispatch } = useGlobalReducer()
    const { uid } = useParams()

    
  const [detallesPersonajes, setDetallesPersonajes] = useState({
    name: '',
    birth_year: '',
    homeworld: '',
    species: '',
    films: ''
  });

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


    return (
        <div className="container bg-dark ">
            <div className="card">
                <div className='row'>
                    <div className='imagen col-12 col-md-6 col-lg-5'>
                    <img src="https://lumiere-a.akamaihd.net/v1/images/sw-soulmate-leia-result-quiz-and-poll-images_04527594.jpeg?region=56%2C0%2C889%2C500" className="card-img-top" alt="..." />
                </div>
                    <div className="card-body col-12 col-md-6 col-lg-7">
                    <h5 className="card-title"> {detallesPersonajes.name}</h5>
                    <p className="card-text">
                       <p>Año de nacimiento: {detallesPersonajes.birth_year}
                        </p>
                        <p>
                            Planeta habitual: {detallesPersonajes.homeworld} 
                        </p>
                      <p>
                         Especie: "{detallesPersonajes.species}"
                      </p>
                      <p>
                        Películas en las que aparece: {detallesPersonajes.films}
                      </p>
                        </p>
                    <Link to="/" className="btn btn-primary">Inicio</Link>
                </div>
                </div>
            </div>
        </div>
    )
}