<div align="center">
<img src="/assets/Logo.svg" alt="Sona Logo" style="height: 200px; width:100%;"/>
</div>

---
<div align="center">
    <strong>
  Sona is an application designed to create a voice communication channel for League of Legends matches using a Discord bot.
  </strong>

  <h2>
    <a href="https://sona.app.br">Official Website</a>
  </h2>
  
</div>

---
<div align="center">

  <p align="center">
    <a href="#problem">Problem</a>&nbsp;&nbsp;&nbsp;&#149;&nbsp;&nbsp;&nbsp;
    <a href="#setup">Setup</a>&nbsp;&nbsp;&nbsp;&#149;&nbsp;&nbsp;&nbsp;
    <a href="#notes">Notes</a>&nbsp;&nbsp;&nbsp;&#149;&nbsp;&nbsp;&nbsp;
   </p>
</div>

---

# Problem

League of Legends currently lacks built-in voice communication for ranked or normal games. The only ways to communicate by voice are either using the game's built-in VoIP (which only works when queuing with a pre-made group) or via external communication tools. Often, players share their personal Discord accounts, which leads to joining multiple unknown servers.

To address this, I created Sona, an application that dynamically generates a Discord channel when a match starts, allowing voice communication without players having to know each other beforehand.

### Sona in Action

[![Watch the video](/assets/Youtube.png)](https://www.youtube.com/watch?v=F6JpOxfMgvs)

---

# Setup


```bash
# *pnpm* cannot be used due to an issue with a package in the nextron library
npm install or yarn
```

### Convex


You need to create an account on Convex and set up a project. Add the required environment variables to the .env file.

<a href="https://www.convex.dev">Convex Website</a>

### Server

To function properly, the server must run first on your preferred port. Ensure the same port is configured in the Discord bot.

The credential: NEXT_PUBLIC_SONA_SECRET_DISCORD_OAUTH should match the server credential in:

```bash
server/src/app/discord/callback/page.tsx
```

```js

// Replace "sona-secret-key" accordingly
async function updateUserWithDiscord() {
    if (refInput.current === null || data === null) return;

    const encrypted = await CryptoJs.AES.decrypt(refInput.current.value, "sona-secret-key")
  }
```

---

# Notes

Some important notes about the project: I developed it as a study project in a short time, so many parts don't follow the best practices. Feel free to modify or improve anything you find necessary.

## Running the project

The project consists of three parts, and all need to be running in order:

1 - [Dircord bot](https://github.com/AguaPotavel/sona-voice-app/tree/main/bot)
2 - [Server](https://github.com/AguaPotavel/sona-server)
3 - Open league of legends.
4 - Start desktop application.

## Convex

When using Convex in development mode, it deploys your functions, mutations, etc., every time you save a file in the Convex folder. If you run one project after modifying another, the last one will overwrite the previous functions. Ideally, Convex should be centralized in the server. This requires refactoring.

## Discord

Discord credentials must be configured according to the Discord bot. More details can be found in the bot repository within the same organization.

## Environment Variables

The app has two environment variable files: one in the **root** folder and another in the **renderer** folder. Ensure both are properly configured.

to run: 

```bash
yarn dev 
# Uses .env.development and renderer/.env.development

yarn prod # Builds the app
# Uses .env.production and renderer/.env.development
```

**Due to a limitation in Nextron, I couldn't configure the environment file to switch to production in the visual interface. I attempted several approaches, but none worked. There are open issues in the Nextron project regarding this, so keep this in mind.**

