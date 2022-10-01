const axios=require("axios");
async function getCompanyNames(companyName){
try{
    const options = {
        url: 'https://www.zaubacorp.com/custom-search',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
            search: companyName,
            filter: "company"
        }
      };

   const companyData=await axios(options)
   const jsonData=companyData.data;
  
   return jsonData

}
catch(err){
    console.log(err);
}
   
};

module.exports={getCompanyNames};
