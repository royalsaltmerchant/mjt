#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const TEMPLATE_PATH = path.join(__dirname, 'session-template.ejs');
const LIST_TEMPLATE_PATH = path.join(__dirname, 'sessions-list-template.ejs');
const HOME_TEMPLATE_PATH = path.join(__dirname, 'home-template.ejs');
const DATA_PATH = path.join(__dirname, 'sessions-data.json');

// Load template and data
const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
const listTemplate = fs.readFileSync(LIST_TEMPLATE_PATH, 'utf8');
const homeTemplate = fs.readFileSync(HOME_TEMPLATE_PATH, 'utf8');
const sessions = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

function generateSessionPage(session) {
  const html = ejs.render(template, session);
  const sessionDir = path.join(__dirname, 'sessions', session.sessionSlug);
  const outputPath = path.join(sessionDir, 'index.html');

  // Ensure directory exists
  if (!fs.existsSync(sessionDir)) {
    fs.mkdirSync(sessionDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, html);
  console.log(`✓ Generated ${session.sessionSlug}/index.html`);
}

function generateSessionsListPage() {
  // Group sessions by year
  const sessionsByYear = sessions.reduce((acc, session) => {
    const year = session.year || 'Unknown';
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(session);
    return acc;
  }, {});

  const html = ejs.render(listTemplate, { sessionsByYear });
  const outputPath = path.join(__dirname, 'sessions', 'index.html');

  fs.writeFileSync(outputPath, html);
  console.log('✓ Generated sessions/index.html');
}

function generateHomePage() {
  // The most recent session is the first one in the array
  const mostRecentSession = sessions[0];

  const html = ejs.render(homeTemplate, { mostRecentSession });
  const outputPath = path.join(__dirname, 'index.html');

  fs.writeFileSync(outputPath, html);
  console.log('✓ Generated index.html (redirects to most recent session)');
}

function generateAllSessions() {
  console.log('Generating all session pages...');
  sessions.forEach(generateSessionPage);
  generateSessionsListPage();
  generateHomePage();
  console.log(`\nDone! Generated ${sessions.length} session pages + sessions list + home page.`);
}

function generateSingleSession(slug) {
  const session = sessions.find(s => s.sessionSlug === slug);
  if (session) {
    console.log(`Generating ${slug}...`);
    generateSessionPage(session);
  } else {
    console.error(`Session "${slug}" not found.`);
    console.log('Available sessions:', sessions.map(s => s.sessionSlug).join(', '));
    process.exit(1);
  }
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    generateAllSessions();
  } else {
    generateSingleSession(args[0]);
  }
}
