import { useState } from "react";
import { json } from "react-router";


const getState = ({ getStore, getActions, setStore }) => {
	// people, vehicles and planets entities
	return {
		store: {
			characters: [],
			totalPagesCharacters: 0,
			totalAmountCharacters: 0,
			allCharactersProperties: [],
			allCharactersShow: [],
		},
		actions: {

			getTotalCharacters: async () => {
				let count = 1
				const charactersData = []
				let stopFetch = 0

				do {
					let url = `https://www.swapi.tech/api/people`
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
							setStore({ ...store, totalPagesCharacters: jsonReponse.total_pages })
							setStore({ ...store, totalAmountCharacters: jsonReponse.total_records })
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
					console.log(store.totalPagesCharacters)
					stopFetch = store.totalPagesCharacters
				} while (count <= 1)

				const store = getStore()
				console.log(charactersData)
				setStore({ ...store, characters: charactersData })
			},


			/////////////////////////////////////////////////////////
			// getAllCharacters: async () => {
			// 	let count = 1
			// 	const charactersAllData = []
			// 	let stopFetch = 0
			// 	do {
			// 		let url = `https://www.swapi.tech/api/people/${count}`
			// 		try {
			// 			const response = await fetch(url, {
			// 				method: 'GET',
			// 				headers: {
			// 					'Content-type': 'aplication/json'
			// 				}
			// 			})

			// 			if (response.ok) {
			// 				const jsonReponse = await response.json()
			// 				// const store = getStore()

			// 				// setCharactersData([...charactersData, jsonReponse.results])
			// 				// console.log(charactersData)
			// 				console.log(jsonReponse.results)
			// 				charactersAllData.push(...jsonReponse.results)
			// 				// setStore({ ...store, totalPagesCharacters: jsonReponse.total_pages })
			// 				count += 1
			// 				console.log(count)
			// 			}
			// 			else {

			// 				throw new Error('The requested it was fail! Check it out!')

			// 			}
			// 		}

			// 		catch (error) {
			// 			console.log('Requested Failed', error)
			// 		}

			// 		// hacer primer un get de los primeros y luego mandar otro get para que me agarre los demas characters! idea interesante para hacer!
			// 		const store = getStore()
			// 		console.log(store.totalAmountCharacters)
			// 		stopFetch = store.totalAmountCharacters
			// 	} while (count <= stopFetch)

			// 	const store = getStore()
			// 	console.log(charactersAllData)
			// 	setStore({ ...store, allCharactersProperties: charactersAllData })
			// }




		}
	};
};

export default getState;
