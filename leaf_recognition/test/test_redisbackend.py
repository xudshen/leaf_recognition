#! /usr/bin/python
__author__ = 'xudshen'

from leaf_recognition.utils import RedisBackend
from leaf_recognition.features import BasicGeometricFeatures

file_path = '/home/xudshen/workspace/dataset/Anhui Barberry/1553.jpg'
extractor = BasicGeometricFeatures.BasicGeometricFeatures(file_path)
extractor.process()
features = extractor.get_features()

r = RedisBackend.RedisBackend()
sample_id = r.get_sample_id(file_path)

species_id = r.get_species_id('Anhui Barberry')
r.add_samples(species_id, sample_id)

print(sample_id)
r.set_features(sample_id, features)
print(r.get_features(sample_id))