# Emergency Contact
#### Emergency Contact is a web and mobile app that allows doctors, nurses, and first-responders to access medical records and contact information in a matter of seconds via QR codes.

This repository contains the backend for Emergency Contact.  

#### 🔗 [Visit the website](https://emergencycontact.vedantyadu.online/)
#### 🔗 [Frontend Github repository](https://github.com/vedantyadu/emergency-contact-frontend)

## Getting started
### Installing dependencies
```bash
npm install
```
### Environemt variables
Create a `.env` file and put the following variables inside the file :
 - `DATABASE_URL`
 - `PORT`
 - `FRONTEND_ORIGIN`
 - `JWT_PRIVATE_KEY`
 - `EXPIRE_MS`
 - `FIREBASE_API_KEY`
 - `FIREBASE_AUTH_DOMAIN`
 - `FIREBASE_PROJECT_ID`
 - `FIREBASE_STORAGE_BUCKET`
 - `FIREBASE_MESSAGING_SENDER_ID`
 - `FIREBASE_APP_ID`
### Prisma migrations
```bash
prisma migrate dev/deploy
```
