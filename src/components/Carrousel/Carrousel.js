import styles from './Carrousel.module.scss';
import { useState } from 'react';
import arrow from '../../assets/images/arrow.png';

function Carrousel({ nbrImg, imgs }) {
  const [indexPivot, setIndexPivot] = useState(0);

  function handleClickbutton_droite() {
    if (indexPivot === -nbrImg + 1) {
      setIndexPivot(0);
    } else if (indexPivot > -nbrImg + 1) {
      setIndexPivot(indexPivot - 1);
    }
  }

  function handleClickbutton_gauche() {
    if (indexPivot < 0) {
      setIndexPivot(indexPivot + 1);
    } else if (indexPivot === 0) {
      setIndexPivot(-nbrImg + 1);
    }
  }

  return (
    <div className={styles.carrousel}>
      <div
        className={styles.container}
        style={{ transform: 'translate(' + indexPivot * 100 + '%)' }}
      >
        {imgs.map((e) => (
          <img
            key={e.trim()}
            src={e}
            className={styles.photo}
            alt="img_slide"
          />
        ))}
      </div>
      <img
        onClick={handleClickbutton_droite}
        src={arrow}
        className={`${styles.bouton} ${styles.boutonDroite}`}
        alt="bouton_droite"
      />
      <img
        onClick={handleClickbutton_gauche}
        src={arrow}
        className={`${styles.bouton} ${styles.boutonGauche}`}
        alt="bouton_gauche"
      />
      <div className={styles.indexActif}>
        {-indexPivot + 1}/{nbrImg}
      </div>
    </div>
  );
}

export default Carrousel;
