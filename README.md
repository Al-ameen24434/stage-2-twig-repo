# TicketFlow - Twig/PHP Version

A professional ticket management system built with **PHP 8** and **Twig templating**. Features the same beautiful UI as the React and Vue versions, with vanilla JavaScript for localStorage interactions.

## 🚀 Quick Start

### Requirements

- PHP 8.0 or higher
- Composer (for Twig installation)

### Installation

```bash
cd twig-version
composer install
```

### Run Development Server

```bash
php -S localhost:8000
```

Visit `http://localhost:8000` in your browser.

### Test Credentials

- Email: `test@test.com`
- Password: `123456`

## 📦 Tech Stack

- **PHP 8.x** - Server-side language
- **Twig 3** - Modern templating engine
- **custom CSS** - inline and external css
- **Vanilla JavaScript** - No framework, pure JS
- **localStorage** - Client-side data persistence

## 🏗️ Project Structure

```
twig-version/
├── templates/              # Twig template files
│   ├── base.html.twig      # Base layout template
│   ├── landing.html.twig   # Landing page
│   ├── login.html.twig     # Login page
│   ├── signup.html.twig    # Registration page
│   ├── dashboard.html.twig # Dashboard with stats
│   └── tickets.html.twig   # Ticket management
├── assets/                 # Static assets
│   ├── css/
│   │   └── styles.css      # Custom CSS
│   └── js/
│       ├── auth.js         # Authentication logic
│       ├── tickets.js      # Ticket CRUD operations
│       └── main.js         # General utilities
├── lib/                    # PHP utilities
│   └── helpers.php         # Helper functions
├── vendor/                 # Composer dependencies
├── index.php               # Main entry point (router)
├── composer.json           # PHP dependencies
└── README.md               # This file
```

## 🎨 How It Works

### Routing (index.php)

Simple PHP routing based on query parameters:

```php
$page = $_GET['page'] ?? 'landing';

switch ($page) {
    case 'landing':
        render('landing.html.twig');
        break;
    case 'login':
        render('login.html.twig');
        break;
    // ... other routes
}
```

### Templating (Twig)

All templates extend `base.html.twig`:

```twig
{% extends "base.html.twig" %}

{% block title %}TicketFlow - Dashboard{% endblock %}

{% block content %}
    <div class="container mx-auto">
        <!-- Page content here -->
    </div>
{% endblock %}
```

### JavaScript Architecture

**auth.js** - Authentication utilities

```javascript
-getSession() -
  setSession(session) -
  clearSession() -
  registerUser(email, password, name) -
  loginUser(email, password);
```

**tickets.js** - Ticket management

```javascript
-getTickets(userId) -
  createTicket(data, userId) -
  updateTicket(id, data) -
  deleteTicket(id);
```

**main.js** - Shared utilities

```javascript
-showToast(message, type) - initTestData() - formatDate(dateString);
```

## 🔐 Authentication Flow

### How It Works

1. **Client-Side Only**

   - All auth logic runs in JavaScript
   - No server-side session management
   - Uses localStorage for persistence

2. **Registration** (`?page=signup`)

   - Form submission prevented with JavaScript
   - Validation runs client-side
   - User data stored in `ticketapp_users`
   - Auto-login after registration

3. **Login** (`?page=login`)

   - JavaScript validates credentials
   - Creates session with token
   - Stores in `ticketapp_session`
   - Redirects to dashboard

4. **Protected Pages**

   - JavaScript checks auth on page load
   - Redirects to login if not authenticated

5. **Logout**
   - Clears localStorage session
   - Redirects to landing page

## 🎫 Ticket Management

### Data Structure

Same as React/Vue versions:

```javascript
{
  id: string,              // UUID
  title: string,
  description: string,
  status: 'open' | 'in_progress' | 'closed',
  priority: 'low' | 'medium' | 'high',
  createdAt: string,       // ISO datetime
  updatedAt: string,
  userId: string
}
```

### CRUD Implementation

**Create**

- Form with JavaScript validation
- `createTicket()` function
- Toast notification
- Page reload to show new ticket

**Read**

- `getTickets(userId)` on page load
- Filtered by current user
- Rendered with JavaScript

**Update**

- Modal dialog (created with JS)
- Pre-filled with existing data
- `updateTicket()` function

**Delete**

- Confirmation dialog
- `deleteTicket()` function
- Toast notification

### Custom CSS

## 📝 Template Structure

### base.html.twig

Base layout with:

- HTML boilerplate
- Tailwind CDN
- Custom CSS
- JavaScript includes
- Navbar (conditional on auth)
- Footer
- Block for title and content

### Page Templates

Each page extends base and provides:

- Custom title
- Page-specific content
- JavaScript for interactivity

## 🔧 Key Differences from React/Vue

| Feature    | Twig/PHP                            | React/Vue                       |
| ---------- | ----------------------------------- | ------------------------------- |
| Rendering  | Server-side (Twig) + Client updates | Client-side only                |
| Routing    | PHP query params                    | Client-side router              |
| State      | localStorage only                   | State management + localStorage |
| Components | Twig blocks/macros                  | React/Vue components            |
| Reactivity | Manual DOM updates                  | Automatic re-rendering          |
| Build Step | None required                       | Vite build process              |

### Advantages

✅ **No Build Step** - Just PHP server  
✅ **Simple Deployment** - Any PHP hosting  
✅ **Progressive Enhancement** - Works without JavaScript  
✅ **Lower Complexity** - Fewer dependencies

### Trade-offs

⚠️ **Manual DOM Updates** - No virtual DOM  
⚠️ **Page Reloads** - Less SPA-like experience  
⚠️ **More Boilerplate** - Manual event handling

## 🧪 Test Data

Same test data as other versions:

**Test User:**

- Email: test@test.com
- Password: 123456
- Name: Test User

**Sample Tickets:**

- 4 tickets with varied statuses
- Demonstrates all states

Initialized by `initTestData()` in `main.js`.

## ♿ Accessibility

- ✅ Semantic HTML from Twig templates
- ✅ `data-testid` attributes
- ✅ ARIA labels on dynamic content
- ✅ Keyboard navigation
- ✅ Focus states
- ✅ Color contrast compliance

## 🐛 Troubleshooting

**Issue:** Twig not found  
**Solution:** Run `composer install`

**Issue:** Page not loading  
**Solution:** Ensure PHP server is running on correct port

**Issue:** Can't login  
**Solution:** Clear localStorage: `localStorage.clear()`

**Issue:** Styles not loading  
**Solution:** Check internet connection (Tailwind uses CDN)

## 📚 Technologies Used

- [PHP](https://www.php.net/)
- [Twig](https://twig.symfony.com/)
- custom css
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## 🎯 Why This Approach?

This version demonstrates:

1. **Traditional Web Development** - Server-side templating
2. **Progressive Enhancement** - JavaScript adds interactivity
3. **Simplicity** - No complex build tools
4. **Accessibility** - Works with minimal JavaScript
5. **Deployment** - Easy to host anywhere

Perfect for:

- Learning web fundamentals
- Simple projects
- Shared hosting environments
- Progressive web apps

## 🔄 Converting to Other Frameworks

This implementation shows how the same application can be built with:

- **React** - Component-based, virtual DOM
- **Vue** - Reactive, SFC architecture
- **Twig/PHP** - Template-based, progressive enhancement

Each has strengths for different use cases!

---

**Built with PHP 8 & Twig templating 🐘**
