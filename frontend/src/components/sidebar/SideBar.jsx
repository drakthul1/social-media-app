import "./sidebar.css";
import {
  RssFeed,
  Message,
  VideoLibrary,
  Group,
  Bookmarks,
  Help,
  Work,
  Event,
  School,
} from "@material-ui/icons";
import { Users } from "../../dataCollection";
import Friend from "../friend/Friend";
export default function SideBar() {
  return (
    <div className="sideBar">
      <div className="sideBarWrapper">
        <ul className="sideBarList">
          <li className="sideBarListItem">
            <RssFeed className="sideBarIcon" />
            <span className="sideBarListItemText">Feed</span>
          </li>
          <li className="sideBarListItem">
            <Message className="sideBarIcon" />
            <span className="sideBarListItemText">Messages</span>
          </li>
          <li className="sideBarListItem">
            <VideoLibrary className="sideBarIcon" />
            <span className="sideBarListItemText">Videos</span>
          </li>
          <li className="sideBarListItem">
            <Group className="sideBarIcon" />
            <span className="sideBarListItemText">Groups</span>
          </li>
          <li className="sideBarListItem">
            <Bookmarks className="sideBarIcon" />
            <span className="sideBarListItemText">Bookmarks</span>
          </li>
          <li className="sideBarListItem">
            <Help className="sideBarIcon" />
            <span className="sideBarListItemText">Help</span>
          </li>
          <li className="sideBarListItem">
            <Work className="sideBarIcon" />
            <span className="sideBarListItemText">Jobs</span>
          </li>
          <li className="sideBarListItem">
            <Event className="sideBarIcon" />
            <span className="sideBarListItemText">Events</span>
          </li>
          <li className="sideBarListItem">
            <School className="sideBarIcon" />
            <span className="sideBarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sideBarButton">More</button>
        <hr className="sideBarHr" />
        <ul className="sideBarFriendList">
          {Users.map(u => (
            <Friend key={u.id} user={u}/>
          ))}
        </ul>
      </div>
    </div>
  );
}
