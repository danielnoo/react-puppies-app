import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import DisplayPhotos from './DisplayPhotos';
import PhotoForm from './PhotoForm';
// uJDCuDibqIEPp00s8ioM6w_b0ZtZcEnVBrBCsO8AmSQ
// endpoint https://api.unsplash.com/search/photos


// get the data!
// - create a useEffct with an empty dependency array!
// - make axios call to unsplash api inside teh useeffecte
// display the photos!
// - make a display component!
// state variables: photos, setPhotos!
// Filter the data!
// - onChange handler and onSubmitHandler(event listeners)

function App() {

  const [allPhotos, setAllPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  useEffect(()=>{
    // call unsplash api for puppy pics
    axios({
      url: "https://api.unsplash.com/search/photos",
      method: "GET",
      dataResponse: "json",
      params: {
        client_id: "uJDCuDibqIEPp00s8ioM6w_b0ZtZcEnVBrBCsO8AmSQ",
        query: "puppies",
        per_page: 30,
      }
    }).then((res) => {
      // add in an orientation property to the
      // photo object, to make our lives easier later
      const puppyPictures = res.data.results
      const withOrientation = puppyPictures.map((photo)=>{
        // divdie photo width by height
        const ratio = photo.width / photo.height

        let orientation = 'square';

        if (ratio < 0.75){
          // width is less than the height so portrait
          // (also that  means width/height will be less than 1!)
          orientation = "portrait";
        } else if (ratio > 1.35) {
          // width is greater that height, so landscape!
          // also means that width/height will be greater than 1
          orientation = "landscape";
        }

        return {...photo, orientation: orientation};

      });
      setAllPhotos(withOrientation);
    })

    // empty dependency, so we call the api on page load!
  }, []);
  
  // onSubmit function to pass on to Photoform
  const getPhotos = (e, photoOrientation) => {
    e.preventDefault();
    const copyOfAllPhotos = [...allPhotos];
    // create an array with only the photos in our selected
    //orientation!
    const currentFilteredPhotos = copyOfAllPhotos.filter((photo)=>{
      return photo.orientation === photoOrientation;
    });
    // set them to a separate bit of state!
    setFilteredPhotos(currentFilteredPhotos);


  }

  return (
    <div className="App">
      <h1> Show me puppies! </h1>
      <PhotoForm getPhotos={getPhotos}/>
      <DisplayPhotos photos={filteredPhotos}/>
    </div>
  );
}

export default App;


// K3ZpYsZGAxgoqFekEBMYhzVCtiN0xznC8QWz90j0Uq8
