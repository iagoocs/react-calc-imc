import { useState } from 'react'
import styles from './App.module.css'
import poweredImage from './assets/powered.png'
import { levels, calculateImc, Level } from './helpers/imc'
import { GridItem } from './components/GridItem/GridItem'
import laImage from './assets/leftarrow.png'

const App = () => {

  const [heightField, setHeightField] = useState<number>(0)
  const [weightFild, setWeightFild] = useState<number>(0)
  const [toShow, setToShow] = useState<Level | null>(null)

  const handleCalculateButton = () => {
    if(heightField && weightFild) {
      setToShow(calculateImc(heightField, weightFild))
    } else {
      alert('Digite todos os campos.')
    }
  }

  const handleBackButton = () => {
    setToShow(null)
    setHeightField(0)
    setWeightFild(0)
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150}/>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule seu IMC</h1>
          <p>O IMC é um cálculo simples que permite avaliar se a pessoa está dentro do peso que é considerado ideal para a sua altura.</p>

          <input 
          type="number"
          placeholder='Digite a sua altura. Ex: 1.5 (em metros)'
          value={heightField > 0 ? heightField : ''}
          onChange={e => setHeightField(parseFloat(e.target.value))}
          disabled={toShow ? true : false}
          />
          <input 
          type="number"
          placeholder='Digite seu peso. Ex: 76.3 (em kg)'
          value={weightFild > 0 ? weightFild : ''}
          onChange={e => setWeightFild(parseFloat(e.target.value))}
          disabled={toShow ? true : false}
          />

          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
                {levels.map( (item, key) => (
                  <GridItem key={key} item={item}/>
                ))}
          </div>
          }
          {toShow && 
          <div className={styles.rightBig}>
            <div className={styles.rightArrow} onClick={handleBackButton}>
              <img src={laImage} alt="" width='25'/>
            </div>
            <GridItem item={toShow}/>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App