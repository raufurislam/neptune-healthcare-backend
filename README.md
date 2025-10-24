# 🏥 Neptune Healthcare - Backend API

> A modern, scalable healthcare management system backend

A robust and scalable healthcare management system built with modern technologies, following a modular architecture pattern. This backend powers a comprehensive healthcare platform where patients can book appointments, receive AI-powered doctor recommendations, and access various healthcare services.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-green)](https://nodejs.org/)

## ✨ Features

- 🩺 **Doctor Booking System** - Seamless appointment scheduling and management
- 🤖 **AI-Powered Recommendations** - Intelligent doctor suggestions using OpenAI
- 👤 **User Management** - Secure authentication and authorization
- 📅 **Appointment Management** - Complete CRUD operations for appointments
- 🔐 **JWT Authentication** - Secure token-based authentication with cookies
- 📁 **File Upload** - Cloudinary integration for medical documents and images
- 🗃️ **Database Management** - Prisma ORM with PostgreSQL
- 🔄 **Real-time Updates** - Efficient date handling with date-fns
- ✅ **Type-Safe Validation** - Zod schema validation

## 🛠️ Tech Stack

- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js 5.x
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT with bcryptjs
- **AI Integration:** OpenAI API
- **File Storage:** Cloudinary
- **Validation:** Zod
- **Development:** ts-node-dev for hot reload

## 📁 Project Structure

```
naptune-healthcare-starter/
├── src/
│   ├── modules/          # Feature modules (modular pattern)
│   │   ├── auth/
│   │   ├── doctors/
│   │   ├── appointments/
│   │   ├── users/
│   │   └── ...
│   ├── middlewares/      # Express middlewares
│   ├── utils/            # Utility functions
│   ├── config/           # Configuration files
│   └── server.ts         # Application entry point
├── prisma/
│   └── schema/           # Prisma schema files
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn
- Cloudinary account
- OpenAI API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd naptune-healthcare-starter
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/healthcare_db"

   # JWT
   JWT_SECRET="your-secret-key"
   JWT_EXPIRES_IN="7d"

   # Cloudinary
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"

   # OpenAI
   OPENAI_API_KEY="your-openai-key"

   # Server
   PORT=5000
   NODE_ENV="development"
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   # or run migrations
   npx prisma migrate dev
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

   The server will start at `http://localhost:5000` with hot reload enabled.

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reload

## 🏗️ Modular Architecture

This project follows a **modular pattern** for better code organization and maintainability:

```typescript
modules/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.routes.ts
│   ├── auth.validation.ts
│   └── auth.interface.ts
├── doctors/
│   ├── doctors.controller.ts
│   ├── doctors.service.ts
│   └── ...
```

Each module is self-contained with its own:

- **Controllers** - Handle HTTP requests/responses
- **Services** - Business logic layer
- **Routes** - API endpoint definitions
- **Validation** - Zod schemas for request validation
- **Interfaces** - TypeScript type definitions

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Cookie-based session management
- CORS configuration
- Request validation with Zod
- Environment variable protection

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Shafayat**

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- Prisma team for the excellent ORM
- OpenAI for AI capabilities
- Cloudinary for file storage solutions

---

**Built with ❤️ for better healthcare accessibility**
