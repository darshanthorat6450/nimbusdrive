<div align="center">

<img src="./screenshots/dashboard-overview.png" alt="NimbusDrive banner" width="100%"/>

# ☁️ NimbusDrive

### AI-Powered Cloud Storage Platform

A Google Drive–inspired cloud storage platform with a voice assistant, intelligent file organization, and instant file sharing over Email, WhatsApp, and SMS — built on AWS infrastructure for scale and security.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge)](https://amazing-kangaroo-ec32f7.netlify.app/)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

</div>

---

## 📌 About the Project

**NimbusDrive** is a full-stack, cloud-native file storage and sharing platform built to demonstrate a production-style AWS architecture. Users can sign up, upload files of any type, organize and search them (including by voice), track storage usage in real time, and share files securely through expiring links sent via WhatsApp, Email, or copy-link.

The entire system is deployed across managed cloud services rather than a single server — **AWS S3** for object storage, **AWS DynamoDB** for the application database, **AWS IAM** for access control, and **AWS Shield** for DDoS protection — with the backend on **Render** and the frontend on **Netlify**.

> 🗓️ **Built:** December 2025 – January 2026

---

## ✨ Key Features

- 🔐 **Authentication** – Secure sign up / sign in with hashed credentials
- 🎙️ **AI Voice Assistant & Voice Search** – Search or manage files hands-free using speech input
- 📤 **Drag-and-Drop Upload** – Supports any file type (images, video, audio, documents, archives)
- 🗂️ **Smart File Management** – View, rename, download, or delete files with a single click
- 🔗 **Multi-Channel Sharing** – Share files via **WhatsApp**, **Email**, or a copyable link
- 🔒 **Configurable Share Links** – Toggle links between **Private** / **Public** and set custom **expiry windows**
- 📊 **Real-Time Storage Analytics** – Live dashboard showing used vs. available storage, file counts, and usage graphs
- 🗑️ **Recovery & Backup** – Trash, spam filtering, and file recovery tools
- 📱 **Responsive UI** – Collapsible sidebar navigation for mobile and desktop
- ☁️ **Cloud-Native Backend** – Built on AWS for scalability, durability, and high availability

---

## 🖼️ Screenshots

### Sign In
<img src="./screenshots/auth-signin.png" alt="Sign In page" width="600"/>

### Dashboard — Storage Overview
<img src="./screenshots/dashboard-overview.png" alt="Dashboard overview" width="800"/>

### File Manager
<img src="./screenshots/file-manager.png" alt="File manager view" width="800"/>

### Sidebar Navigation
<img src="./screenshots/sidebar-navigation.png" alt="Sidebar navigation" width="500"/>

### Share File Modal
<img src="./screenshots/share-file-modal.png" alt="Share file modal" width="600"/>

### Publicly Shared Files Page
<img src="./screenshots/shared-files-page.png" alt="Shared files page" width="600"/>

---

## 🏗️ Tech Stack & Architecture

| Layer | Technology |
|---|---|
| **Frontend** | React.js, deployed on **Netlify** |
| **Backend** | Node.js / Express, deployed on **Render** |
| **Database** | **AWS DynamoDB** (NoSQL — `nimbus-users`, `nimbus-files`, `nimbus-shares` tables) |
| **File Storage** | **AWS S3** (per-user object buckets) |
| **Access Control** | **AWS IAM** (fine-grained permissions & policies) |
| **Security** | **AWS Shield** (DDoS protection) |
| **Compute** | **AWS EC2** |

### AWS Infrastructure in Action

<img src="./screenshots/aws-console-home.png" alt="AWS Console home" width="800"/>

**Amazon S3** — every user gets an isolated folder (keyed by UUID) inside the storage bucket for their uploaded files.

<img src="./screenshots/aws-s3-bucket.png" alt="S3 bucket objects" width="800"/>
<img src="./screenshots/aws-s3-objects.png" alt="S3 bucket per-user folders" width="800"/>

**Amazon DynamoDB** — three core tables power the application:

| Table | Partition Key | Sort Key | Purpose |
|---|---|---|---|
| `nimbus-users` | `userId` (S) | – | Stores user profile & auth data |
| `nimbus-files` | `userId` (S) | `fileId` (S) | Tracks metadata for every uploaded file |
| `nimbus-shares` | `shareId` (S) | – | Manages share links, expiry, and linked files |

<img src="./screenshots/aws-dynamodb-tables.png" alt="DynamoDB tables" width="800"/>
<img src="./screenshots/aws-dynamodb-shares.png" alt="DynamoDB shares table items" width="800"/>

> 🔒 **Note:** Credentials, password hashes, and personal user data shown during development have been excluded from this README. Never commit real `.env` values, access keys, or database exports to a public repository.

### High-Level Flow

```
┌────────────┐      HTTPS      ┌────────────────┐
│  React UI  │ ───────────────▶│  Node/Express  │
│  (Netlify) │◀─────────────── │   (Render)     │
└────────────┘                 └───────┬────────┘
                                        │
                     ┌──────────────────┼───────────────────┐
                     ▼                  ▼                   ▼
              ┌─────────────┐   ┌───────────────┐   ┌───────────────┐
              │   AWS S3    │   │  AWS DynamoDB │   │   AWS IAM /   │
              │ (File Store)│   │  (App Data)   │   │  AWS Shield   │
              └─────────────┘   └───────────────┘   └───────────────┘
```

---

## 📁 Repository Structure

```
nimbusdrive/
├── backend/            # Node.js / Express API — auth, file, and share routes
│                        # (AWS SDK integration for S3 + DynamoDB)
└── final frontend/      # React.js client application
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- An AWS account with an S3 bucket and DynamoDB tables configured
- AWS IAM credentials with S3 / DynamoDB access

### 1. Clone the repository
```bash
git clone https://github.com/darshanthorat6450/nimbusdrive.git
cd nimbusdrive
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=ap-south-1
S3_BUCKET_NAME=your-bucket-name
DYNAMODB_USERS_TABLE=nimbus-users
DYNAMODB_FILES_TABLE=nimbus-files
DYNAMODB_SHARES_TABLE=nimbus-shares
PORT=5000
```

```bash
npm start
```

### 3. Frontend setup
```bash
cd "final frontend"
npm install
npm start
```

The app will be available at `http://localhost:3000` (frontend) connecting to `http://localhost:5000` (backend).

---

## 🌐 Live Deployment

| Service | Platform |
|---|---|
| Frontend | [Netlify](https://amazing-kangaroo-ec32f7.netlify.app/) |
| Backend API | Render |
| Storage & Database | AWS (S3, DynamoDB, IAM, Shield, EC2) |

---

## 🗺️ Roadmap

- [ ] Two-factor authentication
- [ ] Real-time collaborative file previews
- [ ] Folder-level sharing permissions
- [ ] Usage analytics dashboard for admins
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/darshanthorat6450/nimbusdrive/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is currently unlicensed. Consider adding an [MIT License](https://choosealicense.com/licenses/mit/) if you'd like others to freely use and contribute to this project.

---

## 👤 Author

**Darshan Thorat**

- GitHub: [@darshanthorat6450](https://github.com/darshanthorat6450)

<div align="center">

⭐ If you found this project interesting, consider giving it a star!

</div>
