---
author: Dustin Davis
comments: false
date: 2005-05-12 14:42:41+00:00
link: https://dustindavis.me/php-templating/
slug: php-templating
title: PHP Templating
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
---

Many of you may have heard of SMARTY. I've used it once. I just think it makes
the hard things easy and the easy things hard. I suppose it is useful if you are
in a multi-programmer environment, but I would rather just use run of the mill
PHP rather than incorporating smarty templates.

Here is basically how I create every new website I do. I start by creating a
basic layout - or I could even purchase a cheap one from
[basictemplates.com](http://basictemplates.com/) where all templates are only
\$5. I also have a bunch on disk. I normally use these for ideas and create a
new one from scratch. I often use FrontPage 2003 and Adobe Photoshop to help
create the main template page, then I clean it up using
[TextPad](http://www.textpad.com/)- my favorite text editor.

After determining where all the main content will be I will break the page apart
at that point into headers and footers.

Here is a basic example of what my header file will look like:

```php
<html>
<head>
<title><?=$ptitle?></title>
</head>
<body>
```

My footer could be simply as follows:

```php
</body>
</html>
```

Then, to create a new page, I would use the following template for each new
page:

```php
<?
$ptitle = 'Page Title';
require 'header.php';
?>
Content goes here...
<?
require 'footer.php';
?>
```

That, in essence is simply all there is to it. You can make your header and
footer file as elaborate as you need to. Some things you may notice here are:

1. I set the `$ptitle` variable in my page file. It is inserted in the template
   between the title tags.
2. I use the `require` function to include the header and footer files. You
   could also use `include()`, `include_once()`, or ` require_once()`. See
   [php.net](http://www.php.net) for the differences of these functions.
