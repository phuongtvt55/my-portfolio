import React, { useEffect, useState } from 'react'
import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCss3, faGit, faHtml5, faJs, faReact } from '@fortawesome/free-brands-svg-icons'
import { faJava } from '@fortawesome/free-brands-svg-icons/faJava'
export default function About() {
    const [letterClass, setLetterClass] = useState('text-animate')
    const strName = 'About me'
    const dotLength = 100;
    const distanceDot = 300;
    const strSplit = strName.split("")

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 4000)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [])

    setTimeout(function () {
        const elements = document.getElementsByClassName('text-animate-hover');

        if (elements.length !== 0) {
            //console.log(elements);
            for (let i = 0; i < elements.length; i++) {
                elements[i].addEventListener('animationend', function (e) {
                    elements[i].classList.remove('animated');
                });

                elements[i].addEventListener('mouseover', function (e) {
                    elements[i].classList.add('animated')
                })
            }
        }
    }, 500);

    //canvas
    useEffect(() => {
        const about = document.querySelector(".about-page")
        const canvas = document.getElementById('dotsCanvas');
        if (canvas) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            const ctx = canvas.getContext('2d');

            const dots = [];
            const arrayColor = ['#240750', '#344C64', '#577B8D', '#57A6A1', '#FFC96F'];
            for (let index = 0; index < dotLength; index++) {
                dots.push({
                    x: Math.floor(Math.random() * canvas.width),
                    y: Math.floor(Math.random() * canvas.height),
                    size: Math.random() * 3 + 3,
                    color: arrayColor[Math.floor(Math.random() * arrayColor.length)]
                });
            }

            //draw dot
            const drawDots = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                dots.forEach(dot => {
                    ctx.beginPath();
                    ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
                    ctx.fillStyle = dot.color;
                    ctx.fill();
                });
            };
            drawDots();

            //event when move mouse beetween dot
            about.addEventListener('mousemove', (event) => {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                drawDots()
                let mouse = {
                    x: event.pageX - about.getBoundingClientRect().left,
                    y: event.pageY - about.getBoundingClientRect().top
                }
                dots.forEach(dot => {
                    let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2)
                    if (distance < distanceDot) {
                        ctx.strokeStyle = dot.color
                        ctx.lineWidth = 1
                        ctx.beginPath()
                        ctx.moveTo(dot.x, dot.y)
                        ctx.lineTo(mouse.x, mouse.y)
                        ctx.stroke()
                    }
                })
            })

            //when mouse out remove clearRect
            about.addEventListener('mouseout', () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                drawDots()
            })
        }
    }, []);


    return (
        <div className='container about-page'>
            <div className='text-zone'>
                <h1>
                    <AnimatedLetters letterClass={letterClass} strArray={strSplit} idx={15} />
                </h1>
                <p>My name is Phuong and I am from Ca Mau. I have recently completed my post-graduation in <span>Software Engineering</span> from FPT University Can Tho.</p>
                <p>I am quite good at debugging code as well as absorbing new knowledge quickly. I also have experience in projects <span>Web App/Restful API</span>, database <span>Mysql</span>, and <span>MongoDB</span>. Currently, my main languages are <span>C#</span> and <span>JS</span>.</p>

                <p>My short-term goal is to be a part of the Backend team, to build a platform that can showcase my skills and grow my career. I am always enthusiastic to develop myself along with the organization.</p>
                <p>My long-term goal is to become a <span>Backend Developer</span> (using many different languages for deployment).</p>
            </div>
            <div className='cube'>
                <div className='cube-spinner'>
                    <div className='face1'>
                        <FontAwesomeIcon icon={faGit} />
                    </div>
                    <div className='face2'>
                        <FontAwesomeIcon icon={faHtml5} />
                    </div>
                    <div className='face3'>
                        <FontAwesomeIcon icon={faCss3} />
                    </div>
                    <div className='face4'>
                        <FontAwesomeIcon icon={faJava} />
                    </div>
                    <div className='face5'>
                        <FontAwesomeIcon icon={faJs} />
                    </div>
                    <div className='face6'>
                        <FontAwesomeIcon icon={faReact} />
                    </div>
                </div>
            </div>

            <canvas id='dotsCanvas'></canvas>
        </div>
    )
}
