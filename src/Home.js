import React from "react";
import {Link} from 'react-router-dom'

function Home() {
  return (
    <>
      <h1 className="welcome"> Welcome !</h1>
      <div className="home">
      <ul>
        <li>
          <Link className="btnlink" to="/graphs">
            Perform Diagnostics
          </Link>
        </li>
        <li>
          <Link className="btnlink" to="/contact">
            Access Mechanic
          </Link>
        </li>
        <li>
          <Link className="btnlink" to="/calender">
            Notification and Schedular
          </Link>
        </li>
      </ul>
      </div>
    </>
  );
}

export default Home;
