leaf-recognition
================

for paper

##screenshots
###home
![app1](https://raw.githubusercontent.com/xudshen/leaf_recognition/master/webapp/files/app1.png)
###search
![app2](https://raw.githubusercontent.com/xudshen/leaf_recognition/master/webapp/files/app2.png)
###predict
![app3](https://raw.githubusercontent.com/xudshen/leaf_recognition/master/webapp/files/app3.png)

##requirment
- weka
- opencv
- python

##algorithm
- bayesNet

##dataset
The leaf dataset is supported by [flavia]. 
You can download the complete raw [flavia dataset].

##predict
```
export CLASSPATH=/usr/share/java/weka.jar:.
java weka.classifiers.bayes.BayesNet -l Desktop/leaf.model -T Desktop/leaf.arff -p 0
```

[flavia]:http://flavia.sourceforge.net/
[flavia dataset]:https://sourceforge.net/projects/flavia/files/Leaf%20Image%20Dataset/1.0/Leaves.tar.bz2/download
