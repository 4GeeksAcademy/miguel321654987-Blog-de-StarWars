import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()


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


	useEffect(() => {
		obtenerPersonajes();
	}, []);


	return (
		<div className="text-center bg-dark">
			<h1 className="titulo p-3 text-start">Characters</h1>
			<div className="text-center mx-3 d-flex row g-4" >
				{store.personajes.map((item, index) =>
					<div className=" col-12 col-sm-6 col-md-4 col-lg-2" key={index} >
						<div className="card h-100 bg-secondary text-white mb-3">
							<img src={`https://raw.githubusercontent.com/dsmora/star-wars-guide/refs/heads/master/build/assets/img/characters/${item.uid}.jpg`}/>
							<div className="card-body d-flex flex-column text-center align-items-center">
								<h6 className="card-title"> {item.name}</h6>
								<Link to={`/detalle/${item.uid}`}
									className="btn btn-sm w-50 p-0 mt-auto btn-primary btn-outline-danger btn-info">Details</Link>
							</div>
						</div>

					</div>
				)
				}
			</div>

		</div>
	);
}; 