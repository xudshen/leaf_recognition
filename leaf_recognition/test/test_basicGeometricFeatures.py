#! /usr/bin/python

from leaf_recognition.features import BasicGeometricFeatures

#fea = BasicGeometricFeatures('/home/xudshen/workspace/dataset/Anhui Barberry/1553.jpg')
#fea = BasicGeometricFeatures('/home/xudshen/workspace/dataset/camphortree/2166.jpg')
fea = BasicGeometricFeatures.BasicGeometricFeatures('/home/xudshen/workspace/dataset/apple.jpg')
fea.process()
print fea.get_features()