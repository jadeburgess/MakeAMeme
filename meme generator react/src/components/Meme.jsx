//version 2.0 - working, added fuction to dynamically adjust font size according to text length
import React, { useState, useEffect } from 'react';
import './Styles.css';

const calculateFontSize = (text) => {
    const maxLength = 400; // Maximum length for the original font size
    const originalFontSize = 4; // Original font size in em

    const adjustedFontSize = Math.max(originalFontSize - (text.length / maxLength)* 20, 1);
    return adjustedFontSize + "em";
};

export default function Meme() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });
    const [allMemes, setAllMemes] = useState([]);

    useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes");
            const data = await res.json();
            setAllMemes(data.data.memes);
        }
        getMemes();
    }, []);

    const getMemeImage = () => {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const url = allMemes[randomNumber].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }));
    };

    return (
        <main>
            <div className="form">
                <div className='textbox--container'>
                <input
                    type="text"
                    placeholder="top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                </div>
                <button
                    className="form--button"
                    onClick={getMemeImage}
                >
                    get a new meme image
                </button>
                
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top" style={{ fontSize: calculateFontSize(meme.topText) }}>{meme.topText}</h2>
                <h2 className="meme--text bottom" style={{ fontSize: calculateFontSize(meme.bottomText) }}>{meme.bottomText}</h2>
            </div>
        </main>
    );
}







//version 1.0 -working
// import React, { useState, useEffect } from 'react';
// import './Styles.css'


//dynamically adjusts font size
//  const calculateFontSize = (text) => {
//     const maxLength = 400; // Maximum length for the original font size
//     const originalFontSize = 2; // Original font size in em

//     const adjustedFontSize = Math.max(originalFontSize - (text.length / maxLength), 1);
//     return adjustedFontSize + "em";
// }


// export default function Meme() {
//     const [meme, setMeme] = React.useState({
//         topText: "",
//         bottomText: "",
//         randomImage: "http://i.imgflip.com/1bij.jpg" 
//     })
//     const [allMemes, setAllMemes] = React.useState([])

//     React.useEffect(() => {
//         async function getMemes() {
//             const res = await fetch("https://api.imgflip.com/get_memes")
//             const data = await res.json()
//             setAllMemes(data.data.memes)
//         }
//         getMemes()
//     }, [])

//     function getMemeImage() {
//         const randomNumber = Math.floor(Math.random() * allMemes.length)
//         const url = allMemes[randomNumber].url
//         setMeme(prevMeme => ({
//             ...prevMeme,
//             randomImage: url
//         }))
//     }

//     function handleChange(event) {
//         const {name, value} = event.target
//         setMeme(prevMeme => ({
//             ...prevMeme,
//             [name]: value
//         }))
//     }

//     useEffect(() => {
//         // Recalculate font size when text changes
//         const topTextFontSize = calculateFontSize(meme.topText);
//         const bottomTextFontSize = calculateFontSize(meme.bottomText);

//         document.documentElement.style.setProperty('--topTextFontSize', topTextFontSize);
//         document.documentElement.style.setProperty('--bottomTextFontSize', bottomTextFontSize);
//     }, [meme.topText, meme.bottomText]);


//     return (
//         <main>
//             <div className="form">
//                 <input
//                 type="text"
//                 placeholder="top text"
//                 className="form--input"
//                 name="topText"
//                 value={meme.topText}
//                 onChange={handleChange}
//                 />
//                  <input 
//                     type="text"
//                     placeholder="bottom text"
//                     className="form--input"
//                     name="bottomText"
//                     value={meme.bottomText}
//                     onChange={handleChange}
//                 />
//                 <button 
//                     className="form--button"
//                     onClick={getMemeImage}
//                 >
//                     get a new meme image 
//                 </button>
//             </div>
//             <div className="meme">
//                 <img src={meme.randomImage} className="meme--image" />
//                 <h2 className="meme--text top">{meme.topText}</h2>
//                 <h2 className="meme--text bottom">{meme.bottomText}</h2>
//             </div>
//         </main>
//     )
// }