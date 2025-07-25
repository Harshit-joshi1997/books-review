# Book Review Application

A simple web application built with React, Next.js, and Material-UI that allows users to browse a collection of books, filter them by author, and provide ratings.

## Features

-   **Book Browsing:** View a curated list of books with details like cover image, author, price, and publication year.
-   **Author Filtering:** Dynamically filter the book list by selecting an author from a dropdown menu.
-   **Interactive Ratings:** Rate books using a star-based rating system.
-   **Authentication Pages:** Includes UI for user Signup and Login.
-   **Theme Toggle:** Switch between Light, Dark, and System color modes.

## Tech Stack

-   
-   **Library:** [React]
-   **Language:** [TypeScript]
-   **UI:** [Material-UI]

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18.x or later recommended)
-   npm, yarn, or pnpm

### Installation & Running

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd Book-review/review-books
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application. The main page with books is at `/home-page`.

## Future Improvements

-   Implement backend logic for user authentication.
-   Connect to a database to store and retrieve book and user data instead of using a static list.
-   Persist user ratings.
-   Add more filtering and sorting options (e.g., by price, publication year, rating).

