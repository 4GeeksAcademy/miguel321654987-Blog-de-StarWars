import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Character } from "../components/Characters.jsx";
import { Planet } from "../components/Planets.jsx";
import { Vehicle } from "../components/Vehicles.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	useEffect(() => {
		// Solo pedimos personajes si el array está vacío. 
		// En este caso, los datos son estáticos, y mejoramos eficiencia y velocidad, y menos llamadas a la API.
		if (store.personajes.length === 0) {
			fetch(`https://www.swapi.tech/api/people/`)
				.then(res => res.json())
				.then(data => {
					dispatch({
						type: 'set_personajes',
						payload: data.results
					})
				})
				.catch(err => console.error(err))
		}
		// Solo pedimos planetas si el array está vacío
		if (store.planetas.length === 0) {
			fetch(`https://www.swapi.tech/api/planets/`)
				.then(res => res.json())
				.then(data => {
					dispatch({
						type: 'set_planetas',
						payload: data.results
					})
				})
				.catch(err => console.error(err))
		}
		// Solo pedimos vehiculos si el array está vacío
		if (store.vehiculos.length === 0) {
			fetch(`https://www.swapi.tech/api/vehicles/`)
				.then(res => res.json())
				.then(data => {
					dispatch({
						type: 'set_vehiculos',
						payload: data.results
					})
				})
				.catch(err => console.error(err))
		}
	}, []);

	// Función para manejar el onClick en el icono
	const handleFavorito = (item, tipo) => { // Añadimos 'tipo', definiremos el endpoint basándonos en el "tipo" que llega por props.
		const nameID = `${item.name}-${item.uid}`; // 'character' o 'planet' o 'vehiculo', las id coincidirían entre ellos
		const esFavorito = store.favoritos.some(fav => fav.id === nameID);

		if (esFavorito) {
			dispatch({ type: "delete_favorito", payload: nameID });
		} else {
			dispatch({
				type: "add_favorito",
				payload: {
					id: nameID,    // ID único para la 'key' y borrar 'character' o 'planet' o 'vehiculo', lo añadimos nosotros
					name: item.name,
					uid: item.uid, //  Aquí guardamos el UID "suelto" para que no esté anidado
					type: tipo     // 'character' o 'planet' o 'vehicle', lo añadimos nosotros
				}
			});
		}
	};


	return (
		<div className=" bg-dark">

			// --- SECCIÓN DE PERSONAJES ---
			<h1 className="titulo-characters p-3 text-start">Characters</h1>
			<div className=" mx-3 row g-4" >
				{store.personajes.map((item) => {
					// Declaramos la constante aquí para usarla en las props de abajo
					const nameID = `${item.name}-${item.uid}`;
					return (
						<Character
							key={item.uid}
							item={item}
							handleFavorito={() => handleFavorito(item, "character")}
							esFavorito={store.favoritos.some(fav => fav.id === nameID)}
						/>
					);
				})}
			</div>

				// --- SECCIÓN DE PLANETAS ---
			<h1 className="titulo-characters p-3 text-start">Planets</h1>
			<div className=" mx-3 row g-4" >
				{store.planetas.map((item) => {
					const nameID = `${item.name}-${item.uid}`;
					return (
						<Planet
							key={item.uid}
							item={item}
							handleFavorito={() => handleFavorito(item, "planet")}
							esFavorito={store.favoritos.some(fav => fav.id === nameID)}
						/>
					);
				})}
			</div>

			// --- SECCIÓN DE VEHICULOS ---
			<h1 className="titulo-characters p-3 text-start">Vehicles</h1>
			<div className=" mx-3 row g-4" >
				{store.vehiculos.map((item) => {
					// Declaramos la constante aquí para usarla en las props de abajo
					const nameID = `${item.name}-${item.uid}`;
					return (
						<Vehicle
							key={item.uid}
							item={item}
							handleFavorito={() => handleFavorito(item, "vehicle")}
							esFavorito={store.favoritos.some(fav => fav.id === nameID)}
						/>
					);
				})}
			</div>
		</div>
	);
};