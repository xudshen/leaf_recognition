#! /usr/bin/python
from BaseFeatures import BaseFeatures
import cv2
import numpy as np

class VeinFeatures(BaseFeatures):
    """basic geometric features"""
    _base_image = 'g'

    def __init__(self, file_path):
        BaseFeatures.__init__(self, file_path)

    def process(self):
        kernel = np.ones((50,50),np.uint8)
        self.show(cv2.morphologyEx(self.img, cv2.MORPH_OPEN, kernel))
        self.features.update({
            'Vein1': 1
        })