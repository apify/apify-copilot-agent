# Apify expert agent

Apify expert agent for github copilot, enabling simple file-based specialization of your copilot coding agent (cca).

## how to use custom agents

- Install:
  - Click the VS Code / Insiders install button for the agent
  - Or add the agent `.agent.md` file to your repo

- MCP server setup:
  - Some agents require MCP servers
  - See `mcp-servers.json` and the GitHub MCP registry for setup

- Activate/use:
  - Use via VS Code chat, assign in GitHub Copilot Chat
  - Agents get tools from configured MCP servers

# Apify expert agent

- Agent file: `.github/agents/apify-expert.md`
- MCP server: `apify` (`https://mcp.apify.com`)
- Tools: `search-actors`, `fetch-actor-details`, `call-actor`, `get-actor-output`, `search-apify-docs`, `fetch-apify-docs`
