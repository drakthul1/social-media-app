import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({
  onlineUsers,
  currentUserId,
  setCurrentChat,
}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const handleClick = async (user) => {
    try {
      const response = await axios.get(
        `/users/find/${currentUserId}/${user._id}`
      );
      setCurrentChat(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await axios.get(
          `/users/friends/${currentUserId}`
        );
        setFriends(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [currentUserId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [onlineUsers, friends]);

  return (
    <div className="chatOnline">
      {onlineFriends.map((onlineFriend) => (
        <div
          className="chatOnlineFriend"
          onClick={() => handleClick(onlineFriend)}
        >
          <div className="chatOnlineImgContainer">
            <img
              src={
                onlineFriend?.profilePicture
                  ? PF + onlineFriend.profilePicture
                  : PF + "person/NoAvatar.png"
              }
              alt=""
              className="chatOnlineImg"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{onlineFriend.username}</span>
        </div>
      ))}
    </div>
  );
}
