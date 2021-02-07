FROM php:8.0.2-apache
COPY /src/ /var/www/html/
EXPOSE 80

# docker run --name web-cervecero -p 0.0.0.0:80:80 --net=iotstack_default -v $(pwd)/src:/var/www/html/ -d web-cervecero-buena