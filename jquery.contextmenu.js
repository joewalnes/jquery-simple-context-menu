/**
 * Forked by Joshua from  https://github.com/joewalnes/jquery-simple-context-menu
 *
 * Now at
 *
 * MIT License: https://github.com/joewalnes/jquery-simple-context-menu/blob/master/LICENSE.txt
 */
jQuery.fn.contextPopup = function(menuData) {
    // Define default settings
    //items should match dataTokenLookups!!
    var settings = {
        contextMenuClass: 'contextMenuPlugin',
        fauxLinkTag: 'span',
        fauxLinkAdditionalClass: 'contextMenuLink',
        gutterLineClass: 'gutterLine',
        headerClass: 'header',
        seperatorClass: 'divider',
        title: '',
        items: [],
        dataTokenLookups: []
    };

    // merge them
    $.extend(settings, menuData);


    // Build popup menu HTML
    function createMenu(e) {
        var menu = $('<ul class="' + settings.contextMenuClass + '"><div class="' + settings.gutterLineClass + '"></div></ul>').appendTo(document.body);
        if (settings.title) {
            $('<li class="' + settings.headerClass + '"></li>').text(settings.title).appendTo(menu);
        }
        settings.items.forEach($.proxy(function(item,i) {
            if (item) {
                var rowCode = '<li><'+settings.fauxLinkTag+' class="'+settings.fauxLinkAdditionalClass+ ' linkClicker"><span class="itemTitle"></span></'+settings.fauxLinkTag+'></li>';
                // if(item.icon)
                //   rowCode += '<img>';
                // rowCode +=  '<span></span></a></li>';
                var row = $(rowCode).appendTo(menu);
                if(item.icon){
                    var icon = $('<img>');
                    icon.attr('src', item.icon);
                    icon.insertBefore(row.find('.itemTitle'));
                }
                row.find('.itemTitle').text(item.label);

                if (typeof(item.isEnabled)!=='undefined' && !item.isEnabled()) {
                    row.addClass('disabled');
                } else if (item.action) {
                    row.find('.linkClicker').on('click',function () {
                        item.action(e);
                    });
                }

            } else {
                $('<li class="' + settings.seperatorClass + '"></li>').appendTo(menu);
            }
        },this));
        menu.find('.' + settings.headerClass ).text(settings.title);
        var originalTarget = $(event.target);
        if(settings.dataTokenLookups.length > 0) {
            for (var xi = 0; xi < settings.dataTokenLookups.length; xi++) {
                var lookupTokenName = settings.dataTokenLookups[xi];
                var el = $(menu.find('.linkClicker').get([xi]));
                var dataVal = originalTarget.attr(lookupTokenName);
                el.attr('data-token', dataVal);
            }
        }
        return menu;
    }


    // On contextmenu event (right click)
    this.on('contextmenu', function(e) {
        var menu = createMenu(e).show();

        var left = e.pageX + 5, /* nudge to the right, so the pointer is covering the title */
            top = e.pageY;
        if (top + menu.height() >= $(window).height()) {
            top -= menu.height();
        }
        if (left + menu.width() >= $(window).width()) {
            left -= menu.width();
        }

        // Create and show menu
        menu.css({zIndex:1000001, left:left, top:top})
            .on('contextmenu', function() { return false; });

        // Cover rest of page with invisible div that when clicked will cancel the popup.
        var bg = $('<div></div>')
            .css({left:0, top:0, width:'100%', height:'100%', position:'absolute', zIndex:1000000})
            .appendTo(document.body)
            .on('contextmenu click', function() {
                // If click or right click anywhere else on page: remove clean up.
                bg.remove();
                menu.remove();
                return false;
            });

        // When clicking on a link in menu: clean up (in addition to handlers on link already)
        menu.find('.linkClicker').on('click',function() {
            bg.remove();
            menu.remove();
        });

        // Cancel event, so real browser popup doesn't appear.
        return false;
    });

    return this;
};

