import React from 'react'
import './index.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { splitTextToSpan } from '../../untils'
const Project = () => {
    const sliderContent = [
        "PlantMed (Web/Mobile)",
        "Portfolio",
        "Shoes Store"
    ]


    useGSAP(() => {
        let currentImageIndex = 2
        let currentContentIndex = 1
        const totalImages = 3
        let isAnimating = false

        gsap.to(".slider-next-img", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.5,
            ease: "power3.out",
            delay: 1
        })

        gsap.to(".btn-more", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.5,
            ease: "power3.out",
            delay: 1
        })

        const btn = document.querySelector(".btn-more")
        btn.addEventListener("click", function () {
            if (isAnimating) return

            isAnimating = true

            splitTextToSpan(".slider-content-active h1")

            gsap.to(".slider-content-active h1 span", {
                top: "-175px",
                stagger: 0.05,
                ease: "power3.out",
                duration: 0.5,

            })

            gsap.to(".slider-active img", {
                scale: 2,
                duration: 2,
                ease: "power3.out"
            })

            splitTextToSpan(".slider-content-next h1")
            gsap.set(".slider-content-next h1 span", {
                top: "200px"
            })

            gsap.to(".slider-content-next", {
                top: "0",
                duration: 1,
                ease: "power3.out",
                onComplete: () => {
                    document.querySelector(".slider-content-active").remove()
                    gsap.to(".slider-content-next h1 span", {
                        top: 0,
                        stagger: 0.05,
                        ease: "power3.out",
                        duration: 0.5,
                        onComplete: () => {
                            const nextContent = document.querySelector(".slider-content-next")
                            nextContent.classList.remove("slider-content-next")
                            nextContent.classList.add("slider-content-active")
                            nextContent.style.top = "0"

                            currentContentIndex = (currentContentIndex + 1) % totalImages
                            const nextContentText = sliderContent[currentContentIndex]
                            const newContentHTML = `<div class="slider-content-next" style="top: 200px;"><h1>${nextContentText}</h1></div>`
                            document.querySelector(".slider-content").insertAdjacentHTML("beforeend", newContentHTML)
                        }
                    })
                }
            })




            currentImageIndex = (currentImageIndex % totalImages) + 1
            const imagePath = require(`../../assets/images/project${currentImageIndex}.png`);
            const newSlideHTML = `
                <div class='slider-next'>
                    <div class='slider-next-img'>
                        <img src=${imagePath} alt='project' />
                    </div>
                </div>
            `

            document.querySelector(".slider").insertAdjacentHTML("beforeend", newSlideHTML)

            gsap.to(".slider .slider-next:last-child .slider-next-img", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 1.5,
                ease: "power3.out",
                delay: 1
            })


            const slideNextImg = document.querySelector(".slider-next-img")
            gsap.to(slideNextImg, {
                width: "100vw",
                height: "100vh",
                duration: 1,
                ease: "power3.out",
                onComplete: () => {
                    const currentActiveSlide = document.querySelector(".slider-active")
                    if (currentActiveSlide)
                        currentActiveSlide.parentNode.removeChild(currentActiveSlide)

                    const nextSlide = document.querySelector(".slider-next")
                    if (nextSlide) {
                        nextSlide.classList.remove("slider-next")
                        nextSlide.classList.add("slider-active")

                        const nextSlideImg = nextSlide.querySelector(".slider-next-img")
                        if (nextSlideImg)
                            nextSlideImg.classList.remove("slider-next-img")
                    }
                    setTimeout(() => {
                        isAnimating = false
                    }, 1300)
                }
            })
        })
    })

    return (
        <div className='project-page'>
            <button className='btn-more'>Click to se more</button>
            <div className='slider'>
                <div className='slider-active'>
                    <img src={require('../../assets/images/project1.png')} alt='project' />
                </div>
                <div className='slider-next'>
                    <div className='slider-next-img'>
                        <img src={require('../../assets/images/project2.png')} alt='project' />
                    </div>
                </div>
            </div>
            <div className='slider-content'>
                <div className='slider-content-active'>
                    <h1>PlantMed (Web/Mobile)</h1>
                </div>
                <div className='slider-content-next'>
                    <h1>Portfolio</h1>
                </div>
            </div>
        </div>

    )
}

export default Project