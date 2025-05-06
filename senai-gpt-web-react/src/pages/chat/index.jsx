import "./chat.css";
import logo from "../../assets/imgs/Chat.png";
import example from "../../assets/imgs/example.svg";
import chatIcon from "../../assets/imgs/chat.svg";
import sendIcon from "../../assets/imgs/send.svg";
import micIcon from "../../assets/imgs/mic.svg";
import imageIcon from "../../assets/imgs/img.svg";
import { useEffect, useState } from "react";

function Chat() {

    const [chats, setChats] = useState([]); //mostrar uma variavel na tela, sempre declarar o useState.
    const [chatSelecionado, setChatSelecionado] = useState(null);

    const [userMessage, setUserMessage] = useState("");

    const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(false);

    useEffect(() => {

        // Executada toda vez que a tela abre.
        getChats();


    }, []);

    const getChats = async () => {
        // Arrow Function
        let response = await fetch("https://senai-gpt-api.up.railway.app/chats", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("meuToken")
            }
        });

        console.log(response);

        if (response.ok == true) {

            let json = await response.json(); // Pegue as informações dos chats.

            let userId = localStorage.getItem("meuId");

            json = json.filter(chat => chat.userId == userId);

            setChats(json);


        } else {

            if (response.status == 401) {

                alert("Token inválido. Faça login novamente.");
                localStorage.clear();
                window.location.href = "/login";

            }

        }

    }

    const onLogOutClick = () => {

        localStorage.clear();
        window.location.href = "/login";

    }

    const clickChat = (chat) => {

        setChatSelecionado(chat);
        console.log(chat);

    }

    const chatGPT = async (message) => {

        return "[IA desativada]";

        // Configurações do endpoint e chave da API
        const endpoint = "https://ai-testenpl826117277026.openai.azure.com/";
        const apiKey = "DCYQGY3kPmZXr0lh7xeCSEOQ5oiy1aMlN1GeEQd5G5cXjuLWorWOJQQJ99BCACYeBjFXJ3w3AAAAACOGol8N";
        const deploymentId = "gpt-4"; // Nome do deployment no Azure OpenAI
        const apiVersion = "2024-05-01-preview"; // Verifique a versão na documentação

        // URL (valor que damos para acessar a API) para a chamada da API
        const url = `${endpoint}/openai/deployments/${deploymentId}/chat/completions?api-version=${apiVersion}`;

        // Configurações do corpo da requisição
        const data = {
            messages: [{ role: "user", content: message }],
            max_tokens: 50
        };

        // Cabeçalhos da requisição
        const headers = {
            "Content-Type": "application/json",
            "api-key": apiKey
        };

        // Faz a requisição com fetch
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            const botMessage = result.choices[0].message.content;
            return botMessage;
        }

    }

    const enviarMensagem = async (message) => {

        // Mostrar chat na tela.
        console.log("Mensagem", message);

        let userId = localStorage.getItem("meuId");

        let novaMensagemUsuario = {

            text: message,
            id: crypto.randomUUID(),
            userId: userId

        };

        let novoChatSelecionado = { ...chatSelecionado };
        novoChatSelecionado.messages.push(novaMensagemUsuario);  //push serve para colocar os itens na lista
        setChatSelecionado(novoChatSelecionado);

        let respostaGPT = await chatGPT(message);

        console.log("resposta", respostaGPT);

        let respostaNaTela = {

            text: respostaGPT,
            id: crypto.randomUUID(),
            userId: "chatbot"

        };
        novoChatSelecionado = { ...chatSelecionado };
        novoChatSelecionado.messages.push(respostaNaTela);  //push serve para colocar os itens na lista
        setChatSelecionado(novoChatSelecionado);

        let response = await fetch("https://senai-gpt-api.up.railway.app/chats" + chatSelecionado.id, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("meuToken"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                novoChatSelecionado
            )

        });

        if (response.ok == false) {

            console.log("Salvar o chat deu errado.");
        }


    }


    const novoChat = async () => {
        let novoTitulo = prompt("Digite o nome do novo chat:");
        if (novoTitulo == null || novoTitulo == "") { // se titulo for nulo ou vazio.
            alert("Insira um titulo");
            return;
        }

        let userId = localStorage.getItem("meuId");

        let nChat = {

            chatTitle: novoTitulo,
            id: crypto.randomUUID(),
            userId: userId,
            messages: []
        }

        let response = await fetch("https://senai-gpt-api.up.railway.app/chats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("meuToken")
            },
            body: JSON.stringify(nChat)
        });

        if (response.ok) {
            //atualiza os chats na tela
            await getChats();
        }

    }



    return (
        <>
            <div className="container">

                <button
                    className="btn-toggle-panel"
                    onClick={() => setIsLeftPanelOpen(true)}
                >
                    ☰
                </button>
                <header className={`left-panel &{isLeftPanelOpen == true ? "open": "" }`}>
                    <div className="top">

                    <button className="btn-new-chat" onClick={() => novoChat()}>+ New chat</button>

                    {chats.map(chat => (
                        <button className="btn-chat" onClick={() => clickChat(chat)}>
                            <img src={chatIcon} alt="ícone de chat." />
                            {chat.chatTitle}
                        </button>
                    ))}

                </div>

                <div className="bottom">

                    <button className="btn-chat">Clear conversations</button>
                    <button className="btn-chat">Light mode</button>
                    <button className="btn-chat">My account</button>
                    <button className="btn-chat">Updates & FAQ</button>
                    <button className="btn-chat" onClick={() => onLogOutClick()}>Log out</button>

                </div>

            </header>

            <main className="central-panel">

                {chatSelecionado == null && (

                    <>

                        <div className="chat-logo">
                            <img src={logo} alt="Logo do SenaiGPT." />
                        </div>

                        <div className="dicas-container">

                            <div className="dicas-item">

                                <h2>
                                    <img src={example} alt="Example icon." />
                                    Examples
                                </h2>

                                <p>Explique como um computador quântico funciona.</p>
                                <p>Explique como um computador quântico funciona.</p>
                                <p>Explique como um computador quântico funciona.</p>

                            </div>

                            <div className="dicas-item">

                                <h2>
                                    <img src={example} alt="Example icon." />
                                    Examples
                                </h2>

                                <p>Explique como um computador quântico funciona.</p>
                                <p>Explique como um computador quântico funciona.</p>
                                <p>Explique como um computador quântico funciona.</p>

                            </div>

                            <div className="dicas-item">

                                <h2>
                                    <img src={example} alt="Example icon." />
                                    Examples
                                </h2>

                                <p>Explique como um computador quântico funciona.</p>
                                <p>Explique como um computador quântico funciona.</p>
                                <p>Explique como um computador quântico funciona.</p>

                            </div>

                        </div>

                    </>

                )}

                {chatSelecionado != null && (

                    <>

                        <div className="chat-container">

                            <div className="chat-header">

                                <h2>{chatSelecionado.chatTitle}</h2>

                            </div>

                            <div className="chat-messages">

                                {chatSelecionado.messages.map(message => (
                                    <p className={"message-item " + (message.userId == "chatbot" ? "chatbot" : "")}>{message.text}</p>
                                ))}

                            </div>

                        </div>

                    </>

                )}

                <div className="input-container-1">

                    <img src={micIcon} alt="Microphone." />
                    <img src={imageIcon} alt="Image." />

                    <input
                        value={userMessage}
                        onChange={event => setUserMessage(event.target.value)} placeholder="Type a message."
                        type="text"
                    />

                    <img onClick={() => enviarMensagem(userMessage)} src={sendIcon} alt="Send." />

                </div>

            </main>

        </div >
        </>
    )

};

export default Chat;