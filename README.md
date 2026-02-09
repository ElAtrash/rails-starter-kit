# Rails 8 + React + Inertia Starter Kit

A modern **Rails 8 starter kit** for building full-stack applications using **React**, **Inertia.js**, and **Vite**, with a strong focus on developer experience, speed, and best practices.

This starter kit is designed to let you **spin up new projects quickly** without repeating the same setup every time.

---

## Quick Start

1. Use this repository as a [GitHub template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) — choose your starting branch:
   - **`main`** — includes Google OAuth
   - **`stable_without_oauth`** — authentication without OAuth
2. Rename the project: `bin/rename-project my_new_app`
3. Copy environment variables: `cp .env.example .env`
4. Set up Google OAuth credentials (see [GOOGLE_OAUTH_SETUP.md](GOOGLE_OAUTH_SETUP.md)) — skip if using `stable_without_oauth`
5. Install dependencies: `bundle install && npm install`
6. Setup database: `rails db:create db:migrate`
7. Start server: `./bin/dev`

`bin/rename-project app_name` replaces `RailsStarterKit` / `rails_starter_kit` across all config files. Accepts any format — `my_new_app`, `my-new-app`, or `MyNewApp`.

---

## Features

### Backend

- **Ruby on Rails 8**
- **Rails built-in authentication**
  - Login
  - Registration
  - Password reset
- ERB views replaced with **React (JSX) components via Inertia**
- RESTful Rails architecture
- PostgreSQL (default, configurable)

### Frontend

- **React** with **Inertia.js**
- **Vite** for fast builds and HMR
- **Tailwind CSS**
- **shadcn/ui** component system
- Modern frontend directory structure
- Shared layouts and page components

### Testing

- **RSpec** for testing
- **FactoryBot** for fixtures
- **Faker** for realistic test data
- System, request, and model test setup ready out of the box

### Tooling & DX

- Hot Module Reloading (HMR)
- Opinionated but flexible defaults
- Clear separation between backend and frontend concerns

---

## 🧱 Tech Stack

| Layer      | Technology                      |
| ---------- | ------------------------------- |
| Backend    | Ruby on Rails 8                 |
| Frontend   | React                           |
| SPA Bridge | Inertia.js                      |
| Bundler    | Vite                            |
| Styling    | Tailwind CSS + shadcn/ui        |
| Testing    | RSpec, FactoryBot, Faker        |
| Auth       | Rails 8 built-in authentication |
