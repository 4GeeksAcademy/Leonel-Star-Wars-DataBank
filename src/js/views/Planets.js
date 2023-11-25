import React, { useEffect, useContext, useRef, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Context } from "../store/appContext";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Footer } from '../component/footer';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../../styles/planets.css'
import { useNavigate } from 'react-router-dom';


const Planets = () => {
    const [isLoading, setLoading] = useState(false)
    const { store, actions } = useContext(Context)
    let count = 0

    const responsive = {
        superLargeDesktop: {
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

    const SkeletonLoading = () => (
        <li className='card-information skeleton'>
            <div className='cards-characters skeleton'>
                <div className='card' id='carousel-cards'>
                    <div className='card-img-top skeleton'></div>
                    <div className='card-body skeleton'>
                        <div className='card-title skeleton'></div>
                        <div className='allContentCard skeleton'>
                            <div className='skeleton skeleton-text'> </div>
                            <div className='skeleton skeleton-text'> </div>
                            <div className='butonCards'>
                                <div className='learn-more skeleton'></div>
                                <div className='favorite-icon skeleton'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )

    const getPropertiesPlanets = async () => {
        try {
            await actions.getAllPlanets()
            setLoading(true)
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

    const handleAddFavorites = (favoriteCharacter, index) => {
        store.favoritePlanets.push(favoriteCharacter)
        store.isDisabledFavoritePlanets.push(index)
        actions.shownFavoritePlanets()
    }

    const imageToLoadFail = 'https://media.tenor.com/mCx30liuedIAAAAd/star-wars-theres-a-problem-on-the-horizon.gif'
    const goToPlanets = useNavigate()
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
                                isLoading ? (
                                    store.allPlanetsProperties.map((elements, index) => {
                                        count += 1
                                        return (
                                            < li key={index} className='card-information-planets'>
                                                <div className='cards-characters-planets'>
                                                    <div className="card" id='carousel-cards-planets' style={{ width: '22rem' }}>
                                                        <img src={`https://starwars-visualguide.com/assets/img/planets/${count}.jpg`}
                                                            className="card-img-top" alt="planets"
                                                            onError={
                                                                (e) => {
                                                                    e.target.src = imageToLoadFail
                                                                }
                                                            }
                                                        />
                                                        <div className="card-body">
                                                            <h5 className="card-title"> {elements.properties.name} </h5>
                                                            <div className='allContentCard-planets'>
                                                                <p className="card-text"> Population: {elements.properties.population} </p>
                                                                <p className="card-text"> Climate: {elements.properties.climate} </p>
                                                                <div className='butonCards-planets'>
                                                                    <button className="learn-more-planets"
                                                                        onClick={() => {
                                                                            store.planetsLearnMore = elements
                                                                            goToPlanets(`/planet/${store.planetsLearnMore.uid}`)
                                                                        }}
                                                                    >Learn More</button>
                                                                    <button className={store.isDisabledFavoritePlanets.includes(index) ? 'favorite-icon-disabled' : 'favorite-icon-planets'}
                                                                        onClick={() => {
                                                                            handleAddFavorites(elements, index)
                                                                        }}
                                                                        disabled={store.isDisabledFavoritePlanets.includes(index)}
                                                                    ><FavoriteIcon /></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                ) :
                                    (
                                        Array.from({ length: 4 }).map((_, index) => <SkeletonLoading key={index} />)
                                    )
                            }
                        </Carousel >
                    </div >
                </ul >

            </div >

        </div >
    )
}

export default Planets




