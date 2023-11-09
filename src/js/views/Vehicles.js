import React, { useEffect, useContext, useRef, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Context } from "../store/appContext";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Footer } from '../component/footer';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../../styles/vehicles.css'

const Vehicles = () => {
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
        getPropertiesVehicles()

    }, [])
    let limitVehicles = store.limitsOfVehicles
    const getPropertiesVehicles = async () => {
        try {
            await actions.getAllVehicles()
        }
        catch (e) {
            console.log(e, 'Error')
        }
    }

    const ButtonGroup = ({ next, previous, goToSlide, onClick, ...rest }) => {
        const handleClick = () => {
            getPropertiesVehicles()
            next()
        }
        const { carouselState: { currentSlide } } = rest;
        return (
            <div className='carousel-button-group-vehicles'>
                <button className={currentSlide === 0 ? 'disable-button-left-vehicles' : 'button-custom-left-vehicles'}
                    onClick={() => previous()}
                > <NavigateBeforeIcon /></button>
                <button className={
                    (currentSlide + 3 === store.allVehiclesProperties.length - 1) || (currentSlide + 3 === limitVehicles - 1)
                        ? 'disable-button-right-vehicles' : 'button-custom-right-vehicles'}
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

        < div className='container-fluid-body-vehicles' >
            <div className='container-title-vehicles'>
                <h1 className='characters-title-vehicles'>
                    Vehicles
                </h1>
            </div>
            <div className='container-cards' id='container-cards-vehicles' >
                <ul className='carousel-cards-wrapper-vehicles'>
                    <div className='gd-carousel-wrapper-vehicles'>
                        <Carousel
                            arrows={false}
                            customButtonGroup={<ButtonGroup />}
                            renderButtonGroupOutside={true}
                            swipeable={false}
                            draggable={false}
                            showDots={false}
                            // className='gd-carousel'
                            infinite={false}
                            // containerClass='carousel-container'
                            // itemClass="carousel-item-padding-40-px"
                            responsive={responsive}>
                            {
                                store.allVehiclesProperties.map((elements, index) => {
                                    count += 1
                                    return (
                                        < li key={index} className='card-information-vehicles'>
                                            <div className='cards-characters'>
                                                <div className="card" id='carousel-cards-vehicles' style={{ width: '22rem' }}>
                                                    <img src={`https://starwars-visualguide.com/assets/img/vehicles/${elements.uid}.jpg`}
                                                        className="card-img-top-vehicles" alt="vehicles"
                                                        onError={(e) => {
                                                            e.target.src = imageToLoadFail
                                                        }}
                                                    />
                                                    <div className="card-body-vehicles">
                                                        <h5 className="card-title-vehicles"> {elements.name} </h5>
                                                        <div className='allContentCard-vehicles'>
                                                            <div className='butonCards-vehicles'>
                                                                <button className="learn-more-vehicles">Learn More</button>
                                                                <button className='favorite-icon-vehicles'
                                                                ////
                                                                ><FavoriteIcon /></button>
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

export default Vehicles