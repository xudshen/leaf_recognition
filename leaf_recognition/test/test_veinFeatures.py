#! /usr/bin/python

from leaf_recognition.features import VeinFeatures
from pprint import pprint as pp

#fea = VeinFeatures.VeinFeatures('/home/xudshen/workspace/dataset/Anhui Barberry/1553.jpg')
fea = VeinFeatures.VeinFeatures('/home/xudshen/workspace/dataset/camphortree/2166.jpg')
#fea = VeinFeatures.VeinFeatures('/home/xudshen/workspace/dataset/apple.jpg')
fea.process()
pp(fea.get_features())