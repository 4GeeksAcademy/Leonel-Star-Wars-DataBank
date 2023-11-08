import React, { useEffect, useContext, useRef, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Context } from "../store/appContext";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Footer } from '../component/footer';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../../styles/planets.css'

const Planets = () => {
    const { store, actions } = useContext(Context)
    let count = 0

    const getPropertiesPlanets = async () => {
        try {
            await actions.getAllPlanets()
        }
        catch (e) {
            console.log(e, 'Error')
        }
    }

    const ButtonGroup = ({ next, previous, goToSlide, onClick, ...rest }) => {
        const handleClick = () => {
            getPropertiesPlanets()
            next()
        }
        const { carouselState: { currentSlide } } = rest;
        return (
            <div className='carousel-button-group-planets'>
                <button className={currentSlide === 0 ? 'disable-button-left-planets' : 'button-custom-left-planets'}
                    onClick={() => previous()}
                > <NavigateBeforeIcon /></button>
                <button className={currentSlide + 3 === store.allPlanetsProperties - 1 ? 'disable-button-right-planets' : 'button-custom-right-planets'}
                    onClick={() => {
                        console.log(currentSlide)
                        next();
                        handleClick();
                    }}
                >
                    <NavigateNextIcon />
                </button>
            </div >
        )
    }

    return (

        // <div> hola</div>
        /////
        < div className='container-fluid-body-planets' >
            <div className='container-title-planets'>
                <h1 className='characters-title-planets'>
                    Planets
                </h1>
            </div>
            <div className='container-cards-planets' >
                <ul className='carousel-cards-wrapper-planets'>
                    <div className='gd-carousel-wrapper-planets'>
                        <Carousel
                            arrows={false}
                            customButtonGroup={<ButtonGroup />}
                            renderButtonGroupOutside={true}
                            swipeable={false}
                            draggable={false}
                            showDots={false}
                            className='gd-carousel'
                            infinite={false}
                            containerClass='carousel-container'
                            itemClass="carousel-item-padding-40-px"
                            responsive={responsive}>
                            {
                                store.allPlanetsProperties.map((elements, index) => {
                                    count += 1
                                    return (
                                        < li key={index} className='card-information-planets'>
                                            <div className='cards-characters-planets'>
                                                <div className="card" id='carousel-cards-planets' style={{ width: '22rem' }}>
                                                    <img src={`https://starwars-visualguide.com/assets/img/planets/2${count}.jpg`} className="card-img-top-planets" alt="planets" />
                                                    <div className="card-body-planets">
                                                        <h5 className="card-title-planets"> {elements.properties.name} </h5>
                                                        <div className='allContentCard-planets'>
                                                            <p className="card-text-planets"> Population: {elements.properties.population} </p>
                                                            <p className="card-text-planets"> climate: {elements.properties.climate} </p>
                                                            <div className='butonCards-planets'>
                                                                <button className="learn-more-planets">Learn More</button>
                                                                <button className='favorite-icon-planets'><FavoriteIcon /></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </Carousel >
                    </div >
                </ul >

            </div >

        </div >
    )
}

export default Planets