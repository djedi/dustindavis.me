---
author: Dustin Davis
comments: true
date: 2006-01-06 12:34:29+00:00
link: https://dustindavis.me/adding-a-while-loop-to-smarty/
slug: adding-a-while-loop-to-smarty
title: Adding a "while loop" to Smarty
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
---

I found the following on
[SmartyFeatureSuggestions](http://smarty.incutio.com/?page=SmartyFeatureSuggestions):

<blockquote>

> ### Adding A While Loop

> I actually did this. It was suprisingly simple, and came in quite handy.

> I made three minor changes to Smarty_Compiler.Class.php.

> First I changed the number of arguments to function \_compile_if_tag as
> follows:

>         /**
>          * Compile {if ...} tag
>          *
>          * @param string $tag_args
>          * @param boolean $elseif if true, uses elseif instead of if
>          * @param boolean $while if true, uses while instead of if or elseif
>          * @return string
>          */
>         function _compile_if_tag($tag_args, $elseif = false, $while = false)

> Then, at the bootom of the same function, I modified the return logic to read:

>             if ($while)
>                 return '<?php while ('.implode(' ',$tokens).'): ?>';
>             elseif ($elseif)
>                 return '<?php elseif ('.implode(' ', $tokens).'): ?>';
>             else
>                 return '<?php if ('.implode(' ', $tokens).'): ?>';
>         }

> and finally, in function \_compile_tag, I added the following in the long
> switch case block:

>                 case 'while':
>                     $this->_push_tag('while');
>                     return $this->_compile_if_tag($tag_args,false,true);
>
>                 case '/while':
>                     $this->_pop_tag('while');
>                     return '<?php endwhile; ?>';

> For completeness sake, I guess you could make a {whileelse} tag too, by
> wraping the while in an if and doing a conditional close, like you do for
> section/sectionelse, but just the while loop was enough for me.

</blockquote>

Implementation was simple enough and I got my desired results. Here is the code
I used in the while loop:
`<label for="beds">Min. Beds:</label> <select name="min_beds" id="min_beds"> <option value="any">Any</option> {assign var="i" value=0} {while $i < $max_beds} {assign var="i" value=$i+1} <option value="{$i}">{$i}</option> {/while} </select>`
