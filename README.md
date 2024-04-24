# Server files to host games of Azul, to be paired with browser-azul.

# Render Server Deploy: https://browser-azul-server.onrender.com/

Utilizes client long polling of this dedicated server. Server written
with express, and uses cors to enable cross-origin resource sharing.

The server is a free server hosted on Render.com; server will wind-down
during periods of inactivity and require time to wind back up 
(approximately 30 seconds).

# Netlify Client Deploy: https://dapper-froyo-0ab2d7.netlify.app/
# Client Repo: https://github.com/jkl-semicolon/browser-azul

  "dependencies":
    "express": "^4.19.2",
    "cors": "^2.8.5",