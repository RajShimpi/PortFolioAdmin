import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import "boxicons";
import { useDataProvider } from "../../useContext/usecontext";

const Sidebar = () => {
const { isSidebarOpen, setIsSidebarOpen } = useDataProvider();
  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      window.addEventListener("resize", listener);
      return () => window.removeEventListener("resize", listener);
    }, [matches, query]);

    return matches;
  };

  const [active, setActive] = useState(1);

  const changeSmall = useMediaQuery("(max-height: 550px)");

  return (
    <div className={`sidebar ${isSidebarOpen ? "expanded" : ""}`} style={{paddingTop:"20px"}}>
      <div
        className="boxicon-container"
        onClick={() => setActive(1)} // Set active item
      >
        <box-icon
          className={`boxicon ${active === 1 ? "active" : ""}`}
          size={changeSmall ? "sm" : "md"}
          name="home"
          type="solid"
        ></box-icon>
        <p
          className={`description ${isSidebarOpen ? "show-description" : "hide"} ${
            active === 1 ? "active-description" : ""
          }`}
        >
          Home
        </p>
      </div>

  

    
      {/* Resources */}
      <div
        className="boxicon-container"
        onClick={() => setActive(4)} // Set active item
      >
        <box-icon
          className={`boxicon ${active === 4 ? "active" : ""}`}
          size={changeSmall ? "sm" : "md"}
          name="spreadsheet"
          type="solid"
        ></box-icon>
        <p
          className={`description ${isSidebarOpen ? "show-description" : "hide"} ${
            active === 4 ? "active-description" : ""
          }`}
        >
          Resources
        </p>
      </div>

   
      {/* Settings */}
      <div
        className="boxicon-container"
        onClick={() => setActive(6)} // Set active item
      >
        <box-icon
          className={`boxicon ${active === 6 ? "active" : ""}`}
          size={changeSmall ? "sm" : "md"}
          name="cog"
          type="solid"
        ></box-icon>
        <p
          className={`description ${isSidebarOpen ? "show-description" : "hide"} ${
            active === 6 ? "active-description" : ""
          }`}
        >
          Settings
        </p>
      </div>

      {/* Log Out */}
      <div
        className="boxicon-container"
        onClick={() => setActive(7)} // Set active item
      >
        <box-icon
          className={`boxicon ${active === 7 ? "active" : ""}`}
          size={changeSmall ? "sm" : "md"}
          name="log-out"
          rotate="180"
        ></box-icon>
        <p
          className={`description ${isSidebarOpen ? "show-description" : "hide"} ${
            active === 7 ? "active-description" : ""
          }`}
        >
          Log Out
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
