---
author: Dustin Davis
comments: true
date: 2009-03-10 21:40:42+00:00
link: https://dustindavis.me/django-filtering-a-modelform-field/
slug: django-filtering-a-modelform-field
title: 'Django: Filtering a ModelForm field'
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
tags:
  - Django
---

So something what should be so relatively easy can turn out to be quite hard
when you don't know where to go for the answer. Generally the #django channel on
IRC is an awesome help, but this morning I felt invisible so I can too keep
digging. Finally I found my answer in code from another project.

Here's the situation. I'm creating a budget system. When you add or import
transactions from your bank, you need to tell it what bank account the
transactions are associated with. I have the following models: Bank,
BankAccount, Transaction. Transaction has a foreign key to BankAccount.

I have a ModelForm name AddTransactionForm. The problem was that when I went to
add a transaction, it would show me all the accounts of other users. I needed to
somehow filter the queryset that was applied to the account foreign key. I
couldn't find this anywhere in the docs, and like I mentioned, no one was even
acknowledging me in IRC, which is rare. I finally found something similar I did
for HouseSheet.com. Here was is my "fixed" form class:

`class AddTransactionForm(ModelForm): Â Â def __init__(self, user, *args, **kwargs): Â Â Â super(AddTransactionForm, self).__init__(*args, **kwargs) Â Â Â self.fields['account'] = forms.ModelChoiceField(queryset=BankAccount.objects.filter(user=user))`

` `

`Â Â class Meta: Â Â Â model = Transaction Â Â Â exclude = ('envelope',)`

So now, when I call this, I just need to pass in the the logged in user to show
only that user's accounts like so: `form = ImportForm(user=request.user)`

I think my biggest problem with this was I haven't yet mastered the python
language so I wasn't sure how to pass in the user object I need to filter on.
