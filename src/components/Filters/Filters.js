import React,{useState} from 'react'
import style from './Filters.module.css'
import { useQuery } from 'react-query'
import { GetFilterArrays,GetJobs } from '../../Services/Jobs'
import { useDispatch, useSelector } from 'react-redux'
import { AddAllFilterArrays, AddFilters, RemoveFilters } from '../../store/Jobs/JobSlice'
const Filers = () => {
const filterArr=useSelector((state)=>{return state.JobReducer.job.AllFilterArrays})
  const dispatch=useDispatch()
    const {isLoading,error,data}=useQuery('FilterAr',GetFilterArrays,{
        onSuccess: (response) => {
          console.log("filters",response)
        dispatch(AddAllFilterArrays(response.data))
        }
      })

  const handleChangeFilter=(e)=>{
    if(e.target.checked){
      dispatch(AddFilters(e.target.value))
    }
    else{
      dispatch(RemoveFilters(e.target.value))
    }
  }
  
  return (
    <div className='my-2'>
      <div className={style.filtercard}>
      <h2 className='mx-2'>Filters</h2>
      <div>
      {
         filterArr? Object.keys(filterArr).map((key,index)=>{
            return (
                <div className='mx-2 mt-2'>
                  <h4>{key}</h4>
                  {
                   filterArr[key].map((item,index)=>{
                    return(
                      <div>
                         <input onChange={handleChangeFilter} type="checkbox" id="vehicle1" name="vehicle1" value={typeof item ==='string'?item:key==='skills'?item['skill']:item['jobCertificate']}/>
                        <label for="vehicle1"> {typeof item ==='string'?item:key==='skills'?item['skill']:item['jobCertificate']}</label><br/>
                      </div>
                    )
                   })
                  }
                </div>
              )
          }):
          null
        }
      </div>
      </div>
    </div>
  )
}

export default Filers
