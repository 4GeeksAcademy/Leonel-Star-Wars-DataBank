import { json } from "react-router";

const getState = ({ getStore, getActions, setStore }) => {
	// people, vehicles and planets entities
	return {
		store: {
			characters: []
		},
		actions: {

			getTotalCharacters: async () => {
				let url = 'https://www.swapi.tech/api/people'
				try {
					const response = await fetch(url, {
						method: 'GET',
						headers: {
							'Content-type': 'aplication/json'
						}
					})

					if (response.ok) {
						const jsonReponse = await response.json()
						const store = getStore()
						setStore({ ...store, characters: jsonReponse.results })

					}
					else {

						throw new Error('The requested it was fail! Check it out!')

					}
				}

				catch (error) {
					console.log('Requested Failed', error)
				}
			}

		}
	};
};

export default getState;
