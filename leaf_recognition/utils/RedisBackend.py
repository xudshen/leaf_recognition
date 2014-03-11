#! /usr/bin/python
import redis
import base64


class RedisBackend:
    _r_image_id = 'next.image.id'

    _r_images = 'images'
    _r_images_hmap = 'images.hmap'
    _r_features = 'images:%s:features'

    def __init__(self, config={}):
        host = 'localhost'
        port = 6379
        db = 0
        if 'host' in config:
            host = config['host']
        if 'port' in config:
            port = config['port']
        if 'db' in config:
            db = config['db']
        self.pool = redis.ConnectionPool(host=host, port=port, db=db)
        self.r_cnn = redis.Redis(connection_pool=self.pool)

    def get_image_id(self, file_path):
        tmp = base64.b64encode(file_path)
        if self.r_cnn.hexists(self._r_images_hmap, tmp):
            return self.r_cnn.hget(self._r_images_hmap, tmp)
        else:
            image_id = self.r_cnn.incr(self._r_image_id)
            if self.r_cnn.hset(self._r_images_hmap, tmp, image_id) == 1:
                self.r_cnn.lpush(self._r_images, image_id)
                return image_id
        return None

    def set_features(self, file_path, features):
        image_id = self.get_image_id(file_path)
        if image_id is None:
            return False
        with self.r_cnn.pipeline() as pipe:
            for k, v in features.iteritems():
                pipe.hset(self._r_features % (image_id,), k, v)
            pipe.execute()

    def get_features(self, file_path):
        image_id = self.get_image_id(file_path)
        if image_id is None:
            return False
        return self.r_cnn.hgetall(self._r_features % (image_id,))

# if __name__ == '__main__':
#     r = RedisBackend('')
#     print r.get_image_id('fd')
#     r.set_features('fd', {'k1':'v1', 'k2':'v2'})
#     r.set_features('xx', {'k1':'v1', 'k2':'v2'})
#     print r.get_features('fd')

