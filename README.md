# Articles Management Web Application Guide

Welcome to the Articles Management Web application! This guide will help you get the application running on your local machine in just a few minutes. This React-based application provides a comprehensive solution for managing articles with authentication, publishing, and content management features.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn package manager
- A modern web browser (Chrome, Firefox, Safari, or Edge)

The application is built with React 19.1.0 and uses Ant Design for the UI components, so you'll need a compatible development environment.

## Installation

Follow these steps to set up the project on your local machine:

1. Clone the repository (if you haven't already):

```bash
git clone <repository-url>
cd Articles-Management-Web---react-basic
```

2. Install dependencies:

```bash
npm install
```

or if you prefer yarn:

```bash
yarn install
```

This will install all required dependencies including React, Ant Design, Axios, and other packages listed in the package.json file.

## Running the Application

Once the dependencies are installed, you can start the development server:

Start the development server:

```bash
npm start
```

or with yarn:

```bash
yarn start
```

Open your browser and navigate to `http://localhost:3000`

The application will automatically open in your default browser, and you'll see the login page. The development server supports hot reloading, so any changes you make to the code will be reflected immediately in the browser.

## Basic Usage

### Logging In

The application requires authentication to access its features. For demonstration purposes, you can use the following test credentials:

- Mobile Number: 13811111111
- Verification Code: 386454

These credentials are pre-filled in the login form for your convenience. Simply click the "Login" button to access the application.

### Navigating the Application

After logging in, you'll be redirected to the dashboard. The application has a sidebar navigation with the following main sections:

- 数据概览 (Data Overview) - The home page showing application statistics
- 文章管理 (Article Management) - View and manage existing articles
- 内容管理 (Content Management) - Create and publish new articles

The application uses React Router for navigation, providing a smooth single-page application experience.

### Managing Articles

The core functionality of this application is article management. Here's how to perform basic operations:

- **View Articles**: Navigate to "文章管理" to see a list of all articles with their status, publication date, and engagement metrics.

- **Create a New Article**:
 1. Navigate to "内容管理"
 2. Fill in the article details including title, content, and cover image
 3. Choose the cover type (single image, three images, or no image)
 4. Save as draft or publish immediately

- **Edit Existing Articles**:
 1. In the article list, click the edit button (pencil icon)
 2. Modify the article content
 3. Save your changes

- **Delete Articles**:
 1. In the article list, click the delete button (trash icon)
 2. Confirm the deletion

The application supports different article statuses: draft, pending review, approved, and rejected, which are color-coded for easy identification.

The application uses an event bus for component communication, which allows different parts of the application to communicate without tight coupling. This is particularly useful for actions like editing or deleting articles from the list view.

## Next Steps

Now that you have the application running and understand the basic functionality, you might want to:

- Explore the codebase: Check the `src` directory to understand the project structure and component organization.
- Customize the API endpoint: The application is configured to use `http://geek.itheima.net/v1_0/` as the base URL. You can change this in `src/utils/request.js` to connect to your own backend.
- Add new features: Extend the application with additional functionality based on your needs.
- Build for production: When you're ready to deploy, run `npm run build` to create an optimized production build.

Congratulations! You've successfully set up and are running the Articles Management Web application. For more detailed information about specific features or the application architecture, check out the other documentation in this series.
