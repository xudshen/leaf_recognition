#! /usr/bin/python
from BaseFeatures import BaseFeatures
import cv2
import numpy as np
import math


def distance(p0, p1):
    return math.sqrt((p0[0] - p1[0]) ** 2 + (p0[1] - p1[1]) ** 2)


class BasicGeometricFeatures(BaseFeatures):
    """basic geometric features"""
    _base_image = 'b'

    def __init__(self, sample_path, species_name):
        BaseFeatures.__init__(self, sample_path, species_name)

    def process(self):
        # print self.img.shape
        # get contours
        img_cont = cv2.bitwise_not(self.img)
        contours, hierarchy = cv2.findContours(img_cont, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
        #img_cnt = cv2.bitwise_not(img_cont)

        areas = [cv2.contourArea(cont) for cont in contours]
        cont = contours[np.argmax(areas)]

        x, y, w, h = cv2.boundingRect(cont)
        #img = cv2.rectangle(self.img, (x, y), (x+w, y+h), (0, 255, 0), 2)
        #self.show(img)
        leftmost = tuple(cont[cont[:, :, 0].argmin()][0])
        rightmost = tuple(cont[cont[:, :, 0].argmax()][0])
        topmost = tuple(cont[cont[:, :, 1].argmin()][0])
        bottommost = tuple(cont[cont[:, :, 1].argmax()][0])

        moments = cv2.moments(cont)
        #import pprint
        #pprint.pprint(moments)

        hull = cv2.convexHull(cont)
        self.features.update({
            'Diameter': max(distance(leftmost, rightmost), distance(topmost, bottommost)),
            'Physiological Length': max(w, h),
            'Physiological Width': min(w, h),
            'Leaf Perimeter': cv2.arcLength(cont, True),
            'Leaf Area': cv2.contourArea(cont),
            'Convex Hull Perimeter': cv2.arcLength(hull, True),
            'Convex Hull Area': cv2.contourArea(hull),
            'Centroid X': int(moments['m10']/moments['m00']),
            'Centroid Y': int(moments['m01']/moments['m00'])
        })