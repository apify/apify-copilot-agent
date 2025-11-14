# 🤖 Apify Integration Expert

A GitHub Copilot agent that helps developers integrate [Apify Actors](https://apify.com/store) into their codebases. This agent specializes in:

- 🔍 **Actor selection** - Find the right Actor for your use case
- 🏗️ **Workflow design** - Plan integration workflows
- 💻 **Multi-language implementation** - Support for JavaScript/TypeScript and Python
- 🗄️ **Database integration** - Persist scraped data to SQL and vector stores
- 🧪 **Testing** - Ensure your integration works with Playwright E2E support
- 🚀 **Production deployment** - Best practices for security and error handling

## 🛠️ What's included

- **Agent file**: `.github/agents/apify-integration-expert.md`
- **MCP server**: `apify` (`https://mcp.apify.com`)
- **Tools**: `search-actors`, `fetch-actor-details`, `call-actor`, `get-actor-output`, `search-apify-docs`, `fetch-apify-docs`

## 📋 Setup instructions

### 1️⃣ Copy the Agent files

Create a repository on GitHub and copy the `.github/agents` folder from this repository into your own.

### 2️⃣ Configure secrets

Set up the `copilot` environment secrets in your repository settings:

- **`APIFY_TOKEN`**: Your Apify API token for accessing Apify services ([how to get your API token](https://docs.apify.com/platform/integrations/api))
- 📖 [Detailed setup guide](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/use-copilot-agents/coding-agent/extend-coding-agent-with-mcp#setting-up-a-copilot-environment-for-copilot-coding-agent)

### 3️⃣ Set up MCP server

Configure the Apify MCP server in **Repository Settings → Copilot → Coding Agent**:

- 📖 [MCP setup guide](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/use-copilot-agents/coding-agent/extend-coding-agent-with-mcp)
- Use the MCP server configuration from the `mcp-servers.json` file in this repository
- The Apify MCP server provides tools for searching actors, fetching actor details, calling actors, and accessing documentation

### 4️⃣ Configure firewall settings

Disable firewall restrictions in **Repository Settings → Copilot → Coding Agent** to allow the agent to run Apify Actors:

- ⚠️ **Enable firewall** - Turn **OFF** to allow access to Apify services
- ⚠️ **Limit Copilot coding agent's Internet access to only allow access to allowlisted locations** - Turn **OFF** to allow calling Apify Actors

### 5️⃣ Start using the Agent

1. Push all your changes (including the `.github/agents` folder) to your repository
2. Go to https://github.com/copilot/agents
3. Select your repository from the list
4. Select the **"Apify Integration Expert"** agent to start using it

---

**Happy coding! 🎉** If you have any questions, check out the [Apify documentation](https://docs.apify.com) or reach out to the community.


