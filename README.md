# Support Application

![Support App](assets/solutions.png)

## Project Overview

This project is a support application built using Angular, designed to allow users to submit support requests and for admins to manage them. It includes several features:

- **Home Page** (No login required):
  - Navigation header
  - General search area
  - Hero section with a slider (minimum of 2 slides)
  - Partners section with at least 3 logos
  - Contact Us form (name, email, phone, content, captcha, send button)

- **Requests Page** (Login required):
  - Admin login to view the list of submitted requests
  - Admin can view details of each request
  - Admin can mark requests as resolved or not-applicable
  - Requests can be sorted by created date or status (submitted, resolved, not-applicable)

- **Login Page**: A simple login form for admin authentication
  - Username: `admin`
  - Password: `Password`

- **Error Page**: Generic error page for unauthorized access (403, 404, 500).

## Technologies Used

- Angular
- Bootstrap for styling
- Google reCAPTCHA for captcha validation

## Setup Instructions

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Angular CLI** (v14 or higher)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/support-app.git
   cd support-app
   npm i 
   ng serve
   ```

   The application will be running at http://localhost:4200.


## Linting and Testing

### Running Lint Checks
To run lint checks on your Angular application:

```bash
ng lint
```

### Running Unit Tests
To run unit tests:
```
ng test
```


