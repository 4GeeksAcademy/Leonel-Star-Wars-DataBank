import React, { useEffect, useContext, useRef, useState } from 'react'
import '../../styles/characters.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Context } from "../store/appContext";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Footer } from '../component/footer';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';



const Characters = () => {
    const { store, actions } = useContext(Context)
    let count = 0
    //
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


    // const getCharacters = async () => {
    //     try {
    //         await actions.getTotalCharacters()
    //         // console.log(store.totalRecordsCharacters)
    //         console.log(`Conseguimos efectivamente los characters ${store.totalAmountCharacters}`)
    //     }
    //     catch (e) {
    //         console.log(e, 'Error')
    //     }
    // }


    const getPropertiesCharacters = async () => {
        try {
            await actions.getAllCharacters()
        }
        catch (e) {
            console.log(e, 'Error')
        }
    }

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
                                store.allCharactersProperties.map((elements, index) => {
                                    count += 1
                                    if (count === 17) {
                                        count += 1
                                        console.log('solo quiero entrar aqui cuando index sea 17')
                                    }
                                    console.log(count)
                                    return (
                                        < li key={index} className='card-information'>
                                            <div className='cards-characters'>
                                                <div className="card" id='carousel-cards' style={{ width: '22rem' }}>
                                                    <img src={`https://starwars-visualguide.com/assets/img/characters/${count}.jpg`} className="card-img-top" alt="characters" />
                                                    <div className="card-body">
                                                        <h5 className="card-title"> {elements.properties.name} </h5>
                                                        <div className='allContentCard'>
                                                            <p className="card-text"> Gender:  {elements.properties.gender} </p>
                                                            <p className="card-text"> Height:  {elements.properties.height} </p>
                                                            <div className='butonCards'>
                                                                <button className="learn-more">Learn More</button>
                                                                <button className='favorite-icon'
                                                                    onClick={() => {
                                                                        handleFavoriteIcons()
                                                                    }}
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