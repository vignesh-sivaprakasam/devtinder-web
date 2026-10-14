import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { requestActions } from "../utils/requestSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/review/${status}/${_id}`,
        {},
        {
          withCredentials: true,
        },
      );
      console.log("res: ", res);
      dispatch(requestActions.removeRequests(_id));
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      console.log("res :", res.data.data);
      dispatch(requestActions.addRequests(res.data.data));
    } catch (err) {
      console.log("err: ", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) {
    return null;
  }

  if (requests.length === 0) {
    return <h1>No requests found</h1>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full my-10">
      <h1 className="text-bold text-3xl">Connections</h1>
      <div>
        {requests.map((request) => {
          console.log("conec: ", request);
          return (
            <RequestCard
              key={request._id}
              request={request}
              reviewRequest={reviewRequest}
            />
          );
        })}
      </div>
    </div>
  );
};

const RequestCard = ({ request, reviewRequest }) => {
  const { firstName, lastName, about, photoUrl } = request.fromUserId;
  return (
    <div className="flex gap-8 rounded-lg bg-base-300 p-4 m-4 items-center">
      <div>
        <img src={photoUrl} alt="photo" className="w-20 h-20 rounded-full" />
      </div>
      <div>
        <h2 className="font-bold">{firstName + " " + lastName}</h2>
        <p>{about}</p>
      </div>
      <div className="flex gap-3">
        <button
          className="btn btn-active btn-primary"
          onClick={() => reviewRequest("rejected", request._id)}
        >
          Reject
        </button>
        <button
          className="btn btn-active btn-secondary"
          onClick={() => reviewRequest("accepted", request._id)}
        >
          Accept
        </button>
      </div>
    </div>
  );
};
