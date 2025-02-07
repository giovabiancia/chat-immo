# Usa l'immagine Node.js LTS leggera
FROM node:18-alpine

# Imposta la directory di lavoro
WORKDIR /app

# Copia solo i file necessari per l'installazione delle dipendenze
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto dei file dell'applicazione
COPY . .

# Espone la porta usata da Vite
EXPOSE 5173

# Comando per avviare Vite in modalità sviluppo
CMD ["npm", "run", "dev", "--", "--host"]
