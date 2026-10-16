import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { feedActions } from "../utils/feedSlice";

export const UserCard = ({ user }) => {
  const { firstName, lastName, age, about, photoUrl, gender, _id } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/send/${status}/${userId}`,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(feedActions.removeUserFromFeed(userId));
    } catch (error) {
      console.log("ERROR : ", error);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="w-full h-1/2">
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <div className="h-full">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <span>{age + ", " + gender}</span>}
          <div>{about}</div>
        </div>
        <div className="card-actions justify-center ">
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
