import React, {useRef, useState, useEffect} from "react"
import {YMaps, Map, Placemark} from 'react-yandex-maps';

const countries = [
  {
    code: 'ES',
    coords: [40.419348, -3.700897],
    imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/1200px-Bandera_de_Espa%C3%B1a.svg.png'
  },
  {
    code: 'NO',
    coords: [59.912752, 10.734365],
    imageUri: 'https://wallpaperaccess.com/full/1093947.jpg'
  },
  {
    code: 'RO',
    coords: [44.428089, 26.102437],
    imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Romania.svg/1200px-Flag_of_Romania.svg.png'
  },
  {
    code: 'GE',
    coords: [41.697048, 44.799307],
    imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_Georgia.svg/1200px-Flag_of_Georgia.svg.png'
  },
  {
    code: 'BY',
    coords: [53.902284, 27.561831],
    imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Belarus_%281995%E2%80%932012%29.svg/1280px-Flag_of_Belarus_%281995%E2%80%932012%29.svg.png'
  },
  {
    code: 'IS',
    coords: [64.125891, -21.849929],
    imageUri: 'https://www.countryflags.com/wp-content/uploads/iceland-flag-png-large.png'
  },
  {
    code: 'MX',
    coords: [19.432605, -99.133296],
    imageUri: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg'
  },
  {
    code: 'IE',
    coords: [53.382539, -6.206559],
    imageUri: 'https://cdn11.bigcommerce.com/s-ey7tq/images/stencil/1280x1280/products/3320/18821/ireland-flag__72814.1575333970.jpg?c=2'
  },
  {
    code: 'CA',
    coords: [45.401795, -75.699583],
    imageUri: 'https://www.worldatlas.com/r/w480/img/flag/ca-flag.jpg'
  },
  {
    code: 'KZ',
    coords: [51.128207, 71.430411],
    imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Flag_of_Kazakhstan.svg/800px-Flag_of_Kazakhstan.svg.png'
  },
  {
    code: 'MC',
    coords: [43.731082, 7.422788],
    imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Flag_of_Monaco.svg/1280px-Flag_of_Monaco.svg.png'
  }
];


function App() {
  const [country, setCountry] = useState(countries[3]);
  const [map, setMap] = useState({center: country.coords, zoom: 4})
  const handleChange = (e) => {
    const selectedCountry = countries.find(el => el.code === e.target.value);
    setCountry(selectedCountry);
    setMap({center: selectedCountry.coords, zoom: 4})
  }

  const mapRef = useRef(null);


  const getRegion = (ymaps) => {
    if (mapRef && mapRef.current) {
      const objectManager = new ymaps.ObjectManager();
      ymaps.borders
        .load("001", {
          lang: 'en',
          quality: 3
        })
        .then((result) => {

          const polygon = result.features.find(el => el.properties.iso3166 === country.code)
          polygon.options = {
            fillOpacity: 0.6,
            fillImageHref: country.imageUri,
            fillMethod: 'stretch',
            strokeColor: "#FFF",
            strokeOpacity: 0.5,
            fillColor: "#3D4C76"
          }

          objectManager.add(polygon);
          mapRef.current.geoObjects.add(objectManager);

        });
    }
  };
  return (
    <div className="App">
      <YMaps key={country.code} query={{ lang: 'en' }}>
        <select defaultValue={country.code} onChange={handleChange}>
          <option value="ES">Испания</option>
          <option value="NO">Норвегия</option>
          <option value="RO">Румыния</option>
          <option value="GE">Грузия</option>
          <option value="BY">Беларусь</option>
          <option value="IS">Исландия</option>
          <option value="MX">Мексика</option>
          <option value="IE">Ирландия</option>
          <option value="CA">Канада</option>
          <option value="KZ">Казахстан</option>
          <option value="MC">Монако</option>
        </select>
        <Map state={map}
             width="100%"
             instanceRef={mapRef}
             onLoad={ymaps => getRegion(ymaps)}
             modules={["borders", "ObjectManager"]}
        >
          <Placemark geometry={country.coords}/>
        </Map>
      </YMaps>
    </div>
  );
}

export default App;
