FROM python:3.11  
WORKDIR /app
RUN apt-get update && apt-get install -y time && pip install pytest
ENTRYPOINT ["bash", "run.sh"]
