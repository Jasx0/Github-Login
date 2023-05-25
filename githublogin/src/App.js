// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';



const CLIENT_ID = "2ec89014d13b316f450d"

function App() {

  const [rerender, setRerender] = useState(false);
  const [userData,setUserData] = useState({});


  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam);

    if (codeParam && (localStorage.getItem("accessToken") === null)) {
      async function getAccessToken() {
        await fetch("https://localhost:4000/getAccessToken?code=" + codeParam, {
          method: "GET"
        }).then((response) => {
          return response.json();
        }).then((data) => {
          console.log(data);
          if (data.access_token) {
            localStorage.setItem("accessToken", data.access_token);
            setRerender(!rerender);

          }

        })

      }
      getAccessToken();

    }

  }, []);

  async function getUserData() {
    await fetch("https://localhost:4000/getUserData", {
      method: "GET",
      headers:{
        "Authorization": "Bearer" +localStorage.getItem("accessToken")
      }

    }).then((response) =>{
      return response.json();

    }).then((data) =>{
      console.log(data);
      setUserData(data);
    })
  }




  function loginWithGithub() {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID)
  }
  return (
    <div className="App">
      <header className="App-header">
        {localStorage.getItem("accessToken")?
        <>
        <button onClick={()=> {localStorage.removeIterm("accessToken");setRerender(!rerender)      }}>
          Lagout

        </button>

        <h3>Get Data from Github API</h3>
        <button onClick={getUserData}>Get Data</button>

        {Object.keys(userData).length  !== 0?
        <>

        <h4>Hey there</h4>
        </>
        :
        <>
        </>

        }

        </>
        :
        <>
          <button onClick={loginWithGithub}>
          Login with Github
        </button>

        </>
      
      }

      
      </header>
    </div>
  );
}

export default App;
