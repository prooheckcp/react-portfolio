/* Sanity's CORS allowlist only contains http://localhost:3000 (plus the live
   domain). If 3000 is busy, react-scripts silently falls back to 3001 and every
   Sanity request is blocked - which surfaces as a wall of
   "[object XMLHttpRequestProgressEvent]" runtime errors rather than anything
   that points at the port. Fail loudly here instead. */

const net = require('net');
const {execSync} = require('child_process');

const PORT = Number(process.env.PORT) || 3000;

const describeHolder = () => {
  try {
    const pid = execSync(`lsof -nP -iTCP:${PORT} -sTCP:LISTEN -t`, {stdio: ['ignore', 'pipe', 'ignore']})
      .toString().trim().split('\n')[0];

    if(!pid)
      return null;

    const command = execSync(`ps -o command= -p ${pid}`, {stdio: ['ignore', 'pipe', 'ignore']})
      .toString().trim();

    return {pid, command};
  } catch {
    return null;  // lsof is unavailable or matched nothing; not worth failing over
  }
};

const server = net.createServer();

server.once('error', (err) => {
  if(err.code !== 'EADDRINUSE'){
    console.error(err);
    process.exit(1);
  }

  const holder = describeHolder();

  console.error(`\n  Port ${PORT} is already in use.\n`);
  console.error(`  This project must run on ${PORT}: it is the only localhost origin in`);
  console.error(`  the Sanity CORS allowlist. On any other port every content request is`);
  console.error(`  blocked and the app fills with "[object XMLHttpRequestProgressEvent]".\n`);

  if(holder){
    console.error(`  Currently held by PID ${holder.pid}:`);
    console.error(`    ${holder.command.slice(0, 100)}\n`);
    console.error(`  Free it with:  kill ${holder.pid}\n`);
  }else{
    console.error(`  Find it with:  lsof -nP -iTCP:${PORT} -sTCP:LISTEN\n`);
  }

  console.error(`  (Or add another origin at sanity.io/manage -> API -> CORS Origins.)\n`);
  process.exit(1);
});

server.once('listening', () => server.close(() => process.exit(0)));
server.listen(PORT, '0.0.0.0');
