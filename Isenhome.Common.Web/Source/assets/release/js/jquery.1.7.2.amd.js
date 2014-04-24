define(['/source/assets/libs/jquery/1.7.2/jquery.min.js'], function () {
    'use strict';
    var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rhtml = /<|&#?\w+;/,
        rnoInnerhtml = /<(?:script|style|link)/i,
        // checked="checked" or checked
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /^$|\/(?:java|ecma)script/i,
        rscriptTypeMasked = /^true\/(.*)/,
        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        wrapMap = {

                // Support: IE 9
                option: [ 1, "<select multiple='multiple'>", "</select>" ],

                thead: [ 1, "<table>", "</table>" ],
                col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
                tr: [ 2, "<table><tbody>", "</tbody></table>" ],
                td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

                _default: [ 0, "", "" ]
        };

        // support IE9
        wrapMap.optgroup = wrapMap.option;

        wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
        wrapMap.th = wrapMap.td;

    function getAll( context, tag ) {
        var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
                context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
                [];

        return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
            jQuery.merge( [ context ], ret ) :
            ret;
    }

    function buildFragment( elems, context, scripts, selection ) {
        var elem, tmp, tag, wrap, contains, j,
            fragment = context.createDocumentFragment(),
            nodes = [],
            i = 0,
            l = elems.length;

        for ( ; i < l; i++ ) {
            elem = elems[ i ];

            if ( elem || elem === 0 ) {

                // Add nodes directly
                if ( jQuery.type( elem ) === "object" ) {
                    // Support: QtWebKit
                    // jQuery.merge because push.apply(_, arraylike) throws
                    jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

                // Convert non-html into a text node
                } else if ( !rhtml.test( elem ) ) {
                    nodes.push( context.createTextNode( elem ) );

                // Convert html into DOM nodes
                } else {
                    tmp = tmp || fragment.appendChild( context.createElement("div") );

                    // Deserialize a standard representation
                    tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
                    wrap = wrapMap[ tag ] || wrapMap._default;
                    tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

                    // Descend through wrappers to the right content
                    j = wrap[ 0 ];
                    while ( j-- ) {
                        tmp = tmp.lastChild;
                    }

                    // Support: QtWebKit
                    // jQuery.merge because push.apply(_, arraylike) throws
                    jQuery.merge( nodes, tmp.childNodes );

                    // Remember the top-level container
                    tmp = fragment.firstChild;

                    // Fixes #12346
                    // Support: Webkit, IE
                    tmp.textContent = "";
                }
            }
        }

        // Remove wrapper from fragment
        fragment.textContent = "";

        i = 0;
        while ( (elem = nodes[ i++ ]) ) {

            // #4087 - If origin and destination elements are the same, and this is
            // that element, do not do anything
            if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
                continue;
            }

            contains = jQuery.contains( elem.ownerDocument, elem );

            // Append to fragment
            tmp = getAll( fragment.appendChild( elem ), "script" );

            // Preserve script evaluation history
            if ( contains ) {
                setGlobalEval( tmp );
            }

            // Capture executables
            if ( scripts ) {
                j = 0;
                while ( (elem = tmp[ j++ ]) ) {
                    if ( rscriptType.test( elem.type || "" ) ) {
                        scripts.push( elem );
                    }
                }
            }
        }

        return fragment;
    }

    jQuery.parseHTML = function( data, context, keepScripts ) {
        if ( !data || typeof data !== "string" ) {
                return null;
        }
        if ( typeof context === "boolean" ) {
                keepScripts = context;
                context = false;
        }
        context = context || document;

        var parsed = rsingleTag.exec( data ),
                scripts = !keepScripts && [];

        // Single tag
        if ( parsed ) {
                return [ context.createElement( parsed[1] ) ];
        }

        parsed = buildFragment( [ data ], context, scripts );

        if ( scripts && scripts.length ) {
                jQuery( scripts ).remove();
        }

        return jQuery.merge( [], parsed.childNodes );
    };

    return $;
});