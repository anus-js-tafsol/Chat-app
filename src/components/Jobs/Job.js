import React, { useEffect,useState } from "react";
import JobCard from "../JobCard/JobCard";
import style from "./Job.module.css";
import { useQuery, useMutation } from "react-query";
import { GetFilterArrays, GetJobs } from "../../Services/Jobs";
import { useDispatch, useSelector } from "react-redux";
import { AddJobs, DeccreamentPage, IncreamentPage } from "../../store/Jobs/JobSlice";
const Job = () => {
  const dispatch = useDispatch();
  const [TotalPages, setTotalPages] = useState(1)
  const token = useSelector((state) => state.authReducer.authentication.token);
  const jobs = useSelector((state) => state.JobReducer.job.jobs.jobs);
  // var jobs = []
  const pgNo=useSelector((state) => state.JobReducer.job.jobs.pageno);
  const obj = {
    userId: useSelector((state) => token?state.authReducer.authentication.user._id:null),
    searchKeyWord: useSelector((state) => state.JobReducer.job.SearchKeyword),
    filterArr: useSelector((state) => state.JobReducer.job.FilterArray),
    pageno:pgNo
  };
  const userId = useSelector(
    (state) => state.authReducer.authentication.user._id
  );
  const searchKeyWord = useSelector(
    (state) => state.JobReducer.job.SearchKeyword
  );
  const filterArr = useSelector((state) => state.JobReducer.job.FilterArray);
  // const userId=useSelector(state=> state.authReducer.authentication.user)
  const mutation =useMutation(
    async (apiParams) => {
      return GetJobs(apiParams);
    },
    {
      onSuccess: async (response) => {
        dispatch(AddJobs(response.data));
        // var total= response.totalCount
        setTotalPages(response.totalCount/1)
        // console.log(total)
      },
    }
  );
  useEffect(() => {
    mutation.mutate(obj);
  }, [pgNo]);

  const nextClick=()=>{
    dispatch(IncreamentPage())
    
  }
  const prevClick=()=>{
    dispatch(DeccreamentPage())

  }
  return (
    <div className="mx-2 ">
      <h1>All Jobs</h1>
      <div className={`d-flex flex-wrap justify-content-start`}>
        {jobs && jobs.length>0 ? (
          jobs.map((element, index) => {
            return (
              <>
                <JobCard key={index} />
              </>
            );
          })
        ) : (
          <h3>No Jobs Available</h3>
        )}
      </div>
      <div className="d-flex justify-content-between mx-4 py-5">
        {<button disabled={useSelector(state=>state.JobReducer.job.jobs.pageno)===1} onClick={prevClick} className="btn btn-success">Previous</button>}
        <button disabled={useSelector(state=>state.JobReducer.job.jobs.pageno)>=TotalPages} onClick={nextClick} className="btn btn-success">Next</button>
      </div>
    </div>
  );
};

export default Job;
