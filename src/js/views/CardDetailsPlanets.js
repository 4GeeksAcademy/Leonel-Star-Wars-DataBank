import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import '../../styles/CardDetails.css'

const CardDetailsPlanets = () => {
    const { store, actions } = useContext(Context)
    const goToHome = useNavigate()

    return (
        <div className='container-background'>
            <div className='container-image-characters'>
                <div className='container-Image'>
                    <img src={`https://starwars-visualguide.com/assets/img/planets/${store.planetsLearnMore.uid}.jpg`} className="characters-img-details" alt="planets-details" />
                </div>
                <div className='container-card'>
                    <h1>{store.planetsLearnMore.properties.name}</h1>

                    <p>{store.planetsLearnMore.description}</p>
                    <ul>
                        <li> Diameter: {store.planetsLearnMore.properties.diameter}</li>
                        <li> Rotation Period: {store.planetsLearnMore.properties.rotation_period}</li>
                        <li> Orbital Period: {store.planetsLearnMore.properties.orbital_period}</li>
                        <li> Gravity: {store.planetsLearnMore.properties.gravity} </li>
                        <li> Population: {store.planetsLearnMore.properties.population} </li>
                        <li> Climate: {store.planetsLearnMore.properties.climate} </li>
                        <li> Terrain: {store.planetsLearnMore.properties.terrain} </li>
                        <li> Surface Water: {store.planetsLearnMore.properties.surface_water} </li>
                    </ul>

                </div>
            </div>
            <div>
                <button className='buttonHome' onClick={() => {
                    goToHome('/')
                    store.allPlanetsProperties = []
                    store.countGetPlanets = 1
                    store.limitOfPlantes = ''
                    store.allVehiclesProperties = []
                    store.countVehiclesNewPage = 1
                    store.pageVehicles = 1
                    store.countGetVehiclesPages = 0
                    store.countVehiclesNewPage = 0
                    store.limitOfPlantes = ''
                    store.vehiclesLearnMore = []
                    store.allCharactersProperties = []
                    store.countGetCharacters = 1
                    store.limitOfCharacters = ''
                    store.totalPagesCharacters = 0


                }}>Go Home</button>
            </div>

        </div>
    )
}

export default CardDetailsPlanets