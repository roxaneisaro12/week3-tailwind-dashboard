# RoamDesk — Travel Admin Dashboard

RoamDesk is a responsive travel administration dashboard built with HTML, vanilla JavaScript, Vite, and Tailwind CSS v4. It helps travel teams review booking activity, monitor key statistics, explore popular destinations, and add new bookings through a form.

## Features

- Responsive dashboard layout for desktop, tablet, and mobile screens
- Booking table with search and status filtering
- Booking form with input validation
- Local storage persistence for new bookings
- Dashboard statistics, activity panel, and destination cards
- CSV booking export

## Technologies

- HTML5
- Vanilla JavaScript
- Vite
- Tailwind CSS v4

## Tailwind CSS Customization

Tailwind CSS is configured through the Vite plugin and imported into the project stylesheet. The custom theme uses an ivory, taupe, charcoal, and muted-gold palette, with a serif display font for a restrained travel-inspired appearance. Reusable component classes created with `@apply` keep cards, buttons, badges, navigation links, and form fields visually consistent. Responsive utility classes adapt the dashboard to different screen sizes.

## Run Locally

1. Install [Node.js](https://nodejs.org/).
2. Install dependencies with `npm install`.
3. Start the development server with `npm run dev`.
4. Open the local URL shown in the terminal.

## Build

Run `npm run build` to generate the production build in the `dist` directory.
