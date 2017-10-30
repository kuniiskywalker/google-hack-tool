FROM python:3

RUN pip install hug

RUN pip install urllib3 redis readability-lxml html2text

WORKDIR /data

ADD index.py /data/index.py

# ENTRYPOINT ["python", "/data/index.py"]
ENTRYPOINT ["hug", "-f", "/data/index.py"]
