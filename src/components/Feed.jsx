import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserCard } from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { feedActions } from "../utils/feedSlice";

export const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(feedActions.addFeed(res.data.data));
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    if (!feed) {
      getFeed();
    }
  }, []);

  console.log("feed :", feed);
  return (
    <div className="flex justify-center">
      {feed && <UserCard user={feed[0]} />}
    </div>
  );
};
