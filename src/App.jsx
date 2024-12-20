import React,{useEffect} from 'react';


const App=()=> {
  useEffect(()=>{

    async function fetchFromOffset(offset) {
      return await fetch("https://api.cricapi.com/v1/countries?apikey=9650d7d8-e911-4b38-9eb8-0d888dbee8c3&offset=" + offset)
          .then(data => data.json())
          .then(data => {
              if (data.status != "success") { alert("Failed"); return; }
              let datarray = data.data;
              if (!datarray)
                  return [];
              else if (offset >= data.info.totalRows)
                  return datarray;
              else
                  return fetchFromOffset(offset + 25)
                      .then(function (data) {
                          return datarray.concat(data);
                      });
          })
          .catch(e => console.log);
  }
  fetchFromOffset(0)
      .then(function (data) {
          console.log("Complete data got!", data);
      })
      .catch(e => console.log);

  });

  return (
   <div>Live Cricket</div>
  )
};

export default App;


