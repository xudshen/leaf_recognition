#! /usr/bin/python
__author__ = 'xudshen'

from leaf_recognition.utils import RedisBackend

feature_map = [
    'Centroid X',
    'Centroid Y',
    'Aspect ratio',
    'Form factor',
    'Rectangularity',
    'Narrow factor',
    'Perimeter radio of diameter',
    'Perimeter ratio of physiological',
    'Roundness',
    'Roughness',
    'Convex area radio',
]

r = RedisBackend.RedisBackend()
with open('leaf.arff', 'w') as arff:
    arff.write('''@RELATION leaf
@ATTRIBUTE ConvexAreaRadio  NUMERIC
@ATTRIBUTE Rectangularity   NUMERIC
@ATTRIBUTE PROD  NUMERIC
@ATTRIBUTE CentroidX   NUMERIC
@ATTRIBUTE CentroidY   NUMERIC
@ATTRIBUTE PROP   NUMERIC
@ATTRIBUTE Roundness   NUMERIC
@ATTRIBUTE Roughness   NUMERIC
@ATTRIBUTE FormFactor   NUMERIC
@ATTRIBUTE AspectRatio   NUMERIC
@ATTRIBUTE NarrowFactor   NUMERIC
@ATTRIBUTE label   {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32}

@DATA
''')

    for species_id in r.get_species():
        for sample_id in r.get_samples(species_id):
            features = r.get_features(sample_id)
            features = dict(filter(lambda (k, v): k in feature_map, features.items()))
            #print(features)
            arff.write(reduce(lambda a, b: a + ',' + b, features.values()))
            arff.write(',' + species_id)
            arff.write('\n')
        #     break
        # break