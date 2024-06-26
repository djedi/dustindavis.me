---
author: Dustin Davis
comments: true
date: 2009-04-13T16:12:10.000Z

slug: simple-php-pluralize
title: Simple PHP Pluralize
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Serena Repice Lentini](https://unsplash.com/@serenarepice) on
  [Unsplash](https://unsplash.com)
categories:
  - PHP
description: A simple function for pluralizing strings in PHP
---

I often find myself writing a if statement when I need to pluralize a noun in
PHP. I recently wrote a simple function that did the task for me. I know there
are PHP Pluralize functions
[out](http://eval.ca/2007/03/03/php-pluralize-method/)
[there](http://kuwamoto.org/2007/12/17/improved-pluralizing-in-php-actionscript-and-ror/),
but they are a bit overkill for my needs. I got this idea from the way Django
templates
[handles pluralizing](http://docs.djangoproject.com/en/dev/ref/templates/builtins/#pluralize).
I once heard someone say it can't pluralize octopus. It can, but how often does
that come up? My simple function here can also pluralize Octopus or any other
word really.

Let's say I want to echo the following:

```text
There is 1 user.
There are 2 users.
```

Here was my old way of doing things quick and dirty with no functions:

```php
There <?=($num_users == 1) ? 'is' : 'are';?> <?=$num_users?>
user<?($num_users != 1) echo 's';?>.
```

Now, let's write a simple function to use:

```php
function pluralize($num, $plural = 's', $single = '') {
  if ($num == 1) return $single; else return $plural;
}
```

Now I would write it like this:

```php
There <?=pluralize($num_users, 'are', 'is')?> <?=$num_users?>
user<?=pluralize($num_users)?>.
```

OK, I don't know if saves me a whole lot of typing or not, but anyway, it makes
it a bit easier in my mind.

Now, for the Octopus example:

```text
1 Octopus has 8 legs.
7 Octopi have 56 legs.
```

```php
<?=$num?> Octop<?=pluralize($num, 'i', 'us')?> ha<?=pluralize($num, 've', 's')?>
<?=(8 * $num)?> leg<?=pluralize(8 * $num)?>.
```

(I thought I'd better pluralize "legs" in case we ever have 0.125 Octopi)
