FROM node:20
WORKDIR /app
COPY run.sh .
RUN npm install -g typescript jest ts-jest @types/jest
ENTRYPOINT ["bash", "run.sh"]
