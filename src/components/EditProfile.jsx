import { useState } from "react";
import { UserCard } from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { userActions } from "../utils/userSlice";

export const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);

  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        {
          withCredentials: true,
        },
      );
      console.log("edit res : ", res.data.data);
      dispatch(userActions.addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    } catch (err) {
      console.log("error", err.response);
      setError(err.response.data);
    }
  };

  return (
    <div className="flex justify-center my-10 gap-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>
          <div>
            {/* First name */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First name</legend>
              <input
                type="text"
                className="input"
                value={firstName}
                onChange={(ev) => setFirstName(ev.target.value)}
              />
            </fieldset>
            {/* Last name */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last name</legend>
              <input
                type="text"
                className="input"
                value={lastName}
                onChange={(ev) => setLastName(ev.target.value)}
              />
            </fieldset>

            {/* Photo url */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Photo url</legend>
              <input
                type="text"
                className="input"
                value={photoUrl}
                onChange={(ev) => setPhotoUrl(ev.target.value)}
              />
            </fieldset>

            {/* Gender */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <input
                type="text"
                className="input"
                value={gender}
                onChange={(ev) => setGender(ev.target.value)}
              />
            </fieldset>

            {/* Age */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="text"
                className="input"
                value={age}
                onChange={(ev) => setAge(ev.target.value)}
              />
            </fieldset>

            {/* About */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <input
                type="text"
                className="input"
                value={about}
                onChange={(ev) => setAbout(ev.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary" onClick={saveProfile}>
              Save profile
            </button>
          </div>
        </div>
      </div>

      <UserCard user={{ firstName, lastName, age, gender, photoUrl, about }} />
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};
