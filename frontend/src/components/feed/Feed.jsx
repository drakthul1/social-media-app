import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = username
          ? await axios.get(`/post/profile/${username}`)
          : await axios.get(`/post/timeline/${user._id}`);
        setPosts(
          response.data.sort((prev, cur) => {
            return new Date(cur.createdAt) - new Date(prev.createdAt);
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [username, user._id]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {( !username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
