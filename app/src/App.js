import './App.css';
import Form from'./Form';
import {useState, useEffect} from 'react';

function App() {
  const [token,setToken] = useState("");
  const [elab, setElab] = useState("");
  const [data, setData] = useState("");

  function avviaLog() {
    setElab("logIn");
  }

  function avviaSign() {
    setElab("signIn");
  }

  async function getData(){

      const response = await fetch(`http://localhost:8080/user/${token}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ }),
      });
      const res = await response.json();

      setData("id:"+res.id+" username:"+res.username+" email:"+res.email+" token:"+res.token+" giorno registrazione:"+res.reg_date);
      
  }


  return(
    <div className='App'>
    

    {token !== "" ?
      <span> {data} </span>
    :
    <>
      {elab == "" ?
      <>
      <button onClick={avviaLog}>LogIn</button>
      <button onClick={avviaSign}>signIn</button>
    </>
    :
    <>
      <Form elab={elab} setToken={setToken} token={token} setElab={setElab} getData={getData}/>
      <button onClick={() => setElab("")}>annulla</button>
      </>
    }
      </>
    }
     

      
      
    </div>
  );
}

export default App;
