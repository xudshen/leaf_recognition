#! /usr/bin/python
from BaseFeatures import BaseFeatures
import cv2
import numpy as np


class BasicGeometricFeatures(BaseFeatures):
    """basic geometric features"""
    _base_image = 'b'

    def __init__(self, file_path):
        BaseFeatures.__init__(self, file_path)

    def process(self):
        # print self.img.shape
        # get contours
        img_cont = cv2.bitwise_not(self.img)
        contours, hierarchy = cv2.findContours(img_cont, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
        #img_cnt = cv2.bitwise_not(img_cont)

        areas = [cv2.contourArea(cont) for cont in contours]
        cont = contours[np.argmax(areas)]

        x, y, w, h = cv2.boundingRect(cont)
        img = cv2.rectangle(self.img, (x, y), (x+w, y+h), (0, 255, 0), 2)
        self.show(img)

        hull = cv2.convexHull(cont)
        self.features = {
            'Diameter': max(w, h),
            'Physiological Length': max(w, h),
            'Physiological Width': min(w, h),
            'Leaf Perimeter': cv2.arcLength(cont, True),
            'Leaf Area': cv2.contourArea(cont),
            'Convex Hull Perimeter': cv2.arcLength(hull, True),
            'Convex Hull Area': cv2.contourArea(hull)
        }


if __name__ == '__main__':
    #fea = BasicGeometricFeatures('/home/xudshen/workspace/dataset/Anhui Barberry/1553.jpg')
    fea = BasicGeometricFeatures('/home/xudshen/workspace/dataset/camphortree/2166.jpg')
    fea = BasicGeometricFeatures('/home/xudshen/workspace/dataset/apple.jpg')
    fea.process()
    print fea.get_features()