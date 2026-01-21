import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();

	return (
		<nav className="navbar navbar-dark bg-dark mb-3 px-5 border-bottom border-secondary d-flex align-items-center">
			{/* Añadimos d-flex y align-items-center al Link */}
			<Link to="/" className="text-decoration-none d-flex align-items-center text-warning">
				<i className="fa-solid fa-jedi fa-3x me-3"></i>
				<span className="titulo-jedi navbar-brand mb-0 h1">JEDI ORDER</span>
			</Link>
			<div className="ml-auto">
				{/* Contenedor del Dropdown de Bootstrap */}
				<div className="dropdown ">
					<button className="btn btn-outline-warning shadow-lg d-flex align-items-center fw-bold border-2"
						type="button"
						id="favoritesDropdown"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Favorites
						{/* Contador dinámico */}
						<span className="badge bg-warning ms-2">{store.favoritos.length}</span>
					</button>

					<ul className="dropdown-menu dropdown-menu-end bg-secondary " aria-labelledby="favoritesDropdown" style={{ minWidth: "220px" }}>
						{store.favoritos.length > 0 ? (
							store.favoritos.map((fav, index) => (
								<li key={index} className="dropdown-item d-flex justify-content-between align-items-center text-black">
									<Link to={`/detalle/${fav.id}`} className="text-decoration-none text-warning flex-grow-1">{fav.name}</Link>
									{/* Botón para eliminar del array de favoritos */}
									<i className="fa-solid fa-trash-can text-danger-emphasis ms-2" style={{ cursor: "pointer" }}
										onClick={(e) => { dispatch({ type: "delete_favorito", payload: fav.id }) }}>
									</i>
								</li>
							))
						) : (
							<li className="dropdown-item text-white text-center small p-0">No favorites yet</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};
