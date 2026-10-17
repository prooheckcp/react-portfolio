const fs = require('fs');
const path = require('path');

// Without this rule the host 404s on direct loads/reloads of client routes like /work.
test('public/_redirects falls back to index.html for every route', () => {
  const file = fs.readFileSync(path.join(__dirname, '..', 'public', '_redirects'), 'utf8');
  expect(file).toMatch(/^\/\*\s+\/index\.html\s+200\s*$/m);
});
