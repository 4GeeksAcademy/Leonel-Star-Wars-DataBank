import React, { useEffect, useContext, useRef, useState } from 'react'
import '../../styles/characters.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Context } from "../store/appContext";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link, useNavigate } from 'react-router-dom';



const Characters = () => {
    const [isLoading, setLoading] = useState(false)
    const { store, actions } = useContext(Context)
    const goToCharacter = useNavigate()
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
        getPropertiesCharacters()
    }, [])



    const getPropertiesCharacters = async () => {
        try {
            await actions.getAllCharacters()
            setLoading(true)

        }
        catch (e) {
            console.log(e, 'Error')
        }
    }

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

    const ButtonGroup = ({ next, previous, goToSlide, onClick, ...rest }) => {
        const handleClick = () => {
            getPropertiesCharacters()
            next()
        }
        const { carouselState: { currentSlide } } = rest;
        return (
            <div className='carousel-button-group'>
                <button className={currentSlide === 0 ? 'disable-button-left' : 'button-custom-left'}
                    onClick={() => previous()}
                > <NavigateBeforeIcon /></button>
                <button className={(currentSlide + 3 === store.allCharactersProperties.length - 1) || (store.limitOfCharacters.length > 0)
                    ? 'disable-button-right' : 'button-custom-right'}
                    onClick={() => {

                        next();
                        handleClick();
                    }}
                >
                    <NavigateNextIcon />
                </button>
            </div >
        )
    }



    const handleFavoriteIcons = (favoriteCharacter, index) => {
        store.favoritesCharacters.push(favoriteCharacter)
        store.isDisabledFavorite.push(index)
        actions.shownFavoriteCharacters()
    }

    return (
        < div className='container-fluid-body' >
            <div className='container-title'>
                <h1 className='characters-title'>
                    Characters
                </h1>
            </div>
            <div className='container-cards' >

                <ul className='carousel-cards-wrapper'>
                    <div className='gd-carousel-wrapper'>
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
                                isLoading ?
                                    (
                                        store.allCharactersProperties.map((elements, index) => {
                                            count += 1
                                            if (count === 17) {
                                                count += 1
                                            }
                                            return (
                                                < li key={index} className='card-information'>
                                                    <div className='cards-characters'>
                                                        <div className='card' id="carousel-cards">
                                                            <img src={`https://starwars-visualguide.com/assets/img/characters/${count}.jpg`} className={store.showTheCharacters ? "card-img-top" : "card-img-top skeleton"} alt="characters" />
                                                            <div className="card-body">
                                                                <h5 className="card-title"> {elements.properties.name} </h5>
                                                                <div className='allContentCard'>
                                                                    <p className="card-text"> Gender:  {elements.properties.gender} </p>
                                                                    <p className="card-text"> Height:  {elements.properties.height} </p>
                                                                    <div className='butonCards'>
                                                                        <button className="learn-more"
                                                                            onClick={() => {
                                                                                store.charactersLearnMore = elements
                                                                                console.log(store.charactersLearnMore);
                                                                                goToCharacter(`character/${store.charactersLearnMore.uid}`)
                                                                            }}
                                                                        >Learn More</button>
                                                                        <button
                                                                            className={store.isDisabledFavorite.includes(index) ? 'favorite-icon-disabled' : 'favorite-icon'}
                                                                            onClick={() => {
                                                                                handleFavoriteIcons(elements, index)
                                                                            }}

                                                                            disabled={store.isDisabledFavorite.includes(index)}
                                                                        ><FavoriteIcon /></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    )
                                    : (
                                        Array.from({ length: 4 }).map((_, index) => <SkeletonLoading key={index} />)
                                    )
                            }
                        </Carousel>
                    </div>
                </ul >
            </div >
        </div >


    )
}

export default Characters













/// just in case 
// const CustomRightArrow = ({ onClick }) => {
//     const handleClick = () => {
//         console.log('clickeaste el boton derecho!!!')
//         getPropertiesCharacters()
//         onClick()
//     }
//     return (
//         <button
//             onClick={handleClick}
//             aria-aria-label='Go to next slide'
//             className='react-multiple-carousel__arrow react-multiple-carousel__arrow--right'
//         />
//     )
// }