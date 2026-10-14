import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectionAction } from "../utils/connectionSlice";

export const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log("res :", res.data.data);
      dispatch(connectionAction.addConnections(res.data.data));
    } catch (err) {
      console.log("Error :", err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return null;
  }

  if (connections.length === 0) {
    return <h1>No connection found</h1>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full my-10">
      <h1 className="text-bold text-3xl">Connections</h1>
      <div>
        {connections.map((connection) => {
          console.log("conec: ", connection);
          return (
            <ConnectionCard key={connection._id} connection={connection} />
          );
        })}
      </div>
    </div>
  );
};

const ConnectionCard = ({ connection }) => {
  const { firstName, lastName, about, photoUrl } = connection;
  return (
    <div className="flex gap-3 rounded-lg bg-base-300 p-4 m-4">
      <div>
        <img src={photoUrl} alt="photo" className="w-20 h-20 rounded-full" />
      </div>
      <div>
        <h2 className="font-bold">{firstName + " " + lastName}</h2>
        <p>{about}</p>
      </div>
    </div>
  );
};
