---
author: Dustin Davis
comments: true
date: 2007-03-27 22:24:49+00:00
link: https://dustindavis.me/a-generic-error-occurred-in-gdi/
slug: a-generic-error-occurred-in-gdi
title: A generic error occurred in GDI+.
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
---

Sometime I run into errors that seem to make no sense and it takes me a while to
find the answer as to why. Such is the case with this error. I wrote a routine
in VB.NET to split a multi-page tiff file. Every once in a while, I would get
this less than helpful error: "A generic error occurred in GDI+." when calling
the Image.Save() function.

Thanks to
[another frustrated user](http://geekswithblogs.net/webblog4mapsr80/archive/2006/06/06/80959.aspx)
that found the solution I was able to see that sometime the folder I was sending
files to did not exist. So rather GDI telling me that the save path did not
exist it simply threw a generic error. Thanks!

So as long as you're reading this, I might as well share the function that
splits a multi-page tiff file. There are actually two functions. UniqueName is a
recursive function that makes sure you don't overwrite an existing file.

<!-- more -->

` Shared Function SplitTiffFile(ByVal filePath As String, ByVal cachePath As
String, Optional ByRef filePaths() As String = Nothing) As Boolean Dim objImage
As Image = Image.FromFile(filePath) Dim objGuid As Guid =
(objImage.FrameDimensionsList(0)) Dim objDimension As
System.Drawing.Imaging.FrameDimension = New
System.Drawing.Imaging.FrameDimension(objGuid) Dim Pages As Integer =
objImage.GetFrameCount(objDimension) Dim Filename As String

        For i As Integer = 0 To Pages - 1
            objImage.SelectActiveFrame(objDimension, i)
            Filename = IO.Path.GetFileNameWithoutExtension(filePath) & "-" & (i + 1).ToString.PadLeft(3, CChar("0")) & ".tif"
            ReDim Preserve filePaths(i)
            filePaths(i) = IO.Path.Combine(cachePath, Filename)
            filePaths(i) = UniqueName(filePaths(i))
            If Not IO.Directory.Exists(IO.Path.GetDirectoryName(filePaths(i))) Then
                IO.Directory.CreateDirectory(IO.Path.GetDirectoryName(filePaths(i)))
            End If
            objImage.Save(filePaths(i), Imaging.ImageFormat.Tiff)
        Next
        objImage.Dispose()
    End Function

    Shared Function UniqueName(ByVal Filename As String) As String
        If IO.File.Exists(Filename) Then
            ' Append ~### to the end of the file name
            Dim name, ext, newFilename As String
            Dim regex As New Regex("~([0-9]{3})$")
            Dim mc As MatchCollection
            Dim matchVal As Integer

            name = IO.Path.GetFileNameWithoutExtension(Filename)
            ext = IO.Path.GetExtension(Filename)
            If regex.IsMatch(name) Then
                mc = regex.Matches(name)
                name = name.Substring(0, name.Length - 4)
                matchVal = CInt(mc.Item(0).Value.Substring(1)) + 1
                name = name & "~" & CStr(matchVal).PadLeft(3, CChar("0"))
            Else
                name = name & "~001"
            End If
            newFilename = IO.Path.Combine(IO.Path.GetDirectoryName(Filename), name & ext)

            ' Recursion
            Filename = UniqueName(newFilename)
            Return Filename
        Else
            Return Filename
        End If
    End Function

`
