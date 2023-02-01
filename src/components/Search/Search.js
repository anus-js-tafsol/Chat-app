import React,{useRef} from 'react'
import { useDispatch } from 'react-redux'
import { AddSearchKeyword } from '../../store/Jobs/JobSlice'
import style from './Search.module.css'
const Search = () => {
const inp = useRef(null)
const dispatch =useDispatch()
const clickSearch=()=>{
  dispatch(AddSearchKeyword(inp.current.value))
}

  return (
    <div className={`${style.searchBg}`}>
      <div className=''>
        <h3 className='text-center'>Search for job You are </h3>
        <h3 className=' text-center'>Looking for </h3>
        <div className={style.searchbar}>
                <input ref={inp} className={style.input} type="text" placeholder='Search for a Job' />
                <button onClick={clickSearch} className='btn btn-success' >Search</button>
        </div>
      </div>
    </div>
  )
}

export default Search
