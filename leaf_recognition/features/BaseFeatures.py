#! /usr/bin/python
import cv2
from matplotlib import pyplot as plt
from leaf_recognition.utils.RedisBackend import RedisBackend


class BaseFeatures:
    """base features"""
    _base_image = 'c'

    def __init__(self, sample_path, species_name, config={}):
        self.sample_path = sample_path

        if self._base_image == 'c':
            self.img = cv2.imread(sample_path)
        elif self._base_image == 'g':
            self.img = cv2.imread(sample_path, cv2.IMREAD_GRAYSCALE)
        elif self._base_image == 'b':
            tmp = cv2.imread(sample_path, cv2.IMREAD_GRAYSCALE)
            blur = cv2.bilateralFilter(tmp, 2, 75, 75)
            #blur = cv2.GaussianBlur(tmp, (5, 5), 0)
            ret, self.img = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        else:
            self.img = None

        self.backend = RedisBackend(config)
        self.sample_id = self.backend.get_sample_id(self.sample_path)
        self.species_id = self.backend.get_species_id(species_name)
        self.backend.add_samples(self.species_id, self.sample_id)
        self.features = self.backend.get_features(self.sample_id)

    def show(self, img=None):
        if img is None:
            plt.imshow(self.img, cmap='gray', interpolation='bicubic')
        else:
            plt.imshow(img)
        plt.xticks([]), plt.yticks([])
        plt.show()

    def process(self):
        pass

    def get_features(self):
        return self.features

    def save(self):
        return self.backend.set_features(self.sample_id, self.features)