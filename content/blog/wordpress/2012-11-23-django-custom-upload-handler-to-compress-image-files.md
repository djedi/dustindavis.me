---
author: Dustin Davis
comments: true
date: 2012-11-23 06:51:30+00:00
link: https://dustindavis.me/django-custom-upload-handler-to-compress-image-files/
slug: django-custom-upload-handler-to-compress-image-files
title: Django Custom Upload Handler to Compress Image Files
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
tags:
  - django
  - image
---

I got a somewhat unique request on a project the other day. My client has a lead
tracking system where his salesman input leads and often upload scanned
documents to include with the leads. I implemented this all with standard Django
forms and a formset wizard to input multiple files.

My client was worried that a lot of images would be uploaded and he would have
to start paying extra for storage. He asked if I could compress images on upload
to save space. After searching the web I found examples of a few different ways
of doing it. But after reading about
[Upload Handlers in the Django docs](https://docs.djangoproject.com/en/dev/topics/http/file-uploads/?from=olddocs#upload-handlers),
this seemed like it would be the best method for accomplishing this so I
wouldn't have to modify my models or forms at all. Unfortunately for me, it
didn't go as straightforward as I had hoped. I couldn't find a good example of
someone else doing this sort of thing and it took me MUCH longer than the 30-45
minutes I had planned for.

The good news is that I figured it out so I'm posting it here for all to benefit
hopefully.

I created a file named uploadhandlers.py in my app and added the following code:

    import os

    from django.conf import settings
    from django.core.files.uploadhandler import MemoryFileUploadHandler
    from PIL import Image

    try:
        from cStringIO import StringIO
    except ImportError:
        from StringIO import StringIO

    class CompressImageUploadHandler(MemoryFileUploadHandler):
        def file_complete(self, file_size):
            """
            Return a file object if we're activated.
            """
            self.file.seek(0)
            if not self.content_type is None and 'image' in self.content_type:
                newfile = StringIO()
                img = Image.open(self.file)
                width, height = img.size
                width, height = scale_dimensions(width, height, longest_side=settings.IMAGE_LONGEST_SIDE)
                img = img.resize((width, height), Image.ANTIALIAS)
                img.save(newfile, 'JPEG', quality=settings.JPEG_QUALITY)
                self.file = newfile

                name, ext = os.path.splitext(self.file_name)
                self.file_name = '{0}.{1}'.format(name, 'jpg')
                self.content_type = 'image/jpeg'

            return super(CompressImageUploadHandler, self).file_complete(file_size)

    def scale_dimensions(width, height, longest_side):
        if width  1:
            return longest_side, int(longest_side / ratio)
        # Portrait
        else:
            return int(longest_side * ratio), longest_side

You can see from the code that I am simply extending the
MemoryFileUploadHandler, which is one of the Django default upload handlers. I'm
overriding the file_complete function to change the size and jpeg quality -
which are settings in my settings file.

To implement the change, I update my views. The view that contains the form has
to be csrf_exempt, and the view handling the uploads switches to this upload
handler on the fly with the following code:

    request.upload_handlers.insert(0, CompressImageUploadHandler())
