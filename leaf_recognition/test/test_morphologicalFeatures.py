#! /usr/bin/python

from leaf_recognition.features import MorphologicalFeatures
from pprint import pprint as pp

#fea = BasicGeometricFeatures('/home/xudshen/workspace/dataset/Anhui Barberry/1553.jpg')
#fea = BasicGeometricFeatures('/home/xudshen/workspace/dataset/camphortree/2166.jpg')
fea = MorphologicalFeatures.MorphologicalFeatures('/home/xudshen/workspace/dataset/apple.jpg')
fea.process()
pp(fea.get_features())