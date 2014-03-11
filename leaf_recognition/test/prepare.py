#! /usr/bin/python

import cv2
import sys, glob, os

if len(sys.argv) < 1:
    print 'need more than one argv'


def _prepare(file_path):
    file_name, file_ext = os.path.splitext(file_path)

    img_gray = cv2.imread(file_path, cv2.IMREAD_GRAYSCALE)
    cv2.imwrite(file_name + 'g' + file_ext, img_gray)

    blur = cv2.medianBlur(img_gray, (5, 5), 0)
    # blur = cv2.GaussianBlur(img_gray, (5, 5), 0)
    ret, img_ths = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    cv2.imwrite(file_name + 'b' + file_ext, img_ths)


def prepare(path_name, recursive=False):
    file_list = glob.glob(path_name)
    if file_list is None:
        return None
    for file_path in file_list:
        _prepare(file_path)
        print file_path

if __name__ == "__main__":
    prepare('/home/xudshen/workspace/dataset/camphortree/2166.jpg')



