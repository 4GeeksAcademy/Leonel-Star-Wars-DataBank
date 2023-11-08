import { useState } from "react";
import { json } from "react-router";


const getState = ({ getStore, getActions, setStore }) => {
	// people, vehicles and planets entities
	return {
		store: {
			characters: [],
			countGetCharacters: 1,
			countGetPlanets: 1,
			totalPagesCharacters: 0,
			totalAmountCharacters: 0,
			allCharactersProperties: [],
			allPlanetsProperties: [],
			allCharactersShow: [],
			urlApi: "",
		},
		actions: {
			// ////////////////////// tenerlo y revisarlo por si acaso // //////////////////////
			// getTotalCharacters: async () => {
			// 	let count = 1
			// 	const charactersData = []
			// 	let stopFetch = 0

			// 	do {

			// 		let url = `https://www.swapi.tech/api/people`
			// 		try {
			// 			const response = await fetch(url, {
			// 				method: 'GET',
			// 				headers: {
			// 					'Content-type': 'aplication/json'
			// 				}
			// 			})

			// 			if (response.ok) {
			// 				const jsonReponse = await response.json()
			// 				const store = getStore()
			// 				setStore({ ...store, totalPagesCharacters: jsonReponse.total_pages })
			// 				setStore({ ...store, totalAmountCharacters: jsonReponse.total_records })
			// 				setStore({ ...store, urlApi: jsonReponse.next })
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
			// 		console.log(store.totalPagesCharacters)
			// 		stopFetch = store.totalPagesCharacters
			// 	} while (count <= 1)

			// 	const store = getStore()
			// 	console.log(charactersData)
			// 	setStore({ ...store, characters: charactersData })
			// },
			// ////////////////////// tenerlo y revisarlo por si acaso // //////////////////////



			///GET FOR CHARACTERS
			getAllCharacters: async () => {
				const storeForCharacters = getStore()
				let count = 1
				//starts with [] but in the end of the bucle im adding the new characters!
				const charactersAllData = [...storeForCharacters.allCharactersProperties]
				let stopFetch = 0
				do {
					if (Object.keys(storeForCharacters.allCharactersProperties).length > 0) {
						//this IF helps me to call the api one time once I got the first five characters!
						stopFetch = 1
						console.log(storeForCharacters.countGetCharacters)
						count = storeForCharacters.countGetCharacters
						//this condition is because the number 17 doesn't exist 
						if (count === 17) {
							count += 1
							storeForCharacters.countGetCharacters += 1
						}
					}
					else {
						//Getting the first 5 characters
						stopFetch = 5
					}
					let url = `https://www.swapi.tech/api/people/${count}`
					try {
						console.log(count)
						const response = await fetch(url, {
							method: 'GET',
							headers: {
								'Content-type': 'aplication/json'
							}
						})

						if (response.ok) {
							const jsonReponse = await response.json()
							charactersAllData.push(jsonReponse.result)
							storeForCharacters.countGetCharacters += 1
							count += 1
						}
						else {
							const jsonReponse = await response.json()
							if (Object.keys(jsonReponse).length > 0) {
								console.log(jsonReponse.message)
								console.log('You reached all the characters!')
								break
							}

							else {
								throw new Error('The requested it was fail! Check it out!')
							}
						}
					}

					catch (error) {
						console.log('Requested Failed', error)
						console.log('entro a este error?')
					}
				} while (count <= stopFetch)

				console.log(charactersAllData)
				//in this part im rewritting the characters that im reaching!
				setStore({ ...storeForCharacters, allCharactersProperties: charactersAllData })
			},

			///GET FOR PLANETS
			getAllPlanets: async () => {
				const storeForPlanets = getStore()
				let count = 1
				//starts with [] but in the end of the bucle im adding the new characters!
				const planetsAllData = [...storeForPlanets.allPlanetsProperties]
				let stopFetch = 0
				do {
					if (Object.keys(storeForPlanets.allPlanetsProperties).length > 0) {
						//this IF helps me to call the api one time once I got the first five characters!
						stopFetch = 1
						console.log(storeForPlanets.countGetPlanets)
						count = storeForPlanets.countGetPlanets
						//this condition is because the number 17 doesn't exist 

					}
					else {
						//Getting the first 5 planets
						stopFetch = 5
					}
					let url = `https://www.swapi.tech/api/planets/${count}`
					try {
						console.log(count)
						const response = await fetch(url, {
							method: 'GET',
							headers: {
								'Content-type': 'aplication/json'
							}
						})

						if (response.ok) {
							const jsonReponse = await response.json()
							planetsAllData.push(jsonReponse.result)
							storeForPlanets.countGetPlanets += 1
							count += 1
						}
						else {
							const jsonReponse = await response.json()
							if (Object.keys(jsonReponse).length > 0) {
								console.log(jsonReponse.message)
								console.log('You reached all the planets!')
								break
							}

							else {
								throw new Error('The requested it was fail! Check it out!')
							}
						}
					}

					catch (error) {
						console.log('Requested Failed', error)
						console.log('entro a este error?')
					}
				} while (count <= stopFetch)


				//in this part im rewritting the characters that im reaching!
				setStore({ ...storeForCharacters, allPlanetsProperties: planetsAllData })
			}

		}
	};
};

export default getState;
