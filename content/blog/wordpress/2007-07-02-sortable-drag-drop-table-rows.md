---
author: Dustin Davis
comments: true
date: 2007-07-02 13:10:50+00:00

slug: sortable-drag-drop-table-rows
title: Sortable (Drag & Drop) Table Rows
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
---

OK, here's the problem. I need an easy way to sort table rows for my new mini
site at www.BigBangHosts.com (on the admin side). I normally use script.aculo.us
for my DHTML & Ajax needs, but in this case I couldn't find what I needed. I
wanted and easy way to sort table rows and store the new sorting in the
database. This would easily allow me to change the rankings of various hosts in
my admin control panel.

Option 1 was to create a separate page just for sorting. This way I could use a
list. The reason I didn't like this options was because I would not be able to
see all the features of each host at a glance as I could with a table.

Digging deep into the Google results I found this
[demo script](http://www.howtocreate.co.uk/emails/swapColumns.html) that was
simply awesome. In order to get it to work for my needs I did the following:

1. Viewed the source and got the javascript that did the sorting work.

2. Downloaded [dhtmlapi.js](http://www.howtocreate.co.uk/jslibs/dhtmlapi.js)
   from [www.howtocreate.co.uk](http://www.howtocreate.co.uk)

3. Added a kludgey hack at the end of the stopDrop() function to post the new
   order to a php script

4. Used PHP to write to the database.

The result allows me to drag and drop and everything is seamlessly saved!

Kludgey Hack =
`var getstr = ""; for( var i = 0, x = theTable.getElementsByTagName('tr'); x[i]; i++ ) { getstr += x[i].id; } var runscript = new Image(); runscript.src = 'sortrank.php?order='+getstr;`

PHP Snippet (table row had id values of "id{row_id}")=
`$order = split('id', $\_GET['order']); array_shift(\$order);

foreach ($order as $val) { $sql = "update hosts set rank=".++$rank." where
id=$val;";
query($sql); }`

Special thanks to [Mark Wilton-Jones](http://www.howtocreate.co.uk/bio.html) for
doing virtually all the work for me.
