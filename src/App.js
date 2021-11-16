import './App.css';
import React from "react";

import iconEgg from './images/boiled-egg.png';
import iconHen from './images/hen.jpg';

const AVAILABLE_MOVES = ['ArrowRight', 'ArrowLeft'];
// const DROP_HEIGHT  = 415;
// const GAME_WINDOW_WIDTH = 760;
// const FALL_TIME_EGG = 1000;
// const NUMBER_OF_STEPS_OF_FALLING_EGGS = 4;

function App() {

    const stepMovingBasket = 20;

    const [isPlaying, setIsPlaying] = React.useState(false);

    const [positionBasket , setPositionBasket] = React.useState(380);

    const [glasses, setGlasses] = React.useState(0);

    const [eggOneTop, setEggOneTop] = React.useState(0);
    const [eggTwoTop ,setEggTwoTop] = React.useState(0);
    const [eggThreeTop, setEggThreeTop] = React.useState(0);
    const [eggFourTop ,setEggFourTop] = React.useState(0);

    const basketRef = React.useRef(null);

    const eggOneRef = React.useRef(null);
    const eggTwoRef = React.useRef(null);
    const eggThreeRef = React.useRef(null);
    const eggFourRef = React.useRef(null);

    const handleKeyDown = (event) => {
        const index = AVAILABLE_MOVES.indexOf(event.key);
        if(index > -1){
            switch (AVAILABLE_MOVES[index]){
                case 'ArrowRight':
                    setPositionBasket(prevState => prevState + stepMovingBasket);
                    break;
                case 'ArrowLeft':
                    setPositionBasket(prevState => prevState - stepMovingBasket);
                    break;
            }
        }
    }

    const getRandomInt = max => Math.floor(Math.random() * max);
    const getNewHeight = top => top < -400 ? 0 : top - getRandomInt(30);

    React.useEffect(() => {
        let isAlive;
        if (isPlaying) {
            isAlive = setInterval(() => {
                setEggOneTop(getNewHeight);
                setEggTwoTop(getNewHeight);
                setEggThreeTop(getNewHeight);
                setEggFourTop(getNewHeight);

                let basketLeft = parseInt(window.getComputedStyle(basketRef.current).getPropertyValue("left"));
                let eggOne = parseInt(window.getComputedStyle(eggOneRef.current).getPropertyValue("bottom"));
                let eggTwo = parseInt(window.getComputedStyle(eggTwoRef.current).getPropertyValue("bottom"));
                let eggThree = parseInt(window.getComputedStyle(eggThreeRef.current).getPropertyValue("bottom"));
                let eggFour = parseInt(window.getComputedStyle(eggFourRef.current).getPropertyValue("bottom"));

                if(basketLeft < 140 && basketLeft > 80 && eggOne < -350) {
                    setGlasses(prevState => ++prevState);
                    setEggOneTop(0);
                } else if(basketLeft < 320 && basketLeft > 260 && eggTwo < -350){
                    setGlasses(prevState => ++prevState);
                    setEggTwoTop(0);
                } else if (basketLeft < 500 && basketLeft > 440 && eggTwo < -350){
                    setGlasses(prevState => ++prevState);
                    setEggThreeTop(0);
                } else if (basketLeft < 660 && basketLeft > 600 && eggTwo < -350){
                    setGlasses(prevState => ++prevState);
                    setEggFourTop(0);

                } else if (eggOne < -400 || eggTwo < -400 || eggThree < -400 || eggFour < -400){
                    alert('Вы проиграли');
                    setEggOneTop(0);
                    setEggTwoTop(0);
                    setEggThreeTop(0);
                    setEggFourTop(0);
                    setIsPlaying(false);
                    clearInterval(isAlive);
                }
            }, 500);
        }

    }, [isPlaying])




    const handleClickButtonStart = () => {
        setIsPlaying(true);
    }

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
    },[])

  return (
    <div className="App">
      <div className={'container'}>

        <h2>{`Количество очков: ${glasses}`}</h2>
        <div className={'playing-field'}>

            <ul className={'hens'}>
                <li className={'hen'}>
                    <img className={'hen-icon'} src={iconHen} alt={'Курица'} />
                    <img className={'egg'} src={iconEgg} alt={'Куриное яйцо'} style={{bottom: eggOneTop}} ref={eggOneRef}/>
                </li>
                <li className={'hen'}>
                    <img className={'hen-icon'} src={iconHen} alt={'Курица'} />
                    <img className={'egg'} src={iconEgg} alt={'Куриное яйцо'} style={{bottom: eggTwoTop}} ref={eggTwoRef}/>
                </li>
                <li className={'hen'}>
                    <img className={'hen-icon'} src={iconHen} alt={'Курица'} />
                    <img className={'egg'} src={iconEgg} alt={'Куриное яйцо'} style={{bottom: eggThreeTop}} ref={eggThreeRef}/>
                </li>
                <li className={'hen'}>
                    <img className={'hen-icon'} src={iconHen} alt={'Курица'} />
                    <img className={'egg'} src={iconEgg} alt={'Куриное яйцо'} style={{bottom: eggFourTop}} ref={eggFourRef}/>
                </li>
            </ul>

            <div className={'basket'} ref={basketRef} style={{ left: positionBasket }} />
        </div>

        <div className={'control-panel'}>
            {!isPlaying && <button className={"button-start"} onClick={handleClickButtonStart}>Старт</button>}
        </div>

      </div>
    </div>
  );
}

export default App;
