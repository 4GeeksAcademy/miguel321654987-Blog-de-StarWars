import { Link } from "react-router-dom";

export const CharacterDetail = ({ data, uid }) => {

    const generarDescripcion = (personaje) => {
        const { name, birth_year, gender, height, mass, eye_color, skin_color } = personaje;

        const tradGenero = gender === "male" ? "a man" : gender === "female" ? "a woman" : "an individual";

        return `${name} is ${tradGenero} born in the year ${birth_year}.
    Physically, they stand out with a height of ${height} cm and a weight of ${mass} kg, featuring distinctive ${eye_color} eyes and ${skin_color} skin color.`
    };

    return (
        <div className="card h-100 text-white bg-dark">
            <div className='row'>
                <div className='imagen col-12 col-md-3 col-lg-3 p-3 '>
                    <img src={`https://raw.githubusercontent.com/dsmora/star-wars-guide/refs/heads/master/build/assets/img/characters/${uid}.jpg`} className="card-img-top " alt="..." />
                </div>
                <div className="card-body col-12 col-md-9 col-lg-9 d-flex row">
                    <h3 className="nombre-detalle card-title fw-bold fs-3"> {data.name}</h3>
                    <p className="card-text text-white-50">
                        {generarDescripcion(data)}
                    </p>
                    <div className='button d-flex justify-content-center'>
                        <Link to="/" className="btn btn-sm w-100 p-0 mt-auto btn-primary btn-outline-danger btn-info">Back to home</Link>
                    </div>
                </div>
                <div className=" row mt-3 py-3 m-auto">
                    <div className="col-md-3 col-6" style={{ overflowX: 'auto' }}>
                        <h6 className=''>Films:</h6>
                        <p className='text-break text-secondary text-truncate'>{data.films}</p>
                    </div>
                    <div className="col-md-3 col-6" style={{ overflowX: 'auto' }}>
                        <h6 className=''>Homeworld:</h6>
                        <p className='text-break text-secondary text-truncate'>{data.homeworld}</p>
                    </div>

                    <div className="col-md-3 col-6" style={{ overflowX: 'auto' }}>
                        <h6 className=''>Created:</h6>
                        <p className='text-break text-secondary text-truncate'>{data.created}</p>
                    </div>
                    <div className="col-md-3 col-6" style={{ overflowX: 'auto' }}>
                        <h6 className=''>Edited:</h6>
                        <p className='text-break text-secondary text-truncate'>{data.edited}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}