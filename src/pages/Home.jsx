import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

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
		<div className="text-center">
			<h1>Personajes</h1>
			<div className="text-center mt-5 mx-3 d-flex row g-3" >
					{store.personajes.map((item, index) =>
						<div className="card col-12 col-sm-6 col-md-4 col-lg-3" key={index} >
							<img src="https://lumiere-a.akamaihd.net/v1/images/sw-soulmate-leia-result-quiz-and-poll-images_04527594.jpeg?region=56%2C0%2C889%2C500" className="card-img-top" alt="..." />
							<div className="card-body">
								<h5 className="card-title"> {item.name}</h5>
								<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
								<a href="#" className="btn btn-primary">Go somewhere</a>
							</div>
						</div>
					)
					}
			</div>

		</div>
	);
}; 