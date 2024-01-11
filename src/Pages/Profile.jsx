
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const { profileId } = useParams();
    // console.log(profileId);
    const profile = useSelector((store) => store.user);
    console.log(profile);
    // const post = profile.find((p) => p._id === profileId);
    // console.log(post);
    
  return (
    <div>
      this is profile
    </div>
  )
}

export default Profile
