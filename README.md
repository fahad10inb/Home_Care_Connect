# Home Care Connect

Home Care Connect is a professional web application designed to streamline and manage home care services. The platform leverages modern frontend technologies to connect caregivers, clients, and service providers, ensuring efficient scheduling, communication, and service delivery.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview

Home Care Connect provides a user-friendly interface for clients seeking home care services and for caregivers or agencies managing appointments and care plans. The solution is tailored for scalability, security, and ease of use, facilitating seamless interactions and transparent service management.

## Features

- **User Authentication & Management:** Secure login and registration flows for clients and caregivers.
- **Service Scheduling:** Book, view, and manage appointments with real-time updates.
- **Caregiver Directory:** Browse and select caregivers based on skills and availability.
- **Notifications:** Real-time alerts and updates for appointments and communications.
- **Analytics Dashboard:** Visualize service usage, caregiver performance, and user satisfaction (planned/optional).
- **Responsive UI:** Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend:** React 18, React Router DOM, Tailwind CSS for styling, Lucide React Icons
- **State Management & Utilities:** clsx, class-variance-authority, tailwind-merge
- **Backend & Database:** Firebase (authentication & data storage)
- **Testing:** React Testing Library, Jest
- **Build Tools:** Webpack, Babel, PostCSS, TypeScript

For detailed dependencies, see [package.json](https://github.com/fahad10inb/Home_Care_Connect/blob/main/package.json).

## Getting Started

### Prerequisites

- Node.js >= 14.x
- npm >= 6.x or yarn

### Installation

```bash
git clone https://github.com/fahad10inb/Home_Care_Connect.git
cd Home_Care_Connect
npm install
```

### Running the App

```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view in your browser.

### Building for Production

```bash
npm run build
```

## Project Structure

- `/src` - Main application source code (components, pages, utilities)
- `/public` - Static assets and HTML template
- `package.json` - Project metadata and dependencies
- `tailwind.config.js` - Tailwind CSS configuration
- `.github/` - GitHub workflows and configuration (if present)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

1. Fork the repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is currently unlicensed. For use or distribution, please contact the repository owner.

---

For more details, visit the [Home Care Connect GitHub repository](https://github.com/fahad10inb/Home_Care_Connect).
