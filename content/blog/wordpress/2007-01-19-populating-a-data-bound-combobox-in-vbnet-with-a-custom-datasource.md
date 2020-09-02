---
author: Dustin Davis
comments: true
date: 2007-01-19 23:13:40+00:00
link: https://dustindavis.me/populating-a-data-bound-combobox-in-vbnet-with-a-custom-datasource/
slug: populating-a-data-bound-combobox-in-vbnet-with-a-custom-datasource
title: Populating a Data Bound ComboBox in VB.NET With a Custom DataSource
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
---

I've had this problem for a couple days and I told myself that if I found the
solution I would post it on this blog. Basically, what I have is a ComboBox
control which has a data binding to its SelectedValue.

I've figured out how to populate the ComboBox with my own custom list using a
custom built class and an ArrayList.

<!-- more -->

Here is my class: `Public Class SkewValues Private iValue As Integer Private
sDisplay As String

Public Sub New(ByVal Value As Integer, ByVal Display As String) Me.iValue =
Value Me.sDisplay = Display End Sub 'New

Public ReadOnly Property Value() As Integer Get Return iValue End Get End
Property

Public ReadOnly Property Display() As String Get Return sDisplay End Get End
Property End Class`

Populating the ArrayList:
` Dim Skews As New ArrayList Skews.Add(New SkewValues(0, "Up to 5 Degrees")) Skews.Add(New SkewValues(1, "13 Degrees")) Skews.Add(New SkewValues(2, "21 Degrees")) Skews.Add(New SkewValues(3, "29 Degrees")) Skews.Add(New SkewValues(4, "37 Degrees")) Skews.Add(New SkewValues(5, "45 Degrees"))`

And setting the DataSource:
` Me.cboSkewTolerance.DataSource = Skews Me.cboSkewTolerance.ValueMember = "Value" Me.cboSkewTolerance.DisplayMember = "Display"`

This worked so far as populating the list, letting me select the value, and
updating the database. The problem was that when I loaded the form it wouldn't
display the right value, and after selecting a value, it would disappear as soon
as the ComboBox lost focus.

The Odd thing was I was having the problem in two locations on my application
and the cause was essentially the same, but different.

The first problem was that with the code above, in my SkewValues class, I was
returning a string for my Value property (accident) and the value it was bound
to was expecting an integer. So there were no errors or warnings, just that
quirk of not displaying what was selected.

This was essentially the same issue I had elsewhere - the DataBinding expected
value was not the same type as what was in the ArrayList.

It is really essential that the DataType in the DataBinding and the DataSource
be of the same type. I had another issue were the bound data was Int64 (created
by the designer based on my database) and my DataSouce value was an Integer.
Once I changed my DataTableAdapter so the bound data was and Int32 it worked as
expected.

One other issue that I had to resolve was that the value was populated
initially, but it was wrong. For this, I called SuspendBinding on the
BindingSource before setting the ComboBox.DataSource, and then ResumeBinding
when I was done - like so:

` Me.ZonesBindingSource.SuspendBinding() Dim FieldVals As New ArrayList For i As Integer = 0 To DocGroup.Schemas.Count - 1 FieldVals.Add(New FieldValues(i, DocGroup.Schemas(i).Label)) Next With Me.cboKfField .DataSource = FieldVals .ValueMember = "Value" .DisplayMember = "Display" End With Me.ZonesBindingSource.ResumeBinding()`

I hope this makes sense to whomever was searching this out. If you have
questions, feel free to email me, or leave a comment and I will get an email
notification.
