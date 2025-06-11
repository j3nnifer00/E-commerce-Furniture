# 🛋️ MERN Stack E-commerce Web App

A **furniture e-commerce web application** built as a practice project using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).



## Backend

- Developed with **Express.js**, deployed on **AWS EC2** as a RESTful API server.  
- Supports full **CRUD operations** for users, products, orders, and featured items.  
- **Authentication**:  
  - Implements **Google OAuth** alongside a custom email/password login system.  
  - Secure route access via **JWT token validation** (e.g., users cannot access "My Orders" directly via URL without valid authentication).  
- Uses **MongoDB** for data storage and schema design.  
- Includes robust **error and exception handling** to ensure secure and stable operation.



## Frontend

- Built with **React.js**, creating a responsive and dynamic user interface.  
- UI design inspired by this [Dribbble concept](https://dribbble.com/shots/21218249-Homey-eCommerce-Furniture-Landing-page).  
- Features intuitive navigation, product filtering, and a modern shopping experience.


## 🛠️ Tools & Technologies

- **Postman** – API testing and debugging  
- **Figma** – UI reference and prototyping  
- **VS Code** – Development environment



## 🚀 Deployment

- **Frontend** hosted via **AWS S3** static web hosting function as it is a single-page React app and to stay within the free tier  
- **Backend** deployed on **AWS EC2**


## 🧠 Lessons Learned

- Implementing RESTful APIs
- Implementing secure user authentication and protected routes  
- Structuring a full-stack project and deploying it on the cloud  
- Integrating external authentication (Google OAuth)


## ✨ Future Improvements

- Add payment integration (Stripe or PayPal)  
- Enhance admin dashboard features  
- Add product reviews and user profiles

