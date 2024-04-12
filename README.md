<div aling="center">
<img src="assets/logo.svg" alt="Sona Logo" style="height: 200px; width:100%;"/>
</div>

---
<div align="center">
    <strong>
  Sona é uma aplicação voltada a criar um canal para comunicação por voz em partidas de league of legends utilizando um bot do discord.
  </strong>

  <h2>
    <a href="https://sona.app.br">Site Oficial</a>
  </h2>
  
</div>

---
<div align="center">

  <p align="center">
    <a href="#sobre">Problema</a>&nbsp;&nbsp;&nbsp;&#149;&nbsp;&nbsp;&nbsp;
    <a href="#setup">Setup</a>&nbsp;&nbsp;&nbsp;&#149;&nbsp;&nbsp;&nbsp;
    <a href="#observações">Observações</a>&nbsp;&nbsp;&nbsp;&#149;&nbsp;&nbsp;&nbsp;
   </p>
</div>

---

# Problema

League of legends atualmente não possui um meio de comunicação por voz nas rankeadas e mesmo normal game, unicas maneiras de você se comunicar por voz é utilizando o voip do jogo, porém ele só funciona 
quando é iniciado a fila com membros em grupo ou utilizando um meio de comunicação externo, por diversas vezes vi jogadores mandarem seus discords particulares para outros jogadores entrarem, só que isso acaba acarretando em um problema de ficar entrando em diversos discords desconhecidos.

Para solucionar isso criei a aplicação como um meio de possibilitar uma interface de comunicação em um canal do discord criado dinâmicamente quando sua partida é iniciada, mesmo sem nenhum dos jogadores se conhecendo.


### Sona em funcionamento

[![Watch the video](/app/assests/Youtube.png)](https://www.youtube.com/watch?v=F6JpOxfMgvs)

---

# Setup

instalar os pacotes

```bash
# não é possivel usar *pnpm* devido a um problema em um pacote utilizado na lib nextron
npm install ou yarn
```

### Convex


É necessário criar uma conta no convex e criar um projeto para você utilizar, as variáveis devem ser colocadas no arquivo .env

<a href="https://www.convex.dev">Site Convex</a>

### Servidor

Para funcionar é necessário que o servidor esteja rodando primeiro. na porta de sua preferência, só atenção para colocar a mesma porta na hora de configurar o **bot do discord**.

a credencial: **NEXT_PUBLIC_SONA_SECRET_DISCORD_OAUTH** deve ser igual a crendencial no servidor em 

```bash
server/src/app/discord/callback/page.tsx
```

```js

// deve ser substituido no lugar de sona-secret-key
async function updateUserWithDiscord() {
    if (refInput.current === null || data === null) return;

    const encrypted = await CryptoJs.AES.decrypt(refInput.current.value, "sona-secret-key")
  }
```

---

# Observações

Algumas informações são importantes sobre o projeto. Eu fiz ele como objeto de estudo e em pouco tempo, então grande parte das coisas não utilizei a melhor abordagem. Fique livre para alterar ou mudar oque você achar pertinente. 

## Detalhes para rodar

O projeto funciona em 3 etapas, então todas tem que estar rodando para ele funciona em ordem, para evitar problemas siga a ordem:

1 - [Bot do discord](https://github.com/sona-voice-app/discord-bot)
2 - [Servidor](https://github.com/AguaPotavel/sona-server)
3 - Abra o league of legends.
4 - Inicie o Applicativo desktop.

## Convex

O convex quando é utilizado como desenvolvimento ele faz um deploy das suas funções, mutations e etc sempre que você salvar um arquivo na pasta convex,então se você alterar algo em um dos projeto e rodar outro posteriormente ele irá sobrescrever aquela função baseado no que o último tem local, idealmente era para utilizar ele em só um dos projetos, é uma coisa que preciso refatorar e centralizar só para o servidor alterar no convex.

## Discord

As credenciais do discord tem que ser colocadas de acordo com o bot do discord, mais detalhes sobre ela no repositório do bot nessa mesma organização.

## Variaveis de ambiente

No app possui dois arquivos de variaveis o externo que fica na pasta **root**

e outro dentro da pasta **renderer**, lembre-se de configurar os dois.

ao rodar: 

```bash
yarn dev 
# é utilizado o arquivo .env.development e renderer/.env.development

yarn prod # app buildado
# é utilizado o arquivo .env.production e renderer/.env.development
```

**Devido a uma limitação do próprio nextron não configurei para alterar o arquivo de env para produção na interface visual, tentei algumas abordagens que conhecia e nenhuma funcionou, tem issues abertas no projeto do nextron sobre isso ainda sem resposta, fique atento a isso**

