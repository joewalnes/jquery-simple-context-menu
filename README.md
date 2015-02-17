A Simple Good Looking Context Menu, for jQuery
==============================================

Yes, there are [loads](http://plugins.jquery.com/plugin-tags/context-menu) of context menu
plugins already. But they require a fair amount of work to make them look good.

This one is easy to use, small, and looks good.

Demo
----

* http://joewalnes.github.com/jquery-simple-context-menu/example.html

Features
--------

* Tiny library. Only dependency is jQuery.
* Simple API.
* Looks good out of the box, with no additional tweaking.
* Designed to look and behave like a standard Windows context menu.
* There's so little code, it should be easy to add your own custom features.

The menu looks like this:

![Screenshot](https://github.com/joewalnes/jquery-simple-context-menu/raw/master/demo/screenshot.png)


Installation
------------

Include the files `jquery.contextmenu.css` and `jquery.contextmenu.js` in your page `<head>`. You also need jQuery. It is recommended that you use the [HTML 5 DOCTYPE](http://ejohn.org/blog/html5-doctype/) to ensure rendering consistency.

    <!DOCTYPE html>
    <html>
      <head>
         <script src="[some Path To Modern jQuery]"></script>
         <script src="jquery.contextmenu.js"></script> 
         <link rel="stylesheet" href="jquery.contextmenu.css">
         ... rest of your stuff ...

You can get the files from here:

* <https://github.com/joewalnes/jquery-simple-context-menu/raw/master/jquery.contextmenu.js>
* <https://github.com/joewalnes/jquery-simple-context-menu/raw/master/jquery.contextmenu.css>

Usage
-----

The plugin introduces a `contextPopup()` method to the jQuery object.

Assuming you have an element that you'd like to bind a context menu to:

    <div id="mythingy">hello</div>

You can wire up a context menu like this:

    $('#mythingy').contextPopup({
      title: 'My Popup Menu',
      items: [
        {label:'Some Item',     icon:'icons/shopping-basket.png', action:function() { alert('clicked 1') } },
        {label:'Another Thing', icon:'icons/receipt-text.png',    action:function() { alert('clicked 2') } },
        null, /* null can be used to add a separator to the menu items */
        {label:'Blah Blah',     icon:'icons/book-open-list.png',  action:function() { alert('clicked 3') }, isEnabled:function() { return false; } },
      ],
      dataTokenLookups: [
        'name-of-data-attribute-to-retrieve-from-bound-element-and-placed-on-items[0]',
        'name-of-data-attribute-to-retrieve-from-bound-element-and-placed-on-items[1]',
        'name-of-data-attribute-to-retrieve-from-bound-element-and-placed-on-items[2]',
        ]
      });

The 'isEnabled' function is optional.  By default all items are enabled.

Icons
-----

The icons should be 16x16 pixels. I recommend the [Fugue icon set](http://p.yusukekamiyamane.com/) (shadowless).



CHANGES FROM ORIGINAL
-----------------------

- can now specify the tag type that the clickable context-menu element should be.
Defaults to <span> instead of <a>, since clicks don't necessarily take someone to a new resource/URI

- class 'linkClicker' given to that clickable element, which allows for more accurate styling
 as well as DOM node traversal when building the menu (no need to rely on specific tags in a specific order; classes are more flexible)

- ability to take "data-" attributes from the original target / the element the context-menu is bound to
 and have it associated with the clickable context-menu element

- update jQuery methods / replaced .bind() with .on()