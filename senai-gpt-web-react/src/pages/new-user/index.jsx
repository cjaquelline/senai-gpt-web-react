
import { useState } from "react";
import "./newuser.css";
import logo from "../../assets/imgs/Chat.png";



function NewUser() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, SetConfirmPassword] = useState("");

    const onNewUserClick = async () => {

        let response = await fetch("https://senai-gpt-api.up.railway.app/users", {

            headers: {
                "Content-Type": "application/json",
            },
            method: "POST", // Método que envia dados
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            })

        });

        if (response.ok == true) { // Verifica se a requisição deu certo.

            alert("Cadastro realizado com sucesso!");

            window.location.href = "/login";

        } else {

            if (response.status == 401) {

                alert("Credenciais incorretas. Tente novamente.");

            } else {

                alert("Erro inesperado aconteceu, caso persista, contate os administradores.");

            }

        }

    }



    return (

        <>
            <header></header>

            <main className="page-container">


                <div className="robo-image">
                </div>

                <div className="login-container">

                     <img className="login-logo" src={logo} alt="Logo do SenaiGPT." />

                    <h1
                        id="meutitulo"
                        className="titulo"
                    >Novo usuário</h1>

                    <input className="inpt" value={name} onChange={event => setName(event.target.value)} placeholder="Insira o nome do usuário" />
                    <input className="inpt" value={email} onChange={event => setEmail(event.target.value)}type="email" placeholder="Insira o e-mail" />
                    <input className="inpt" value={password} onChange={event => setPassword(event.target.value)}type="password" placeholder="Insira a senha" />
                    <input className="inpt" value={confirmpassword} onChange={event => SetConfirmPassword(event.target.value)}type="password" placeholder="Insira a senha" />

                    <button className="btn" onClick={() => onNewUserClick()}>Entrar</button> <br/>
                    <a className="form-hint" href="/login">Clique aqui para fazer o login</a>

                </div>

            </main>

            <footer></footer>
        </>


    )

}

export default NewUser;