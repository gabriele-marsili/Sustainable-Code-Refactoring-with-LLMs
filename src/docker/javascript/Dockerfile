FROM node:20
WORKDIR /app
RUN apt-get update && apt-get install -y jq time && apt-get install -y time && npm install --save-dev jest
ENTRYPOINT ["bash", "run.sh"]
