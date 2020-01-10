const restaurantDB = require('../database')
const {produceToken} = require('../security/token')

const login = (username, password) => {
   return restaurantDB.login(username,password).then(res=>{
    if(res.length){
        console.log("result is",res)
        const payload={username:res[0].userName,password:res[0].password}
        const token=produceToken(payload)
        const data={token:token,userName:res[0].userName}
        return data
    }
    else{return[]}
})

}

module.exports = {login}