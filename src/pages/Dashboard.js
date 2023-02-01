import React from "react";
import Job from "../components/Jobs/Job";
import Filters from "../components/Filters/Filters";
import Search from "../components/Search/Search";

const Dashboard = () => {
    return(
       <div className="">
            <Search/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-2">
                        <Filters/>
                    </div>
                    <div className="col-lg-9">
                        <Job/>
                    </div>
                </div>

            </div>
       </div>
    )
}

export default Dashboard