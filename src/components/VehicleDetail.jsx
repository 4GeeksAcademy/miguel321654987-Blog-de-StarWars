import { Link } from "react-router-dom";

export const VehicleDetail = ({ data, uid }) => {

    const generarDescripcionVehiculo = (vehiculo) => {
    const {name, model, manufacturer, cost_in_credits, length, crew, passengers, max_atmosphering_speed, cargo_capacity, consumables } = vehiculo;

    const descCoste = cost_in_credits === "unknown" 
        ? "unpriced" 
        : `valued at ${cost_in_credits} credits`;

    return `${name} is a ${model} manufactured by ${manufacturer}. 
    This massive machine, ${descCoste}, measures ${length} meters in length and can reach a maximum atmospheric speed of ${max_atmosphering_speed} km/h. 
    Designed for endurance, it carries a crew of ${crew} and up to ${passengers} passengers, featuring a cargo capacity of ${cargo_capacity} kg and enough consumables to last for ${consumables}.`;
};


    return (
        <div className="card h-100 text-white bg-dark">
            <div className='row'>
                <div className='imagen col-12 col-md-3 col-lg-3 p-3 '>
                    <img src={`https://raw.githubusercontent.com/dsmora/star-wars-guide/refs/heads/master/build/assets/img/vehicles/${uid}.jpg`} className="card-img-top " alt="..." />
                </div>
                <div className="card-body col-12 col-md-9 col-lg-9 d-flex row">
                    <h3 className="nombre-detalle card-title fw-bold fs-3"> {data.name}</h3>
                    <p className="card-text text-white-50">
                        {generarDescripcionVehiculo(data)}
                    </p>
                    <div className='button d-flex justify-content-center'>
                        <Link to="/" className="btn btn-sm w-100 p-0 mt-auto btn-primary btn-outline-danger btn-info">Back to home</Link>
                    </div>
                </div>
                <div className=" row mt-3 py-3 m-auto">
                    <div className="col-md-4 col-6" style={{ overflowX: 'auto' }}>
                        <h6 className=''>Films:</h6>
                        <p className='text-break text-secondary text-truncate'>{data.films}</p>
                    </div>
                    <div className="col-md-4 col-6" style={{ overflowX: 'auto' }}>
                        <h6 className=''>Created:</h6>
                        <p className='text-break text-secondary text-truncate'>{data.created}</p>
                    </div>
                    <div className="col-md-4 col-6" style={{ overflowX: 'auto' }}>
                        <h6 className=''>Edited:</h6>
                        <p className='text-break text-secondary text-truncate'>{data.edited}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}