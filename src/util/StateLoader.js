class StateLoader{
  loadState() {
    try {
      let state = localStorage.getItem("http://localhost:8080/state");
      if (state !== undefined && state !== null) {
        return JSON.parse(state);
      }
    }catch(error){
      console.log('storage불러오기 에러!', error)
    }
    return this.initialState();
  }

  saveState(state) {
    try {
      let json = JSON.stringify(state)
      localStorage.setItem("http://localhost:8080/state", json);
    } catch (error){
      console.log('stage 저장 에러!', error)
    }
  }

  initialState(){
    return{
      auth: {
        retryCount: 0,
        token: null,
        userDetails: null,
        signupModel: {}
      },
      board: {
        reviewBoard:[],
        qnaBoard:[],
        noticeBoard: []
      }
    }//return
  }//initialState
}

export default StateLoader;