# Usa un'immagine leggera di Nginx
FROM nginx:alpine

# Copia il contenuto della cartella src nella directory di default di Nginx
COPY . /usr/share/nginx/html

# Espone la porta 80
EXPOSE 80