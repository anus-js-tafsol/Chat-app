const GetFilterArrays=async()=>{
    const res=await fetch('https://react-jobster-backend.herokuapp.com/api/admin/get-all-array',{
        method:'GET',
        headers:{
            'content-Type':'application/json'
        },
    })
    const response= await res.json()
    // console.log(response)
    return response
}
const GetJobs=async (ApiParams)=>{
    const {userId,searchKeyWord,filterArr,pageno}=ApiParams
    console.log("page",pageno)
    const res=await fetch(`https://react-jobster-backend.herokuapp.com/api/job/searchByFilters?page=${pageno}&limit=1&role=user&userId=${userId}&searchArr=${filterArr}&search=${searchKeyWord}`,{
        method:'POST',
        headers:{
            'content-Type':'application/json'
        },
    })
    const response= await res.json()
    return response
}
export {GetFilterArrays,GetJobs}