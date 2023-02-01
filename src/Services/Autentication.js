
const LoginUser=async (data)=>{
    let res=await fetch('https://react-jobster-backend.herokuapp.com/api/general/login',{
        method:'POST',
        headers:{
            'content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    const response =await res.json()
    console.log(response)
    return response

}

export {LoginUser}