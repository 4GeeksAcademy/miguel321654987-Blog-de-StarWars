import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	useEffect(() => {
		const obtenerPersonajes = async () => {
		await fetch(`https://www.swapi.tech/api/people/`)
			.then(res => res.json())
			.then(data => {
				dispatch({
					type: 'set_personajes',
					payload: data.results
				})
			})
			.catch(err => console.error(err))
	}
	obtenerPersonajes();
	}, []);

	// Función para manejar el onClick en el icono
	const handleFavorito = (personaje) => {
		const esFavorito = store.favoritos.some(item => item.id === Number(personaje.uid));

		if (esFavorito) {
			dispatch({
				type: "delete_favorito",
				payload: Number(personaje.uid) // Enviamos el ID para filtrar
			});
		} else {
			dispatch({
				type: "add_favorito",
				payload: { id: Number(personaje.uid), name: personaje.name } // Enviamos objeto con ID
			});
		}
	};

	return (
		<div className="text-center bg-dark">
			<h1 className="titulo-characters p-3 text-start">Characters</h1>
			<div className="text-center mx-3 d-flex row g-4" >
				{store.personajes.map((item, index) => {
					// Verificamos si el ID del personaje actual está en el array de favoritos
					const esFavorito = store.favoritos.some(fav => fav.id === Number(item.uid));

					return (
						<div className="col-12 col-sm-6 col-md-4 col-lg-2" key={index}>
							<div className="card h-100 bg-secondary text-white mb-3">
								<img alt={item.name} src={`https://raw.githubusercontent.com/dsmora/star-wars-guide/refs/heads/master/build/assets/img/characters/${item.uid}.jpg`} />
								<div className="card-body d-flex flex-column text-center align-items-center">
									<div className="d-flex flex-row mb-2" onClick={() => handleFavorito(item)} style={{ cursor: "pointer" }}>
										{esFavorito ? (
											<i className="fa-solid fa-heart small text-warning"></i>
										) : (
											<i className="fa-regular fa-heart small"></i>
										)}
									</div>
									<h4 className="card-title text-danger-emphasis fw-bold">{item.name}</h4>
									<Link to={`/detalle/${item.uid}`} className="btn btn-sm w-75 mt-auto btn-info">Details</Link>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};