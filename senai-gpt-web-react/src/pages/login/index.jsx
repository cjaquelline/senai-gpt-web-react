import "./login.css";
import logo from "../../assets/imgs/Chat.png";
import { useState } from "react";

function Login() {

  const [email, setEmail] = useState ("");
  const [password, setPassoword] = useState ("");

  const onLoginClick = async () => {


    let response = await fetch ("https://senai-gpt-api.azurewebsites.net/login", {

      headers: {
        "Content-Type" : "application/json"
      },
      method: "POST", //Método que envia dados
      body: JSON.stringify  ({ //quem define é o back-end
        email: email, 
        password: password //não precisa de virgula porque é a ultima propriedade
      })

    }); 

    console.log (response);

  }


  return (
    <>
      <header></header>

      <main className="paige-container">

        <div className="robo-image"></div>


        <div className="login-container">

          <img className="logo" src={logo} alt="Logo do SeniaGPT." />

          <h1
           
            id="meutitulo"
            className="titulo"
          >Login</h1>

          <input className="inpt" value={email} onChange={event => setEmail(event.target.value)} type="email" placeholder="Insira o e-mail" />
          <input className="inpt" value={password} onChange={event => setPassoword(event.target.value)} type="password" placeholder="Insira a senha" />

          <button className="btn" onClick={() => onLoginClick()}>Entrar</button>

        </div>

      </main>
 
      <footer></footer>
    </>
  )
}

export default Login;