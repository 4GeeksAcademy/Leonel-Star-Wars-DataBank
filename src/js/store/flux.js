import { ElectricScooterSharp } from "@mui/icons-material";
import { useState } from "react";
import { json } from "react-router";


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			characters: [],
			pageVehicles: 1,
			countGetCharacters: 1,
			countGetPlanets: 1,
			countGetVehiclesPages: 0,
			countVehiclesNewPage: 0,
			totalPagesCharacters: 0,
			allCharactersProperties: [],
			limitsOfVehicles: 0,
			limitOfCharacters: '',
			limitOfPlantes: '',
			allPlanetsProperties: [],
			allVehiclesProperties: [],
			favoritesCharacters: [],
			favoritePlanets: [],
			favoriteVehicles: [],
			favoriteShowCharacters: false,
			favoriteShowPlanets: false,
			favoriteShowVehicles: false,
			isDisabledFavorite: [],
			isDisabledFavoritePlanets: [],
			isDisabledFavoriteVehicles: [],
			cardDetailCharacters: [],
			charactersLearnMore: [],
			planetsLearnMore: [],
			vehiclesLearnMore: [],
			vehiclesAllInformation: [],
			showTheCharacters: false,
			showTheVehicles: false,

		},
		actions: {

			getAllCharacters: async () => {
				let url = ''
				const storeForCharacters = getStore()
				let count = 1
				const charactersAllData = [...storeForCharacters.allCharactersProperties]
				let stopFetch = 0
				do {
					if (Object.keys(storeForCharacters.allCharactersProperties).length > 0) {
						stopFetch = 1
						count = storeForCharacters.countGetCharacters
						if (count === 17) {
							count += 1
							storeForCharacters.countGetCharacters += 1
						}
					}
					else {

						stopFetch = 5
					}

					try {

						url = `https://www.swapi.tech/api/people/${count}`
						console.log('seguimos llamando mas personajes!')


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

							storeForCharacters.showTheCharacters = true

						}
						else {
							const jsonReponse = await response.json()
							if (Object.keys(jsonReponse).length > 0) {
								console.log(jsonReponse.message)
								storeForCharacters.limitOfCharacters = jsonReponse.message
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

				setStore({ ...storeForCharacters, allCharactersProperties: charactersAllData })
			},

			getAllPlanets: async () => {
				const storeForPlanets = getStore()
				let count = 1
				const planetsAllData = [...storeForPlanets.allPlanetsProperties]
				let stopFetch = 0
				do {
					if (Object.keys(storeForPlanets.allPlanetsProperties).length > 0) {
						stopFetch = 1
						console.log(storeForPlanets.countGetPlanets)
						count = storeForPlanets.countGetPlanets
					}
					else {
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
							console.log(jsonReponse.result)
							console.log('Tenemos el primer fetch!')

						}
						else {
							const jsonReponse = await response.json()
							if (Object.keys(jsonReponse).length > 0) {
								console.log('planets')
								console.log(jsonReponse.messsage)
								console.log('You reached all the planets!')
								storeForPlanets.limitOfPlantes = jsonReponse.messsage
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


				setStore({ ...storeForPlanets, allPlanetsProperties: planetsAllData })

			},

			getAllVehicles: async () => {
				const storeForVehicles = getStore()
				let count = 1
				const vehiclesAllData = [...storeForVehicles.allVehiclesProperties]
				let stopFetch = 0
				do {
					if (Object.keys(storeForVehicles.allVehiclesProperties).length > 0) {
						stopFetch = 1
						if (storeForVehicles.countVehiclesNewPage > 9) {
							storeForVehicles.pageVehicles += 1
							count = 1
							storeForVehicles.countVehiclesNewPage = 0
							console.log('entramos a una nueva pagina!')
							storeForVehicles.countGetVehiclesPages = 0
						}
					}
					else {
						stopFetch = 5
					}
					let url = `https://www.swapi.tech/api/vehicles?page=${storeForVehicles.pageVehicles}&limit=10`
					console.log(url)
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
							vehiclesAllData.push(jsonReponse.results[storeForVehicles.countGetVehiclesPages])
							storeForVehicles.countGetVehiclesPages += 1
							count += 1
							storeForVehicles.countVehiclesNewPage += 1

							storeForVehicles.limitsOfVehicles = jsonReponse.total_records
						}
						else {
							const jsonReponse = await response.json()
							let limitOfPages = jsonReponse.total_pages
							if (storeForVehicles.countVehiclesNewPage > limitOfPages) {
								console.log(jsonReponse.message)
								console.log('You reached all the vehicles!')
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

				setStore({ ...storeForVehicles, allVehiclesProperties: vehiclesAllData })
				console.log(`esta es la cantidad de carros por ahora! ${storeForVehicles.allVehiclesProperties.length - 1}`)
			},

			getAllPropertiesVehicles: async () => {
				const storeGetVehicles = getStore()
				try {

					let url = `https://www.swapi.tech/api/vehicles/${storeGetVehicles.vehiclesLearnMore.uid}`
					console.log('url')
					const response = await fetch(url,
						{
							method: 'GET',
							header: {
								'Content-type': 'aplication/json'
							}
						}
					)

					if (response.ok) {

						const jsonReponse = await response.json()
						console.log(jsonReponse)
						console.log('conseguimnos el response')
						setStore({ ...storeGetVehicles, vehiclesAllInformation: jsonReponse.result })
						storeGetVehicles.showTheVehicles = true
					}

					else {

						throw new Error('You failed with the request!')
					}
				}

				catch (e) {
					console.log(e, 'Requested Failed! Check it out')
				}
			},

			shownFavoriteCharacters: () => {
				setStore({ favoriteShowCharacters: true })
			},

			shownFavoritePlanets: () => {

				setStore({ favoriteShowPlanets: true })
			},

			shownFavoriteVehicles: () => {

				setStore({ favoriteShowVehicles: true })
			},


		}
	};
};

export default getState;








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