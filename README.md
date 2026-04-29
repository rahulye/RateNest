# RateNest

A full-stack application that allows users to share products, write comments, and rate products.  
Guests can view all products, while authenticated users can create, update, and manage their own products and comments.

---
## Preview
[Live demo](https://rate-nest-ten.vercel.app/)

## Screen Recorded Video
https://github.com/user-attachments/assets/39a92bc5-5291-48b2-9936-4784be3e25a1


## API Routes

### Products
- `GET /api/products` – Get all products (public)
- `GET /api/products/:id` – Get product by ID (public)
- `GET /api/products/my` – Get current user products
- `POST /api/products` – Create product (auth)
- `PATCH /api/products/:id` – Update product (owner)
- `DELETE /api/products/:id` – Delete product (owner)

### Comments
- `POST /api/comments/:productId` – Add comment (auth)
- `DELETE /api/comments/:commentId` – Delete comment (owner)

### Users
- `POST /api/users/sync` – Sync Clerk user with database
  
---

## Screenshots and Walkthrough

**Home Page** – Guests and users can view all products  
<img width="1919" height="1079" alt="Home page" src="https://github.com/user-attachments/assets/519d0486-b8ee-4ecb-b315-6e924f858b68" />

**New Products** – Products added within the last 24 hours
<img width="1227" height="616" alt="New products" src="https://github.com/user-attachments/assets/3f2a1db6-55f5-4f38-ab8e-eb3058f7ffcc" />

**User Profile** – Only the authorized owner can view their profile  
<img width="1919" height="682" alt="User profile" src="https://github.com/user-attachments/assets/c228944d-dd03-46be-acd6-626d3ed04c33" />

**Update & Delete** – Only the authorized owner can update or delete products and comments  
<img width="1919" height="1079" alt="Update and delete" src="https://github.com/user-attachments/assets/b7a5f499-b31a-4625-b14a-cb4bf0babdb2" />

**Add Comments** – Only signed-in users can comment on products  
<img width="991" height="411" alt="Add comment" src="https://github.com/user-attachments/assets/7fbc157a-b353-40bc-9e37-15f0e308ed33" />

**Delete Comments** – Only the comment owner can delete comments  
<img width="956" height="430" alt="Delete comment" src="https://github.com/user-attachments/assets/31fa871d-6ee1-4d8f-bbe9-53eba24336cf" />

**User Products View** – Authorized users can edit their own products  
<img width="1919" height="1079" alt="User products" src="https://github.com/user-attachments/assets/0fb2b605-b9b2-438e-9427-7256ef8e23e6" />

**Add Product** – Only authenticated users can create a product  
<img width="1913" height="801" alt="Add product" src="https://github.com/user-attachments/assets/6e389eb6-6221-4a5e-91b6-c1bccd27943f" />

---


## Project Structure

```
frontend
├── public
│   └── image.png
│
├── src
│   ├── components     # Reusable UI components
│   ├── hooks          # Custom React hooks
│   ├── lib            # API & utility helpers
│   ├── pages          # Route-based pages
│   ├── types          # TypeScript types
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .env
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md

backend
├── src
│   ├── config
│   │   └── env.ts
│   │
│   ├── controllers
│   │   ├── productControllers.ts
│   │   ├── commentControllers.ts
│   │   └── userControllers.ts
│   │
│   ├── routes
│   │   ├── productRoutes.ts
│   │   ├── commentRoutes.ts
│   │   └── userRoutes.ts
│   │
│   ├── db
│   │   ├── index.ts
│   │   ├── schema.ts
│   │   └── queries.ts
│   │
│   ├── types
│   │   ├── product.ts
│   │   ├── user.ts
│   │   └── globals.d.ts
│   │
│   └── server.ts
│
├── drizzle.config.ts
├── .env
├── tsconfig.json
├── package.json
└── README.md
```

---
## Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- DaisyUI
- TanStack Query
- React Router
- Clerk Authentication

### Backend
- Node.js
- Express.js
- TypeScript
- Drizzle ORM
- Clerk (middleware)
- PostgreSQL

### Deployment
- Frontend: Vercel
- Backend: Render

---

## Features

- Public product browsing (guest access)
- User authentication (sign in / sign up)
- Add, edit, and delete products (owner only)
- Comment on products
- Product rating system
- User profile with "My Products"
- Loading and error UI states
- Responsive UI
- Secure REST API
- Theme modes



  
