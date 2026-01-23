import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { Character } from "../components/Characters.jsx";
import { Planet } from "../components/Planets.jsx";

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

		const obtenerPlanetas = async () => {
			await fetch(`https://www.swapi.tech/api/planets/`)
				.then(res => res.json())
				.then(data => {
					dispatch({
						type: 'set_planetas',
						payload: data.results
					})
				})
				.catch(err => console.error(err))
		}
		obtenerPlanetas();
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
				{store.personajes.map((item) => (
					<Character
						key={item.uid}
						item={item}
						handleFavorito={handleFavorito}
						esFavorito={store.favoritos.some(fav => fav.id === Number(item.uid))}
					/>
				))}
			</div>
			<h1 className="titulo-characters p-3 text-start">Planets</h1>
			<div className="text-center mx-3 d-flex row g-4" >
				{store.planetas.map((item) => (
					<Planet
						key={item.uid}
						item={item}
						handleFavorito={handleFavorito}
						esFavorito={store.favoritos.some(fav => fav.id === Number(item.uid))}
					/>
				))}
			</div>
		</div>
	);
};