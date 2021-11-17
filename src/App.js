import './App.css';
import React from "react";

import iconEgg from './images/boiled-egg.png';
import iconHen from './images/hen.jpg';

const AVAILABLE_MOVES = ['ArrowRight', 'ArrowLeft'];

function App() {

    const stepMovingBasket = 135;
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [glasses, setGlasses] = React.useState(0);

    const [positionBasket , setPositionBasket] = React.useState(380);
    const [eggOneTop, setEggOneTop] = React.useState(0);
    const [eggTwoTop ,setEggTwoTop] = React.useState(0);

    const stateRefEggOneTop = React.useRef(eggOneTop);
    const stateRefEggTwoTop = React.useRef(eggOneTop);
    const stateRefPositionBasket = React.useRef(positionBasket);

    const [fallRateEggOne, setFallRateEggOne] = React.useState(10);
    const [fallRateEggTwo, setFallRateEggTwo] = React.useState(30);

    const stateRefFallRateEggOne = React.useRef(fallRateEggOne);
    const stateRefFallRateEggTwo = React.useRef(fallRateEggTwo);

    const handleKeyDown = (event) => {
        const index = AVAILABLE_MOVES.indexOf(event.key);
        if(index > -1){
            switch (AVAILABLE_MOVES[index]){
                case 'ArrowRight':
                    setPositionBasket(prevState => {
                        if(prevState === 650) return prevState;
                        stateRefPositionBasket.current = prevState + stepMovingBasket;
                        return prevState + stepMovingBasket
                    });
                    break;
                case 'ArrowLeft':
                    setPositionBasket(prevState => {
                        if(prevState === 110) return prevState;
                        stateRefPositionBasket.current = prevState - stepMovingBasket;
                        return prevState - stepMovingBasket;
                    });
                    break;
            }
        }
    }

    const handleClickButtonStart = () => {
        setIsPlaying(true);
    }

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
    },[])

    const getRandomInt = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

    React.useEffect(() => {
        let isAlive;
        if (isPlaying) {
            isAlive = setInterval(() => {

                const getNewHeight1 = top => top < -400 ? 0 : top - stateRefFallRateEggOne.current;
                const getNewHeight2 = top => top < -400 ? 0 : top - stateRefFallRateEggTwo.current;

                setEggOneTop(prevState => {
                    stateRefEggOneTop.current = getNewHeight1(prevState);
                    return getNewHeight1(prevState);
                });

                setEggTwoTop(prevState => {
                    stateRefEggTwoTop.current = getNewHeight2(prevState);
                    return getNewHeight2(prevState);
                });

                if(stateRefPositionBasket.current === 110 && stateRefEggOneTop.current < -350) {
                    setGlasses(prevState => ++prevState);
                    let randomStep = getRandomInt(15, 30);
                    setFallRateEggOne(randomStep);
                    stateRefFallRateEggOne.current = randomStep;
                    setEggOneTop(0);
                }

                if(stateRefPositionBasket.current === 650 && stateRefEggTwoTop.current < -350){
                    setGlasses(prevState => ++prevState);
                    let randomStep = getRandomInt(15, 30);
                    setFallRateEggTwo(randomStep);
                    stateRefFallRateEggTwo.current = randomStep;
                    setEggTwoTop(0);
                }

                if (stateRefEggOneTop.current < -400 || stateRefEggTwoTop.current < -400){
                    alert('Вы проиграли');
                    setGlasses(0);
                    setEggOneTop(0);
                    setEggTwoTop(0);
                    setIsPlaying(false);
                    clearInterval(isAlive);
                }
            }, 500);
        }
    }, [isPlaying])

  return (
    <div className="App">
      <div className={'container'}>

        <h2>{`Количество очков: ${glasses}`}</h2>
        <div className={'playing-field'}>

            <ul className={'hens'}>
                <li className={'hen'}>
                    <img className={'hen-icon'} src={iconHen} alt={'Курица'} />
                    <img className={'egg'} src={iconEgg} alt={'Куриное яйцо'} style={{bottom: eggOneTop}} />
                </li>
                <li className={'hen'}>
                    <img className={'hen-icon'} src={iconHen} alt={'Курица'} />
                    <img className={'egg'} src={iconEgg} alt={'Куриное яйцо'} style={{bottom: eggTwoTop}} />
                </li>
            </ul>

            <div className={'basket'} style={{ left: positionBasket }} />
        </div>

        <div className={'control-panel'}>
            {!isPlaying && <button className={"button-start"} onClick={handleClickButtonStart}>Старт</button>}
        </div>

      </div>
    </div>
  );
}

export default App;
