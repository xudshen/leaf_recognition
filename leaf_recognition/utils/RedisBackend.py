#! /usr/bin/python
import redis
import base64


class RedisBackend:
    _r_sample_id = 'next.sample.id'
    _r_samples = 'samples'
    _r_samples_hmap = 'samples.hmap'
    _r_samples_features = 'samples:%s:features'

    _r_species_id = 'next.species.id'
    _r_species = 'species'
    _r_species_hmap = 'species.hmap'
    _r_species_samples = 'species:%s:samples'

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

    def get_sample_id(self, file_path):
        tmp = base64.b64encode(file_path)
        if self.r_cnn.hexists(self._r_samples_hmap, tmp):
            return self.r_cnn.hget(self._r_samples_hmap, tmp)
        else:
            sample_id = self.r_cnn.incr(self._r_sample_id)
            if self.r_cnn.hset(self._r_samples_hmap, tmp, sample_id) == 1:
                self.r_cnn.lpush(self._r_samples, sample_id)
                return sample_id
        return None

    def set_features(self, sample_id, features):
        #sample_id = self.get_sample_id(sample_path)
        with self.r_cnn.pipeline() as pipe:
            for k, v in features.iteritems():
                pipe.hset(self._r_samples_features % (sample_id,), k, v)
            pipe.execute()

    def get_features(self, sample_id):
        return self.r_cnn.hgetall(self._r_samples_features % (sample_id,))

    def get_species_id(self, species_name):
        if self.r_cnn.hexists(self._r_species_hmap, species_name):
            return self.r_cnn.hget(self._r_species_hmap, species_name)
        else:
            species_id = self.r_cnn.incr(self._r_species_id)
            if self.r_cnn.hset(self._r_species_hmap, species_name, species_id) == 1:
                self.r_cnn.lpush(self._r_species, species_id)
                return species_id
        return None

    def add_samples(self, species_id, sample_id):
        return self.r_cnn.lpush(self._r_species_samples % (species_id,), sample_id)

    def get_samples(self, species_id):
        return self.r_cnn.lrange(self._r_species_samples % (species_id,), 0, -1)
