import { Link } from "react-router-dom";

export const PlanetDetail = ({ data, uid }) => {

    const generarDescripcionPlaneta = (planeta) => {
        const { name, climate, diameter, gravity, orbital_period, population, rotation_period, surface_water, terrain } = planeta;

    // Lógica para manejar poblaciones desconocidas o nulas
    const descPoblacion = population === "unknown" 
        ? "an unknown population" 
        : `a population of ${population} inhabitants`;

    return `${name} is a world characterized by an ${climate} climate and ${terrain} terrain. 
    It has a diameter of ${diameter} km and a gravity of ${gravity}. 
    Astronomically, it features a rotation period of ${rotation_period} hours and an orbital period of ${orbital_period} days. 
    Despite having only ${surface_water}% surface water, it hosts ${descPoblacion}.`;
};

    return (
        <div className="card h-100 text-white bg-dark">
            <div className='row'>
                <div className='imagen col-12 col-md-3 col-lg-3 p-3 '>
                    <img src={`https://raw.githubusercontent.com/dsmora/star-wars-guide/refs/heads/master/build/assets/img/planets/${uid}.jpg`} className="card-img-top " alt="..." />
                </div>
                <div className="card-body col-12 col-md-9 col-lg-9 d-flex row">
                    <h3 className="nombre-detalle card-title fw-bold fs-3"> {data.name}</h3>
                    <p className="card-text text-white-50">
                        {generarDescripcionPlaneta(data)}
                    </p>
                    <div className='button d-flex justify-content-center'>
                        <Link to="/" className="btn btn-sm w-100 p-0 mt-auto btn-primary btn-outline-danger btn-info">Back to home</Link>
                    </div>
                </div>
                <div className=" row mt-3 py-3 m-auto">
                    <div className="col-md-6 col-6" style={{ overflowX: 'auto' }}>
                        <h6 className=''>Created:</h6>
                        <p className='text-break text-secondary text-truncate'>{data.created}</p>
                    </div>
                    <div className="col-md-6 col-6" style={{ overflowX: 'auto' }}>
                        <h6 className=''>Edited:</h6>
                        <p className='text-break text-secondary text-truncate'>{data.edited}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}