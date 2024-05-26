import React, { useEffect, useRef } from 'react'
import './index.scss'
import TagCloud from 'TagCloud'
const CloudTag = () => {
    const tagCloudRef = useRef(null)
    useEffect(() => {

        const container = tagCloudRef.current
        const texts = [
            'HTML',
            'CSS',
            'SASS',
            'JavaScript',
            'React',
            'React Native',
            'C#',
            'Java',
            'Jquery',
            'GITHUB',
            'SQL',
            'NODEJS',
            'MONGODB'
        ];

        const options = {
            radius: 300,
            maxSpeed: 'normal',
            initSpeed: 'normal',
            keep: true,
        }

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        TagCloud(container, texts, options)
    }, [])

    let root = document.querySelector('.tagcloud')
    console.log(root)
    if (root) {
        root.addEventListener('click', function clickEventHandler(e) {
            if (e.target.className === 'tagcloud--item') {
                window.open(`https://www.google.com/search?q=${e.target.innerText}`, '_blank');
            }
        });
    }
    return (
        <>
            <div className="text-shpere">
                {/* span tag className must be "tagcloud"  */}
                <span className="tagcloud" ref={tagCloudRef}></span>
            </div>
        </>

    )
}

export default CloudTag