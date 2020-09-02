---
author: Dustin Davis
comments: false
date: 2005-08-25 11:35:32+00:00
link: https://dustindavis.me/php-tricks-tips-php-script-to-variable/
slug: php-tricks-tips-php-script-to-variable
title: 'PHP Tricks & Tips: PHP Script to variable'
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
---

[PHP Tricks & Tips: PHP Script to variable](http://phptricks.blogspot.com/2005/08/php-script-to-variable.html)

The following I found on a Usenet post on how to EASILY parse a PHP scriptâ€™s
output to a variable using output buffering:

"Daniel Loose" kirjoitti viestissÃ¤:430cb793.9399...@news.cs.tu-berlin.de...

> Hello, I have this strange including problem: I want to read a piece of HTML,
> residing in some file, into a variable, not echo it out. So far so easy - but
> now the HTML contains a line of PHP. And I wish not to get the PHP code into
> my variable but the parsed result, just like if the variable was a client ;-).
> I wish to keep the nice ?> ...< ? HTML area (with highlighting in my editor),
> and therefore include etc. don't help because they would echo it out. heredoc
> also doesnt help (if this may come up to your mind). Is there anything I can
> do...?!! The problem sounds so simple... the more for such a great tool like
> PHP ... but... ?!!

Sounds like you could use buffering. < ?php ob_start(); // Start output
buffering. // Instead of outputting anything, the output is now stored in a
buffer. include('yourfile.php'); // There, now the file has been included and
php parsed. // It isn't output, it goes into the buffer.
$yourfile = ob_get_clean(); 
// Now we read everything that has been buffered... And stops buffering. 
?> 
Result: the file you included has been parsed by the php engine and stored 
inside $yourfil,
and nothing was output. Sounds like goal achieved. -- SETI @ Home - Donate your
cpu's idle time to science. Further reading at  
Kimmo Laine
