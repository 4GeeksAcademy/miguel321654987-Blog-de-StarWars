import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CharacterDetail } from '../components/CharacterDetail.jsx';
import { PlanetDetail } from '../components/PlanetDetail.jsx';
import { VehicleDetail } from '../components/VehicleDetail.jsx';

export const Detalle = ({ tipo }) => { // Recibo el tipo por props
  const { uid } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {

    // Definimos el endpoint basándonos en el "tipo" que llega por props.
    // const: valores que no cambian nunca. let: variables que van a ser reasignadas (endpoint empieza vacío y luego toma el valor según if).
    let endpoint = "";
    if (tipo === "personaje") {
      endpoint = "people";
    } else if (tipo === "planeta") {
      endpoint = "planets";
    } else if (tipo === "vehiculo") {
      endpoint = "vehicles";
    }
    // fetch dinámico en función de endpoint
    fetch(`https://www.swapi.tech/api/${endpoint}/${uid}`)
      .then(res => res.json())
      .then(json => setData(json.result.properties))
      .catch(err => console.error(err));

  }, [uid, tipo]);

  if (!data) return <p>Cargando...</p>;

  return (
    <div className="container bg-dark py-5">
      {/* Si el tipo es personaje, muestra CharacterDetail */}
      {tipo === "personaje" && <CharacterDetail data={data} uid={uid} />}
      {tipo === "planeta" && <PlanetDetail data={data} uid={uid} />}
      {tipo === "vehiculo" && <VehicleDetail data={data} uid={uid} />}
    </div>
  );
};