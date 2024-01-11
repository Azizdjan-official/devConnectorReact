import { Spinner } from "react-bootstrap";
import useFetch from "../Hooks/useFetch";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { data: profile, isLoading } = useFetch("/profile/me");
  // console.log(profile);

  return isLoading ? (
    <Spinner />
  ) : profile ? (
    <div className="container d-flex flex-column gap-3">
      <h1>Dashboard</h1>
      <h2>Welcome {profile.user.name}</h2>
      <div className="d-flex gap-3">
        <Button as={Link} to="/edit-profile" variant="secondary">
        Edit profile
        </Button>
        <Button as={Link} to="/add-exp" variant="secondary">
        Add experience
        </Button>
        <Button as={Link} to="/add-edu" variant="secondary">
        Add education
        </Button>
      </div>
      <h1>Experience Credentials</h1>
      <div className="d-flex gap-3">
        <button disabled class="btn btn-secondary">Company</button>
        <button disabled class="btn btn-secondary">Title</button>
        <button disabled class="btn btn-secondary">Years</button>
      </div>
      <h2>Education Credentials</h2>
      <div className="d-flex gap-3">
        <button disabled class="btn btn-secondary">School</button>
        <button disabled class="btn btn-secondary">Degree</button>
        <button disabled class="btn btn-secondary">Years</button>
      </div>
      <button class="btn btn-danger w-25">Delete my account</button>
    </div>
    
  ) : (
    <>
      <h1>Dashboard</h1>
      <h2>Welcome </h2>
      <p>You have not yet setup a profile, please add some info</p>
      <Button as={Link} to="/profile" variant="info">
          Create Profile
        </Button>
    </>
  );
};

export default Dashboard;
