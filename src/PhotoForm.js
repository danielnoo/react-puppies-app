import {useState} from 'react';

function PhotoForm(props) {

    const [userChoice, setUserChoice] = useState('placeholder');

    // set and update our userChoice state variable
    const handleUserChoice = (e) => {
        setUserChoice(e.target.value);
    }


    return (
        // call getPhotos with the userchoice AND the event
        <form onSubmit={(e) => props.getPhotos(e, userChoice)}>
            <h2> Show me some photos that are:</h2>
            <select 
            id="photoOrientation" 
            name="photoOrientation"
            value={userChoice}
            onChange={handleUserChoice}>
                <option value="placeholder" disabled> Pick one:</option>
                <option value="square">square</option>
                <option value="landscape">landscape </option>
                <option value="portrait"> portrait </option>
            </select>
            <button type="submit">Give me photos!!</button>
        </form>
    )
}

export default PhotoForm