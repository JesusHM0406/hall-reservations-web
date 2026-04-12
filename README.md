# Hall Reservations Web

A modern and reactive UI built with **React**, designed to consume the [Hall Reservations API](https://github.com/JesusHM0406/hall-reservations-api) (built by me as well). It allows people to make reservations to (fake) halls and manage them (finish or cancel). Also, for the admins, it allows to manage the users (update the information) and halls (create or update halls).

## Demo (Vercel) and Screenshots
* **Live Demo**: [Click Here to go to the live demo](https://hall-reservations-web.vercel.app/)

<img height="360" alt="Search halls page" src="https://github.com/user-attachments/assets/52725bd5-4d74-4390-a7af-c82866e2928c" />
<img height="360" alt="Reservations Page" src="https://github.com/user-attachments/assets/37855ca0-a3a8-45a5-9004-f4b31fc24be8" />
<img height="360" alt="Users page" src="https://github.com/user-attachments/assets/ad1681be-38e5-4d47-806b-702e7147d56a" />
<img height="360" alt="My account page" src="https://github.com/user-attachments/assets/1592b55f-ea85-4dd3-8972-e8f94562de02" />

## Tech Stack
* **Core:** React 19 (Vite and TypeScript)
* **Styles:** Tailwind CSS
* **State Management:** Context API
* **HTTP Client:** Axios
* **Routing:** React Router v7

## Key Technical Features
* **API Integration:**
 * Custom API Contract to centralice API endpoints, responses type, request type and body type. This makes it necessary to manually update the contract.
 * Centralized API requester to ensure coordination between API contract endpoints and Axios requests.
 * Services for each entity (user, hall and reservation) to avoid repeating the same code.
* **Client-side validation:** The forms are validated with Zod + React Hook Form before sending the data to the API. The responses of the API are also validated to ensure that the UI shows the correct information.
* **Responsive UI:** The web has been implemented using the mobile-first approach using the Tailwind CSS breackpoints.
* **Accessibility (a11y):** To make sure that everyone can use the page I decided to delegate (in some components, not all) that responsibility to [shadcn/ui](https://ui.shadcn.com/) library. And I added manual aria attributes to ensure a11y across the whole page.
* **Event Bus:** Global event bus using as channel the `document` object. This bus allows to dispatch events anywhere in the project and handle it anywhere also, avoiding circular dependencies.

## Local Development
* **Clone the repository:**
```bash
git clone https://github.com/JesusHM0406/hall-reservations-web.git
```
* **Install dependencies:**
```bash
npm install
```
* **Set up enviroment variables:**
Create a `.env` file in the root directory:
```
VITE_API_URL=https://hall-reservations-api.onrender.com
```
* **Run development server:**
```bash
npm run dev
```

## Challenges
* **RBAC:** Implemented role based access control (RBAC) in the client (the API already manage this) showing only the correct components in the Page and allowing only the correct routes of the page.
* **Accessibility:** Added the necessary html accessibility attributes (not only ARIA) to ensure that everyone can use the web correctly.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
