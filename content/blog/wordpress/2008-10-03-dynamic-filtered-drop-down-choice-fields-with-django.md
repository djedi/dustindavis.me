---
author: Dustin Davis
comments: true
date: 2008-10-03 17:05:18+00:00
link: https://dustindavis.me/dynamic-filtered-drop-down-choice-fields-with-django/
slug: dynamic-filtered-drop-down-choice-fields-with-django
title: Dynamic Filtered Drop-Down Choice Fields With Django
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
tags:
  - ajax
  - django
  - prototype
---

I'm enjoying the Django framework. Sometimes, what was seems rather easy
(relatively speaking) gets sort of complicated when working within the
boundaries of a framework. Such was the case with my latest endeavor to filter
on drop-down based on the selection of another drop-down.

Here is the situation: I have a database with car makes and models. When a user
selects a make, I want to update the models drop-down with only the models
associated with that make. Sounds pretty common, right? The database has a lot
of entries, so I don't want to do it with pure javascript because that could
make for big script, and maybe I don't want to give away all my data so easily
so some hacker can just parse a simple javascript file to get all the make/model
data out of my database (not that I care, but some people might). Therefore I
want to use Ajax to populate the data.

First, the proof of concept. I created this simple html file to test how it
might work:

`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"        
"[http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"](http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd)>

<html>         
<head>         
<meta http-equiv="Content-type" content="text/html; charset=utf-8" />         
<title>Update Drop-Down Without Refresh</title>         
<script type="text/javascript" charset="utf-8">         
function FilterModels() {         
var makeslist = document.getElementById('makes');         
var modelslist = document.getElementById('models');         
var make_id = makeslist.options[makeslist.selectedIndex].value;         
var modelstxt = new Array();         
modelstxt[1] = "1\tEscort\n2\tTaurus";         
modelstxt[2] = "1\tAltima\n2\tMaxima";         
var models = modelstxt[make_id].split("\n");         
for (var count = modelslist.options.length-1; count >-1; count--){         
modelslist.options[count] = null;         
}         
for (i=0; i<models.length; i++){         
var modelvals = models[i].split("\t");         
var option = new Option(modelvals[1], modelvals[2], false, false);         
modelslist.options[modelslist.length] = option;         
}         
}         
</script>         
</head>         
<body>         
<p>This is a proof of concept to update a select (drop-down) list of values, based on the selection of another select (drop-down) element using ajax.</p>         
<form action="" method="get" accept-charset="utf-8">         
<select name="makes" onchange="FilterModels()" id="makes">         
<option>--</option>         
<option value="1">Ford</option>         
<option value="2">Nissan</option>         
</select>         
<select name="models" id="models">         
<option>Choose Make</option>         
</select>         
</form>         
</body>         
</html>`

That basically helped me organize the code I needed to change the drop-down, now
I just need to plug in the Ajax and server side code to make it happen.

Notice, in the proof of concept, I used a tab delimited format for my models. I
really didn't want to mess with parsing xml or json or whatever. So I wrote a
model feed based on my automobile make id.

URL:

    (r'^feeds/models-by-make-id/(\d+)/$', 'autos.views.feed_models'),

View:

    def feed_models(request, make_id):     make = AutoMake.objects.get(pk=make_id)     models = AutoModel.objects.filter(make=make)     return render_to_response('feeds/models.txt', {'models':models}, mimetype="text/plain")

Template:

    {% for model in models %}{{ model.id }}    {{ model.model }}
    {% endfor %}

That gave me the data feed that I needed to request via Ajax. Now for my form.
Because the model field loads dynamically, I had to override the clean function
in the ChoiceField class and use it instead so I didn't get invalid choice
errors:

    <span style="line-height: 19px; font-family: 'Lucida Grande'; white-space: normal">c</span>lass DynamicChoiceField(forms.ChoiceField): <br></br>    def clean(self, value): <br></br>        return value<br></br>class MyForm(forms.Form): <br></br>    make = ModelChoiceField(AutoMake.objects, widget=forms.Select(attrs={'onchange':'FilterModels();'})) <br></br>    model = DynamicChoiceField(widget=forms.Select(attrs={'disabled':'true'}), choices=(('-1','Select Make'),))

Notice that I am making a call to FilterModels() on my ModelChoiceField's
onchange event. So, here is that code as well _(Note: I'm using the
[Prototype](http://www.prototypejs.org/) library for the Ajax call)_:

    function FilterModels(sel_val) {
    	var modelList = $('id_model');
    	for (var count = modelList.options.length-1; count >-1; count--){
    		modelList.options[count] = null;
    	}
    	modelList.options[0] = new Option('Loading...', '-1', false, false);
    	modelList.disabled = true;

    	var makeList = $('id_make');
    	var make_id = makeList.options[makeList.selectedIndex].value;
    	if (make_id > 0) {
    		new Ajax.Request('/feeds/models-by-make-id/' + make_id + '/', {
    			method: 'get',
    			onSuccess: function(transport){
    				var response = transport.responseText || 'no response text';
    				var kvpairs = response.split("\n");
    				for (i=0; i<kvpairs.length - 1; i++) {
    					m = kvpairs[i].split("\t");
    					var option = new Option(m[1], m[0], false, false);
    					modelList.options[i] = option;
    				}
    				modelList.disabled = false;
    				if (sel_val > 0) {
    					modelList.value = sel_val;
    				}
    			},
    			onFailure: function(){
    				alert('An error occured trying to filter the model list.');
    				modelList.options[0] = new Option('Other', '0', false, false);
    				modelList.disabled = false;
    			}
    		});
    	}
    	else {
    		modelList.options[0] = new Option('Select Make', '-1', false, false);
    		modelList.disabled = true;
    	}
    }

I also make a call to this function in my template after the form loads. This is
incase the form is refreshed, or it fails validation and a make is still
selected. It will populate the model list and select the value that was selected
previously:

    <script type="text/javascript" charset="utf-8">
    	FilterModels({{ model_id }});
    </script>

Note that in order to get the model_id, I had to set it in my view:

    def add_classified(request):
    	if request.method == 'POST':
    		form = AdForm(request.POST)
    	if request.POST.has_key('model'):
    		model_id = request.POST['model']
    	else:
    		model_id = 0
    	return render_to_response('add_classified.html', {'form':form,'model_id':model_id}, context_instance=RequestContext(request))

I think that's about it... Did I miss anything?
