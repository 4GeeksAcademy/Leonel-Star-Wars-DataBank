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

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
            slidesToSlide: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1280 },
            items: 4,
            slidesToSlide: 1
        },
        smallDesktop: {
            breakpoint: { max: 1280, min: 770 },
            items: 3,
            slidesToSlide: 1
        },
        tablet: {
            breakpoint: { max: 768, min: 585 },
            items: 2,
            slidesToSlide: 1
        },
        mobile: {
            breakpoint: { max: 585, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    }
    //
    useEffect(() => {

        getPropertiesPlanets()

    }, [])



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
                <button className={
                    (currentSlide + 3 === store.allPlanetsProperties.length - 1) || (store.limitOfPlantes.length > 0)
                        ? 'disable-button-right-planets' : 'button-custom-right-planets'}
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

    const imageToLoadFail = 'https://media.tenor.com/mCx30liuedIAAAAd/star-wars-theres-a-problem-on-the-horizon.gif'

    return (

        // <div style={{ color: 'black' }}> hola!!!!!!!!!!</div>
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
                            responsive={responsive}>

                            {
                                store.allPlanetsProperties.map((elements, index) => {
                                    count += 1
                                    return (
                                        < li key={index} className='card-information-planets'>
                                            <div className='cards-characters-planets'>
                                                <div className="card" id='carousel-cards-planets' style={{ width: '22rem' }}>
                                                    <img src={`https://starwars-visualguide.com/assets/img/planets/${count}.jpg`}
                                                        className="card-img-top-planets" alt="planets"
                                                        onError={
                                                            (e) => {
                                                                e.target.src = imageToLoadFail
                                                            }
                                                        }
                                                    />
                                                    <div className="card-body-planets">
                                                        <h5 className="card-title-planets"> {elements.properties.name} </h5>
                                                        <div className='allContentCard-planets'>
                                                            <p className="card-text-planets"> Population: {elements.properties.population} </p>
                                                            <p className="card-text-planets"> Climate: {elements.properties.climate} </p>
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




