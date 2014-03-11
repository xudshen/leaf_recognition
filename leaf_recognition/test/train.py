#! /usr/bin/python
import shutil
from leaf_recognition.features import BasicGeometricFeatures, MorphologicalFeatures


fea = BasicGeometricFeatures.BasicGeometricFeatures('/home/xudshen/workspace/dataset/apple.jpg')
fea.process()
fea.save()
