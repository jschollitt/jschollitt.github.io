import { getRandomImage } from "../services/utils";
import PersonBioCard from "./PersonBioCard";

function PersonGroup ({ people }) {

   function getImgPath(index) {
    let imgPath = getRandomImage(200, 200, index);
    return imgPath;
   }

    return (
        <div className="grid">
            { people.map((p, index) => (
                <PersonBioCard className="grid-card" key={index} name={p.name} title={p.title} imgPath={getImgPath(index)} />
            ))}
        </div>
            
    );
}

export default PersonGroup;