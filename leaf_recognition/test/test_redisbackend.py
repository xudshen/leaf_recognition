#! /usr/bin/python
__author__ = 'xudshen'

from leaf_recognition.utils import RedisBackend
from leaf_recognition.features import BasicGeometricFeatures

file_path = '/home/xudshen/workspace/dataset/apple.jpg'
fea = BasicGeometricFeatures.BasicGeometricFeatures(file_path)
fea.process()
features = fea.get_features()

r = RedisBackend.RedisBackend()
print r.get_sample_id(file_path)
r.set_features(file_path, features)
print r.get_features(file_path)