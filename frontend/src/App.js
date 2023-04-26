import React, {useState, useEffect} from 'react'


function App() {

  const [data,setData] = useState ([{}])
  useEffect(()=>{
    fetch("/testings").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  },[])
  return (
    <div className="App">
     {(typeof data.testings === 'undefined') ? (
      <p>loading....</p>
     ) : (
      data.testings.map((testing, i)=> (
        <p key = {i}>{testing}</p>
      ))
     )}
    </div>
  );
}

export default App;
