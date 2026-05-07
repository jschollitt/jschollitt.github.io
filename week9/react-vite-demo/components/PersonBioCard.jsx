import "./personBioCard.css";
function PersonBioCard ({ name, title, imgPath }) {

    return (
        <div className="bio-card">
            <img className="bio-card-img" src={imgPath} />
            <h4 className="bio-card-name">{name}</h4>
            <h5 className="bio-card-title">{title}</h5>
        </div>
    );
}

export default PersonBioCard;