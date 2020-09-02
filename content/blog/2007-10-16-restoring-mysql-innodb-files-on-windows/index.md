---
author: Dustin Davis
comments: true
date: 2007-10-16 19:49:59+00:00
link: https://dustindavis.me/restoring-mysql-innodb-files-on-windows/
slug: restoring-mysql-innodb-files-on-windows
title: Restoring MySQL InnoDB Files on Windows
description: How I escaped disaster by restoring a MySQL database
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Darin Ashby](https://unsplash.com/@dcordash) on
  [Unsplash](https://unsplash.com)'
categories:
  - MySQL
---

Our server died at work last week. We're a small shop without a real IT pro,
just a bunch of hackers. Therefore, we had no back-up or recovery plan. I was
tasked with restoring the MySQL database files. These where critical databases
we use on a daily basis, as well as our customers because it contain all their
license information. We were able to get all the files off the computer in the
MySQL data folder (in C:\Program Files\MySQL\MySQL Server 4.1 & C:\Program
Files\MySQL\MySQL Server 5.0). I found that all the MyISAM type tables restored
just by moving the data files to the new data directory. The InnoDB type files
were a more difficult task, and that is why I am writing this post. I had a hard
time finding out how to do it, but I pieced together enough information to
accomplish the task. Now, in an effort to give back, I'll explain exactly what I
did to get it restored.

In our back-ups we had the following files:

- \MySQL\MySQL Server 4.1\data\\**ibdata1**
- \MySQL\MySQL Server 4.1\data\\**ib_logfile0**
- \MySQL\MySQL Server 4.1\data\\**ib_logfile1**

Plus, in the data folder there were was a folder with the name of the database I
was restoring that contained \*.frm files (table_name.frm).

I did the restore on my development machine rather than the actual server
because I didn't want to screw up what was working on the server. I already had
MySQL installed from an [XAMPP](http://www.xampp.org) install. (My development
box is running Windows XP SP2). XAMPP installs MySQL a little differently than
the regular MySQL install, so if it helps to follow what I did here, you may
want to install it.

I first stopped my MySQL service using XAMPP's control panel.

I moved the files listed above (ib\* files and the folder containing the \*.frm
files) to my local MySQL data folder (C:\Program Files\xampp\mysql\data).

I then edited my.cnf (located in C:\Program Files\xampp\mysql\bin) and made the
following changes (starting at line 66 for me):

OLD:

```text
skip-innodb
#innodb_data_home_dir = C:/Program Files/xampp/mysql/data/
#innodb_data_file_path = ibdata1:10M:autoextend
#innodb_log_group_home_dir = C:/Program Files/xampp/mysql/data/
#innodb_log_arch_dir = C:/Program Files/xampp/mysql/data/
#set-variable = innodb_buffer_pool_size=16M
#set-variable = innodb_additional_mem_pool_size=2M
#set-variable = innodb_log_file_size=5M
#set-variable = innodb_log_buffer_size=8M
#innodb_flush_log_at_trx_commit=1
#set-variable = innodb_lock_wait_timeout=50
```

NEW:

```text
#skip-innodb
innodb_data_home_dir = C:/Program Files/xampp/mysql/data/
innodb_data_file_path = ibdata1:10M:autoextend
innodb_log_group_home_dir = C:/Program Files/xampp/mysql/data/
innodb_log_arch_dir = C:/Program Files/xampp/mysql/data/
set-variable = innodb_buffer_pool_size=16M
set-variable = innodb_additional_mem_pool_size=2M
set-variable = innodb_log_file_size=170M
set-variable = innodb_log_buffer_size=8M
innodb_flush_log_at_trx_commit=1
set-variable = innodb_lock_wait_timeout=50
```

(I had to set `innodb_log_file_size` to the actual size of my log file)

I then edited the XAMPP batch file that starts the MySQL service (C:\Program
Files\xampp\mysql_start.bat). I added `--innodb_force_recovery=6` to the end of
the call to mysqld. So line 8 of that file now read:

```text
mysql\bin\mysqld --defaults-file=mysql\bin\my.cnf --standalone --console --innodb_force_recovery=6
```

This did the trick! My databases were recovered on my machine. I used
[SQLyog](http://www.webyog.com/en/downloads.php) to do a SQL dump of the
database to restore it on our production server.

If this helped at all, please leave a comment and let me know.
