FROM python:3

RUN pip install diffbot
RUN pip install hug

RUN pip install redis

WORKDIR /data

ADD index.py /data/index.py

# ENTRYPOINT ["python", "/data/index.py"]
ENTRYPOINT ["hug", "-f", "/data/index.py"]
