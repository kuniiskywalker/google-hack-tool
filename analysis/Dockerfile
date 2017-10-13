FROM continuumio/anaconda3

RUN apt-get update

#  warning: C extension not loaded for gensim.Word2Vec
RUN apt-get install -y python-dev build-essential

RUN conda install pymongo --yes
RUN pip install -U pymongo

# 形態素解析
RUN pip install janome
# 品詞を数字におきかえてパーセプトロンとかCNNとかつかえるようにするやつ
RUN pip install gensim

WORKDIR /mnt

ADD index.py /mnt/index.py

ENTRYPOINT ["python", "index.py"]
