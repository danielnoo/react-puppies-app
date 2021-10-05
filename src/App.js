import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import DisplayResults from './DisplayResults';


// get the data 
// create a useEffect with an empty dependency array
// make axios call to api inside the useEffect function
// display the photos!


function App() {
  const[allPhotos, setAllPhotos] = useState([])


  useEffect(() => {
    axios({
      url: "https://api.unsplash.com/search/photos",
      method: "GET",
      dataResponse: "json",
      params: {
        client_id: "K3ZpYsZGAxgoqFekEBMYhzVCtiN0xznC8QWz90j0Uq8",
        query: "puppies",
        per_page: 30,
      }
    }).then(res => {
      

      const puppyPictures = res.data.results
      const withOrientation = puppyPictures.map((photo) => {
        // divide photo width by height
        const ratio = photo.width / photo.height

        let orientation = 'square';

        if (ratio < 0.75) {
          orientation = 'portrait';
        } else if ( ratio > 1.35) {
          orientation = 'landscape';
        } 

        return {...photo, orientation: orientation};

      })
      setAllPhotos(withOrientation)
    })
  }, []);
  
  return (
    <div className="App">
      <h1>hello puppies</h1>
      <DisplayResults photos={allPhotos}/>
    </div>
  );
}

export default App;


// K3ZpYsZGAxgoqFekEBMYhzVCtiN0xznC8QWz90j0Uq8
