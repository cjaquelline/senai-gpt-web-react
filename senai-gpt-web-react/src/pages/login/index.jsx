import "./login.css";

function Login() {


  return (
    <>
      <header></header>

      <main className="paige-container">

        <div className="robo-image"></div>


        <div className="login-container">

          <img className="logo" src="../assets/imgs/Chat.png" alt="Logo do SeniaGPT." />

          <h1
           
            id="meutitulo"
            className="titulo"
          >Login</h1>

          <input className="inpt" type="email" placeholder="Insira o e-mail" />
          <input className="inpt" type="password" placeholder="Insira a senha" />

          <button className="btn">Entrar</button>

        </div>

      </main>

      <footer></footer>
    </>
  )
}

export default Login;