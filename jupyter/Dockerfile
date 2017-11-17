FROM continuumio/anaconda3

RUN apt-get update

# RUN apt-get install -y libmecab-dev mecab mecab-ipadic-utf8

#  warning: C extension not loaded for gensim.Word2Vec
RUN apt-get install -y python-dev build-essential

# for OpenCv
# ImportError: libgtk-x11-2.0.so.0
RUN apt-get install -y python-numpy python-opencv

RUN apt-get install -y vim

RUN conda install -c jupyter seaborn pandas-datareader scikit-learn html5lib statsmodels beautifulsoup4 -y --quiet

# 
RUN pip install --upgrade pip

RUN conda install pymongo --yes
RUN pip install -U pymongo

# 形態素解析
RUN pip install janome
# 品詞を数字におきかえてパーセプトロンとかCNNとかつかえるようにするやつ
RUN pip install gensim

# 
RUN pip install tensorflow

# kerasが依存
RUN conda install scipy

RUN pip install keras

ADD ipaexg.ttf /opt/conda/lib/python3.6/site-packages/matplotlib/mpl-data/fonts/ttf/

WORKDIR /mnt

EXPOSE 8888
CMD bash -l -c '/opt/conda/bin/jupyter notebook --notebook-dir=/mnt --ip='*' --port=8888 --no-browser --allow-root'
