export default {
  async post(url, data){
    try{
      let result =  await axios({
        method: 'post',
        url: url,
        data: data
      });

      if(result.status != 200){
        throw new Error("Uknown server response");
      }

      if(result.data.err != null && typeof result.data.err !== 'undefined'){
        throw result.data.err.toString();
      }

      return result.data;
    }catch(e){
      throw e;
    }
  }
}
