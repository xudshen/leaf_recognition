#! /usr/bin/python
import cv2
from matplotlib import pyplot as plt


class BaseFeatures:
    """base features"""
    _base_image = 'c'

    def __init__(self, file_path):
        self.file_path = file_path

        if self._base_image == 'c':
            self.img = cv2.imread(file_path)
        elif self._base_image == 'g':
            self.img = cv2.imread(file_path, cv2.IMREAD_GRAYSCALE)
        elif self._base_image == 'b':
            tmp = cv2.imread(file_path, cv2.IMREAD_GRAYSCALE)
            blur = cv2.bilateralFilter(tmp, 2, 75, 75)
            #blur = cv2.GaussianBlur(tmp, (5, 5), 0)
            ret, self.img = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        else:
            self.img = None

        self.features = {}

    def show(self, img=None):
        if img is None:
            plt.imshow(self.img, cmap='gray', interpolation='bicubic')
        else:
            plt.imshow(img, cmap='gray', interpolation='bicubic')
        plt.xticks([]), plt.yticks([])
        plt.show()

    def process(self):
        pass

    def get_features(self):
        return self.features