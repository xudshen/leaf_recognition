#! /usr/bin/python
__author__ = 'xudshen'
from BaseFeatures import BaseFeatures
import math


class MorphologicalFeatures(BaseFeatures):
    def __init__(self, file_path):
        BaseFeatures.__init__(self, file_path)

    def process(self):
        D = float(self.features.get('Diameter'))
        Lp = float(self.features.get('Physiological Length'))
        Wp = float(self.features.get('Physiological Width'))
        A = float(self.features.get('Leaf Area'))
        P = float(self.features.get('Leaf Perimeter'))
        Ah = float(self.features.get('Convex Hull Area'))
        Ph = float(self.features.get('Convex Hull Perimeter'))

        self.features.update({
            'Aspect ratio': Lp / Wp,
            'Form factor': 4 * math.pi * A / math.pow(P, 2),
            'Rectangualarity': Lp * Wp / A,
            'Narrow factor': D / Lp,
            'Perimeter radio of diameter': P / D,
            'Perimeter ratio of physiological': P / (Lp + Wp),
            'Roundness': 4 * A / (math.pi * math.pow(D, 2)),
            'Roughness': Ph / P,
            'Convex area radio': Ah / A,
        })