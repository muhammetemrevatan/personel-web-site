AI assistants have become part of our daily routine, but most of them charge a monthly fee and keep our data on someone else's servers. What if we could run our own assistant, in our own account, for free? That is exactly what Talorys promises. Let's look at how it works.

## What Is Talorys?

Talorys is a single-user, open-source (MIT-licensed) personal AI assistant that runs entirely inside your own Cloudflare account. It was built by Roc Yu. It is not an official Cloudflare product; it is an independent project built on top of Cloudflare's services.

This distinction matters: Talorys is not a SaaS product you rent. The installer places everything in your account, and from then on the assistant belongs to you.

## What Can It Do?

- Chat with streaming responses and conversation history

- Persistent memory you can view and edit later

- Tasks, notes, and projects

- One-time and recurring reminders

- Daily task digests

- A password-protected web app accessible from any device

## How Does It Work?

Talorys' architecture is simple and built on Cloudflare's serverless ecosystem:

1. Cloudflare Pages: Hosts the React frontend and forwards `/api` requests to the backend.

2. Cloudflare Worker (private): It has no public URL. Only your own frontend can reach it.

3. Durable Object + SQLite: Conversations, memory, tasks, notes, and schedules are stored in one SQLite-backed Durable Object, in your account.

4. Workers AI: Runs the chat model (currently GLM 4.7 Flash).

A smart detail: only the most relevant memories are sent to the model on each turn, not your whole memory. Simple reminders and task digests also run without AI, so even if your daily AI quota runs out, your reminders keep working.

## Setup: One Command

Requirements: a Cloudflare account and Node.js 20.18 or newer.

```bash
npx create-talorys@latest
```

This command:

- Checks your Cloudflare login, and opens Cloudflare's authorization page in your browser if needed

- Asks for an owner password, which is hashed locally with PBKDF2-SHA256 and stored only as a Cloudflare secret

- Deploys the Worker and the Pages site

- Verifies the deployment without running any AI inference

- Prints your site URL at the end

If the setup gets interrupted, it can safely resume where it left off. For automation, there are also `--yes` and `--account-id` flags.

## Is It Really Free?

Talorys itself is free, with no subscription fee. It is designed to fit within Cloudflare's Workers Free plan and does not enable paid features on its own. Cloudflare's daily free-tier quotas still apply, though, so heavy usage may hit limits.

## Privacy and Security

- Your data stays in your own Cloudflare account

- The project ships no telemetry, analytics, tracking, or advertising code, and sends nothing to its developer

- The Worker has no public URL

- Authentication is enforced on the Worker

To be honest about it: your chat messages are still processed by Cloudflare for AI inference.

The accurate claim is not "your data goes nowhere," but "your data stays in an account you control."

## Who Is It For?

### A good fit

- People who want a personal assistant with their own memory and automations

- Anyone who doesn't want to manage a VPS, database server, or Docker

- Those who want their data in their own account

### Keep in mind

- It is single-user, with no team accounts

- The standard deployment uses Cloudflare Workers AI

- The project is new and early-stage, so set your expectations accordingly

## Conclusion

Talorys offers a practical way to own a personal AI assistant without managing servers, paying subscriptions, or handing your data to a third party. Its one-command, serverless, free-plan-friendly design makes it worth a try for developers and curious users alike.

## Key Takeaways

1. Talorys is an open-source (MIT) project by Roc Yu, not an official Cloudflare product

2. It installs with one command: npx create-talorys@latest

3. Everything runs and is stored in your own Cloudflare account

4. It is designed for the free plan, but Cloudflare quotas apply

5. It combines chat, memory, tasks, notes, and reminders in one place

6. The project is new, so test it yourself before relying on it

Source and code: [Talorys — GitHub](https://github.com/rociiu/talorys)
