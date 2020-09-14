---
author: Dustin Davis
comments: true
date: 2013-08-21T17:19:29.000Z

slug: memcachedkeylengtherror-key-length-is-250
title: 'MemcachedKeyLengthError: Key length is > 250'
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Photos Hobby](https://unsplash.com/@photoshobby) on
  [Unsplash](https://unsplash.com)
categories:
  - Python
  - Django
description:
  Fixing a recurring problem with Django's built-in cache page decorator
---

Lately I was getting this error frequently as I was using Django's
[built in cache_page decorator](https://docs.djangoproject.com/en/dev/topics/cache/#the-per-view-cache)
to cache some views.

> **memcache in check_key**  
> MemcachedKeyLengthError: Key length is > 250

Basically the problem is that Memcached only allows a 250 char key and some of
my view names were pretty long and so it was creating keys greater than 250
chars.

I found a quick fix to hash the key with an md5 hash if the key is going to be
over 250 characters. You can modify the function that creates the key.

In my settings file I added the following:

```python
import hashlib

...

def hash_key(key, key_prefix, version):
    new_key = ':'.join([key_prefix, str(version), key])
    if len(new_key) > 250:
        m = hashlib.md5()
        m.update(new_key)
        new_key = m.hexdigest()
    return new_key

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION': '127.0.0.1:11211',
        'KEY_FUNCTION': hash_key,
    }
}
```

The reason why I only hash if the key is going to be over 250 characters is
because 1) hashing is CPU intensive and I only want to do it when I have to; 2)
I prefer to have my memcached keys human readable when possible; 3) less likely
to have collision problems with duplicate hashes.

I thank Russell Keith-Magee for
[these tips](http://python.6.x6.nabble.com/memcached-Errors-and-Solution-please-provide-comments-tp214992p215004.html).
