import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import '../../styles/CardDetails.css'


const CardDetailsCharacters = () => {
    const { store, actions } = useContext(Context)
    const goToHome = useNavigate()



    return (
        <div className='container-background'>
            <div className='container-image-characters'>
                <div className='container-Image'>
                    <img src={`https://starwars-visualguide.com/assets/img/characters/${store.charactersLearnMore.uid}.jpg`} className="characters-img-details" alt="characters-details" />
                </div>
                <div className='container-card'>
                    <h1>{store.charactersLearnMore.properties.name}</h1>

                    <p>{store.charactersLearnMore.description}</p>
                    <ul>
                        <li> Mass: {store.charactersLearnMore.properties.mass}</li>
                        <li> Hair Color: {store.charactersLearnMore.properties.hair_color}</li>
                        <li> Skin Color: {store.charactersLearnMore.properties.skin_color}</li>
                        <li> Birth Year: {store.charactersLearnMore.properties.birth_year} </li>
                    </ul>

                </div>
            </div>
            <div>
                <button className='buttonHome' onClick={() => {
                    goToHome('/')
                    store.allCharactersProperties = []
                    store.countGetCharacters = 1
                    store.limitOfCharacters = ''
                    store.totalPagesCharacters = 0

                }}>Go Home</button>
            </div>

        </div>
    )
}

export default CardDetailsCharacters

