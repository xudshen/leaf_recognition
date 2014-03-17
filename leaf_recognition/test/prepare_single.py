#! /usr/bin/python
import os, sys
from leaf_recognition.features import MorphologicalFeatures, BasicGeometricFeatures

# sample_path = '/home/xudshen/workspace/1.jpg'
sample_path = sys.argv[1]
jobid = sys.argv[2]
save_path = '/home/xudshen/workspace/leaf_recognition/webapp/public/img/predict/' + jobid + '_'
model_path = '/home/xudshen/workspace/leaf_recognition/leaf_recognition/test/leaf.model'

extractor = BasicGeometricFeatures.BasicGeometricFeatures(sample_path, 'test')
extractor.process(predict=True, predict_path=save_path)
extractor.save()

extractor = MorphologicalFeatures.MorphologicalFeatures(sample_path, 'test')
extractor.process()
extractor.save()

from leaf_recognition.utils import RedisBackend

r = RedisBackend.RedisBackend()
sample_id = r.get_sample_id(sample_path)

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
    'Hu00',
    'Hu01',
    'Hu02',
    'Hu03',
    'Hu04',
    'Hu05',
    'Hu06',
    'nu20',
    'nu11',
    'nu02',
    'nu30',
    'nu21',
    'nu12',
    'nu03',
]

out_features = {}

with open(save_path + 'leaf.arff', 'w') as arff:
    arff.write('''@RELATION leaf
@ATTRIBUTE CentroidX   NUMERIC
@ATTRIBUTE CentroidY   NUMERIC
@ATTRIBUTE AspectRatio   NUMERIC
@ATTRIBUTE FormFactor   NUMERIC
@ATTRIBUTE Rectangularity   NUMERIC
@ATTRIBUTE NarrowFactor   NUMERIC
@ATTRIBUTE PROD  NUMERIC
@ATTRIBUTE PROP   NUMERIC
@ATTRIBUTE Roundness   NUMERIC
@ATTRIBUTE Roughness   NUMERIC
@ATTRIBUTE ConvexAreaRadio  NUMERIC
@ATTRIBUTE Hu0x  NUMERIC
@ATTRIBUTE Hu01  NUMERIC
@ATTRIBUTE Hu02  NUMERIC
@ATTRIBUTE Hu03  NUMERIC
@ATTRIBUTE Hu04  NUMERIC
@ATTRIBUTE Hu05  NUMERIC
@ATTRIBUTE Hu06  NUMERIC
@ATTRIBUTE nu20  NUMERIC
@ATTRIBUTE nu11  NUMERIC
@ATTRIBUTE nu02  NUMERIC
@ATTRIBUTE nu30  NUMERIC
@ATTRIBUTE nu21  NUMERIC
@ATTRIBUTE nu12  NUMERIC
@ATTRIBUTE nu03  NUMERIC
@ATTRIBUTE label   {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32}

@DATA
''')

    features = r.get_features(sample_id)
    #features = dict(filter(lambda (k, v): k in feature_map, features.items()))
    #print(features)

    #arff.write(reduce(lambda a, b: a + ',' + b, features.values()))
    for k in feature_map:
        if k == 'Hu04' or k == 'Hu05' or k == 'Hu06':
            #print features[k]
            arff.write(str(float(features[k]) * 100000) + ',')
        else:
            arff.write(features[k] + ',')
        out_features[k] = features[k]
    arff.write('?')
    arff.write('\n')

cmd = '''export CLASSPATH=/usr/share/java/weka.jar:.
java weka.classifiers.bayes.BayesNet -l %s -T %s -p 0 | grep :''' % (model_path, save_path + 'leaf.arff')

p = os.popen(cmd, "r")
ret = ''
predict_id = 0
while 1:
    line = p.readline()
    if not line:
        break
    ret = line
ret = ret.strip().split(' ')
idx = 0
for rr in ret:
    if rr != '':
        idx += 1
    if idx == 3:
        predict_id = rr.split(':')[1]
        break

r

import json

print(json.dumps({'sample_id': sample_id, 'predict_id': predict_id, 'features': out_features,
                  'predict_name': r.get_species_name(predict_id)}))




