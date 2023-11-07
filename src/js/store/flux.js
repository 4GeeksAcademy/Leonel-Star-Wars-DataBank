import { useState } from "react";
import { json } from "react-router";


const getState = ({ getStore, getActions, setStore }) => {
	// people, vehicles and planets entities
	return {
		store: {
			characters: [],
			totalRecordsCharacters: 0,
			allCharacters: [],
			allCharactersShow: [],
		},
		actions: {

			getTotalCharacters: async () => {
				let count = 1
				let stopFetch = 0
				const charactersData = []
				do {
					let url = `https://www.swapi.tech/api/people?page=${count}&limit=10`
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

							// setCharactersData([...charactersData, jsonReponse.results])
							// console.log(charactersData)
							console.log(jsonReponse.results)
							charactersData.push(...jsonReponse.results)
							setStore({ ...store, totalRecordsCharacters: jsonReponse.total_pages })
							count += 1
							console.log(count)
						}
						else {

							throw new Error('The requested it was fail! Check it out!')

						}
					}

					catch (error) {
						console.log('Requested Failed', error)
					}

					// hacer primer un get de los primeros y luego mandar otro get para que me agarre los demas characters! idea interesante para hacer!
					const store = getStore()
					console.log(store.totalRecordsCharacters)
					stopFetch = store.totalRecordsCharacters
				} while (count <= stopFetch)

				const store = getStore()
				console.log(charactersData)
				setStore({ ...store, characters: charactersData })
				// totalRecordsCharacters - 1

			},



		}
	};
};

export default getState;
