---
author: Dustin Davis
comments: true
date: 2008-09-11 15:18:21+00:00
link: https://dustindavis.me/setting-up-wildcard-dns-subdomains-on-cpanel/
slug: setting-up-wildcard-dns-subdomains-on-cpanel
title: Setting up Wildcard DNS & Subdomains on cPanel
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
---

**\*** UPDATE: DON'T READ THIS POST... JUST READ COMMENT #2 FROM CPANEL **\***

I've posted instructions in the past on how to set up wildcard DNS and
subdomains on DirectAdmin. DirectAdmin makes it rather trivial, which is quite
nice. There is a little bit more effort involved in cPanel - manly because you
actually have to make some modifications via SSH. So I would say this tutorial
involves and intermediate skill level to accomplish (it can't be more because
this is about the extent of my skill level). You will need access to WHM and
root access to your server.

_\_\_Background: I'm currently learning Django and trying to create a solution
for sub-domaining accounts. I've been told by a few people that this will be the
hardest part to set up. At my currently Django level, this part is trivial. I
hope to make more posts when I get the Django parts figured out as well. Stay
tuned._

**Step 1: DNS: A Record**

First we'll need to log in to WHM. Under _DNS Functions_, select _Edit DNS
Zone_. Choose the domain for the zone in which you wish to edit. Add an A record
mapped to asterisk (wildcard) for the subdomain and the IP Address the site is
hosted on. You likely already have A records for ftp, webmail, etc. just model
this new one after those.

