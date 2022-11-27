import EquipementToogle from '../../components/EquipementToogle/EquipementToogle';
import Tag from '../../components/Tag/Tag';
import Toogle from '../../components/Toogle/Toogle';
import styles from './Location.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Reviews from '../../components/Reviews/Reviews';
import Carrousel from '../../components/Carrousel/Carrousel';

function Location() {
  const [dataLocation, setDataLocation] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  function getLocation(dataJSONLocations, locationId) {
    for (let theLocation of dataJSONLocations) {
      if (theLocation.id === locationId) {
        return theLocation;
      }
    }
  }

  useEffect(() => {
    async function fetchDataLocation() {
      try {
        const response = await fetch('/data/logements.json');
        if (response.ok) {
          const data = await response.json();
          const dataFilter = getLocation(data, id);
          setDataLocation(dataFilter);
          // console.log(dataFilter);
          if (dataFilter.length !== 0) {
            setLoading(true);
          }
        } else {
          // console.log('error');
        }
      } catch (e) {
        window.location.href = '/error';
        // // console.log('error');
      }
    }
    fetchDataLocation();
  }, [id]);

  return (
    <div className={`${styles.container} px-100`}>
      {loading && (
        <div className="mb-20">
          <Carrousel
            imgs={dataLocation.pictures}
            nbrImg={dataLocation.pictures.length}
          />
        </div>
      )}
      {loading && (
        <div
          className={`${styles.sectionPresentation} d-flex justify-content-spacebetween align-items-center`}
        >
          <div>
            <h2
              className={styles.titleLocation}
              style={{ fontWeight: '400', fontSize: '30px' }}
            >
              {dataLocation.title}
            </h2>
            <h3
              className={styles.adresseLocation}
              style={{ fontWeight: '300' }}
            >
              {dataLocation.location}
            </h3>
            <div className={`${styles.tagsContainer} d-flex`}>
              {dataLocation.tags.map((value) => (
                <Tag key={value.trim()} content={value} />
              ))}
            </div>
          </div>

          <div className={styles.profilContainer}>
            <div className="d-flex align-items-center">
              <h4 className={`${styles.titleProfile} mr-15`}>
                {dataLocation.host.name}
              </h4>
              <div
                className={styles.imgProfile}
                style={{
                  backgroundImage: `url("${dataLocation.host.picture}")`,
                }}
              ></div>
            </div>
            <div className={styles.reviews}>
              <Reviews level={dataLocation.rating} />
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div
          className={`${styles.toogleContainer} d-flex justify-content-spacebetween`}
        >
          <span style={{ width: '100%', marginRight: '10px' }}>
            <Toogle
              title="Description"
              description={dataLocation.description}
            />
          </span>

          <span style={{ width: '100%' }}>
            <EquipementToogle
              description={dataLocation.equipments.map((value) => (
                <li key={value.trim()}> {value} </li>
              ))}
            />
          </span>
        </div>
      )}
    </div>
  );
}

export default Location;
