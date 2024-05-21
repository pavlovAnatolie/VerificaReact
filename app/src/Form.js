import { useState } from "react";

export default function Form({elab, setToken, token,setElab, getData}) {
  
    const[email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [username, setUsername]=useState("");

    const [status, setStatus]=useState("");



  async function logIn() {
    const response = await fetch(`http://localhost:8080/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    });

    const tok = await response.json();
    setToken(tok.token);

    if(token != ""){
        getData(token);
        setElab("");
    }
        


  }

    async function signIn() {
      const response = await fetch(`http://localhost:8080/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password, email: email}),
      });
      const stat = await response.json();
      setStatus(stat.status);

     if(stat.status){
        setElab("");
     }
        
    }




    function regUsername(event) {
        setUsername(event.target.value);
      }
  
      function regPassword(event) {
        setPassword(event.target.value);
      }

      function regEmail(event) {
        setEmail(event.target.value);
      }



    return (
      <div>
        {elab !== "signIn" ? (
          <>
            <h1>Accedi</h1>
            Username:
            <input type="text" name="nome" onChange={regUsername} />
            <br />
            Password:
            <input type="cognome" name="cognome" onChange={regPassword} />
            <br />
            
             {token == "" && <span>Username o Password errata</span>}
            <button onClick={logIn}>Salva</button>

           
          </>
        ) : (
          <>
            <h1>Registrati</h1>
            Email:
            <input type="cognome" name="cognome" onChange={regEmail} />
            <br />
            Username:
            <input type="text" name="nome" onChange={regUsername} />
            <br />
            Password:
            <input type="cognome" name="cognome" onChange={regPassword} />
            <br />

           { !status && <span>Username o Email gia esistente</span>}
            <button onClick={signIn}>Salva</button>

            
          </>
        )}
      </div>
    );
  }
