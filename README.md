# Rails 8 + React + Inertia Starter Kit

A modern **Rails 8 starter kit** for building full-stack applications using **React**, **Inertia.js**, and **Vite**, with a strong focus on developer experience, speed, and best practices.

This starter kit is designed to let you **spin up new projects quickly** without repeating the same setup every time.

---

## Quick Start

1. Clone this repository
2. Copy environment variables: `cp .env.example .env`
3. Set up Google OAuth credentials (see `GOOGLE_OAUTH_SETUP.md`)
4. Install dependencies: `bundle install && npm install`
5. Setup database: `rails db:setup`
6. Start server: `./bin/dev`

# Google OAuth Setup

This starter kit includes Google OAuth authentication. You'll need to:

1. Create a new Google Cloud Project for your application
2. Set up OAuth credentials
3. Add them to your `.env` file

**See detailed instructions in [GOOGLE_OAUTH_SETUP.md](GOOGLE_OAUTH_SETUP.md)**

**A stable version of this starter kit without oauth is available through the `stable_without_oauth` branch.**

---

## ✨ Features

### Backend
- **Ruby on Rails 8**
- **Rails built-in authentication**
  - Login
  - Registration
  - Password reset
  - Google OAuth
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

## Tech Stack

| Layer        | Technology |
|--------------|------------|
| Backend      | Ruby on Rails 8 |
| Frontend     | React |
| SPA Bridge   | Inertia.js |
| Bundler      | Vite |
| Styling      | Tailwind CSS + shadcn/ui |
| Testing      | RSpec, FactoryBot, Faker |
| Auth         | Rails 8 built-in authentication, Google OAuth |
