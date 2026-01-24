import { Link } from "react-router-dom";

export const Planet = ({ item, esFavorito, handleFavorito }) => {

    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <div className="card h-100 bg-secondary text-white mb-3">
                <img alt={item.name} src={`https://raw.githubusercontent.com/dsmora/star-wars-guide/refs/heads/master/build/assets/img/planets/${item.uid}.jpg`} />
                <div className="card-body d-flex flex-column text-center align-items-center">
                    <div className="d-flex flex-row mb-2" onClick={() => handleFavorito(item)} style={{ cursor: "pointer" }}>
                        {esFavorito ? (
                            <i className="fa-solid fa-heart small text-warning"></i>
                        ) : (
                            <i className="fa-regular fa-heart small"></i>
                        )}
                    </div>
                    <h4 className="card-title text-danger-emphasis fw-bold">{item.name}</h4>
                    <Link to={`/planet/${item.uid}`} className="btn btn-sm w-75 mt-auto btn-info">Details</Link>
                </div>
            </div>
        </div>
    );
}