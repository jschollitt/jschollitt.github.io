import { getRandomImage } from "../services/utils";

function RandomImage({width, height}) {
    let imgURL = getRandomImage(width, height); 
    return (
        <img src={imgURL} style={{width, height}} />
    );
}

export default RandomImage;