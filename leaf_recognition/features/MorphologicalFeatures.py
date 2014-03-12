#! /usr/bin/python
__author__ = 'xudshen'
from BaseFeatures import BaseFeatures
import math


class MorphologicalFeatures(BaseFeatures):
    def __init__(self, sample_path, species_name):
        BaseFeatures.__init__(self, sample_path, species_name)

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
            'Form factor': 4 * math.pi * A / P**2,
            'Rectangularity': Lp * Wp / A,
            'Narrow factor': D / Lp,
            'Perimeter radio of diameter': P / D,
            'Perimeter ratio of physiological': P / (Lp + Wp),
            'Roundness': 4 * A / (math.pi * D**2),
            'Roughness': Ph / P,
            'Convex area radio': Ah / A,
        })