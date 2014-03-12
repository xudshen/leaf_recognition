#! /usr/bin/python
import os
from leaf_recognition.features import MorphologicalFeatures, BasicGeometricFeatures


base_path = '/home/xudshen/workspace/dataset'
dirs = os.listdir(base_path)

for species_name in dirs:
    species_path = base_path + '/' + species_name
    print 'process(%s)...' % (species_name)
    for sample_name in os.listdir(species_path):
        sample_path = species_path + '/' + sample_name

        extractor = BasicGeometricFeatures.BasicGeometricFeatures(sample_path, species_name)
        extractor.process()
        extractor.save()