# Project 3 - Licensing Portal for FI Sales Team

## Introduction
The Licensing Portal for the FI Sales Team is a full-stack MERN application (MongoDB, Express, React, and Node) designed to help the Licensing Team of a Financial Institution manage the licensing of their sales team. It ensures that sales representatives are properly authorized to sell life insurance and takaful products to clients. This project was developed in just over a week.


> [!NOTE] 
> This repo contains code for the front end. For back end, please refer to the repo [HERE](https://github.com/normanKL/project-3-licensing-portal-BE)


## Installation

* You can check out the live application [HERE]()
  You can use your own login credentials, or try a demo one using:
    + username:
    + password:

* You can also run it locally (requirement: have a local version of MongoDB running)
  +  Front end: Clone this repo -> run `npm install` -> run `npm run dev`
  +  Back end: Clone this repo -> run `npm install` -> run `npm run dev`


> [!NOTE]
> You will need to create a collection link in your MongoDB and amend the code before run `npm run dev`


## Licensing Portal Walkthrough 

  ### Home, Signup and Login Pages

  
  <img src="https://github.com/user-attachments/assets/7de17db3-2bdf-4794-8c34-95233364ac64" alt="image" height = "350" width="550" style="float: left; margin-right: 20px;" />
  <img src="https://github.com/user-attachments/assets/9dfcab72-1d58-417b-a748-6d392692c57c" alt="image" height = "280" width="380" style="float: left; margin-right: 0px;" />
  <img src="https://github.com/user-attachments/assets/b4c95387-21a6-43cc-b84c-dffa373ec7ee" alt="image" height = "280" width="380" style="float: left; margin-right: 0px;" />


  ### User and Team Pages


  <img src="https://github.com/user-attachments/assets/902f9252-97f5-4b33-a244-2559d755cbc0" alt="image" height = "430" width="350" style="float: left; margin-right: 20px;" />
  <img src="https://github.com/user-attachments/assets/4a60c9bf-e7a9-4492-9c07-8d7c223ff54f" alt="image" height = "230" width="380" style="float: left; margin-right: 20px;" />


   ### Individual Specialist and All Specialists 


  <img src="https://github.com/user-attachments/assets/cab5e11f-9f6e-47ad-8440-ba8e09a2cd88" alt="image" height = "300" width="300" style="float: left; margin-right: 20px;" />
  <img src="https://github.com/user-attachments/assets/5ac5f183-bc18-4fa6-89c0-624aed4ea8f1" alt="image" height = "230" width="380"  style="float: left; margin-right: 20px;" />

  
  ### Search, Edit, and Create Specialist Record Pages


  <img src="https://github.com/user-attachments/assets/6e6cd003-3108-4136-b28d-43d8e5a4a18f" alt="image" height = "280" width="380" style="float: left; margin-right: 20px;" />
  <img src="https://github.com/user-attachments/assets/d581190a-1342-445c-aeb8-908e983e8158" alt="image" height = "280" width="380" style="float: left; margin-right: 20px;" />
  <img src="https://github.com/user-attachments/assets/d3074f55-7698-4586-b7fd-28c67d74c287" alt="image" height = "280" width="380" style="float: left; margin-right: 20px;" />


 ## Tech Stack

  ### Front End
  * React Framework (Single Page Application)
  * API Handling: Axios
  * Bulma and CSS
  * React-Router-Dom
    
  ### Back End
  * Server: Node.js & Express
  * Database: MongoDB & Mongoose
  * Safeguarding from injection attacks: Express Mongo Sanitize
  * Password Encryption: Bcrypt
  * Authentication: JSON Web Token (JWT)
    
  ### Collaboration & Development
  * Git, GitHub
  * Postman for API testing
  * Excalidraw for wireframing
  * npm
    
  ### Deployment:
  * Front End: 
  * Back End:

    
## Features

* Profile Display and Navigation: View all user and specialist profiles, with the ability to navigate to individual profile pages for detailed information.
* Real-time Search: Quickly search through specialist profiles by name, region, or branch.
* Restricted Profile Editing: Users can edit specialist profiles, but only for those within their assigned region.
* Authentication: Log in and sign up functionality is available for users.
* IT Support Access: A dedicated button allows users to email IT support directly for assistance.

Post Login Capabilities:
* Welcome Banner: Upon login, a personalized banner greets the user by name.
* Create Specialist Profiles: Users can create new specialist profiles, but only within their assigned region.
* Edit Specialist Profiles: Users can update the licensing status of specialists, restricted to those within their region.
* Delete Specialist Profiles: Users can remove specialist profiles, provided they belong to their region.
* View and Contact Other Users: Users have access to view other users' profiles and can email them directly.


## Architecture

### Front End:
* React Components to compartmentalise code
* React Hooks for state management and handling side effects
* Single Page Application (react-router-dom) using Link, useNavigate, useLocation and useParams

### Back End:
* All security checks (user access credentials) done in the back end:
* Email validation (correct format and uniqueness)
* Password validation (encryption and strength: minimum of 8 characters, at least one lowercase & uppercase letter and number)
* Obscuring the password response from the front end
* Login credentials expire after 24 hours
* Secure routing middelware to verify logged in users and only that same user can create. edit and delete specialist profiles under his/ her region
* Error handling middleware to assist with debugging
* 4 interlinked schema models in MongoDB for profiles, comments and posts
* Data seeding of 3 user profiles, 6 specialist profiles, 6 Life Insurance licensing status and 6 Takaful licensing status


## Future Improvements & Bugs
This is a basic licensing portal that can be developed in just over a week. However, to make it a fully functional and valuable tool, several improvements and additional features are needed:
* Expanded Product Coverage: Currently, the portal only tracks licensing status for Life Insurance and Takaful, including exam information. In practice, licensing is also required for additional wealth management products, such as unit trusts and more complex financial offerings.
* Product Certification Integration: Beyond licensing, specialists must be product-certified before engaging with clients. This portal should include product certification tracking and be integrated with other systems, such as underwriting and system access management.
* Streamlined Specialist Onboarding: The current process places an additional burden on licensing specialists. Ideally, new specialists should receive an automated email with a link to complete forms and upload required documents, such as certificates, directly through the portal.

After several rounds of testing, no bugs have been identified in this version of the portal.

  


