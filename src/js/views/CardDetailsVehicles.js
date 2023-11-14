import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import '../../styles/CardDetails.css'

const CardDetailsVehicles = () => {
    const { store, actions } = useContext(Context)
    const goToHome = useNavigate()

    return (
        <div className='container-background'>
            <div className='container-image-characters'>
                <div className='container-Image'>
                    <img src={`https://starwars-visualguide.com/assets/img/vehicles/${store.vehiclesAllInformation.uid}.jpg`} className="characters-img-details" alt="Vehicles-details" />
                </div>
                <div className='container-card'>
                    <h1>{store.vehiclesAllInformation.properties.model}</h1>

                    <p>{store.vehiclesAllInformation.description}</p>
                    <ul>
                        <li> Vehicle Class: {store.vehiclesAllInformation.properties.vehicle_class}</li>
                        <li> Manufacter: {store.vehiclesAllInformation.properties.manufacturer}</li>
                        <li> Cost in Credits: {store.vehiclesAllInformation.properties.cost_in_credits}</li>
                        <li> Length: {store.vehiclesAllInformation.properties.length}</li>
                        <li> Crew: {store.vehiclesAllInformation.properties.crew}</li>
                        <li> Passengers: {store.vehiclesAllInformation.properties.passengers}</li>
                        <li> Max Atmophering Speed: {store.vehiclesAllInformation.properties.max_atmosphering_speed}</li>
                        <li> Cargo Capacity: {store.vehiclesAllInformation.properties.cargo_capacity}</li>
                        <li> Consumables: {store.vehiclesAllInformation.properties.consumables}</li>
                    </ul>

                </div>
            </div>
            <div>
                <button className='buttonHome' onClick={() => {
                    goToHome('/')
                    store.allVehiclesProperties = []
                    store.countVehiclesNewPage = 1
                    store.pageVehicles = 1
                    store.countGetVehiclesPages = 0
                    store.countVehiclesNewPage = 0
                    store.limitOfPlantes = ''
                    store.vehiclesLearnMore = []

                }}>Go Home</button>
            </div>

        </div >
    )
}

export default CardDetailsVehicles