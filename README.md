# Raj Kushwaha Portfolio

A responsive developer portfolio for DevOps, DevSecOps, and Java Full Stack work. The site uses section-based HTML partials, split CSS files, Bootstrap, Font Awesome, Devicon, AOS, Typed.js, and Three.js animations.

## Features

- Responsive portfolio layout for desktop, tablet, and mobile
- Right-side desktop navigation with animated Three.js background
- Split sections loaded into `index.html`
- DevOps + DevSecOps focused technology section
- Projects, certificates, achievements, services, and contact sections
- Animated scroll-to-top button
- Floating helper button linked to the contact section
- Web3Forms contact form with bot-check field
- GitHub Actions workflow for GitHub Pages deployment

## Project Structure

```text
.
|-- .github/workflows/deploy.yml
|-- images/
|-- partials/
|   |-- footer.html
|   `-- navbar.html
|-- scripts/
|   `-- playful-effects.js
|-- sections/
|   |-- about.html
|   |-- achievements.html
|   |-- certificates.html
|   |-- coding-journey.html
|   |-- contact.html
|   |-- home.html
|   |-- projects.html
|   |-- services.html
|   `-- technologies.html
|-- styles/
|   |-- base.css
|   |-- components.css
|   |-- effects.css
|   |-- footer.css
|   |-- navbar.css
|   `-- responsive.css
|-- index.html
|-- script.js
`-- style.css
```

`style.css` is the main CSS entry file. It imports the smaller CSS files from `styles/`.

## Run Locally

This project uses `fetch()` to load partial HTML files, so open it through a local server.

Recommended: use VS Code Live Server.

Or run:

```bash
python -m http.server 5500
```

Then open:

```text
http://127.0.0.1:5500/
```

## Deployment

GitHub Actions deployment is configured in:

```text
.github/workflows/deploy.yml
```

To use it:

1. Push the project to GitHub.
2. Go to repository `Settings -> Pages`.
3. Set source to `GitHub Actions`.
4. Push to the `main` branch.

The workflow will upload and deploy the static site to GitHub Pages.

## Contact Form

The contact form is in:

```text
sections/contact.html
```

It uses Web3Forms with an `access_key`, `from_name`, and `botcheck` field. If emails land in spam, mark them as not spam and verify the receiving email in Web3Forms.

## Common Edits

- Navbar links: `partials/navbar.html`
- Footer content: `partials/footer.html`
- Hero section: `sections/home.html`
- About/experience: `sections/about.html`
- Services: `sections/services.html`
- Projects: `sections/projects.html`
- Certificates: `sections/certificates.html`
- Main JavaScript: `script.js`
- Extra playful effects: `scripts/playful-effects.js`
- Colors/theme: `styles/base.css`
- Navbar styling: `styles/navbar.css`
- Responsive fixes: `styles/responsive.css`

## Notes

- Do not open `index.html` directly from the file system because section loading may fail.
- Three.js animations require the CDN script in `index.html`.
- Keep large styling changes inside the correct file in `styles/` instead of adding everything to `style.css`.
