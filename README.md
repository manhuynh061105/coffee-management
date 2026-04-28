# ☕ Beans Café - Coffee Ordering & Management System

**Beans Café** is a specialized e-commerce web system designed for coffee shops. The project focuses on optimizing the ordering experience for users and providing powerful administrative tools for managers, featuring a modern and sophisticated Espresso-themed interface.

---

## 🚀 Tech Stack

- **Frontend:** React.js, React Context API, React Router, Bootstrap 5, React-Toastify.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB Atlas.
- **Styling:** CSS3 (Custom Espresso Theme), FontAwesome.

---

## 📖 User & Admin Workflow

### 👤 Customer Workflow (User Flow)
1.  **Onboarding:** Users access the homepage to **Register** a new account or **Login** to the system.
2.  **Product Selection:** Navigate to the **Menu** page to browse the coffee list. Users can filter products based on their preferences.
3.  **Product Details:** Click on individual items to view the **Product Detail** page, including specific descriptions and pricing.
4.  **Shopping Cart:** Add favorite items to the **Cart**. The system supports real-time total calculation and quantity management.
5.  **Checkout:** Review order information, add delivery notes/addresses, and click **Place Order**.
6.  **Order Management:** After a successful order, users can visit **Order History** to track status. Once the coffee is received, click the **"Received"** button to complete the process.

### 🔑 Administrator Workflow (Admin Flow)
1.  **Access:** Admin logs into the system with administrative credentials to access the Dashboard.
2.  **Product Management (CRUD):** - **Add:** Create new products with names, prices, images, and descriptions.
    - **Edit:** Update menu item information as needed.
    - **Delete:** Remove discontinued products from the menu.
3.  **Analytics:** Access the Dashboard to view **Revenue Statistics** and manage the overall business operations of the shop.

---

## 🛠 Installation & Setup

### 1. System Requirements
- Node.js (v14 or higher)
- Git

### 2. Installation Steps
```bash
# Clone the project from GitHub
git clone [https://github.com/manhuynh061105/coffee-management](https://github.com/manhuynh061105/coffee-management)

# Backend Setup
cd backend
npm install
npm start

# Frontend Setup
cd ../frontend
npm install
npm start