import "./sidebar.css";
import AboutMeImg from "../../assets/aboutm-pic-fb-download0621.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [cat, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  });
  return (
    <div className="sidebar">
      <div className="sideBarItem">
        <span className="sideBarTitle">ABOUT ME</span>
        <img
          className="sideBarImg"
          style={{ width: 260, height: 250 }}
          src={AboutMeImg}
          alt=""
        />
        <p>
          I'm graduated in computer science at the University of HOUDEGBE NORTH
          AMERICAN UNIVERSITY BENIN. I have years of experience working on Java,
          JavaScript, Php, and Database programming language and I'm currently
          looking for the next opportunity.
        </p>
      </div>
      <div className="sideBarItem">
        <span className="sideBarTitle">CATEGORIES</span>
        <ul className="sideBarList">
          {cat.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
              <li className="sideBarListItem">{c.name}</li>
            </Link>
          ))}
        </ul> 
      </div>
      <div className="sideBarItem">
        <span className="sideBarTitle"></span>
        <div className="sideBarSocial">
          <i className="sideBarIcon fab fa-facebook-square"></i>
          <i className="sideBarIcon fab fa-twitter-square"></i>
          <i className="sideBarIcon fab fa-instagram-square"></i>
          <i className="sideBarIcon fab fa-github-square"></i>
        </div>
      </div>
    </div>
  );
}