![](http://www.nerdydork.com/wp-content/uploads/2008/09/moz-screenshot-3.jpg)

You should now be able to enter any subdomain on your domain, but it will not
likely find your main site. So now we need to set that up.

**Step 2: ServerAlias**

Log in to your server via
[SSH](http://www.chiark.greenend.org.uk/%7Esgtatham/putty/download.html) and go
open /etc/httpd/conf/httpd.conf (I'll assume you know your way around linux via
command line as well as vi or some other editor)

\*Note: wherever you see deqb.com you should expect to see your domain name that
you are setting up

Now, we could edit this file and make everything work, but there is a problem
with that. Look at the top of the document and you should see something like
this:

#

#Â Â  Direct modifications to the Apache configuration file may be lost upon
subsequent regeneration of theÂ Â Â Â Â Â  # #Â Â  configuration file. To have
modifications retained, all modifications must be checked into
theÂ Â Â Â Â Â Â Â Â Â Â Â Â  # #Â Â  configuration system by
running:Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â  #
#Â Â Â Â Â Â  /usr/local/cpanel/bin/apache_conf_distiller
--updateÂ Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â  #
#Â Â  To see if your changes will be conserved, regenerate the Apache
configuration file by running:Â Â Â Â Â Â Â Â Â Â Â Â Â  # #Â Â Â Â Â Â 
/usr/local/cpanel/bin/build_apache_confÂ Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â  #
#Â Â  and check the configuration file for your alterations. If your changes
have been ignored, then they willÂ Â Â  # #Â Â  need to be added directly to
their respective template
files.Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â  #
#Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â  #
#Â Â  It is also possible to add custom directives to the various "Include"
files loaded by this httpd.confÂ Â Â Â Â Â  # #Â Â  For detailed instructions on
using Include files and the apache_conf_distiller with the new
configurationÂ Â  # #Â Â  system refer to the documentation at:
http://www.cpanel.net/support/docs/ea/ea3/customdirectives.htmlÂ Â Â Â Â Â  #
#Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â  #
#Â Â  This configuration file was built from the following
templates:Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â  #
#Â Â Â Â 
/var/cpanel/templates/apache2/main.defaultÂ Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â  #
#Â Â Â Â 
/var/cpanel/templates/apache2/main.localÂ Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â  #
#Â Â Â Â 
/var/cpanel/templates/apache2/vhost.defaultÂ Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â  #
#Â Â Â Â 
/var/cpanel/templates/apache2/vhost.localÂ Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â  #
#Â Â Â Â 
/var/cpanel/templates/apache2/ssl_vhost.defaultÂ Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â  #
#Â Â Â Â 
/var/cpanel/templates/apache2/ssl_vhost.localÂ Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â  #
#Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â  #
#Â  Templates with the '.local' extension will be preferred over templates with
the '.default' extension.Â Â Â Â Â Â Â  # #Â  The only template updated by the
apache_conf_distiller is
main.default.Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â  #

#

Basically what it's saying is don't edit this file directly because you're
changes may be lost.

Do a search for the domain you are adding the wildcard to. You should find the
VirtualHost set up for your domain. Here is mine:

# DO NOT EDIT. AUTOMATICALLY GENERATED.Â  IF YOU NEED TO MAKE A CHANGE PLEASE USE THE INCLUDE FILES.

<VirtualHost 67.225.128.241:80> Â Â Â  ServerName deqb.com Â Â Â  ServerAlias
www.deqb.com Â Â Â  DocumentRoot /home/deqb/public_html Â Â Â  ServerAdmin
webmaster@deqb.com Â Â Â  UseCanonicalName Off Â Â Â Â Â Â Â  Options -ExecCGI
-Includes Â Â Â Â Â Â Â  RemoveHandler cgi-script .cgi .pl .plx .ppl .perl
Â Â Â  CustomLog /usr/local/apache/domlogs/deqb.com combined Â Â Â  CustomLog
/usr/local/apache/domlogs/deqb.com-bytes_log "%{%s}t %I .\n%{%s}t %O ."
Â Â Â  ## User deqb # Needed for Cpanel::ApacheConf Â Â Â  <IfModule
!mod_disable_suexec.c> Â Â Â Â Â Â Â  SuexecUserGroup deqb deqb Â Â Â 
</IfModule>

**Â Â Â  # To customize this VirtualHost use an include file at the following
location Â Â Â  # Include
"/usr/local/apache/conf/userdata/std/2/deqb/deqb.com/\*.conf"**

Â

</VirtualHost>

Notice the highlighted lines. This is where we are going to create a file. We
are going to create a file at:
/usr/local/apache/conf/userdata/std/2/_deqb_/_deqb.com_/ServerAlias_wildcard.conf
(you can give it any name you want really)

\*Hint: You may need to create the directories first, run this command: mkdir -p
/usr/local/apache/conf/userdata/std/2/_deqb_/_deqb.com_/

So really, you don't need to edit anything it httpd.conf, we just needed some
info.

Inside of the ServerAlias*wildcard.conf file, enter this line: ServerAlias
\*.\_deqb.com*

Now, you'll need to rebuild the httpd.conf file per the instructions at the top
of that file by running the following command:
/usr/local/cpanel/bin/build_apache_conf

If you open your /etc/httpd/conf/httpd.conf file again you should see that your
VirtualHost for your domain as changed slightly:

<VirtualHost 67.225.128.241:80> Â Â Â  ServerName deqb.com Â Â Â  ServerAlias
www.deqb.com Â Â Â  DocumentRoot /home/deqb/public_html Â Â Â  ServerAdmin
webmaster@deqb.com Â Â Â  UseCanonicalName Off Â Â Â Â Â Â Â  Options -ExecCGI
-Includes Â Â Â Â Â Â Â  RemoveHandler cgi-script .cgi .pl .plx .ppl .perl
Â Â Â  CustomLog /usr/local/apache/domlogs/deqb.com combined Â Â Â  CustomLog
/usr/local/apache/domlogs/deqb.com-bytes_log "%{%s}t %I .\n%{%s}t %O ."
Â Â Â  ## User deqb # Needed for Cpanel::ApacheConf Â Â Â  <IfModule
!mod_disable_suexec.c> Â Â Â Â Â Â Â  SuexecUserGroup deqb deqb Â Â Â 
</IfModule>

**Â Â Â  Include "/usr/local/apache/conf/userdata/std/2/deqb/deqb.com/\*.conf"
** </VirtualHost>

Â

**Step 3: Restart Apache**

---

The last step required is to restart apache. I suppose there are a number of
ways to do this. As long as we are logged in to SSH, we might as well just run
the command: /usr/sbin/apachectl restart

Now, give it a try. you should be aby to access something like
http://itworked._deqb.com_ and still see your main page.

Technorati Tags: [dns](http://technorati.com/tag/dns), wildcard dns,
[subdomain](http://technorati.com/tag/subdomain),
[django](http://technorati.com/tag/django),
[cpanel](http://technorati.com/tag/cpanel), [whm](http://technorati.com/tag/whm)
