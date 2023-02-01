import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  job: {
    jobs: { pageno: 1, jobs: [] },
    AllFilterArrays: {},
    FilterArray: [],
    SearchKeyword: "",
  },
};

const JobSlice = createSlice({
  name: "JobSlice",
  initialState,
  reducers: {
    AddAllFilterArrays: (state, { payload }) => {
      console.log(payload);
      state.job.AllFilterArrays = payload;
    },
    AddSearchKeyword: (state, { payload }) => {
      console.log(payload);
      state.job.SearchKeyword = payload;
    },
    AddFilters: (state, { payload }) => {
      state.job.FilterArray.push(payload);
    },
    RemoveFilters: (state, { payload }) => {
      const filtered = state.job.FilterArray.filter((item, index) => {
        return item !== payload;
      });
      state.job.FilterArray = filtered;
    },
    AddJobs: (state, { payload }) => {
      state.job.jobs.jobs = payload;
    },
    IncreamentPage:(state,{payload})=>{
        state.job.jobs.pageno=state.job.jobs.pageno+1
    },
    DeccreamentPage:(state,{payload})=>{
        state.job.jobs.pageno=state.job.jobs.pageno-1
    },
  },
});

export const {
  AddAllFilterArrays,
  AddSearchKeyword,
  AddFilters,
  RemoveFilters,
  AddJobs,
  IncreamentPage,
  DeccreamentPage
} = JobSlice.actions;
export default JobSlice.reducer;
