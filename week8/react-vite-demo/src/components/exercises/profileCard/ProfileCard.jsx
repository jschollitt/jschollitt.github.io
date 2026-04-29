import './profile.css';
import getRandomImage from "../../RandomImage";

function ProfileCard({name, profile, imgSize}) {
  return (
    <div className="card">
      <img
        className="profile-image"
        src={getRandomImage(imgSize)}
        alt="Profile"
      />

      <h1 className="name">{name}</h1>

      <p className="job">{profile}</p>

      <button className="button">View Profile</button>
    </div>
  );
}

export default ProfileCard;