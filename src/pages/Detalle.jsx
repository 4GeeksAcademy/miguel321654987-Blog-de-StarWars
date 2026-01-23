import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { CharacterDetail } from '../components/CharacterDetail.jsx';


export const Detalle = () => {

  const { store } = useGlobalReducer()
  const { uid } = useParams()

  const [detallesPersonajes, setDetallesPersonajes] = useState({});
  const [detallesPlanetas, setDetallesPlanetas] = useState({});

  //  CARGAR DATOS DEL PERSONAJE
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

      fetch(`https://www.swapi.tech/api/planets/${uid}`)
      .then(res => res.json())
      .then(data => {
        // SWAPI.tech guarda los datos en data.result.properties
        if (data.result) {
          setDetallesPlanetas(data.result.properties);
        }
      })
      .catch(err => console.error("Error:", err));
  }, [uid]);

  const generarDescripcion = (personaje) => {
    const { name, birth_year, gender, height, mass, eye_color, skin_color } = personaje;

    const tradGenero = gender === "male" ? "a man" : gender === "female" ? "a woman" : "an individual";

    return `${name} is ${tradGenero} born in the year ${birth_year}.
    Physically, they stand out with a height of ${height} cm and a weight of ${mass} kg, featuring distinctive ${eye_color} eyes and ${skin_color} skin color.`
  };

  return (
    <div className="container bg-dark ">
      {
         <CharacterDetail data={detallesPersonajes} uid={uid} />
      }

    </div>
  )
}