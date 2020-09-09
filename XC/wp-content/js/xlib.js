/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
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
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


//  ameen


/* File: preloader.js */
function preloader(e){for(var t=0;t<arguments.length;t++){var n=e.id;path=e.path;spr=e.sprites;size=e.size;dur=e.speed;if(!dur)dur=100;interme(n,path,spr,size,dur)}
}
function interme(e,t,n,r,i){setInterval(function(){var i=parseInt($(e+" img").css("left"))-r;if(!i)i="0px";else if(i==-r*n)i=0;if(!$(e).html()){$(e).css({width:r+"px",height:r+"px",padding:"0px",overflow:"hidden",position:"relative"}
).append('<img src="'+t+'" alt="prelaoder" style="height:'+r+"px; position:absolute; top:"+i+'; left:0px;" />')}
else{$(e+" img").css("left",i+"px")}
}
,i)}
 /* ---- Custom Codes by MAK ----*/ function numbersonly(myfield,e,dec){var key;var keychar;if(window.event)key=window.event.keyCode;else if(e)key=e.which;else return true;keychar=String.fromCharCode(key);if((key==null)||(key==0)||(key==8)||(key==9)||(key==13)||(key==27))return true;else if((("0123456789").indexOf(keychar)>-1))return true;else if(dec&&(keychar==".")){myfield.form.elements[dec].focus();return false}
else return false}
 function varchk(tgt, ctry) { var formvars = ["cn", "em", "pc", "code", "pn", "pt", "apc", "acode", "apn", "apt", "pdt", "sub", "pwd", "cpwd", "ctry", "topic", "date", "cl"]; for (var i = 0; i < formvars.length; i++) { var stat = $(tgt + ' .jform [name="' + formvars[i] + '"]').attr('name') == formvars[i], d = new Date(), curr_date = d.getDate(), curr_month = d.getMonth() + 1, curr_year = d.getFullYear(), curdat = curr_month + '/' + curr_date + '/' + curr_year; if (!stat) { if (formvars[i] == "date") $(tgt + ' .jform').append('<input type="hidden" name="' + formvars[i] + '" value="' + curdat + '" />'); else if (formvars[i] == "cl") $(tgt + ' .jform').append('<input type="hidden" name="' + formvars[i] + '" value="' + ctry + '" />'); else if (formvars[i] == "topic") $(tgt + ' .jform').append('<input type="hidden" name="' + formvars[i] + '" value="1" />'); else $(tgt + ' .jform').append('<input type="hidden" name="' + formvars[i] + '" value="1" />') }
 }
 }
 // Default Reset $(function(){$("li:first-child").addClass("first");$("li:last-child").addClass("last");$("tr:nth-child(odd)").addClass("alter");$('[href="#"]').attr("href","javascript:;");now=new Date;thecopyrightYear=now.getYear();if(thecopyrightYear<1900)thecopyrightYear=thecopyrightYear+1900;$("#cur-date").html(thecopyrightYear) // Variables Check $('.jform').each(function(){var id=$(this).parent().attr('id'),rol=$(this).attr('data-role'); if(!$(this).hasClass('steptwo')){ varchk('#'+id,rol) }
 }
); // Variables Check $("select[name='rd_param_service']").change(function () { var servcode = $('option:selected', this).val(); if(servcode == "other"){ $('.other_serv').fadeIn(); }
else{ $('.other_serv input').val(''); $('.other_serv').fadeOut(); }
 }
); $.ajax({ url: 'https://telize-v1.p.mashape.com/geoip', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc data: {}
, // Additional parameters here dataType: 'json', success: function(data) { //To see the whole object you can output it to your browser console using: $('body').attr('data-rel',data.country_code); //ipcode(data.country_code); }
, error: function(err) { //alert(err); }
, beforeSend: function(xhr) { xhr.setRequestHeader("X-Mashape-Authorization", "qffbpwr4NomshbbtZgBTVvJhYoE3p1x7AcojsnqIGM2TPTZ6Yv"); // Enter here your Mashape key }
 }
); // Country List Data Fill var ctrycode = 1; $.ajax({ type: "GET", url: "/assets/js/countrylist.xml", dataType: "xml", success: function(xml) { $(xml).find('country').each(function() { var name = $(this).find('name').text(); var abbr = $(this).find('abbr').text(); var code = $(this).find('code').text(); $('.jform select.countrylist, .jform select.countrylist2').append('<option value="' + code + '" data-abbr="' + abbr + '" data-name="' + name + '">' + name + ' (+' + code + ')</option>'); }
) }
 }
); $(document).ready(function(){ //$('select[name=pc] option[value='+ctrycode+']').attr('selected', 'selected'); //var ctname = $('.jform select.countrylist option:selected').attr('data-abbr'); //var ctcode = $('.jform select.countrylist option:selected').attr('value'); // $('.jform input#code').val(ctname+' +'+ctcode); //$('.jform input.cphonecode').val(ctname+' +'+ctcode); // $('.jform').each(function() { // $('.jform input#code').val("US +1"); // }
); }
); $('.jform select.countrylist.multi').fadeTo(0,0); $('body').delegate('select[name=pc]','change',function(){ var id = $(this).parents('.jform').parent().attr('id'); var code = $(this).children('option:selected').val(); var ctryname = $(this).children('option:selected').attr('data-name'); var codename = $(this).children('option:selected').attr('data-abbr'); // $('#'+id+' .jform input#code').val(codename+' +'+code); $('#'+id+' .jform input.cphonecode').val(codename+' +'+code); $('#'+id+' .jform input[name=ctry]').val(ctryname); $('#'+id+' .jform input[name=code]').val(code); }
); $('body').delegate('.dob select','change',function(){ //alert('asd'); var id = $(this).parents('form').parents('div').attr('id'); var month = $('#'+id+' form').find('select[name="month"]').val(); var day = $('#'+id+' form').find('select[name="day"]').val(); var year = $('#'+id+' form').find('select[name="year"]').val(); var dob = month+'/'+day+'/'+year; $('#'+id+' form').find('input[name="param_Date-Of-Birth"]').val(dob); //$(this).find('input[name=cpwd"]').val(); }
); // Defualt Attribute for Validation $('[name="cn"],[name="msg"]').each(function(){$(this).attr({'minlength':'2'}
);}
); $('[name="cn"],[name="em"]').each(function(){$(this).attr('maxlength','60');}
); $('[name="msg"]').each(function(){$(this).attr('maxlength','1000');}
); $('[name="pn"],[name="apn"]').each(function(){$(this).attr({'minlength':'7','maxlength':'11'}
);}
); $('.SelectCountry.code').each(function(){$(this).attr({'id':'code'}
);}
); $('.SelectCountry.acode').each(function(){$(this).attr({'id':'acode'}
);}
); $('[name="cpwd"]').each(function(){$(this).attr('equalto','#'+$(this).parents('form').find('[name="pwd"]').attr('id'));}
); // Numbers only for phone number field $('[name="pn"], [name="apn"]').each(function(){if($(this).attr('type')=="text"){$(this).attr('onkeypress','return numbersonly(this, event)');}
}
); // Password No space $('input[type="password"]').keypress(function(e){if(e.which === 32)return false;}
); // Validations ------------------------------------------------------------------ $('.validate').each(function(){var id=$(this).parent().attr('id');if($.browser.msie&&$.browser.version<=9){ $('[type=text]:not("[name=code]"),[type=password]').addClass('placeholder'); $('#code, #acode, .knob').removeClass('placeholder'); //$('[type=text]:not("[name=code]"),[type=password]').addClass('placeholder'); //$('#code').removeClass('placeholder'); jQuery.validator.addMethod("alphanumeric", function(value, element){return this.optional(element) || /^[A-Za-z-.\s\']+$/i.test(value);}
, "Letters, numbers, and underscores only please");$('#'+id+' .validate').validate({ignore: [],invalidHandler:function(event, validator){setTimeout(function(){$('.placeholder').each(function(){if($(this).hasClass('error')){$(this).parent().children('.phtxt').addClass('error');}
 else {$(this).parent().children('.phtxt').removeClass('error');}
}
);}
,500);}
}
);}
 else{$('#'+id+' .validate').validate();}
 //$('#'+id+' .validate').validate({debug: true}
); }
); $(window).load(function(){var num=0;$('.placeholder').each(function(){num++;var ithis=$(this),pval=ithis.attr('placeholder'),namval=ithis.attr('name');ithis.removeAttr('placeholder');ithis.parent().prepend('<input type="text" name="phtxt'+num+'" class="phtxt '+namval+'-holder" value="'+pval+'" />');ithis.hide();ithis.parent().children('.phtxt').on('focus',function(){$(this).hide();ithis.show().trigger('focus');	}
);ithis.on('blur',function(){if(ithis.hasClass('error')){$(this).parent().children('.phtxt').addClass('error');}
else{$(this).parent().children('.phtxt').removeClass('error');}
if(!ithis.val()){$(this).hide();$(this).parent().children('.phtxt').show();}
}
);}
);if($.browser.msie&&$.browser.version<=9){$('textarea').each(function(){var txtvalue=$(this).attr('placeholder');$(this).attr('value',txtvalue)}
);$('textarea').focus(function(){var maintxt=$(this).attr('placeholder');if($(this).attr('value')==maintxt){$(this).attr('value','')}
}
).blur(function(){var maintxt=$(this).attr('placeholder');if($(this).attr('value')==''){$(this).attr('value',maintxt)}
}
)}
}
); // Get Bg Positions $('[data-position]').each(function(){if($(this).attr('data-pos')!='1'){var pos=$(this).attr('data-position');pos = pos.split(' ');$(this).css('background-position','-'+pos[0]+'px -'+pos[1]+'px');$(this).attr('data-pos','1');}
}
); // Lazzy Load Initilization lazzyload();$(window).scroll(function(){lazzyload();}
); }
)//Main Function Ends // GOTO by Scroll function goToByScroll(e){$("html,body").animate({scrollTop:$(e).offset().top}
,1e3,"",function(){$(this).stop(true,true)}
)}
 // Auto Iframe Height function frameheight(e){setInterval("function(){var ht = $(tgt).contents().find('body').height();if($(tgt).height()!=ht){$(tgt).height(ht);}
}
",100)}
 //Lazzy Load Function function lazzyload(){var txt='',offset,winscr,$this,count=0;$('img[data-src]').each(function(){count++;$this=$(this);winscr=$(window).scrollTop()+$(window).height();offset=$(this).offset().top;if(winscr>=offset&&offset!=0){if(!$this.hasClass('imgadded')){var isrc=$this.attr('data-src');$this.attr('src',isrc);$this.addClass('imgadded');$this.load(function(){$(this).hide().fadeIn(300,'',function(){$(this).removeAttr('style');}
);}
);}
}
}
);$('[data-img]').each(function(){count++;$this=$(this);winscr=$(window).scrollTop()+$(window).height();offset=$(this).offset().top;if(winscr>=offset){if(!$this.hasClass('bgadded')){var isrc=$this.attr('data-img');$this.css('background-image',isrc);$this.addClass('bgadded');}
}
}
);}
 /* ---- Custom Codes by MAK ----*/ /* * jQuery Cycle2; v20130502 * http://jquery.malsup.com/cycle2/ * Copyright (c) 2013 M. Alsup; Dual licensed: MIT/GPL */ (function(e){"use strict";function t(e){return(e||"").toLowerCase()}
var i="20130409";e.fn.cycle=function(i){var n;return 0!==this.length||e.isReady?this.each(function(){var n,s,o,c,r=e(this),l=e.fn.cycle.log;if(!r.data("cycle.opts")){(r.data("cycle-log")===!1||i&&i.log===!1||s&&s.log===!1)&&(l=e.noop),l("--c2 init--"),n=r.data();for(var a in n)n.hasOwnProperty(a)&&/^cycle[A-Z]+/.test(a)&&(c=n[a],o=a.match(/^cycle(.*)/)[1].replace(/^[A-Z]/,t),l(o+":",c,"("+typeof c+")"),n[o]=c);s=e.extend({}
,e.fn.cycle.defaults,n,i||{}
),s.timeoutId=0,s.paused=s.paused||!1,s.container=r,s._maxZ=s.maxZ,s.API=e.extend({_container:r}
,e.fn.cycle.API),s.API.log=l,s.API.trigger=function(e,t){return s.container.trigger(e,t),s.API}
,r.data("cycle.opts",s),r.data("cycle.API",s.API),s.API.trigger("cycle-bootstrap",[s,s.API]),s.API.addInitialSlides(),s.API.preInitSlideshow(),s.slides.length&&s.API.initSlideshow()}
}
):(n={s:this.selector,c:this.context}
,e.fn.cycle.log("requeuing slideshow (dom not ready)"),e(function(){e(n.s,n.c).cycle(i)}
),this)}
,e.fn.cycle.API={opts:function(){return this._container.data("cycle.opts")}
,addInitialSlides:function(){var t=this.opts(),i=t.slides;t.slideCount=0,t.slides=e(),i=i.jquery?i:t.container.find(i),t.random&&i.sort(function(){return Math.random()-.5}
),t.API.add(i)}
,preInitSlideshow:function(){var t=this.opts();t.API.trigger("cycle-pre-initialize",[t]);var i=e.fn.cycle.transitions[t.fx];i&&e.isFunction(i.preInit)&&i.preInit(t),t._preInitialized=!0}
,postInitSlideshow:function(){var t=this.opts();t.API.trigger("cycle-post-initialize",[t]);var i=e.fn.cycle.transitions[t.fx];i&&e.isFunction(i.postInit)&&i.postInit(t)}
,initSlideshow:function(){var t,i=this.opts(),n=i.container;i.API.calcFirstSlide(),"static"==i.container.css("position")&&i.container.css("position","relative"),e(i.slides[i.currSlide]).css("opacity",1).show(),i.API.stackSlides(i.slides[i.currSlide],i.slides[i.nextSlide],!i.reverse),i.pauseOnHover&&(i.pauseOnHover!==!0&&(n=e(i.pauseOnHover)),n.hover(function(){i.API.pause(!0)}
,function(){i.API.resume(!0)}
)),i.timeout&&(t=i.API.getSlideOpts(i.nextSlide),i.API.queueTransition(t,i.timeout+i.delay)),i._initialized=!0,i.API.updateView(!0),i.API.trigger("cycle-initialized",[i]),i.API.postInitSlideshow()}
,pause:function(t){var i=this.opts(),n=i.API.getSlideOpts(),s=i.hoverPaused||i.paused;t?i.hoverPaused=!0:i.paused=!0,s||(i.container.addClass("cycle-paused"),i.API.trigger("cycle-paused",[i]).log("cycle-paused"),n.timeout&&(clearTimeout(i.timeoutId),i.timeoutId=0,i._remainingTimeout-=e.now()-i._lastQueue,(0>i._remainingTimeout||isNaN(i._remainingTimeout))&&(i._remainingTimeout=void 0)))}
,resume:function(e){var t=this.opts(),i=!t.hoverPaused&&!t.paused;e?t.hoverPaused=!1:t.paused=!1,i||(t.container.removeClass("cycle-paused"),t.API.queueTransition(t.API.getSlideOpts(),t._remainingTimeout),t.API.trigger("cycle-resumed",[t,t._remainingTimeout]).log("cycle-resumed"))}
,add:function(t,i){var n,s=this.opts(),o=s.slideCount,c=!1;"string"==e.type(t)&&(t=e.trim(t)),e(t).each(function(){var t,n=e(this);i?s.container.prepend(n):s.container.append(n),s.slideCount++,t=s.API.buildSlideOpts(n),s.slides=i?e(n).add(s.slides):s.slides.add(n),s.API.initSlide(t,n,--s._maxZ),n.data("cycle.opts",t),s.API.trigger("cycle-slide-added",[s,t,n])}
),s.API.updateView(!0),c=s._preInitialized&&2>o&&s.slideCount>=1,c&&(s._initialized?s.timeout&&(n=s.slides.length,s.nextSlide=s.reverse?n-1:1,s.timeoutId||s.API.queueTransition(s)):s.API.initSlideshow())}
,calcFirstSlide:function(){var e,t=this.opts();e=parseInt(t.startingSlide||0,10),(e>=t.slides.length||0>e)&&(e=0),t.currSlide=e,t.reverse?(t.nextSlide=e-1,0>t.nextSlide&&(t.nextSlide=t.slides.length-1)):(t.nextSlide=e+1,t.nextSlide==t.slides.length&&(t.nextSlide=0))}
,calcNextSlide:function(){var e,t=this.opts();t.reverse?(e=0>t.nextSlide-1,t.nextSlide=e?t.slideCount-1:t.nextSlide-1,t.currSlide=e?0:t.nextSlide+1):(e=t.nextSlide+1==t.slides.length,t.nextSlide=e?0:t.nextSlide+1,t.currSlide=e?t.slides.length-1:t.nextSlide-1)}
,calcTx:function(t,i){var n,s=t;return i&&s.manualFx&&(n=e.fn.cycle.transitions[s.manualFx]),n||(n=e.fn.cycle.transitions[s.fx]),n||(n=e.fn.cycle.transitions.fade,s.API.log('Transition "'+s.fx+'" not found. Using fade.')),n}
,prepareTx:function(e,t){var i,n,s,o,c,r=this.opts();return 2>r.slideCount?(r.timeoutId=0,void 0):(!e||r.busy&&!r.manualTrump||(r.API.stopTransition(),r.busy=!1,clearTimeout(r.timeoutId),r.timeoutId=0),r.busy||(0!==r.timeoutId||e)&&(n=r.slides[r.currSlide],s=r.slides[r.nextSlide],o=r.API.getSlideOpts(r.nextSlide),c=r.API.calcTx(o,e),r._tx=c,e&&void 0!==o.manualSpeed&&(o.speed=o.manualSpeed),r.nextSlide!=r.currSlide&&(e||!r.paused&&!r.hoverPaused&&r.timeout)?(r.API.trigger("cycle-before",[o,n,s,t]),c.before&&c.before(o,n,s,t),i=function(){r.busy=!1,r.container.data("cycle.opts")&&(c.after&&c.after(o,n,s,t),r.API.trigger("cycle-after",[o,n,s,t]),r.API.queueTransition(o),r.API.updateView(!0))}
,r.busy=!0,c.transition?c.transition(o,n,s,t,i):r.API.doTransition(o,n,s,t,i),r.API.calcNextSlide(),r.API.updateView()):r.API.queueTransition(o)),void 0)}
,doTransition:function(t,i,n,s,o){var c=t,r=e(i),l=e(n),a=function(){l.animate(c.animIn||{opacity:1}
,c.speed,c.easeIn||c.easing,o)}
;l.css(c.cssBefore||{}
),r.animate(c.animOut||{}
,c.speed,c.easeOut||c.easing,function(){r.css(c.cssAfter||{}
),c.sync||a()}
),c.sync&&a()}
,queueTransition:function(t,i){var n=this.opts(),s=void 0!==i?i:t.timeout;return 0===n.nextSlide&&0===--n.loop?(n.API.log("terminating; loop=0"),n.timeout=0,s?setTimeout(function(){n.API.trigger("cycle-finished",[n])}
,s):n.API.trigger("cycle-finished",[n]),n.nextSlide=n.currSlide,void 0):(s&&(n._lastQueue=e.now(),void 0===i&&(n._remainingTimeout=t.timeout),n.paused||n.hoverPaused||(n.timeoutId=setTimeout(function(){n.API.prepareTx(!1,!n.reverse)}
,s))),void 0)}
,stopTransition:function(){var e=this.opts();e.slides.filter(":animated").length&&(e.slides.stop(!1,!0),e.API.trigger("cycle-transition-stopped",[e])),e._tx&&e._tx.stopTransition&&e._tx.stopTransition(e)}
,advanceSlide:function(e){var t=this.opts();return clearTimeout(t.timeoutId),t.timeoutId=0,t.nextSlide=t.currSlide+e,0>t.nextSlide?t.nextSlide=t.slides.length-1:t.nextSlide>=t.slides.length&&(t.nextSlide=0),t.API.prepareTx(!0,e>=0),!1}
,buildSlideOpts:function(i){var n,s,o=this.opts(),c=i.data()||{}
;for(var r in c)c.hasOwnProperty(r)&&/^cycle[A-Z]+/.test(r)&&(n=c[r],s=r.match(/^cycle(.*)/)[1].replace(/^[A-Z]/,t),o.API.log("["+(o.slideCount-1)+"]",s+":",n,"("+typeof n+")"),c[s]=n);c=e.extend({}
,e.fn.cycle.defaults,o,c),c.slideNum=o.slideCount;try{delete c.API,delete c.slideCount,delete c.currSlide,delete c.nextSlide,delete c.slides}
catch(l){}
return c}
,getSlideOpts:function(t){var i=this.opts();void 0===t&&(t=i.currSlide);var n=i.slides[t],s=e(n).data("cycle.opts");return e.extend({}
,i,s)}
,initSlide:function(t,i,n){var s=this.opts();i.css(t.slideCss||{}
),n>0&&i.css("zIndex",n),isNaN(t.speed)&&(t.speed=e.fx.speeds[t.speed]||e.fx.speeds._default),t.sync||(t.speed=t.speed/2),i.addClass(s.slideClass)}
,updateView:function(e){var t=this.opts();if(t._initialized){var i=t.API.getSlideOpts(),n=t.slides[t.currSlide];!e&&(t.API.trigger("cycle-update-view-before",[t,i,n]),0>t.updateView)||(t.slideActiveClass&&t.slides.removeClass(t.slideActiveClass).eq(t.currSlide).addClass(t.slideActiveClass),e&&t.hideNonActive&&t.slides.filter(":not(."+t.slideActiveClass+")").hide(),t.API.trigger("cycle-update-view",[t,i,n,e]),t.API.trigger("cycle-update-view-after",[t,i,n]))}
}
,getComponent:function(t){var i=this.opts(),n=i[t];return"string"==typeof n?/^\s*[\>|\+|~]/.test(n)?i.container.find(n):e(n):n.jquery?n:e(n)}
,stackSlides:function(t,i,n){var s=this.opts();t||(t=s.slides[s.currSlide],i=s.slides[s.nextSlide],n=!s.reverse),e(t).css("zIndex",s.maxZ);var o,c=s.maxZ-2,r=s.slideCount;if(n){for(o=s.currSlide+1;r>o;o++)e(s.slides[o]).css("zIndex",c--);for(o=0;s.currSlide>o;o++)e(s.slides[o]).css("zIndex",c--)}
else{for(o=s.currSlide-1;o>=0;o--)e(s.slides[o]).css("zIndex",c--);for(o=r-1;o>s.currSlide;o--)e(s.slides[o]).css("zIndex",c--)}
e(i).css("zIndex",s.maxZ-1)}
,getSlideIndex:function(e){return this.opts().slides.index(e)}
}
,e.fn.cycle.log=function(){window.console&&console.log&&console.log("[cycle2] "+Array.prototype.join.call(arguments," "))}
,e.fn.cycle.version=function(){return"Cycle2: "+i}
,e.fn.cycle.transitions={custom:{}
,none:{before:function(e,t,i,n){e.API.stackSlides(i,t,n),e.cssBefore={opacity:1,display:"block"}
}
}
,fade:{before:function(t,i,n,s){var o=t.API.getSlideOpts(t.nextSlide).slideCss||{}
;t.API.stackSlides(i,n,s),t.cssBefore=e.extend(o,{opacity:0,display:"block"}
),t.animIn={opacity:1}
,t.animOut={opacity:0}
}
}
,fadeout:{before:function(t,i,n,s){var o=t.API.getSlideOpts(t.nextSlide).slideCss||{}
;t.API.stackSlides(i,n,s),t.cssBefore=e.extend(o,{opacity:1,display:"block"}
),t.animOut={opacity:0}
}
}
,scrollHorz:{before:function(e,t,i,n){e.API.stackSlides(t,i,n);var s=e.container.css("overflow","hidden").width();e.cssBefore={left:n?s:-s,top:0,opacity:1,display:"block"}
,e.cssAfter={zIndex:e._maxZ-2,left:0}
,e.animIn={left:0}
,e.animOut={left:n?-s:s}
}
}
}
,e.fn.cycle.defaults={allowWrap:!0,autoSelector:".cycle-slideshow[data-cycle-auto-init!=false]",delay:0,easing:null,fx:"fade",hideNonActive:!0,loop:0,manualFx:void 0,manualSpeed:void 0,manualTrump:!0,maxZ:100,pauseOnHover:!1,reverse:!1,slideActiveClass:"cycle-slide-active",slideClass:"cycle-slide",slideCss:{position:"absolute",top:0,left:0}
,slides:"> img",speed:500,startingSlide:0,sync:!0,timeout:4e3,updateView:-1}
,e(document).ready(function(){e(e.fn.cycle.defaults.autoSelector).cycle()}
)}
)(jQuery),function(e){"use strict";function t(t,n){var s,o,c,r=n.autoHeight;if("container"==r)o=e(n.slides[n.currSlide]).outerHeight(),n.container.height(o);else if(n._autoHeightRatio)n.container.height(n.container.width()/n._autoHeightRatio);else if("calc"===r||"number"==e.type(r)&&r>=0){if(c="calc"===r?i(t,n):r>=n.slides.length?0:r,c==n._sentinelIndex)return;n._sentinelIndex=c,n._sentinel&&n._sentinel.remove(),s=e(n.slides[c].cloneNode(!0)),s.removeAttr("id name rel").find("[id],[name],[rel]").removeAttr("id name rel"),s.css({position:"static",visibility:"hidden",display:"block"}
).prependTo(n.container).addClass("cycle-sentinel cycle-slide").removeClass("cycle-slide-active"),s.find("*").css("visibility","hidden"),n._sentinel=s}
}
function i(t,i){var n=0,s=-1;return i.slides.each(function(t){var i=e(this).height();i>s&&(s=i,n=t)}
),n}
function n(t,i,n,s){var o=e(s).outerHeight(),c=i.sync?i.speed/2:i.speed;i.container.animate({height:o}
,c)}
function s(i,o){o._autoHeightOnResize&&(e(window).off("resize orientationchange",o._autoHeightOnResize),o._autoHeightOnResize=null),o.container.off("cycle-slide-added cycle-slide-removed",t),o.container.off("cycle-destroyed",s),o.container.off("cycle-before",n),o._sentinel&&(o._sentinel.remove(),o._sentinel=null)}
e.extend(e.fn.cycle.defaults,{autoHeight:0}
),e(document).on("cycle-initialized",function(i,o){function c(){t(i,o)}
var r,l=o.autoHeight,a=e.type(l),d=null;("string"===a||"number"===a)&&(o.container.on("cycle-slide-added cycle-slide-removed",t),o.container.on("cycle-destroyed",s),"container"==l?o.container.on("cycle-before",n):"string"===a&&/\d+\:\d+/.test(l)&&(r=l.match(/(\d+)\:(\d+)/),r=r[1]/r[2],o._autoHeightRatio=r),"number"!==a&&(o._autoHeightOnResize=function(){clearTimeout(d),d=setTimeout(c,50)}
,e(window).on("resize orientationchange",o._autoHeightOnResize)),setTimeout(c,30))}
)}
(jQuery),function(e){"use strict";e.extend(e.fn.cycle.defaults,{caption:"> .cycle-caption",captionTemplate:"{{slideNum}
}
 / {{slideCount}
}
",overlay:"> .cycle-overlay",overlayTemplate:"<div>{{title}
}
</div><div>{{desc}
}
</div>",captionModule:"caption"}
),e(document).on("cycle-update-view",function(t,i,n,s){"caption"===i.captionModule&&e.each(["caption","overlay"],function(){var e=this,t=n[e+"Template"],o=i.API.getComponent(e);o.length&&t?(o.html(i.API.tmpl(t,n,i,s)),o.show()):o.hide()}
)}
),e(document).on("cycle-destroyed",function(t,i){var n;e.each(["caption","overlay"],function(){var e=this,t=i[e+"Template"];i[e]&&t&&(n=i.API.getComponent("caption"),n.empty())}
)}
)}
(jQuery),function(e){"use strict";var t=e.fn.cycle;e.fn.cycle=function(i){var n,s,o,c=e.makeArray(arguments);return"number"==e.type(i)?this.cycle("goto",i):"string"==e.type(i)?this.each(function(){var r;return n=i,o=e(this).data("cycle.opts"),void 0===o?(t.log('slideshow must be initialized before sending commands; "'+n+'" ignored'),void 0):(n="goto"==n?"jump":n,s=o.API[n],e.isFunction(s)?(r=e.makeArray(c),r.shift(),s.apply(o.API,r)):(t.log("unknown command: ",n),void 0))}
):t.apply(this,arguments)}
,e.extend(e.fn.cycle,t),e.extend(t.API,{next:function(){var e=this.opts();if(!e.busy||e.manualTrump){var t=e.reverse?-1:1;e.allowWrap===!1&&e.currSlide+t>=e.slideCount||(e.API.advanceSlide(t),e.API.trigger("cycle-next",[e]).log("cycle-next"))}
}
,prev:function(){var e=this.opts();if(!e.busy||e.manualTrump){var t=e.reverse?1:-1;e.allowWrap===!1&&0>e.currSlide+t||(e.API.advanceSlide(t),e.API.trigger("cycle-prev",[e]).log("cycle-prev"))}
}
,destroy:function(){var e=this.opts();clearTimeout(e.timeoutId),e.timeoutId=0,e.API.stop(),e.API.trigger("cycle-destroyed",[e]).log("cycle-destroyed"),e.container.removeData("cycle.opts"),e.retainStylesOnDestroy||(e.container.removeAttr("style"),e.slides.removeAttr("style"),e.slides.removeClass("cycle-slide-active"))}
,jump:function(e){var t,i=this.opts();if(!i.busy||i.manualTrump){var n=parseInt(e,10);if(isNaN(n)||0>n||n>=i.slides.length)return i.API.log("goto: invalid slide index: "+n),void 0;if(n==i.currSlide)return i.API.log("goto: skipping, already on slide",n),void 0;i.nextSlide=n,clearTimeout(i.timeoutId),i.timeoutId=0,i.API.log("goto: ",n," (zero-index)"),t=i.currSlide<i.nextSlide,i.API.prepareTx(!0,t)}
}
,stop:function(){var t=this.opts(),i=t.container;clearTimeout(t.timeoutId),t.timeoutId=0,t.API.stopTransition(),t.pauseOnHover&&(t.pauseOnHover!==!0&&(i=e(t.pauseOnHover)),i.off("mouseenter mouseleave")),t.API.trigger("cycle-stopped",[t]).log("cycle-stopped")}
,reinit:function(){var e=this.opts();e.API.destroy(),e.container.cycle()}
,remove:function(t){for(var i,n,s=this.opts(),o=[],c=1,r=0;s.slides.length>r;r++)i=s.slides[r],r==t?n=i:(o.push(i),e(i).data("cycle.opts").slideNum=c,c++);n&&(s.slides=e(o),s.slideCount--,e(n).remove(),t==s.currSlide&&s.API.advanceSlide(1),s.API.trigger("cycle-slide-removed",[s,t,n]).log("cycle-slide-removed"),s.API.updateView())}
}
),e(document).on("click.cycle","[data-cycle-cmd]",function(t){t.preventDefault();var i=e(this),n=i.data("cycle-cmd"),s=i.data("cycle-context")||".cycle-slideshow";e(s).cycle(n,i.data("cycle-arg"))}
)}
(jQuery),function(e){"use strict";function t(t,i){var n;return t._hashFence?(t._hashFence=!1,void 0):(n=window.location.hash.substring(1),t.slides.each(function(s){return e(this).data("cycle-hash")==n?(i===!0?t.startingSlide=s:(t.nextSlide=s,t.API.prepareTx(!0,!1)),!1):void 0}
),void 0)}
e(document).on("cycle-pre-initialize",function(i,n){t(n,!0),n._onHashChange=function(){t(n,!1)}
,e(window).on("hashchange",n._onHashChange)}
),e(document).on("cycle-update-view",function(e,t,i){i.hash&&(t._hashFence=!0,window.location.hash=i.hash)}
),e(document).on("cycle-destroyed",function(t,i){i._onHashChange&&e(window).off("hashchange",i._onHashChange)}
)}
(jQuery),function(e){"use strict";e.extend(e.fn.cycle.defaults,{loader:!1}
),e(document).on("cycle-bootstrap",function(t,i){function n(t,n){function o(t){var o;"wait"==i.loader?(r.push(t),0===a&&(r.sort(c),s.apply(i.API,[r,n]),i.container.removeClass("cycle-loading"))):(o=e(i.slides[i.currSlide]),s.apply(i.API,[t,n]),o.show(),i.container.removeClass("cycle-loading"))}
function c(e,t){return e.data("index")-t.data("index")}
var r=[];if("string"==e.type(t))t=e.trim(t);else if("array"===e.type(t))for(var l=0;t.length>l;l++)t[l]=e(t[l])[0];t=e(t);var a=t.length;a&&(t.hide().appendTo("body").each(function(t){function c(){0===--l&&(--a,o(d))}
var l=0,d=e(this),u=d.is("img")?d:d.find("img");return d.data("index",t),u=u.filter(":not(.cycle-loader-ignore)").filter(':not([src=""])'),u.length?(l=u.length,u.each(function(){this.complete?c():e(this).load(function(){c()}
).error(function(){0===--l&&(i.API.log("slide skipped; img not loaded:",this.src),0===--a&&"wait"==i.loader&&s.apply(i.API,[r,n]))}
)}
),void 0):(--a,r.push(d),void 0)}
),a&&i.container.addClass("cycle-loading"))}
var s;i.loader&&(s=i.API.add,i.API.add=n)}
)}
(jQuery),function(e){"use strict";function t(t,i,n){var s,o=t.API.getComponent("pager");o.each(function(){var o=e(this);if(i.pagerTemplate){var c=t.API.tmpl(i.pagerTemplate,i,t,n[0]);s=e(c).appendTo(o)}
else s=o.children().eq(t.slideCount-1);s.on(t.pagerEvent,function(e){e.preventDefault(),t.API.page(o,e.currentTarget)}
)}
)}
function i(e,t){var i=this.opts();if(!i.busy||i.manualTrump){var n=e.children().index(t),s=n,o=s>i.currSlide;i.currSlide!=s&&(i.nextSlide=s,i.API.prepareTx(!0,o),i.API.trigger("cycle-pager-activated",[i,e,t]))}
}
e.extend(e.fn.cycle.defaults,{pager:"> .cycle-pager",pagerActiveClass:"cycle-pager-active",pagerEvent:"click.cycle",pagerTemplate:"<span>&bull;</span>"}
),e(document).on("cycle-bootstrap",function(e,i,n){n.buildPagerLink=t}
),e(document).on("cycle-slide-added",function(e,t,n,s){t.pager&&(t.API.buildPagerLink(t,n,s),t.API.page=i)}
),e(document).on("cycle-slide-removed",function(t,i,n){if(i.pager){var s=i.API.getComponent("pager");s.each(function(){var t=e(this);e(t.children()[n]).remove()}
)}
}
),e(document).on("cycle-update-view",function(t,i){var n;i.pager&&(n=i.API.getComponent("pager"),n.each(function(){e(this).children().removeClass(i.pagerActiveClass).eq(i.currSlide).addClass(i.pagerActiveClass)}
))}
),e(document).on("cycle-destroyed",function(e,t){var i;t.pager&&t.pagerTemplate&&(i=t.API.getComponent("pager"),i.empty())}
)}
(jQuery),function(e){"use strict";e.extend(e.fn.cycle.defaults,{next:"> .cycle-next",nextEvent:"click.cycle",disabledClass:"disabled",prev:"> .cycle-prev",prevEvent:"click.cycle",swipe:!1}
),e(document).on("cycle-initialized",function(e,t){if(t.API.getComponent("next").on(t.nextEvent,function(e){e.preventDefault(),t.API.next()}
),t.API.getComponent("prev").on(t.prevEvent,function(e){e.preventDefault(),t.API.prev()}
),t.swipe){var i=t.swipeVert?"swipeUp.cycle":"swipeLeft.cycle swipeleft.cycle",n=t.swipeVert?"swipeDown.cycle":"swipeRight.cycle swiperight.cycle";t.container.on(i,function(){t.API.next()}
),t.container.on(n,function(){t.API.prev()}
)}
}
),e(document).on("cycle-update-view",function(e,t){if(!t.allowWrap){var i=t.disabledClass,n=t.API.getComponent("next"),s=t.API.getComponent("prev"),o=t._prevBoundry||0,c=t._nextBoundry||t.slideCount-1;t.currSlide==c?n.addClass(i).prop("disabled",!0):n.removeClass(i).prop("disabled",!1),t.currSlide===o?s.addClass(i).prop("disabled",!0):s.removeClass(i).prop("disabled",!1)}
}
),e(document).on("cycle-destroyed",function(e,t){t.API.getComponent("prev").off(t.nextEvent),t.API.getComponent("next").off(t.prevEvent),t.container.off("swipeleft.cycle swiperight.cycle swipeLeft.cycle swipeRight.cycle swipeUp.cycle swipeDown.cycle")}
)}
(jQuery),function(e){"use strict";e.extend(e.fn.cycle.defaults,{progressive:!1}
),e(document).on("cycle-pre-initialize",function(t,i){if(i.progressive){var n,s,o=i.API,c=o.next,r=o.prev,l=o.prepareTx,a=e.type(i.progressive);if("array"==a)n=i.progressive;else if(e.isFunction(i.progressive))n=i.progressive(i);else if("string"==a){if(s=e(i.progressive),n=e.trim(s.html()),!n)return;if(/^(\[)/.test(n))try{n=e.parseJSON(n)}
catch(d){return o.log("error parsing progressive slides",d),void 0}
else n=n.split(RegExp(s.data("cycle-split")||"\n")),n[n.length-1]||n.pop()}
l&&(o.prepareTx=function(e,t){var s,o;return e||0===n.length?(l.apply(i.API,[e,t]),void 0):(t&&i.currSlide==i.slideCount-1?(o=n[0],n=n.slice(1),i.container.one("cycle-slide-added",function(e,t){setTimeout(function(){t.API.advanceSlide(1)}
,50)}
),i.API.add(o)):t||0!==i.currSlide?l.apply(i.API,[e,t]):(s=n.length-1,o=n[s],n=n.slice(0,s),i.container.one("cycle-slide-added",function(e,t){setTimeout(function(){t.currSlide=1,t.API.advanceSlide(-1)}
,50)}
),i.API.add(o,!0)),void 0)}
),c&&(o.next=function(){var e=this.opts();if(n.length&&e.currSlide==e.slideCount-1){var t=n[0];n=n.slice(1),e.container.one("cycle-slide-added",function(e,t){c.apply(t.API),t.container.removeClass("cycle-loading")}
),e.container.addClass("cycle-loading"),e.API.add(t)}
else c.apply(e.API)}
),r&&(o.prev=function(){var e=this.opts();if(n.length&&0===e.currSlide){var t=n.length-1,i=n[t];n=n.slice(0,t),e.container.one("cycle-slide-added",function(e,t){t.currSlide=1,t.API.advanceSlide(-1),t.container.removeClass("cycle-loading")}
),e.container.addClass("cycle-loading"),e.API.add(i,!0)}
else r.apply(e.API)}
)}
}
)}
(jQuery),function(e){"use strict";e.extend(e.fn.cycle.defaults,{tmplRegex:"{{((.)?.*?)}
}
"}
),e.extend(e.fn.cycle.API,{tmpl:function(t,i){var n=RegExp(i.tmplRegex||e.fn.cycle.defaults.tmplRegex,"g"),s=e.makeArray(arguments);return s.shift(),t.replace(n,function(t,i){var n,o,c,r,l=i.split(".");for(n=0;s.length>n;n++)if(c=s[n]){if(l.length>1)for(r=c,o=0;l.length>o;o++)c=r,r=r[l[o]]||i;else r=c[i];if(e.isFunction(r))return r.apply(c,s);if(void 0!==r&&null!==r&&r!=i)return r}
return i}
)}
}
)}
(jQuery);
 /* http://malsup.github.io/min/jquery.cycle2.carousel.min.js Plugin for Cycle2; Copyright (c) 2012 M. Alsup; v20130528 */ 
 (function(e){"use strict";e(document).on("cycle-bootstrap",function(e,i,t){"carousel"===i.fx&&(t.getSlideIndex=function(e){var i=this.opts()._carouselWrap.children(),t=i.index(e);return t%i.length}
,t.next=function(){var e=i.reverse?-1:1;i.allowWrap===!1&&i.currSlide+e>i.slideCount-i.carouselVisible||(i.API.advanceSlide(e),i.API.trigger("cycle-next",[i]).log("cycle-next"))}
)}
),e.fn.cycle.transitions.carousel={preInit:function(i){i.hideNonActive=!1,i.container.on("cycle-destroyed",e.proxy(this.onDestroy,i.API)),i.API.stopTransition=this.stopTransition;for(var t=0;i.startingSlide>t;t++)i.container.append(i.slides[0])}
,postInit:function(i){var t,n,s,o,l=i.carouselVertical;i.carouselVisible&&i.carouselVisible>i.slideCount&&(i.carouselVisible=i.slideCount-1);var r=i.carouselVisible||i.slides.length,c={display:l?"block":"inline-block",position:"static"}
;if(i.container.css({position:"relative",overflow:"hidden"}
),i.slides.css(c),i._currSlide=i.currSlide,o=e('<div class="cycle-carousel-wrap"></div>').prependTo(i.container).css({margin:0,padding:0,top:0,left:0,position:"absolute"}
).append(i.slides),i._carouselWrap=o,l||o.css("white-space","nowrap"),i.allowWrap!==!1){for(n=0;(void 0===i.carouselVisible?2:1)>n;n++){for(t=0;i.slideCount>t;t++)o.append(i.slides[t].cloneNode(!0));for(t=i.slideCount;t--;)o.prepend(i.slides[t].cloneNode(!0))}
o.find(".cycle-slide-active").removeClass("cycle-slide-active"),i.slides.eq(i.startingSlide).addClass("cycle-slide-active")}
i.pager&&i.allowWrap===!1&&(s=i.slideCount-r,e(i.pager).children().filter(":gt("+s+")").hide()),i._nextBoundry=i.slideCount-i.carouselVisible,this.prepareDimensions(i)}
,prepareDimensions:function(i){var t,n,s,o=i.carouselVertical,l=i.carouselVisible||i.slides.length;if(i.carouselFluid&&i.carouselVisible?i._carouselResizeThrottle||this.fluidSlides(i):i.carouselVisible&&i.carouselSlideDimension?(t=l*i.carouselSlideDimension,i.container[o?"height":"width"](t)):i.carouselVisible&&(t=l*e(i.slides[0])[o?"outerHeight":"outerWidth"](!0),i.container[o?"height":"width"](t)),n=i.carouselOffset||0,i.allowWrap!==!1)if(i.carouselSlideDimension)n-=(i.slideCount+i.currSlide)*i.carouselSlideDimension;else{s=i._carouselWrap.children();for(var r=0;i.slideCount+i.currSlide>r;r++)n-=e(s[r])[o?"outerHeight":"outerWidth"](!0)}
i._carouselWrap.css(o?"top":"left",n)}
,fluidSlides:function(i){function t(){clearTimeout(s),s=setTimeout(n,20)}
function n(){i._carouselWrap.stop(!1,!0);var e=i.container.width()/i.carouselVisible;e=Math.ceil(e-l),i._carouselWrap.children().width(e),i._sentinel&&i._sentinel.width(e),r(i)}
var s,o=i.slides.eq(0),l=o.outerWidth()-o.width(),r=this.prepareDimensions;e(window).on("resize",t),i._carouselResizeThrottle=t,n()}
,transition:function(i,t,n,s,o){var l,r={}
,c=i.nextSlide-i.currSlide,a=i.carouselVertical,d=i.speed;if(i.allowWrap===!1){s=c>0;var u=i._currSlide,p=i.slideCount-i.carouselVisible;c>0&&i.nextSlide>p&&u==p?c=0:c>0&&i.nextSlide>p?c=i.nextSlide-u-(i.nextSlide-p):0>c&&i.currSlide>p&&i.nextSlide>p?c=0:0>c&&i.currSlide>p?c+=i.currSlide-p:u=i.currSlide,l=this.getScroll(i,a,u,c),i.API.opts()._currSlide=i.nextSlide>p?p:i.nextSlide}
else s&&0===i.nextSlide?(l=this.getDim(i,i.currSlide,a),o=this.genCallback(i,s,a,o)):s||i.nextSlide!=i.slideCount-1?l=this.getScroll(i,a,i.currSlide,c):(l=this.getDim(i,i.currSlide,a),o=this.genCallback(i,s,a,o));r[a?"top":"left"]=s?"-="+l:"+="+l,i.throttleSpeed&&(d=l/e(i.slides[0])[a?"height":"width"]()*i.speed),i._carouselWrap.animate(r,d,i.easing,o)}
,getDim:function(i,t,n){var s=e(i.slides[t]);return s[n?"outerHeight":"outerWidth"](!0)}
,getScroll:function(e,i,t,n){var s,o=0;if(n>0)for(s=t;t+n>s;s++)o+=this.getDim(e,s,i);else for(s=t;s>t+n;s--)o+=this.getDim(e,s,i);return o}
,genCallback:function(i,t,n,s){return function(){var t=e(i.slides[i.nextSlide]).position(),o=0-t[n?"top":"left"]+(i.carouselOffset||0);i._carouselWrap.css(i.carouselVertical?"top":"left",o),s()}
}
,stopTransition:function(){var e=this.opts();e.slides.stop(!1,!0),e._carouselWrap.stop(!1,!0)}
,onDestroy:function(){var i=this.opts();i._carouselResizeThrottle&&e(window).off("resize",i._carouselResizeThrottle),i.slides.prependTo(i.container),i._carouselWrap.remove()}
}
}
)(jQuery); /* http://malsup.github.io/min/jquery.cycle2.tile.min.js ! Plugin for Cycle2; Copyright (c) 2012 M. Alsup; ver: 20121120 */ (function(a){"use strict",a.fn.cycle.transitions.tileSlide=a.fn.cycle.transitions.tileBlind={before:function(b,c,d,e){b.API.stackSlides(c,d,e),a(c).show(),b.container.css("overflow","hidden"),b.tileDelay=b.tileDelay||b.fx=="tileSlide"?100:125,b.tileCount=b.tileCount||7,b.tileVertical=b.tileVertical!==!1,b.container.data("cycleTileInitialized")||(b.container.on("cycle-destroyed",a.proxy(this.onDestroy,b.API)),b.container.data("cycleTileInitialized",!0))}
,transition:function(b,c,d,e,f){function w(a){g.eq(a).animate(s,{duration:b.speed,easing:b.easing,complete:function(){(e?o-1===a:0===a)&&b._tileAniCallback()}
}
),setTimeout(function(){(e?o-1!==a:0!==a)&&w(e?a+1:a-1)}
,b.tileDelay)}
b.slides.not(c).not(d).hide();var g=a(),h=a(c),i=a(d),j,k,l,m,n,o=b.tileCount,p=b.tileVertical,q=b.container.height(),r=b.container.width();p?(k=Math.floor(r/o),m=r-k*(o-1),l=n=q):(k=m=r,l=Math.floor(q/o),n=q-l*(o-1)),b.container.find(".cycle-tiles-container").remove();var s,t={left:0,top:0,overflow:"hidden",position:"absolute",margin:0,padding:0}
;p?s=b.fx=="tileSlide"?{top:q}
:{width:0}
:s=b.fx=="tileSlide"?{left:r}
:{height:0}
;var u=a('<div class="cycle-tiles-container"></div>');u.css({zIndex:h.css("z-index"),overflow:"visible",position:"absolute",top:0}
),u.insertBefore(d);for(var v=0;v<o;v++)j=a("<div></div>").css(t).css({width:o-1===v?m:k,height:o-1===v?n:l,marginLeft:p?v*k:0,marginTop:p?0:v*l}
).append(h.clone().css({position:"relative",maxWidth:"none",width:h.width(),margin:0,padding:0,marginLeft:p?-(v*k):0,marginTop:p?0:-(v*l)}
)),g=g.add(j);u.append(g),h.hide(),i.show().css("opacity",1),w(e?0:o-1),b._tileAniCallback=function(){i.show(),h.hide(),u.remove(),f()}
}
,stopTransition:function(a){a.container.find("*").stop(!0,!0),a._tileAniCallback&&a._tileAniCallback()}
,onDestroy:function(a){var b=this.opts();b.container.find(".cycle-tiles-container").remove()}
}
}
)(jQuery); /* http://malsup.github.io/min/jquery.cycle2.ie-fade.min.js ! Plugin for Cycle2; Copyright (c) 2012 M. Alsup; ver: 20121120 */ (function(a){function b(a,b,c){if(a&&c.style.filter){b._filter=c.style.filter;try{c.style.removeAttribute("filter")}
catch(d){}
}
else!a&&b._filter&&(c.style.filter=b._filter)}
"use strict",a.extend(a.fn.cycle.transitions,{fade:{before:function(c,d,e,f){var g=c.API.getSlideOpts(c.nextSlide).slideCss||{}
;c.API.stackSlides(d,e,f),c.cssBefore=a.extend(g,{opacity:0,display:"block"}
),c.animIn={opacity:1}
,c.animOut={opacity:0}
,b(!0,c,e)}
,after:function(a,c,d){b(!1,a,d)}
}
,fadeout:{before:function(c,d,e,f){var g=c.API.getSlideOpts(c.nextSlide).slideCss||{}
;c.API.stackSlides(d,e,f),c.cssBefore=a.extend(g,{opacity:1,display:"block"}
),c.animOut={opacity:0}
,b(!0,c,e)}
,after:function(a,c,d){b(!1,a,d)}
}
}
)}
)(jQuery); /* http://malsup.github.io/min/jquery.cycle2.swipe.min.js ! Plugin for Cycle2; Copyright (c) 2012 M. Alsup; ver: 20121120 */ (function(a){"use strict";var b="ontouchend"in document;a.event.special.swipe=a.event.special.swipe||{scrollSupressionThreshold:10,durationThreshold:1e3,horizontalDistanceThreshold:30,verticalDistanceThreshold:75,setup:function(){var b=a(this);b.bind("touchstart",function(c){function g(b){if(!f)return;var c=b.originalEvent.touches?b.originalEvent.touches[0]:b;e={time:(new Date).getTime(),coords:[c.pageX,c.pageY]}
,Math.abs(f.coords[0]-e.coords[0])>a.event.special.swipe.scrollSupressionThreshold&&b.preventDefault()}
var d=c.originalEvent.touches?c.originalEvent.touches[0]:c,e,f={time:(new Date).getTime(),coords:[d.pageX,d.pageY],origin:a(c.target)}
;b.bind("touchmove",g).one("touchend",function(c){b.unbind("touchmove",g),f&&e&&e.time-f.time<a.event.special.swipe.durationThreshold&&Math.abs(f.coords[0]-e.coords[0])>a.event.special.swipe.horizontalDistanceThreshold&&Math.abs(f.coords[1]-e.coords[1])<a.event.special.swipe.verticalDistanceThreshold&&f.origin.trigger("swipe").trigger(f.coords[0]>e.coords[0]?"swipeleft":"swiperight"),f=e=undefined}
)}
)}
}
,a.event.special.swipeleft=a.event.special.swipeleft||{setup:function(){a(this).bind("swipe",a.noop)}
}
,a.event.special.swiperight=a.event.special.swiperight||a.event.special.swipeleft}
)(jQuery); /*! jQuery Validation Plugin - v1.10.0 - 9/7/2012*/ (function(a){a.extend(a.fn,{validate:function(b){if(!this.length){b&&b.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing");return}
var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.validateDelegate(":submit","click",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(b.target).hasClass("cancel")&&(c.cancelSubmit=!0)}
),this.submit(function(b){function d(){var d;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(c.submitButton.value).appendTo(c.currentForm)),c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),!1):!0}
return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)}
)),c)}
,valid:function(){if(a(this[0]).is("form"))return this.validate().form();var b=!0,c=a(this[0].form).validate();return this.each(function(){b&=c.element(this)}
),b}
,removeAttrs:function(b){var c={}
,d=this;return a.each(b.split(/\s/),function(a,b){c[b]=d.attr(b),d.removeAttr(b)}
),c}
,rules:function(b,c){var d=this[0];if(b){var e=a.data(d.form,"validator").settings,f=e.rules,g=a.validator.staticRules(d);switch(b){case"add":a.extend(g,a.validator.normalizeRule(c)),f[d.name]=g,c.messages&&(e.messages[d.name]=a.extend(e.messages[d.name],c.messages));break;case"remove":if(!c)return delete f[d.name],g;var h={}
;return a.each(c.split(/\s/),function(a,b){h[b]=g[b],delete g[b]}
),h}
}
var i=a.validator.normalizeRules(a.extend({}
,a.validator.metadataRules(d),a.validator.classRules(d),a.validator.attributeRules(d),a.validator.staticRules(d)),d);if(i.required){var j=i.required;delete i.required,i=a.extend({required:j}
,i)}
return i}
}
),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+b.value)}
,filled:function(b){return!!a.trim(""+b.value)}
,unchecked:function(a){return!a.checked}
}
),a.validator=function(b,c){this.settings=a.extend(!0,{}
,a.validator.defaults,b),this.currentForm=c,this.init()}
,a.validator.format=function(b,c){return arguments.length===1?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}
:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}
","g"),c)}
),b)}
,a.extend(a.validator,{defaults:{messages:{}
,groups:{}
,rules:{}
,errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a,b){this.lastActive=a,this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.addWrapper(this.errorsFor(a)).hide())}
,onfocusout:function(a,b){!this.checkable(a)&&(a.name in this.submitted||!this.optional(a))&&this.element(a)}
,onkeyup:function(a,b){if(b.which===9&&this.elementValue(a)==="")return;(a.name in this.submitted||a===this.lastActive)&&this.element(a)}
,onclick:function(a,b){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)}
,highlight:function(b,c,d){b.type==="radio"?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)}
,unhighlight:function(b,c,d){b.type==="radio"?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}
}
,setDefaults:function(b){a.extend(a.validator.defaults,b)}
,messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0}
 characters."),minlength:a.validator.format("Please enter at least {0}
 characters."),rangelength:a.validator.format("Please enter a value between {0}
 and {1}
 characters long."),range:a.validator.format("Please enter a value between {0}
 and {1}
."),max:a.validator.format("Please enter a value less than or equal to {0}
."),min:a.validator.format("Please enter a value greater than or equal to {0}
.")}
,autoCreateRanges:!1,prototype:{init:function(){function d(b){var c=a.data(this[0].form,"validator"),d="on"+b.type.replace(/^validate/,"");c.settings[d]&&c.settings[d].call(c,this[0],b)}
this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={}
,this.valueCache={}
,this.pendingRequest=0,this.pending={}
,this.invalid={}
,this.reset();var b=this.groups={}
;a.each(this.settings.groups,function(c,d){a.each(d.split(/\s/),function(a,d){b[d]=c}
)}
);var c=this.settings.rules;a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}
),a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",d).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",d),this.settings.invalidHandler&&a(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)}
,form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({}
,this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()}
,checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()}
,element:function(b){b=this.validationTargetFor(this.clean(b)),this.lastElement=b,this.prepareElement(b),this.currentElements=a(b);var c=this.check(b)!==!1;return c?delete this.invalid[b.name]:this.invalid[b.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),c}
,showErrors:function(b){if(b){a.extend(this.errorMap,b),this.errorList=[];for(var c in b)this.errorList.push({message:b[c],element:this.findByName(c)[0]}
);this.successList=a.grep(this.successList,function(a){return!(a.name in b)}
)}
this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()}
,resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.submitted={}
,this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue")}
,numberOfInvalids:function(){return this.objectLength(this.invalid)}
,objectLength:function(a){var b=0;for(var c in a)b++;return b}
,hideErrors:function(){this.addWrapper(this.toHide).hide()}
,valid:function(){return this.size()===0}
,size:function(){return this.errorList.length}
,focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}
catch(b){}
}
,findLastActive:function(){var b=this.lastActive;return b&&a.grep(this.errorList,function(a){return a.element.name===b.name}
).length===1&&b}
,elements:function(){var b=this,c={}
;return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){return!this.name&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in c||!b.objectLength(a(this).rules())?!1:(c[this.name]=!0,!0)}
)}
,clean:function(b){return a(b)[0]}
,errors:function(){var b=this.settings.errorClass.replace(" ",".");return a(this.settings.errorElement+"."+b,this.errorContext)}
,reset:function(){this.successList=[],this.errorList=[],this.errorMap={}
,this.toShow=a([]),this.toHide=a([]),this.currentElements=a([])}
,prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)}
,prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)}
,elementValue:function(b){var c=a(b).attr("type"),d=a(b).val();return c==="radio"||c==="checkbox"?a('input[name="'+a(b).attr("name")+'"]:checked').val():typeof d=="string"?d.replace(/\r/g,""):d}
,check:function(b){b=this.validationTargetFor(this.clean(b));var c=a(b).rules(),d=!1,e=this.elementValue(b),f;for(var g in c){var h={method:g,parameters:c[g]}
;try{f=a.validator.methods[g].call(this,e,b,h.parameters);if(f==="dependency-mismatch"){d=!0;continue}
d=!1;if(f==="pending"){this.toHide=this.toHide.not(this.errorsFor(b));return}
if(!f)return this.formatAndAdd(b,h),!1}
catch(i){throw this.settings.debug&&window.console&&console.log("exception occured when checking element "+b.id+", check the '"+h.method+"' method",i),i}
}
if(d)return;return this.objectLength(c)&&this.successList.push(b),!0}
,customMetaMessage:function(b,c){if(!a.metadata)return;var d=this.settings.meta?a(b).metadata()[this.settings.meta]:a(b).metadata();return d&&d.messages&&d.messages[c]}
,customDataMessage:function(b,c){return a(b).data("msg-"+c.toLowerCase())||b.attributes&&a(b).attr("data-msg-"+c.toLowerCase())}
,customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])}
,findDefined:function(){for(var a=0;a<arguments.length;a++)if(arguments[a]!==undefined)return arguments[a];return undefined}
,defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customDataMessage(b,c),this.customMetaMessage(b,c),!this.settings.ignoreTitle&&b.title||undefined,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")}
,formatAndAdd:function(b,c){var d=this.defaultMessage(b,c.method),e=/\$?\{(\d+)\}
/g;typeof d=="function"?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}
"),c.parameters)),this.errorList.push({message:d,element:b}
),this.errorMap[b.name]=d,this.submitted[b.name]=d}
,addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a}
,defaultShowErrors:function(){var a,b;for(a=0;this.errorList[a];a++){var c=this.errorList[a];this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message)}
this.errorList.length&&(this.toShow=this.toShow.add(this.containers));if(this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()}
,validElements:function(){return this.currentElements.not(this.invalidElements())}
,invalidElements:function(){return a(this.errorList).map(function(){return this.element}
)}
,showLabel:function(b,c){var d=this.errorsFor(b);d.length?(d.removeClass(this.settings.validClass).addClass(this.settings.errorClass),d.attr("generated")&&d.html(c)):(d=a("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(b),generated:!0}
).addClass(this.settings.errorClass).html(c||""),this.settings.wrapper&&(d=d.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.append(d).length||(this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b))),!c&&this.settings.success&&(d.text(""),typeof this.settings.success=="string"?d.addClass(this.settings.success):this.settings.success(d,b)),this.toShow=this.toShow.add(d)}
,errorsFor:function(b){var c=this.idOrName(b);return this.errors().filter(function(){return a(this).attr("for")===c}
)}
,idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)}
,validationTargetFor:function(a){return this.checkable(a)&&(a=this.findByName(a.name).not(this.settings.ignore)[0]),a}
,checkable:function(a){return/radio|checkbox/i.test(a.type)}
,findByName:function(b){return a(this.currentForm).find('[name="'+b+'"]')}
,getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}
return b.length}
,depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0}
,dependTypes:{"boolean":function(a,b){return a}
,string:function(b,c){return!!a(b,c.form).length}
,"function":function(a,b){return a(b)}
}
,optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"}
,startRequest:function(a){this.pending[a.name]||(this.pendingRequest++,this.pending[a.name]=!0)}
,stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],c&&this.pendingRequest===0&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&this.pendingRequest===0&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)}
,previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,"remote")}
)}
}
,classRuleSettings:{required:{required:!0}
,email:{email:!0}
,url:{url:!0}
,date:{date:!0}
,dateISO:{dateISO:!0}
,number:{number:!0}
,digits:{digits:!0}
,creditcard:{creditcard:!0}
}
,addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)}
,classRules:function(b){var c={}
,d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}
),c}
,attributeRules:function(b){var c={}
,d=a(b);for(var e in a.validator.methods){var f;e==="required"?(f=d.get(0).getAttribute(e),f===""&&(f=!0),f=!!f):f=d.attr(e),f?c[e]=f:d[0].getAttribute("type")===e&&(c[e]=!0)}
return c.maxlength&&/-1|2147483647|524288/.test(c.maxlength)&&delete c.maxlength,c}
,metadataRules:function(b){if(!a.metadata)return{}
;var c=a.data(b.form,"validator").settings.meta;return c?a(b).metadata()[c]:a(b).metadata()}
,staticRules:function(b){var c={}
,d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}
),c}
,normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1){delete b[d];return}
if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}
f?b[d]=e.param!==undefined?e.param:!0:delete b[d]}
}
),a.each(b,function(d,e){b[d]=a.isFunction(e)?e(c):e}
),a.each(["minlength","maxlength","min","max"],function(){b[this]&&(b[this]=Number(b[this]))}
),a.each(["rangelength","range"],function(){b[this]&&(b[this]=[Number(b[this][0]),Number(b[this][1])])}
),a.validator.autoCreateRanges&&(b.min&&b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),b.minlength&&b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b.messages&&delete b.messages,b}
,normalizeRule:function(b){if(typeof b=="string"){var c={}
;a.each(b.split(/\s/),function(){c[this]=!0}
),b=c}
return b}
,addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=d!==undefined?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))}
,methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if(c.nodeName.toLowerCase()==="select"){var e=a(c).val();return e&&e.length>0}
return this.checkable(c)?this.getLength(b,c)>0:a.trim(b).length>0}
,remote:function(b,c,d){if(this.optional(c))return"dependency-mismatch";var e=this.previousValue(c);this.settings.messages[c.name]||(this.settings.messages[c.name]={}
),e.originalMessage=this.settings.messages[c.name].remote,this.settings.messages[c.name].remote=e.message,d=typeof d=="string"&&{url:d}
||d;if(this.pending[c.name])return"pending";if(e.old===b)return e.valid;e.old=b;var f=this;this.startRequest(c);var g={}
;return g[c.name]=b,a.ajax(a.extend(!0,{url:d,mode:"abort",port:"validate"+c.name,dataType:"json",data:g,success:function(d){f.settings.messages[c.name].remote=e.originalMessage;var g=d===!0||d==="true";if(g){var h=f.formSubmitted;f.prepareElement(c),f.formSubmitted=h,f.successList.push(c),delete f.invalid[c.name],f.showErrors()}
else{var i={}
,j=d||f.defaultMessage(c,"remote");i[c.name]=e.message=a.isFunction(j)?j(b):j,f.invalid[c.name]=!0,f.showErrors(i)}
e.valid=g,f.stopRequest(c,g)}
}
,d)),"pending"}
,minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(a.trim(b),c);return this.optional(c)||e>=d}
,maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(a.trim(b),c);return this.optional(c)||e<=d}
,rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(a.trim(b),c);return this.optional(c)||e>=d[0]&&e<=d[1]}
,min:function(a,b,c){return this.optional(b)||a>=c}
,max:function(a,b,c){return this.optional(b)||a<=c}
,range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]}
,email:function(a,b){return this.optional(b)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}
~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}
~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(a)}
,url:function(a,b){return this.optional(b)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2}
)|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2}
)|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2}
)|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2}
)|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2}
)|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)}
,date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a))}
,dateISO:function(a,b){return this.optional(b)||/^\d{4}
[\/\-]\d{1,2}
[\/\-]\d{1,2}
$/.test(a)}
,number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}
(?:,\d{3}
)+)?(?:\.\d+)?$/.test(a)}
,digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)}
,creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 \-]+/.test(a))return!1;var c=0,d=0,e=!1;a=a.replace(/\D/g,"");for(var f=a.length-1;f>=0;f--){var g=a.charAt(f);d=parseInt(g,10),e&&(d*=2)>9&&(d-=9),c+=d,e=!e}
return c%10===0}
,equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){a(c).valid()}
),b===e.val()}
}
}
),a.format=a.validator.format}
)(jQuery),function(a){var b={}
;if(a.ajaxPrefilter)a.ajaxPrefilter(function(a,c,d){var e=a.port;a.mode==="abort"&&(b[e]&&b[e].abort(),b[e]=d)}
);else{var c=a.ajax;a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return e==="abort"?(b[f]&&b[f].abort(),b[f]=c.apply(this,arguments)):c.apply(this,arguments)}
}
}
(jQuery),function(a){!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener&&a.each({focus:"focusin",blur:"focusout"}
,function(b,c){function d(b){return b=a.event.fix(b),b.type=c,a.event.handle.call(this,b)}
a.event.special[c]={setup:function(){this.addEventListener(b,d,!0)}
,teardown:function(){this.removeEventListener(b,d,!0)}
,handler:function(b){var d=arguments;return d[0]=a.event.fix(b),d[0].type=c,a.event.handle.apply(this,d)}
}
}
),a.extend(a.fn,{validateDelegate:function(b,c,d){return this.bind(c,function(c){var e=a(c.target);if(e.is(b))return d.apply(e,arguments)}
)}
}
)}
(jQuery); 
/*! Lazy Load 1.9.3 - MIT license - Copyright 2010-2013 Mika Tuupola */
 !function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}
else c.trigger("appear"),b=0}
)}
var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"}
;return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}
),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}
a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded}
);if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}
}
).attr("src",c.attr("data-"+j.data_attribute))}
}
),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")}
)}
),e.bind("resize",function(){g()}
),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")}
)}
),a(c).ready(function(){g()}
),this}
,a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold}
,a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold}
,a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()}
,a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()}
,a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))}
,a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0}
)}
,"above-the-top":function(b){return!a.belowthefold(b,{threshold:0}
)}
,"right-of-screen":function(b){return a.rightoffold(b,{threshold:0}
)}
,"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0}
)}
,"in-viewport":function(b){return a.inviewport(b,{threshold:0}
)}
,"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0}
)}
,"right-of-fold":function(b){return a.rightoffold(b,{threshold:0}
)}
,"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0}
)}
}
)}
(jQuery,window,document); $("div.lazy").lazyload({effect : "fadeIn"}
); $(function() {$("img.lazy").lazyload(); }
); // Get Bg Positions $('[data-position]').each(function(){if($(this).attr('data-pos')!='1'){var pos=$(this).attr('data-position');pos = pos.split(' ');$(this).css('background-position','-'+pos[0]+'px -'+pos[1]+'px');$(this).attr('data-pos','1');}
}
); // Lazzy Load Initilization lazzyload();$(window).scroll(function(){lazzyload();}
); //Lazzy Load Function function lazzyload(){var txt='',offset,winscr,$this,count=0;$('img[data-src]').each(function(){count++;$this=$(this);winscr=$(window).scrollTop()+$(window).height();offset=$(this).offset().top;if(winscr>=offset){if(!$this.hasClass('imgadded')){var isrc=$this.attr('data-src');$this.attr('src',isrc);$this.addClass('imgadded');$this.load(function(){$(this).hide().fadeIn(300,'',function(){$(this).removeAttr('style');}
);}
);}
}
}
);$('[data-img]').each(function(){count++;$this=$(this);winscr=$(window).scrollTop()+$(window).height();offset=$(this).offset().top;if(winscr>=offset){if(!$this.hasClass('bgadded')){var isrc=$this.attr('data-img');$this.css('background-image',isrc);$this.addClass('bgadded');}
}
}
);}
 /* ------------------------------------------------------------------------ Class: prettyPhoto Use: Lightbox clone for jQuery Author: Stephane Caron (http://www.no-margin-for-errors.com) Version: 3.1.5 ------------------------------------------------------------------------- */ (function(e){function t(){var e=location.href;hashtag=e.indexOf("#prettyPhoto")!==-1?decodeURI(e.substring(e.indexOf("#prettyPhoto")+1,e.length)):false;return hashtag}
function n(){if(typeof theRel=="undefined")return;location.hash=theRel+"/"+rel_index+"/"}
function r(){if(location.href.indexOf("#prettyPhoto")!==-1)location.hash="prettyPhoto"}
function i(e,t){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var n="[\\?&]"+e+"=([^&#]*)";var r=new RegExp(n);var i=r.exec(t);return i==null?"":i[1]}
e.prettyPhoto={version:"3.1.5"}
;e.fn.prettyPhoto=function(s){function g(){e(".pp_loaderIcon").hide();projectedTop=scroll_pos["scrollTop"]+(d/2-a["containerHeight"]/2);if(projectedTop<0)projectedTop=0;$ppt.fadeTo(settings.animation_speed,1);$pp_pic_holder.find(".pp_content").animate({height:a["contentHeight"],width:a["contentWidth"]}
,settings.animation_speed);$pp_pic_holder.animate({top:projectedTop,left:v/2-a["containerWidth"]/2<0?0:v/2-a["containerWidth"]/2,width:a["containerWidth"]}
,settings.animation_speed,function(){$pp_pic_holder.find(".pp_hoverContainer,#fullResImage").height(a["height"]).width(a["width"]);$pp_pic_holder.find(".pp_fade").fadeIn(settings.animation_speed);if(isSet&&S(pp_images[set_position])=="image"){$pp_pic_holder.find(".pp_hoverContainer").show()}
else{$pp_pic_holder.find(".pp_hoverContainer").hide()}
if(settings.allow_expand){if(a["resized"]){e("a.pp_expand,a.pp_contract").show()}
else{e("a.pp_expand").hide()}
}
if(settings.autoplay_slideshow&&!m&&!f)e.prettyPhoto.startSlideshow();settings.changepicturecallback();f=true}
);C();s.ajaxcallback()}
function y(t){$pp_pic_holder.find("#pp_full_res object,#pp_full_res embed").css("visibility","hidden");$pp_pic_holder.find(".pp_fade").fadeOut(settings.animation_speed,function(){e(".pp_loaderIcon").show();t()}
)}
function b(t){t>1?e(".pp_nav").show():e(".pp_nav").hide()}
function w(e,t){resized=false;E(e,t);imageWidth=e,imageHeight=t;if((p>v||h>d)&&doresize&&settings.allow_resize&&!u){resized=true,fitting=false;while(!fitting){if(p>v){imageWidth=v-200;imageHeight=t/e*imageWidth}
else if(h>d){imageHeight=d-200;imageWidth=e/t*imageHeight}
else{fitting=true}
h=imageHeight,p=imageWidth}
if(p>v||h>d){w(p,h)}
E(imageWidth,imageHeight)}
return{width:Math.floor(imageWidth),height:Math.floor(imageHeight),containerHeight:Math.floor(h),containerWidth:Math.floor(p)+settings.horizontal_padding*2,contentHeight:Math.floor(l),contentWidth:Math.floor(c),resized:resized}
}
function E(t,n){t=parseFloat(t);n=parseFloat(n);$pp_details=$pp_pic_holder.find(".pp_details");$pp_details.width(t);detailsHeight=parseFloat($pp_details.css("marginTop"))+parseFloat($pp_details.css("marginBottom"));$pp_details=$pp_details.clone().addClass(settings.theme).width(t).appendTo(e("body")).css({position:"absolute",top:-1e4}
);detailsHeight+=$pp_details.height();detailsHeight=detailsHeight<=34?36:detailsHeight;$pp_details.remove();$pp_title=$pp_pic_holder.find(".ppt");$pp_title.width(t);titleHeight=parseFloat($pp_title.css("marginTop"))+parseFloat($pp_title.css("marginBottom"));$pp_title=$pp_title.clone().appendTo(e("body")).css({position:"absolute",top:-1e4}
);titleHeight+=$pp_title.height();$pp_title.remove();l=n+detailsHeight;c=t;h=l+titleHeight+$pp_pic_holder.find(".pp_top").height()+$pp_pic_holder.find(".pp_bottom").height();p=t}
function S(e){if(e.match(/youtube\.com\/watch/i)||e.match(/youtu\.be/i)){return"youtube"}
else if(e.match(/vimeo\.com/i)){return"vimeo"}
else if(e.match(/\b.mov\b/i)){return"quicktime"}
else if(e.match(/\b.swf\b/i)){return"flash"}
else if(e.match(/\biframe=true\b/i)){return"iframe"}
else if(e.match(/\bajax=true\b/i)){return"ajax"}
else if(e.match(/\bcustom=true\b/i)){return"custom"}
else if(e.substr(0,1)=="#"){return"inline"}
else{return"image"}
}
function x(){if(doresize&&typeof $pp_pic_holder!="undefined"){scroll_pos=T();contentHeight=$pp_pic_holder.height(),contentwidth=$pp_pic_holder.width();projectedTop=d/2+scroll_pos["scrollTop"]-contentHeight/2;if(projectedTop<0)projectedTop=0;if(contentHeight>d)return;$pp_pic_holder.css({top:projectedTop,left:v/2+scroll_pos["scrollLeft"]-contentwidth/2}
)}
}
function T(){if(self.pageYOffset){return{scrollTop:self.pageYOffset,scrollLeft:self.pageXOffset}
}
else if(document.documentElement&&document.documentElement.scrollTop){return{scrollTop:document.documentElement.scrollTop,scrollLeft:document.documentElement.scrollLeft}
}
else if(document.body){return{scrollTop:document.body.scrollTop,scrollLeft:document.body.scrollLeft}
}
}
function N(){d=e(window).height(),v=e(window).width();if(typeof $pp_overlay!="undefined")$pp_overlay.height(e(document).height()).width(v)}
function C(){if(isSet&&settings.overlay_gallery&&S(pp_images[set_position])=="image"){itemWidth=52+5;navWidth=settings.theme=="facebook"||settings.theme=="pp_default"?50:30;itemsPerPage=Math.floor((a["containerWidth"]-100-navWidth)/itemWidth);itemsPerPage=itemsPerPage<pp_images.length?itemsPerPage:pp_images.length;totalPage=Math.ceil(pp_images.length/itemsPerPage)-1;if(totalPage==0){navWidth=0;$pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").hide()}
else{$pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").show()}
galleryWidth=itemsPerPage*itemWidth;fullGalleryWidth=pp_images.length*itemWidth;$pp_gallery.css("margin-left",-(galleryWidth/2+navWidth/2)).find("div:first").width(galleryWidth+5).find("ul").width(fullGalleryWidth).find("li.selected").removeClass("selected");goToPage=Math.floor(set_position/itemsPerPage)<totalPage?Math.floor(set_position/itemsPerPage):totalPage;e.prettyPhoto.changeGalleryPage(goToPage);$pp_gallery_li.filter(":eq("+set_position+")").addClass("selected")}
else{$pp_pic_holder.find(".pp_content").unbind("mouseenter mouseleave")}
}
function k(t){if(settings.social_tools)facebook_like_link=settings.social_tools.replace("{location_href}
",encodeURIComponent(location.href));settings.markup=settings.markup.replace("{pp_social}
","");e("body").append(settings.markup);$pp_pic_holder=e(".pp_pic_holder"),$ppt=e(".ppt"),$pp_overlay=e("div.pp_overlay");if(isSet&&settings.overlay_gallery){currentGalleryPage=0;toInject="";for(var n=0;n<pp_images.length;n++){if(!pp_images[n].match(/\b(jpg|jpeg|png|gif)\b/gi)){classname="default";img_src=""}
else{classname="";img_src=pp_images[n]}
toInject+="<li class='"+classname+"'><a href='#'><img src='"+img_src+"' width='50' alt='' /></a></li>"}
toInject=settings.gallery_markup.replace(/{gallery}
/g,toInject);$pp_pic_holder.find("#pp_full_res").after(toInject);$pp_gallery=e(".pp_pic_holder .pp_gallery"),$pp_gallery_li=$pp_gallery.find("li");$pp_gallery.find(".pp_arrow_next").click(function(){e.prettyPhoto.changeGalleryPage("next");e.prettyPhoto.stopSlideshow();return false}
);$pp_gallery.find(".pp_arrow_previous").click(function(){e.prettyPhoto.changeGalleryPage("previous");e.prettyPhoto.stopSlideshow();return false}
);$pp_pic_holder.find(".pp_content").hover(function(){$pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeIn()}
,function(){$pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeOut()}
);itemWidth=52+5;$pp_gallery_li.each(function(t){e(this).find("a").click(function(){e.prettyPhoto.changePage(t);e.prettyPhoto.stopSlideshow();return false}
)}
)}
if(settings.slideshow){$pp_pic_holder.find(".pp_nav").prepend('<a href="#" class="pp_play">Play</a>');$pp_pic_holder.find(".pp_nav .pp_play").click(function(){e.prettyPhoto.startSlideshow();return false}
)}
$pp_pic_holder.attr("class","pp_pic_holder "+settings.theme);$pp_overlay.css({opacity:0,height:e(document).height(),width:e(window).width()}
).bind("click",function(){if(!settings.modal)e.prettyPhoto.close()}
);e("a.pp_close").bind("click",function(){e.prettyPhoto.close();return false}
);if(settings.allow_expand){e("a.pp_expand").bind("click",function(t){if(e(this).hasClass("pp_expand")){e(this).removeClass("pp_expand").addClass("pp_contract");doresize=false}
else{e(this).removeClass("pp_contract").addClass("pp_expand");doresize=true}
y(function(){e.prettyPhoto.open()}
);return false}
)}
$pp_pic_holder.find(".pp_previous, .pp_nav .pp_arrow_previous").bind("click",function(){e.prettyPhoto.changePage("previous");e.prettyPhoto.stopSlideshow();return false}
);$pp_pic_holder.find(".pp_next, .pp_nav .pp_arrow_next").bind("click",function(){e.prettyPhoto.changePage("next");e.prettyPhoto.stopSlideshow();return false}
);x()}
s=jQuery.extend({hook:"rel",animation_speed:"fast",ajaxcallback:function(){}
,slideshow:5e3,autoplay_slideshow:false,opacity:.8,show_title:true,allow_resize:true,allow_expand:true,default_width:500,default_height:344,counter_separator_label:"/",theme:"pp_default",horizontal_padding:20,hideflash:false,wmode:"opaque",autoplay:true,modal:false,deeplinking:true,overlay_gallery:true,overlay_gallery_max:30,keyboard_shortcuts:true,changepicturecallback:function(){}
,callback:function(){}
,ie6_fallback:true,markup:'<div class="pp_pic_holder"> <div class="ppt">Ãƒâ€š </div> <div class="pp_top"> <div class="pp_left"></div> <div class="pp_middle"></div> <div class="pp_right"></div> </div> <div class="pp_content_container"> <div class="pp_left"> <div class="pp_right"> <div class="pp_content"> <div class="pp_loaderIcon"></div> <div class="pp_fade"> <a href="#" class="pp_expand" title="Expand the image">Expand</a> <div class="pp_hoverContainer"> <a class="pp_next" href="#">next</a> <a class="pp_previous" href="#">previous</a> </div> <div id="pp_full_res"></div> <div class="pp_details"> <div class="pp_nav"> <a href="#" class="pp_arrow_previous">Previous</a> <p class="currentTextHolder">0/0</p> <a href="#" class="pp_arrow_next">Next</a> </div> <p class="pp_description"></p> <div class="pp_social">{pp_social}
</div> <a class="pp_close" href="#">Close</a> </div> </div> </div> </div> </div> </div> <div class="pp_bottom"> <div class="pp_left"></div> <div class="pp_middle"></div> <div class="pp_right"></div> </div> </div> <div class="pp_overlay"></div>',gallery_markup:'<div class="pp_gallery"> <a href="#" class="pp_arrow_previous">Previous</a> <div> <ul> {gallery}
 </ul> </div> <a href="#" class="pp_arrow_next">Next</a> </div>',image_markup:'<img id="fullResImage" src="{path}
" />',flash_markup:'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}
" height="{height}
"><param name="wmode" value="{wmode}
" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}
" /><embed src="{path}
" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}
" height="{height}
" wmode="{wmode}
"></embed></object>',quicktime_markup:'<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}
" width="{width}
"><param name="src" value="{path}
"><param name="autoplay" value="{autoplay}
"><param name="type" value="video/quicktime"><embed src="{path}
" height="{height}
" width="{width}
" autoplay="{autoplay}
" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',iframe_markup:'<iframe src ="{path}
" width="{width}
" height="{height}
" frameborder="no"></iframe>',inline_markup:'<div class="pp_inline">{content}
</div>',custom_markup:"",social_tools:'<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}
&layout=button_count&show_faces=true&width=500&action=like&font&colorscheme=light&height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>'}
,s);var o=this,u=false,a,f,l,c,h,p,d=e(window).height(),v=e(window).width(),m;doresize=true,scroll_pos=T();e(window).unbind("resize.prettyphoto").bind("resize.prettyphoto",function(){x();N()}
);if(s.keyboard_shortcuts){e(document).unbind("keydown.prettyphoto").bind("keydown.prettyphoto",function(t){if(typeof $pp_pic_holder!="undefined"){if($pp_pic_holder.is(":visible")){switch(t.keyCode){case 37:e.prettyPhoto.changePage("previous");t.preventDefault();break;case 39:e.prettyPhoto.changePage("next");t.preventDefault();break;case 27:if(!settings.modal)e.prettyPhoto.close();t.preventDefault();break}
}
}
}
)}
e.prettyPhoto.initialize=function(){settings=s;if(settings.theme=="pp_default")settings.horizontal_padding=16;theRel=e(this).attr(settings.hook);galleryRegExp=/\[(?:.*)\]/;isSet=galleryRegExp.exec(theRel)?true:false;pp_images=isSet?jQuery.map(o,function(t,n){if(e(t).attr(settings.hook).indexOf(theRel)!=-1)return e(t).attr("href")}
):e.makeArray(e(this).attr("href"));pp_titles=isSet?jQuery.map(o,function(t,n){if(e(t).attr(settings.hook).indexOf(theRel)!=-1)return e(t).find("img").attr("alt")?e(t).find("img").attr("alt"):""}
):e.makeArray(e(this).find("img").attr("alt"));pp_descriptions=isSet?jQuery.map(o,function(t,n){if(e(t).attr(settings.hook).indexOf(theRel)!=-1)return e(t).attr("title")?e(t).attr("title"):""}
):e.makeArray(e(this).attr("title"));if(pp_images.length>settings.overlay_gallery_max)settings.overlay_gallery=false;set_position=jQuery.inArray(e(this).attr("href"),pp_images);rel_index=isSet?set_position:e("a["+settings.hook+"^='"+theRel+"']").index(e(this));k(this);if(settings.allow_resize)e(window).bind("scroll.prettyphoto",function(){x()}
);e.prettyPhoto.open();return false}
;e.prettyPhoto.open=function(t){if(typeof settings=="undefined"){settings=s;pp_images=e.makeArray(arguments[0]);pp_titles=arguments[1]?e.makeArray(arguments[1]):e.makeArray("");pp_descriptions=arguments[2]?e.makeArray(arguments[2]):e.makeArray("");isSet=pp_images.length>1?true:false;set_position=arguments[3]?arguments[3]:0;k(t.target)}
if(settings.hideflash)e("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility","hidden");b(e(pp_images).size());e(".pp_loaderIcon").show();if(settings.deeplinking)n();if(settings.social_tools){facebook_like_link=settings.social_tools.replace("{location_href}
",encodeURIComponent(location.href));$pp_pic_holder.find(".pp_social").html(facebook_like_link)}
if($ppt.is(":hidden"))$ppt.css("opacity",0).show();$pp_overlay.show().fadeTo(settings.animation_speed,settings.opacity);$pp_pic_holder.find(".currentTextHolder").text(set_position+1+settings.counter_separator_label+e(pp_images).size());if(typeof pp_descriptions[set_position]!="undefined"&&pp_descriptions[set_position]!=""){$pp_pic_holder.find(".pp_description").show().html(unescape(pp_descriptions[set_position]))}
else{$pp_pic_holder.find(".pp_description").hide()}
movie_width=parseFloat(i("width",pp_images[set_position]))?i("width",pp_images[set_position]):settings.default_width.toString();movie_height=parseFloat(i("height",pp_images[set_position]))?i("height",pp_images[set_position]):settings.default_height.toString();u=false;if(movie_height.indexOf("%")!=-1){movie_height=parseFloat(e(window).height()*parseFloat(movie_height)/100-150);u=true}
if(movie_width.indexOf("%")!=-1){movie_width=parseFloat(e(window).width()*parseFloat(movie_width)/100-150);u=true}
$pp_pic_holder.fadeIn(function(){settings.show_title&&pp_titles[set_position]!=""&&typeof pp_titles[set_position]!="undefined"?$ppt.html(unescape(pp_titles[set_position])):$ppt.html("Ãƒâ€š ");imgPreloader="";skipInjection=false;switch(S(pp_images[set_position])){case"image":imgPreloader=new Image;nextImage=new Image;if(isSet&&set_position<e(pp_images).size()-1)nextImage.src=pp_images[set_position+1];prevImage=new Image;if(isSet&&pp_images[set_position-1])prevImage.src=pp_images[set_position-1];$pp_pic_holder.find("#pp_full_res")[0].innerHTML=settings.image_markup.replace(/{path}
/g,pp_images[set_position]);imgPreloader.onload=function(){a=w(imgPreloader.width,imgPreloader.height);g()}
;imgPreloader.onerror=function(){alert("Image cannot be loaded. Make sure the path is correct and image exist.");e.prettyPhoto.close()}
;imgPreloader.src=pp_images[set_position];break;case"youtube":a=w(movie_width,movie_height);movie_id=i("v",pp_images[set_position]);if(movie_id==""){movie_id=pp_images[set_position].split("youtu.be/");movie_id=movie_id[1];if(movie_id.indexOf("?")>0)movie_id=movie_id.substr(0,movie_id.indexOf("?"));if(movie_id.indexOf("&")>0)movie_id=movie_id.substr(0,movie_id.indexOf("&"))}
movie="http://www.youtube.com/embed/"+movie_id;i("rel",pp_images[set_position])?movie+="?rel="+i("rel",pp_images[set_position]):movie+="?rel=1";if(settings.autoplay)movie+="&autoplay=1";toInject=settings.iframe_markup.replace(/{width}
/g,a["width"]).replace(/{height}
/g,a["height"]).replace(/{wmode}
/g,settings.wmode).replace(/{path}
/g,movie);break;case"vimeo":a=w(movie_width,movie_height);movie_id=pp_images[set_position];var t=/http(s?):\/\/(www\.)?vimeo.com\/(\d+)/;var n=movie_id.match(t);movie="http://player.vimeo.com/video/"+n[3]+"?title=0&byline=0&portrait=0";if(settings.autoplay)movie+="&autoplay=1;";vimeo_width=a["width"]+"/embed/?moog_width="+a["width"];toInject=settings.iframe_markup.replace(/{width}
/g,vimeo_width).replace(/{height}
/g,a["height"]).replace(/{path}
/g,movie);break;case"quicktime":a=w(movie_width,movie_height);a["height"]+=15;a["contentHeight"]+=15;a["containerHeight"]+=15;toInject=settings.quicktime_markup.replace(/{width}
/g,a["width"]).replace(/{height}
/g,a["height"]).replace(/{wmode}
/g,settings.wmode).replace(/{path}
/g,pp_images[set_position]).replace(/{autoplay}
/g,settings.autoplay);break;case"flash":a=w(movie_width,movie_height);flash_vars=pp_images[set_position];flash_vars=flash_vars.substring(pp_images[set_position].indexOf("flashvars")+10,pp_images[set_position].length);filename=pp_images[set_position];filename=filename.substring(0,filename.indexOf("?"));toInject=settings.flash_markup.replace(/{width}
/g,a["width"]).replace(/{height}
/g,a["height"]).replace(/{wmode}
/g,settings.wmode).replace(/{path}
/g,filename+"?"+flash_vars);break;case"iframe":a=w(movie_width,movie_height);frame_url=pp_images[set_position];frame_url=frame_url.substr(0,frame_url.indexOf("iframe")-1);toInject=settings.iframe_markup.replace(/{width}
/g,a["width"]).replace(/{height}
/g,a["height"]).replace(/{path}
/g,frame_url);break;case"ajax":doresize=false;a=w(movie_width,movie_height);doresize=true;skipInjection=true;e.get(pp_images[set_position],function(e){toInject=settings.inline_markup.replace(/{content}
/g,e);$pp_pic_holder.find("#pp_full_res")[0].innerHTML=toInject;g()}
);break;case"custom":a=w(movie_width,movie_height);toInject=settings.custom_markup;break;case"inline":myClone=e(pp_images[set_position]).clone().append('<br clear="all" />').css({width:settings.default_width}
).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo(e("body")).show();doresize=false;a=w(e(myClone).width(),e(myClone).height());doresize=true;e(myClone).remove();toInject=settings.inline_markup.replace(/{content}
/g,e(pp_images[set_position]).html());break} */


if(!imgPreloader&&!skipInjection){$pp_pic_holder.find("#pp_full_res")[0].innerHTML=toInject;g()}
}
);return false}
;e.prettyPhoto.changePage=function(t){currentGalleryPage=0;if(t=="previous"){set_position--;if(set_position<0)set_position=e(pp_images).size()-1}
else if(t=="next"){set_position++;if(set_position>e(pp_images).size()-1)set_position=0}
else{set_position=t}
rel_index=set_position;if(!doresize)doresize=true;if(settings.allow_expand){e(".pp_contract").removeClass("pp_contract").addClass("pp_expand")}
y(function(){e.prettyPhoto.open()}
)}
;e.prettyPhoto.changeGalleryPage=function(e){if(e=="next"){currentGalleryPage++;if(currentGalleryPage>totalPage)currentGalleryPage=0}
else if(e=="previous"){currentGalleryPage--;if(currentGalleryPage<0)currentGalleryPage=totalPage}
else{currentGalleryPage=e}
slide_speed=e=="next"||e=="previous"?settings.animation_speed:0;slide_to=currentGalleryPage*itemsPerPage*itemWidth;$pp_gallery.find("ul").animate({left:-slide_to}
,slide_speed)}
;e.prettyPhoto.startSlideshow=function(){if(typeof m=="undefined"){$pp_pic_holder.find(".pp_play").unbind("click").removeClass("pp_play").addClass("pp_pause").click(function(){e.prettyPhoto.stopSlideshow();return false}
);m=setInterval(e.prettyPhoto.startSlideshow,settings.slideshow)}
else{e.prettyPhoto.changePage("next")}
}
;e.prettyPhoto.stopSlideshow=function(){$pp_pic_holder.find(".pp_pause").unbind("click").removeClass("pp_pause").addClass("pp_play").click(function(){e.prettyPhoto.startSlideshow();return false}
);clearInterval(m);m=undefined}
;e.prettyPhoto.close=function(){if($pp_overlay.is(":animated"))return;e.prettyPhoto.stopSlideshow();$pp_pic_holder.stop().find("object,embed").css("visibility","hidden");e("div.pp_pic_holder,div.ppt,.pp_fade").fadeOut(settings.animation_speed,function(){e(this).remove()}
);$pp_overlay.fadeOut(settings.animation_speed,function(){if(settings.hideflash)e("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility","visible");e(this).remove();e(window).unbind("scroll.prettyphoto");r();settings.callback();doresize=true;f=false;delete settings}
)}
;if(!pp_alreadyInitialized&&t()){pp_alreadyInitialized=true;hashIndex=t();hashRel=hashIndex;hashIndex=hashIndex.substring(hashIndex.indexOf("/")+1,hashIndex.length-1);hashRel=hashRel.substring(0,hashRel.indexOf("/"));setTimeout(function(){e("a["+s.hook+"^='"+hashRel+"']:eq("+hashIndex+")").trigger("click")}
,50)}
return this.unbind("click.prettyphoto").bind("click.prettyphoto",e.prettyPhoto.initialize)}
;}
)(jQuery);var pp_alreadyInitialized=false; 
// htadia Ameen 
* International Telephone Input v11.0.0 * https://github.com/jackocnr/intl-tel-input.git * Licensed under the MIT license */ // wrap in UMD - see https://github.com/umdjs/umd/blob/master/jqueryPluginCommonjs.js (function(factory) { if (typeof define === "function" && define.amd) { define([ "jquery" ], function($) { factory($, window, document); }
); }
 else if (typeof module === "object" && module.exports) { module.exports = factory(require("jquery"), window, document); }
 else { factory(jQuery, window, document); }
 }
)(function($, window, document, undefined) { "use strict"; // these vars persist through all instances of the plugin var pluginName = "intlTelInput", id = 1, // give each instance it's own id for namespaced event handling defaults = { // whether or not to allow the dropdown allowDropdown: true, // if there is just a dial code in the input: remove it on blur, and re-add it on focus autoHideDialCode: true, // add a placeholder in the input with an example number for the selected country autoPlaceholder: "polite", // modify the auto placeholder customPlaceholder: null, // append menu to a specific element dropdownContainer: "", // don't display these countries excludeCountries: [], // format the input value during initialisation and on setNumber formatOnDisplay: true, // geoIp lookup function geoIpLookup: null, // initial country initialCountry: "", // don't insert international dial codes nationalMode: true, // display only these countries onlyCountries: [], // number type to use for placeholders placeholderNumberType: "MOBILE", // the countries at the top of the list. defaults to united states and united kingdom preferredCountries: [ "us", "gb" ], // display the country dial code next to the selected flag so it's not part of the typed number separateDialCode: false, // specify the path to the libphonenumber script to enable validation/formatting utilsScript: "" }
, keys = { UP: 38, DOWN: 40, ENTER: 13, ESC: 27, PLUS: 43, A: 65, Z: 90, SPACE: 32, TAB: 9 }
, // https://en.wikipedia.org/wiki/List_of_North_American_Numbering_Plan_area_codes#Non-geographic_area_codes regionlessNanpNumbers = [ "800", "822", "833", "844", "855", "866", "877", "880", "881", "882", "883", "884", "885", "886", "887", "888", "889" ]; // keep track of if the window.load event has fired as impossible to check after the fact $(window).on("load", function() { // UPDATE: use a public static field so we can fudge it in the tests $.fn[pluginName].windowLoaded = true; }
); function Plugin(element, options) { this.telInput = $(element); this.options = $.extend({}
, defaults, options); // event namespace this.ns = "." + pluginName + id++; // Chrome, FF, Safari, IE9+ this.isGoodBrowser = Boolean(element.setSelectionRange); this.hadInitialPlaceholder = Boolean($(element).attr("placeholder")); }
 Plugin.prototype = { _init: function() { // if in nationalMode, disable options relating to dial codes if (this.options.nationalMode) { this.options.autoHideDialCode = false; }
 // if separateDialCode then doesn't make sense to A) insert dial code into input (autoHideDialCode), and B) display national numbers (because we're displaying the country dial code next to them) if (this.options.separateDialCode) { this.options.autoHideDialCode = this.options.nationalMode = false; }
 // we cannot just test screen size as some smartphones/website meta tags will report desktop resolutions // Note: for some reason jasmine breaks if you put this in the main Plugin function with the rest of these declarations // Note: to target Android Mobiles (and not Tablets), we must find "Android" and "Mobile" this.isMobile = /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); if (this.isMobile) { // trigger the mobile dropdown css $("body").addClass("iti-mobile"); // on mobile, we want a full screen dropdown, so we must append it to the body if (!this.options.dropdownContainer) { this.options.dropdownContainer = "body"; }
 }
 // we return these deferred objects from the _init() call so they can be watched, and then we resolve them when each specific request returns // Note: again, jasmine breaks when I put these in the Plugin function this.autoCountryDeferred = new $.Deferred(); this.utilsScriptDeferred = new $.Deferred(); // process all the data: onlyCountries, excludeCountries, preferredCountries etc this._processCountryData(); // generate the markup this._generateMarkup(); // set the initial state of the input value and the selected flag this._setInitialState(); // start all of the event listeners: autoHideDialCode, input keydown, selectedFlag click this._initListeners(); // utils script, and auto country this._initRequests(); // return the deferreds return [ this.autoCountryDeferred, this.utilsScriptDeferred ]; }
, /******************** * PRIVATE METHODS ********************/ // prepare all of the country data, including onlyCountries, excludeCountries and preferredCountries options _processCountryData: function() { // process onlyCountries or excludeCountries array if present this._processAllCountries(); // process the countryCodes map this._processCountryCodes(); // process the preferredCountries this._processPreferredCountries(); }
, // add a country code to this.countryCodes _addCountryCode: function(iso2, dialCode, priority) { if (!(dialCode in this.countryCodes)) { this.countryCodes[dialCode] = []; }
 var index = priority || 0; this.countryCodes[dialCode][index] = iso2; }
, // filter the given countries using the process function _filterCountries: function(countryArray, processFunc) { var i; // standardise case for (i = 0; i < countryArray.length; i++) { countryArray[i] = countryArray[i].toLowerCase(); }
 // build instance country array this.countries = []; for (i = 0; i < allCountries.length; i++) { if (processFunc($.inArray(allCountries[i].iso2, countryArray))) { this.countries.push(allCountries[i]); }
 }
 }
, // process onlyCountries or excludeCountries array if present _processAllCountries: function() { if (this.options.onlyCountries.length) { // process onlyCountries option this._filterCountries(this.options.onlyCountries, function(arrayPos) { // if country is in array return arrayPos > -1; }
); }
 else if (this.options.excludeCountries.length) { // process excludeCountries option this._filterCountries(this.options.excludeCountries, function(arrayPos) { // if country is not in array return arrayPos == -1; }
); }
 else { this.countries = allCountries; }
 }
, // process the countryCodes map _processCountryCodes: function() { this.countryCodes = {}
; for (var i = 0; i < this.countries.length; i++) { var c = this.countries[i]; this._addCountryCode(c.iso2, c.dialCode, c.priority); // area codes if (c.areaCodes) { for (var j = 0; j < c.areaCodes.length; j++) { // full dial code is country code + dial code this._addCountryCode(c.iso2, c.dialCode + c.areaCodes[j]); }
 }
 }
 }
, // process preferred countries - iterate through the preferences, fetching the country data for each one _processPreferredCountries: function() { this.preferredCountries = []; for (var i = 0; i < this.options.preferredCountries.length; i++) { var countryCode = this.options.preferredCountries[i].toLowerCase(), countryData = this._getCountryData(countryCode, false, true); if (countryData) { this.preferredCountries.push(countryData); }
 }
 }
, // generate all of the markup for the plugin: the selected flag overlay, and the dropdown _generateMarkup: function() { // prevent autocomplete as there's no safe, cross-browser event we can react to, so it can easily put the plugin in an inconsistent state e.g. the wrong flag selected for the autocompleted number, which on submit could mean the wrong number is saved (esp in nationalMode) this.telInput.attr("autocomplete", "off"); // containers (mostly for positioning) var parentClass = "intl-tel-input"; if (this.options.allowDropdown) { parentClass += " allow-dropdown"; }
 if (this.options.separateDialCode) { parentClass += " separate-dial-code"; }
 this.telInput.wrap($("<div>", { "class": parentClass }
)); this.flagsContainer = $("<div>", { "class": "flag-container" }
).insertBefore(this.telInput); // currently selected flag (displayed to left of input) var selectedFlag = $("<div>", { "class": "selected-flag" }
); selectedFlag.appendTo(this.flagsContainer); this.selectedFlagInner = $("<div>", { "class": "iti-flag" }
).appendTo(selectedFlag); if (this.options.separateDialCode) { this.selectedDialCode = $("<div>", { "class": "selected-dial-code" }
).appendTo(selectedFlag); }
 if (this.options.allowDropdown) { // make element focusable and tab naviagable selectedFlag.attr("tabindex", "0"); // CSS triangle $("<div>", { "class": "iti-arrow" }
).appendTo(selectedFlag); // country dropdown: preferred countries, then divider, then all countries this.countryList = $("<ul>", { "class": "country-list hide" }
); if (this.preferredCountries.length) { this._appendListItems(this.preferredCountries, "preferred"); $("<li>", { "class": "divider" }
).appendTo(this.countryList); }
 this._appendListItems(this.countries, ""); // this is useful in lots of places this.countryListItems = this.countryList.children(".country"); // create dropdownContainer markup if (this.options.dropdownContainer) { this.dropdown = $("<div>", { "class": "intl-tel-input iti-container" }
).append(this.countryList); }
 else { this.countryList.appendTo(this.flagsContainer); }
 }
 else { // a little hack so we don't break anything this.countryListItems = $(); }
 }
, // add a country <li> to the countryList <ul> container _appendListItems: function(countries, className) { // we create so many DOM elements, it is faster to build a temp string // and then add everything to the DOM in one go at the end var tmp = ""; // for each country for (var i = 0; i < countries.length; i++) { var c = countries[i]; // open the list item tmp += "<li class='country " + className + "' data-dial-code='" + c.dialCode + "' data-country-code='" + c.iso2 + "'>"; // add the flag tmp += "<div class='flag-box'><div class='iti-flag " + c.iso2 + "'></div></div>"; // and the country name and dial code tmp += "<span class='country-name'>" + c.name + "</span>"; tmp += "<span class='dial-code'>+" + c.dialCode + "</span>"; // close the list item tmp += "</li>"; }
 this.countryList.append(tmp); }
, // set the initial state of the input value and the selected flag by: // 1. extracting a dial code from the given number // 2. using explicit initialCountry // 3. picking the first preferred country // 4. picking the first country _setInitialState: function() { var val = this.telInput.val(); // if we already have a dial code, and it's not a regionlessNanp we can go ahead and set the flag, else fall back to default if (this._getDialCode(val) && !this._isRegionlessNanp(val)) { this._updateFlagFromNumber(val); }
 else if (this.options.initialCountry !== "auto") { // see if we should select a flag if (this.options.initialCountry) { this._setFlag(this.options.initialCountry.toLowerCase()); }
 else { // no dial code and no initialCountry, so default to first in list this.defaultCountry = this.preferredCountries.length ? this.preferredCountries[0].iso2 : this.countries[0].iso2; if (!val) { this._setFlag(this.defaultCountry); }
 }
 // if empty and no nationalMode and no autoHideDialCode then insert the default dial code if (!val && !this.options.nationalMode && !this.options.autoHideDialCode && !this.options.separateDialCode) { this.telInput.val("+" + this.selectedCountryData.dialCode); }
 }
 // NOTE: if initialCountry is set to auto, that will be handled separately // format if (val) { // this wont be run after _updateDialCode as that's only called if no val this._updateValFromNumber(val); }
 }
, // initialise the main event listeners: input keyup, and click selected flag _initListeners: function() { this._initKeyListeners(); if (this.options.autoHideDialCode) { this._initFocusListeners(); }
 if (this.options.allowDropdown) { this._initDropdownListeners(); }
 }
, // initialise the dropdown listeners _initDropdownListeners: function() { var that = this; // hack for input nested inside label: clicking the selected-flag to open the dropdown would then automatically trigger a 2nd click on the input which would close it again var label = this.telInput.closest("label"); if (label.length) { label.on("click" + this.ns, function(e) { // if the dropdown is closed, then focus the input, else ignore the click if (that.countryList.hasClass("hide")) { that.telInput.focus(); }
 else { e.preventDefault(); }
 }
); }
 // toggle country dropdown on click var selectedFlag = this.selectedFlagInner.parent(); selectedFlag.on("click" + this.ns, function(e) { // only intercept this event if we're opening the dropdown // else let it bubble up to the top ("click-off-to-close" listener) // we cannot just stopPropagation as it may be needed to close another instance if (that.countryList.hasClass("hide") && !that.telInput.prop("disabled") && !that.telInput.prop("readonly")) { that._showDropdown(); }
 }
); // open dropdown list if currently focused this.flagsContainer.on("keydown" + that.ns, function(e) { var isDropdownHidden = that.countryList.hasClass("hide"); if (isDropdownHidden && (e.which == keys.UP || e.which == keys.DOWN || e.which == keys.SPACE || e.which == keys.ENTER)) { // prevent form from being submitted if "ENTER" was pressed e.preventDefault(); // prevent event from being handled again by document e.stopPropagation(); that._showDropdown(); }
 // allow navigation from dropdown to input on TAB if (e.which == keys.TAB) { that._closeDropdown(); }
 }
); }
, // init many requests: utils script / geo ip lookup _initRequests: function() { var that = this; // if the user has specified the path to the utils script, fetch it on window.load, else resolve if (this.options.utilsScript) { // if the plugin is being initialised after the window.load event has already been fired if ($.fn[pluginName].windowLoaded) { $.fn[pluginName].loadUtils(this.options.utilsScript, this.utilsScriptDeferred); }
 else { // wait until the load event so we don't block any other requests e.g. the flags image $(window).on("load", function() { $.fn[pluginName].loadUtils(that.options.utilsScript, that.utilsScriptDeferred); }
); }
 }
 else { this.utilsScriptDeferred.resolve(); }
 if (this.options.initialCountry === "auto") { this._loadAutoCountry(); }
 else { this.autoCountryDeferred.resolve(); }
 }
, // perform the geo ip lookup _loadAutoCountry: function() { var that = this; // 3 options: // 1) already loaded (we're done) // 2) not already started loading (start) // 3) already started loading (do nothing - just wait for loading callback to fire) if ($.fn[pluginName].autoCountry) { this.handleAutoCountry(); }
 else if (!$.fn[pluginName].startedLoadingAutoCountry) { // don't do this twice! $.fn[pluginName].startedLoadingAutoCountry = true; if (typeof this.options.geoIpLookup === "function") { this.options.geoIpLookup(function(countryCode) { $.fn[pluginName].autoCountry = countryCode.toLowerCase(); // tell all instances the auto country is ready // TODO: this should just be the current instances // UPDATE: use setTimeout in case their geoIpLookup function calls this callback straight away (e.g. if they have already done the geo ip lookup somewhere else). Using setTimeout means that the current thread of execution will finish before executing this, which allows the plugin to finish initialising. setTimeout(function() { $(".intl-tel-input input").intlTelInput("handleAutoCountry"); }
); }
); }
 }
 }
, // initialize any key listeners _initKeyListeners: function() { var that = this; // update flag on keyup // (keep this listener separate otherwise the setTimeout breaks all the tests) this.telInput.on("keyup" + this.ns, function() { if (that._updateFlagFromNumber(that.telInput.val())) { that._triggerCountryChange(); }
 }
); // update flag on cut/paste events (now supported in all major browsers) this.telInput.on("cut" + this.ns + " paste" + this.ns, function() { // hack because "paste" event is fired before input is updated setTimeout(function() { if (that._updateFlagFromNumber(that.telInput.val())) { that._triggerCountryChange(); }
 }
); }
); }
, // adhere to the input's maxlength attr _cap: function(number) { var max = this.telInput.attr("maxlength"); return max && number.length > max ? number.substr(0, max) : number; }
, // listen for mousedown, focus and blur _initFocusListeners: function() { var that = this; // mousedown decides where the cursor goes, so if we're focusing we must preventDefault as we'll be inserting the dial code, and we want the cursor to be at the end no matter where they click this.telInput.on("mousedown" + this.ns, function(e) { if (!that.telInput.is(":focus") && !that.telInput.val()) { e.preventDefault(); // but this also cancels the focus, so we must trigger that manually that.telInput.focus(); }
 }
); // on focus: if empty, insert the dial code for the currently selected flag this.telInput.on("focus" + this.ns, function(e) { if (!that.telInput.val() && !that.telInput.prop("readonly") && that.selectedCountryData.dialCode) { // insert the dial code that.telInput.val("+" + that.selectedCountryData.dialCode); // after auto-inserting a dial code, if the first key they hit is '+' then assume they are entering a new number, so remove the dial code. use keypress instead of keydown because keydown gets triggered for the shift key (required to hit the + key), and instead of keyup because that shows the new '+' before removing the old one that.telInput.one("keypress.plus" + that.ns, function(e) { if (e.which == keys.PLUS) { that.telInput.val(""); }
 }
); // after tabbing in, make sure the cursor is at the end we must use setTimeout to get outside of the focus handler as it seems the selection happens after that setTimeout(function() { var input = that.telInput[0]; if (that.isGoodBrowser) { var len = that.telInput.val().length; input.setSelectionRange(len, len); }
 }
); }
 }
); // on blur or form submit: if just a dial code then remove it var form = this.telInput.prop("form"); if (form) { $(form).on("submit" + this.ns, function() { that._removeEmptyDialCode(); }
); }
 this.telInput.on("blur" + this.ns, function() { that._removeEmptyDialCode(); }
); }
, _removeEmptyDialCode: function() { var value = this.telInput.val(), startsPlus = value.charAt(0) == "+"; if (startsPlus) { var numeric = this._getNumeric(value); // if just a plus, or if just a dial code if (!numeric || this.selectedCountryData.dialCode == numeric) { this.telInput.val(""); }
 }
 // remove the keypress listener we added on focus this.telInput.off("keypress.plus" + this.ns); }
, // extract the numeric digits from the given string _getNumeric: function(s) { return s.replace(/\D/g, ""); }
, // show the dropdown _showDropdown: function() { this._setDropdownPosition(); // update highlighting and scroll to active list item var activeListItem = this.countryList.children(".active"); if (activeListItem.length) { this._highlightListItem(activeListItem); this._scrollTo(activeListItem); }
 // bind all the dropdown-related listeners: mouseover, click, click-off, keydown this._bindDropdownListeners(); // update the arrow this.selectedFlagInner.children(".iti-arrow").addClass("up"); }
, // decide where to position dropdown (depends on position within viewport, and scroll) _setDropdownPosition: function() { var that = this; if (this.options.dropdownContainer) { this.dropdown.appendTo(this.options.dropdownContainer); }
 // show the menu and grab the dropdown height this.dropdownHeight = this.countryList.removeClass("hide").outerHeight(); if (!this.isMobile) { var pos = this.telInput.offset(), inputTop = pos.top, windowTop = $(window).scrollTop(), // dropdownFitsBelow = (dropdownBottom < windowBottom) dropdownFitsBelow = inputTop + this.telInput.outerHeight() + this.dropdownHeight < windowTop + $(window).height(), dropdownFitsAbove = inputTop - this.dropdownHeight > windowTop; // by default, the dropdown will be below the input. If we want to position it above the input, we add the dropup class. this.countryList.toggleClass("dropup", !dropdownFitsBelow && dropdownFitsAbove); // if dropdownContainer is enabled, calculate postion if (this.options.dropdownContainer) { // by default the dropdown will be directly over the input because it's not in the flow. If we want to position it below, we need to add some extra top value. var extraTop = !dropdownFitsBelow && dropdownFitsAbove ? 0 : this.telInput.innerHeight(); // calculate placement this.dropdown.css({ top: inputTop + extraTop, left: pos.left }
); // close menu on window scroll $(window).on("scroll" + this.ns, function() { that._closeDropdown(); }
); }
 }
 }
, // we only bind dropdown listeners when the dropdown is open _bindDropdownListeners: function() { var that = this; // when mouse over a list item, just highlight that one // we add the class "highlight", so if they hit "enter" we know which one to select this.countryList.on("mouseover" + this.ns, ".country", function(e) { that._highlightListItem($(this)); }
); // listen for country selection this.countryList.on("click" + this.ns, ".country", function(e) { that._selectListItem($(this)); }
); // click off to close // (except when this initial opening click is bubbling up) // we cannot just stopPropagation as it may be needed to close another instance var isOpening = true; $("html").on("click" + this.ns, function(e) { if (!isOpening) { that._closeDropdown(); }
 isOpening = false; }
); // listen for up/down scrolling, enter to select, or letters to jump to country name. // use keydown as keypress doesn't fire for non-char keys and we want to catch if they // just hit down and hold it to scroll down (no keyup event). // listen on the document because that's where key events are triggered if no input has focus var query = "", queryTimer = null; $(document).on("keydown" + this.ns, function(e) { // prevent down key from scrolling the whole page, // and enter key from submitting a form etc e.preventDefault(); if (e.which == keys.UP || e.which == keys.DOWN) { // up and down to navigate that._handleUpDownKey(e.which); }
 else if (e.which == keys.ENTER) { // enter to select that._handleEnterKey(); }
 else if (e.which == keys.ESC) { // esc to close that._closeDropdown(); }
 else if (e.which >= keys.A && e.which <= keys.Z || e.which == keys.SPACE) { // upper case letters (note: keyup/keydown only return upper case letters) // jump to countries that start with the query string if (queryTimer) { clearTimeout(queryTimer); }
 query += String.fromCharCode(e.which); that._searchForCountry(query); // if the timer hits 1 second, reset the query queryTimer = setTimeout(function() { query = ""; }
, 1e3); }
 }
); }
, // highlight the next/prev item in the list (and ensure it is visible) _handleUpDownKey: function(key) { var current = this.countryList.children(".highlight").first(); var next = key == keys.UP ? current.prev() : current.next(); if (next.length) { // skip the divider if (next.hasClass("divider")) { next = key == keys.UP ? next.prev() : next.next(); }
 this._highlightListItem(next); this._scrollTo(next); }
 }
, // select the currently highlighted item _handleEnterKey: function() { var currentCountry = this.countryList.children(".highlight").first(); if (currentCountry.length) { this._selectListItem(currentCountry); }
 }
, // find the first list item whose name starts with the query string _searchForCountry: function(query) { for (var i = 0; i < this.countries.length; i++) { if (this._startsWith(this.countries[i].name, query)) { var listItem = this.countryList.children("[data-country-code=" + this.countries[i].iso2 + "]").not(".preferred"); // update highlighting and scroll this._highlightListItem(listItem); this._scrollTo(listItem, true); break; }
 }
 }
, // check if (uppercase) string a starts with string b _startsWith: function(a, b) { return a.substr(0, b.length).toUpperCase() == b; }
, // update the input's value to the given val (format first if possible) // NOTE: this is called from _setInitialState, handleUtils and setNumber _updateValFromNumber: function(number) { if (this.options.formatOnDisplay && window.intlTelInputUtils && this.selectedCountryData) { var format = !this.options.separateDialCode && (this.options.nationalMode || number.charAt(0) != "+") ? intlTelInputUtils.numberFormat.NATIONAL : intlTelInputUtils.numberFormat.INTERNATIONAL; number = intlTelInputUtils.formatNumber(number, this.selectedCountryData.iso2, format); }
 number = this._beforeSetNumber(number); this.telInput.val(number); }
, // check if need to select a new flag based on the given number // Note: called from _setInitialState, keyup handler, setNumber _updateFlagFromNumber: function(number) { // if we're in nationalMode and we already have US/Canada selected, make sure the number starts with a +1 so _getDialCode will be able to extract the area code // update: if we dont yet have selectedCountryData, but we're here (trying to update the flag from the number), that means we're initialising the plugin with a number that already has a dial code, so fine to ignore this bit if (number && this.options.nationalMode && this.selectedCountryData && this.selectedCountryData.dialCode == "1" && number.charAt(0) != "+") { if (number.charAt(0) != "1") { number = "1" + number; }
 number = "+" + number; }
 // try and extract valid dial code from input var dialCode = this._getDialCode(number), countryCode = null, numeric = this._getNumeric(number); if (dialCode) { // check if one of the matching countries is already selected var countryCodes = this.countryCodes[this._getNumeric(dialCode)], alreadySelected = this.selectedCountryData && $.inArray(this.selectedCountryData.iso2, countryCodes) > -1, // check if the given number contains a NANP area code i.e. the only dialCode that could be extracted was +1 (instead of say +1204) and the actual number's length is >=4 isNanpAreaCode = dialCode == "+1" && numeric.length >= 4, nanpSelected = this.selectedCountryData && this.selectedCountryData.dialCode == "1"; // only update the flag if: // A) NOT (we currently have a NANP flag selected, and the number is a regionlessNanp) // AND // B) either a matching country is not already selected OR the number contains a NANP area code (ensure the flag is set to the first matching country) if (!(nanpSelected && this._isRegionlessNanp(numeric)) && (!alreadySelected || isNanpAreaCode)) { // if using onlyCountries option, countryCodes[0] may be empty, so we must find the first non-empty index for (var j = 0; j < countryCodes.length; j++) { if (countryCodes[j]) { countryCode = countryCodes[j]; break; }
 }
 }
 }
 else if (number.charAt(0) == "+" && numeric.length) { // invalid dial code, so empty // Note: use getNumeric here because the number has not been formatted yet, so could contain bad chars countryCode = ""; }
 else if (!number || number == "+") { // empty, or just a plus, so default countryCode = this.defaultCountry; }
 if (countryCode !== null) { return this._setFlag(countryCode); }
 return false; }
, // check if the given number is a regionless NANP number (expects the number to contain an international dial code) _isRegionlessNanp: function(number) { var numeric = this._getNumeric(number); if (numeric.charAt(0) == "1") { var areaCode = numeric.substr(1, 3); return $.inArray(areaCode, regionlessNanpNumbers) > -1; }
 return false; }
, // remove highlighting from other list items and highlight the given item _highlightListItem: function(listItem) { this.countryListItems.removeClass("highlight"); listItem.addClass("highlight"); }
, // find the country data for the given country code // the ignoreOnlyCountriesOption is only used during init() while parsing the onlyCountries array _getCountryData: function(countryCode, ignoreOnlyCountriesOption, allowFail) { var countryList = ignoreOnlyCountriesOption ? allCountries : this.countries; for (var i = 0; i < countryList.length; i++) { if (countryList[i].iso2 == countryCode) { return countryList[i]; }
 }
 if (allowFail) { return null; }
 else { throw new Error("No country data for '" + countryCode + "'"); }
 }
, // select the given flag, update the placeholder and the active list item // Note: called from _setInitialState, _updateFlagFromNumber, _selectListItem, setCountry _setFlag: function(countryCode) { var prevCountry = this.selectedCountryData && this.selectedCountryData.iso2 ? this.selectedCountryData : {}
; // do this first as it will throw an error and stop if countryCode is invalid this.selectedCountryData = countryCode ? this._getCountryData(countryCode, false, false) : {}
; // update the defaultCountry - we only need the iso2 from now on, so just store that if (this.selectedCountryData.iso2) { this.defaultCountry = this.selectedCountryData.iso2; }
 this.selectedFlagInner.attr("class", "iti-flag " + countryCode); // update the selected country's title attribute var title = countryCode ? this.selectedCountryData.name + ": +" + this.selectedCountryData.dialCode : "Unknown"; var oldString = title.toUpperCase().split(':')[0]; $('input[name="ctry"]').val(oldString); var oldString21 = title.split(':')[1]; $('input[name="pc"]').val(oldString21); this.selectedFlagInner.parent().attr("title", title); if (this.options.separateDialCode) { var dialCode = this.selectedCountryData.dialCode ? "+" + this.selectedCountryData.dialCode : "", parent = this.telInput.parent(); if (prevCountry.dialCode) { parent.removeClass("iti-sdc-" + (prevCountry.dialCode.length + 1)); }
 if (dialCode) { parent.addClass("iti-sdc-" + dialCode.length); }
 this.selectedDialCode.text(dialCode); }
 // and the input's placeholder this._updatePlaceholder(); // update the active list item this.countryListItems.removeClass("active"); if (countryCode) { this.countryListItems.find(".iti-flag." + countryCode).first().closest(".country").addClass("active"); }
 // return if the flag has changed or not return prevCountry.iso2 !== countryCode; }
, // update the input placeholder to an example number from the currently selected country _updatePlaceholder: function() { var shouldSetPlaceholder = this.options.autoPlaceholder === "aggressive" || !this.hadInitialPlaceholder && (this.options.autoPlaceholder === true || this.options.autoPlaceholder === "polite"); if (window.intlTelInputUtils && shouldSetPlaceholder && this.selectedCountryData) { var numberType = intlTelInputUtils.numberType[this.options.placeholderNumberType], placeholder = this.selectedCountryData.iso2 ? intlTelInputUtils.getExampleNumber(this.selectedCountryData.iso2, this.options.nationalMode, numberType) : ""; placeholder = this._beforeSetNumber(placeholder); if (typeof this.options.customPlaceholder === "function") { placeholder = this.options.customPlaceholder(placeholder, this.selectedCountryData); }
 this.telInput.attr("placeholder", placeholder); }
 }
, // called when the user selects a list item from the dropdown _selectListItem: function(listItem) { // update selected flag and active list item var flagChanged = this._setFlag(listItem.attr("data-country-code")); this._closeDropdown(); this._updateDialCode(listItem.attr("data-dial-code"), true); // focus the input this.telInput.focus(); // put cursor at end - this fix is required for FF and IE11 (with nationalMode=false i.e. auto inserting dial code), who try to put the cursor at the beginning the first time if (this.isGoodBrowser) { var len = this.telInput.val().length; this.telInput[0].setSelectionRange(len, len); }
 if (flagChanged) { this._triggerCountryChange(); }
 }
, // close the dropdown and unbind any listeners _closeDropdown: function() { this.countryList.addClass("hide"); // update the arrow this.selectedFlagInner.children(".iti-arrow").removeClass("up"); // unbind key events $(document).off(this.ns); // unbind click-off-to-close $("html").off(this.ns); // unbind hover and click listeners this.countryList.off(this.ns); // remove menu from container if (this.options.dropdownContainer) { if (!this.isMobile) { $(window).off("scroll" + this.ns); }
 this.dropdown.detach(); }
 }
, // check if an element is visible within it's container, else scroll until it is _scrollTo: function(element, middle) { var container = this.countryList, containerHeight = container.height(), containerTop = container.offset().top, containerBottom = containerTop + containerHeight, elementHeight = element.outerHeight(), elementTop = element.offset().top, elementBottom = elementTop + elementHeight, newScrollTop = elementTop - containerTop + container.scrollTop(), middleOffset = containerHeight / 2 - elementHeight / 2; if (elementTop < containerTop) { // scroll up if (middle) { newScrollTop -= middleOffset; }
 container.scrollTop(newScrollTop); }
 else if (elementBottom > containerBottom) { // scroll down if (middle) { newScrollTop += middleOffset; }
 var heightDifference = containerHeight - elementHeight; container.scrollTop(newScrollTop - heightDifference); }
 }
, // replace any existing dial code with the new one // Note: called from _selectListItem and setCountry _updateDialCode: function(newDialCode, hasSelectedListItem) { var inputVal = this.telInput.val(), newNumber; // save having to pass this every time newDialCode = "+" + newDialCode; if (inputVal.charAt(0) == "+") { // there's a plus so we're dealing with a replacement (doesn't matter if nationalMode or not) var prevDialCode = this._getDialCode(inputVal); if (prevDialCode) { // current number contains a valid dial code, so replace it newNumber = inputVal.replace(prevDialCode, newDialCode); }
 else { // current number contains an invalid dial code, so ditch it // (no way to determine where the invalid dial code ends and the rest of the number begins) newNumber = newDialCode; }
 }
 else if (this.options.nationalMode || this.options.separateDialCode) { // don't do anything return; }
 else { // nationalMode is disabled if (inputVal) { // there is an existing value with no dial code: prefix the new dial code newNumber = newDialCode + inputVal; }
 else if (hasSelectedListItem || !this.options.autoHideDialCode) { // no existing value and either they've just selected a list item, or autoHideDialCode is disabled: insert new dial code newNumber = newDialCode; }
 else { return; }
 }
 this.telInput.val(newNumber); }
, // try and extract a valid international dial code from a full telephone number // Note: returns the raw string inc plus character and any whitespace/dots etc _getDialCode: function(number) { var dialCode = ""; // only interested in international numbers (starting with a plus) if (number.charAt(0) == "+") { var numericChars = ""; // iterate over chars for (var i = 0; i < number.length; i++) { var c = number.charAt(i); // if char is number if ($.isNumeric(c)) { numericChars += c; // if current numericChars make a valid dial code if (this.countryCodes[numericChars]) { // store the actual raw string (useful for matching later) dialCode = number.substr(0, i + 1); }
 // longest dial code is 4 chars if (numericChars.length == 4) { break; }
 }
 }
 }
 return dialCode; }
, // get the input val, adding the dial code if separateDialCode is enabled _getFullNumber: function() { var val = $.trim(this.telInput.val()), dialCode = this.selectedCountryData.dialCode, prefix, numericVal = this._getNumeric(val), // normalized means ensure starts with a 1, so we can match against the full dial code normalizedVal = numericVal.charAt(0) == "1" ? numericVal : "1" + numericVal; if (this.options.separateDialCode) { prefix = "+" + dialCode; }
 else if (val.charAt(0) != "+" && val.charAt(0) != "1" && dialCode && dialCode.charAt(0) == "1" && dialCode.length == 4 && dialCode != normalizedVal.substr(0, 4)) { // if the user has entered a national NANP number, then ensure it includes the full dial code / area code prefix = dialCode.substr(1); }
 else { prefix = ""; }
 return prefix + val; }
, // remove the dial code if separateDialCode is enabled _beforeSetNumber: function(number) { if (this.options.separateDialCode) { var dialCode = this._getDialCode(number); if (dialCode) { // US dialCode is "+1", which is what we want // CA dialCode is "+1 123", which is wrong - should be "+1" (as it has multiple area codes) // AS dialCode is "+1 684", which is what we want // Solution: if the country has area codes, then revert to just the dial code if (this.selectedCountryData.areaCodes !== null) { dialCode = "+" + this.selectedCountryData.dialCode; }
 // a lot of numbers will have a space separating the dial code and the main number, and some NANP numbers will have a hyphen e.g. +1 684-733-1234 - in both cases we want to get rid of it // NOTE: don't just trim all non-numerics as may want to preserve an open parenthesis etc var start = number[dialCode.length] === " " || number[dialCode.length] === "-" ? dialCode.length + 1 : dialCode.length; number = number.substr(start); }
 }
 return this._cap(number); }
, // trigger the 'countrychange' event _triggerCountryChange: function() { this.telInput.trigger("countrychange", this.selectedCountryData); }
, /************************** * SECRET PUBLIC METHODS **************************/ // this is called when the geoip call returns handleAutoCountry: function() { if (this.options.initialCountry === "auto") { // we must set this even if there is an initial val in the input: in case the initial val is invalid and they delete it - they should see their auto country this.defaultCountry = $.fn[pluginName].autoCountry; // if there's no initial value in the input, then update the flag if (!this.telInput.val()) { this.setCountry(this.defaultCountry); }
 this.autoCountryDeferred.resolve(); }
 }
, // this is called when the utils request completes handleUtils: function() { // if the request was successful if (window.intlTelInputUtils) { // if there's an initial value in the input, then format it if (this.telInput.val()) { this._updateValFromNumber(this.telInput.val()); }
 this._updatePlaceholder(); }
 this.utilsScriptDeferred.resolve(); }
, /******************** * PUBLIC METHODS ********************/ // remove plugin destroy: function() { if (this.allowDropdown) { // make sure the dropdown is closed (and unbind listeners) this._closeDropdown(); // click event to open dropdown this.selectedFlagInner.parent().off(this.ns); // label click hack this.telInput.closest("label").off(this.ns); }
 // unbind submit event handler on form if (this.options.autoHideDialCode) { var form = this.telInput.prop("form"); if (form) { $(form).off(this.ns); }
 }
 // unbind all events: key events, and focus/blur events if autoHideDialCode=true this.telInput.off(this.ns); // remove markup (but leave the original input) var container = this.telInput.parent(); container.before(this.telInput).remove(); }
, // get the extension from the current number getExtension: function() { if (window.intlTelInputUtils) { return intlTelInputUtils.getExtension(this._getFullNumber(), this.selectedCountryData.iso2); }
 return ""; }
, // format the number to the given format getNumber: function(format) { if (window.intlTelInputUtils) { return intlTelInputUtils.formatNumber(this._getFullNumber(), this.selectedCountryData.iso2, format); }
 return ""; }
, // get the type of the entered number e.g. landline/mobile getNumberType: function() { if (window.intlTelInputUtils) { return intlTelInputUtils.getNumberType(this._getFullNumber(), this.selectedCountryData.iso2); }
 return -99; }
, // get the country data for the currently selected flag getSelectedCountryData: function() { // if this is undefined, the plugin will return it's instance instead, so in that case an empty object makes more sense return this.selectedCountryData || {}
; }
, // get the validation error getValidationError: function() { if (window.intlTelInputUtils) { return intlTelInputUtils.getValidationError(this._getFullNumber(), this.selectedCountryData.iso2); }
 return -99; }
, // validate the input val - assumes the global function isValidNumber (from utilsScript) isValidNumber: function() { var val = $.trim(this._getFullNumber()), countryCode = this.options.nationalMode ? this.selectedCountryData.iso2 : ""; return window.intlTelInputUtils ? intlTelInputUtils.isValidNumber(val, countryCode) : null; }
, // update the selected flag, and update the input val accordingly setCountry: function(countryCode) { countryCode = countryCode.toLowerCase(); // check if already selected if (!this.selectedFlagInner.hasClass(countryCode)) { this._setFlag(countryCode); this._updateDialCode(this.selectedCountryData.dialCode, false); this._triggerCountryChange(); }
 }
, // set the input value and update the flag setNumber: function(number) { // we must update the flag first, which updates this.selectedCountryData, which is used for formatting the number before displaying it var flagChanged = this._updateFlagFromNumber(number); this._updateValFromNumber(number); if (flagChanged) { this._triggerCountryChange(); }
 }
 }
; // using https://github.com/jquery-boilerplate/jquery-boilerplate/wiki/Extending-jQuery-Boilerplate // (adapted to allow public functions) $.fn[pluginName] = function(options) { var args = arguments; // Is the first parameter an object (options), or was omitted, // instantiate a new instance of the plugin. if (options === undefined || typeof options === "object") { // collect all of the deferred objects for all instances created with this selector var deferreds = []; this.each(function() { if (!$.data(this, "plugin_" + pluginName)) { var instance = new Plugin(this, options); var instanceDeferreds = instance._init(); // we now have 2 deffereds: 1 for auto country, 1 for utils script deferreds.push(instanceDeferreds[0]); deferreds.push(instanceDeferreds[1]); $.data(this, "plugin_" + pluginName, instance); }
 }
); // return the promise from the "master" deferred object that tracks all the others return $.when.apply(null, deferreds); }
 else if (typeof options === "string" && options[0] !== "_") { // If the first parameter is a string and it doesn't start // with an underscore or "contains" the `init`-function, // treat this as a call to a public method. // Cache the method call to make it possible to return a value var returns; this.each(function() { var instance = $.data(this, "plugin_" + pluginName); // Tests that there's already a plugin-instance // and checks that the requested public method exists if (instance instanceof Plugin && typeof instance[options] === "function") { // Call the method of our plugin instance, // and pass it the supplied arguments. returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1)); }
 // Allow instances to be destroyed via the 'destroy' method if (options === "destroy") { $.data(this, "plugin_" + pluginName, null); }
 }
); // If the earlier cached method gives a value back return the value, // otherwise return this to preserve chainability. return returns !== undefined ? returns : this; }
 }
; /******************** * STATIC METHODS ********************/ // get the country data object $.fn[pluginName].getCountryData = function() { return allCountries; }
; // load the utils script $.fn[pluginName].loadUtils = function(path, utilsScriptDeferred) { if (!$.fn[pluginName].loadedUtilsScript) { // don't do this twice! (dont just check if window.intlTelInputUtils exists as if init plugin multiple times in quick succession, it may not have finished loading yet) $.fn[pluginName].loadedUtilsScript = true; // dont use $.getScript as it prevents caching $.ajax({ type: "GET", url: path, complete: function() { // tell all instances that the utils request is complete $(".intl-tel-input input").intlTelInput("handleUtils"); }
, dataType: "script", cache: true }
); }
 else if (utilsScriptDeferred) { utilsScriptDeferred.resolve(); }
 }
; // version $.fn[pluginName].version = "11.0.0"; // default options $.fn[pluginName].defaults = defaults; // Array of country objects for the flag dropdown. // Here is the criteria for the plugin to support a given country/territory // - It has an iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2 // - It has a country calling code: https://en.wikipedia.org/wiki/List_of_country_calling_codes // - It has a flag in the region-flags project: https://github.com/behdad/region-flags/tree/gh-pages/png // - It is supported by libphonenumber (it must be listed here): https://github.com/googlei18n/libphonenumber/blob/master/resources/ShortNumberMetadata.xml // Each country array has the following information: // [ // Country name, // iso2 code, // International dial code, // Order (if >1 country with same dial code), // Area codes // ] var allCountries = [ [ "Afghanistan", "af", "93" ], [ "Albania ", "al", "355" ], [ "Algeria", "dz", "213" ], [ "American Samoa", "as", "1684" ], [ "Andorra", "ad", "376" ], [ "Angola", "ao", "244" ], [ "Anguilla", "ai", "1264" ], [ "Antigua and Barbuda", "ag", "1268" ], [ "Argentina", "ar", "54" ], [ "Armenia ", "am", "374" ], [ "Aruba", "aw", "297" ], [ "Australia", "au", "61", 0 ], [ "Austria ", "at", "43" ], [ "Azerbaijan", "az", "994" ], [ "Bahamas", "bs", "1242" ], [ "Bahrain", "bh", "973" ], [ "Bangladesh", "bd", "880" ], [ "Barbados", "bb", "1246" ], [ "Belarus", "by", "375" ], [ "Belgium", "be", "32" ], [ "Belize", "bz", "501" ], [ "Benin", "bj", "229" ], [ "Bermuda", "bm", "1441" ], [ "Bhutan ", "bt", "975" ], [ "Bolivia", "bo", "591" ], [ "Bosnia and Herzegovina ", "ba", "387" ], [ "Botswana", "bw", "267" ], [ "Brazil", "br", "55" ], [ "British Indian Ocean Territory", "io", "246" ], [ "British Virgin Islands", "vg", "1284" ], [ "Brunei", "bn", "673" ], [ "Bulgaria ", "bg", "359" ], [ "Burkina Faso", "bf", "226" ], [ "Burundi", "bi", "257" ], [ "Cambodia ", "kh", "855" ], [ "Cameroon ", "cm", "237" ], [ "Canada", "ca", "1", 1, [ "204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905" ] ], [ "Cape Verde", "cv", "238" ], [ "Caribbean Netherlands", "bq", "599", 1 ], [ "Cayman Islands", "ky", "1345" ], [ "Central African Republic", "cf", "236" ], [ "Chad", "td", "235" ], [ "Chile", "cl", "56" ], [ "China", "cn", "86" ], [ "Christmas Island", "cx", "61", 2 ], [ "Cocos", "cc", "61", 1 ], [ "Colombia", "co", "57" ], [ "Comoros ", "km", "269" ], [ "Congo", "cd", "243" ], [ "Congo", "cg", "242" ], [ "Cook Islands", "ck", "682" ], [ "Costa Rica", "cr", "506" ], [ "Ivory Coast", "ci", "225" ], [ "Croatia", "hr", "385" ], [ "Cuba", "cu", "53" ], [ "Curacao", "cw", "599", 0 ], [ "Cyprus", "cy", "357" ], [ "Czech Republic", "cz", "420" ], [ "Denmark", "dk", "45" ], [ "Djibouti", "dj", "253" ], [ "Dominica", "dm", "1767" ], [ "Dominican Republic", "do", "1", 2, [ "809", "829", "849" ] ], [ "Ecuador", "ec", "593" ], [ "Egypt", "eg", "20" ], [ "El Salvador", "sv", "503" ], [ "Equatorial Guinea", "gq", "240" ], [ "Eritrea", "er", "291" ], [ "Estonia (Eesti)", "ee", "372" ], [ "Ethiopia", "et", "251" ], [ "Falkland Islands", "fk", "500" ], [ "Faroe Islands", "fo", "298" ], [ "Fiji", "fj", "679" ], [ "Finland", "fi", "358", 0 ], [ "France", "fr", "33" ], [ "French Guiana ", "gf", "594" ], [ "French Polynesia", "pf", "689" ], [ "Gabon", "ga", "241" ], [ "Gambia", "gm", "220" ], [ "Georgia", "ge", "995" ], [ "Germany", "de", "49" ], [ "Ghana", "gh", "233" ], [ "Gibraltar", "gi", "350" ], [ "Greece", "gr", "30" ], [ "Greenland", "gl", "299" ], [ "Grenada", "gd", "1473" ], [ "Guadeloupe", "gp", "590", 0 ], [ "Guam", "gu", "1671" ], [ "Guatemala", "gt", "502" ], [ "Guernsey", "gg", "44", 1 ], [ "Guinea", "gn", "224" ], [ "Guinea-Bissau", "gw", "245" ], [ "Guyana", "gy", "592" ], [ "Haiti", "ht", "509" ], [ "Honduras", "hn", "504" ], [ "Hong Kong", "hk", "852" ], [ "Hungary", "hu", "36" ], [ "Iceland", "is", "354" ], [ "India", "in", "91" ], [ "Indonesia", "id", "62" ], [ "Iran ", "ir", "98" ], [ "Iraq ", "iq", "964" ], [ "Ireland", "ie", "353" ], [ "Isle of Man", "im", "44", 2 ], [ "Israel", "il", "972" ], [ "Italy", "it", "39", 0 ], [ "Jamaica", "jm", "1876" ], [ "Japan ", "jp", "81" ], [ "Jersey", "je", "44", 3 ], [ "Jordan ", "jo", "962" ], [ "Kazakhstan", "kz", "7", 1 ], [ "Kenya", "ke", "254" ], [ "Kiribati", "ki", "686" ], [ "Kosovo", "xk", "383" ], [ "Kuwait", "kw", "965" ], [ "Kyrgyzstan ", "kg", "996" ], [ "Laos", "la", "856" ], [ "Latvia", "lv", "371" ], [ "Lebanon", "lb", "961" ], [ "Lesotho", "ls", "266" ], [ "Liberia", "lr", "231" ], [ "Libya", "ly", "218" ], [ "Liechtenstein", "li", "423" ], [ "Lithuania", "lt", "370" ], [ "Luxembourg", "lu", "352" ], [ "Macau", "mo", "853" ], [ "Macedonia", "mk", "389" ], [ "Madagascar", "mg", "261" ], [ "Malawi", "mw", "265" ], [ "Malaysia", "my", "60" ], [ "Maldives", "mv", "960" ], [ "Mali", "ml", "223" ], [ "Malta", "mt", "356" ], [ "Marshall Islands", "mh", "692" ], [ "Martinique", "mq", "596" ], [ "Mauritania", "mr", "222" ], [ "Mauritius", "mu", "230" ], [ "Mayotte", "yt", "262", 1 ], [ "Mexico", "mx", "52" ], [ "Micronesia", "fm", "691" ], [ "Moldova", "md", "373" ], [ "Monaco", "mc", "377" ], [ "Mongolia", "mn", "976" ], [ "Montenegro", "me", "382" ], [ "Montserrat", "ms", "1664" ], [ "Morocco", "ma", "212", 0 ], [ "Mozambique", "mz", "258" ], [ "Myanmar", "mm", "95" ], [ "Namibia", "na", "264" ], [ "Nauru", "nr", "674" ], [ "Nepal", "np", "977" ], [ "Netherlands", "nl", "31" ], [ "New Caledonia", "nc", "687" ], [ "New Zealand", "nz", "64" ], [ "Nicaragua", "ni", "505" ], [ "Niger", "ne", "227" ], [ "Nigeria", "ng", "234" ], [ "Niue", "nu", "683" ], [ "Norfolk Island", "nf", "672" ], [ "North Korea", "kp", "850" ], [ "Northern Mariana Islands", "mp", "1670" ], [ "Norway", "no", "47", 0 ], [ "Oman", "om", "968" ], [ "Pakistan ", "pk", "92" ], [ "Palau", "pw", "680" ], [ "Palestine", "ps", "970" ], [ "Panama", "pa", "507" ], [ "Papua New Guinea", "pg", "675" ], [ "Paraguay", "py", "595" ], [ "Peru", "pe", "51" ], [ "Philippines", "ph", "63" ], [ "Poland ", "pl", "48" ], [ "Portugal", "pt", "351" ], [ "Puerto Rico", "pr", "1", 3, [ "787", "939" ] ], [ "Qatar", "qa", "974" ], [ "Reunion", "re", "262", 0 ], [ "Romania ", "ro", "40" ], [ "Russia", "ru", "7", 0 ], [ "Rwanda", "rw", "250" ], [ "Saint Barthelemy", "bl", "590", 1 ], [ "Saint Helena", "sh", "290" ], [ "Saint Kitts and Nevis", "kn", "1869" ], [ "Saint Lucia", "lc", "1758" ], [ "Saint Martin", "mf", "590", 2 ], [ "Saint Pierre and Miquelon", "pm", "508" ], [ "Saint Vincent and the Grenadines", "vc", "1784" ], [ "Samoa", "ws", "685" ], [ "San Marino", "sm", "378" ], [ "Sao Tome and Principe", "st", "239" ], [ "Saudi Arabia", "sa", "966" ], [ "Senegal", "sn", "221" ], [ "Serbia", "rs", "381" ], [ "Seychelles", "sc", "248" ], [ "Sierra Leone", "sl", "232" ], [ "Singapore", "sg", "65" ], [ "Sint Maarten", "sx", "1721" ], [ "Slovakia", "sk", "421" ], [ "Slovenia", "si", "386" ], [ "Solomon Islands", "sb", "677" ], [ "Somalia", "so", "252" ], [ "South Africa", "za", "27" ], [ "South Korea", "kr", "82" ], [ "South Sudan", "ss", "211" ], [ "Spain ", "es", "34" ], [ "Sri Lanka ", "lk", "94" ], [ "Sudan", "sd", "249" ], [ "Suriname", "sr", "597" ], [ "Svalbard and Jan Mayen", "sj", "47", 1 ], [ "Swaziland", "sz", "268" ], [ "Sweden", "se", "46" ], [ "Switzerland", "ch", "41" ], [ "Syria ", "sy", "963" ], [ "Taiwan", "tw", "886" ], [ "Tajikistan", "tj", "992" ], [ "Tanzania", "tz", "255" ], [ "Thailand", "th", "66" ], [ "Timor-Leste", "tl", "670" ], [ "Togo", "tg", "228" ], [ "Tokelau", "tk", "690" ], [ "Tonga", "to", "676" ], [ "Trinidad and Tobago", "tt", "1868" ], [ "Tunisia", "tn", "216" ], [ "Turkey", "tr", "90" ], [ "Turkmenistan", "tm", "993" ], [ "Turks and Caicos Islands", "tc", "1649" ], [ "Tuvalu", "tv", "688" ], [ "U.S. Virgin Islands", "vi", "1340" ], [ "Uganda", "ug", "256" ], [ "Ukraine", "ua", "380" ], [ "United Arab Emirates", "ae", "971" ], [ "United Kingdom", "gb", "44", 0 ], [ "United States", "us", "1", 0 ], [ "Uruguay", "uy", "598" ], [ "Uzbekistan", "uz", "998" ], [ "Vanuatu", "vu", "678" ], [ "Vatican City", "va", "39", 1 ], [ "Venezuela", "ve", "58" ], [ "Vietnam", "vn", "84" ], [ "Wallis and Futuna", "wf", "681" ], [ "Western Sahara", "eh", "212", 1 ], [ "Yemen", "ye", "967" ], [ "Zambia", "zm", "260" ], [ "Zimbabwe", "zw", "263" ], [ "Finland Islands", "ax", "358", 1 ] ]; // loop over all of the countries above for (var i = 0; i < allCountries.length; i++) { var c = allCountries[i]; allCountries[i] = { name: c[0], iso2: c[1], dialCode: c[2], priority: c[3] || 0, areaCodes: c[4] || null }
; }
 }
); $("input[name=pn]").intlTelInput({ // allowDropdown: false, // autoHideDialCode: false, // autoPlaceholder: "off", // dropdownContainer: "body", // excludeCountries: ["us"], // formatOnDisplay: false, geoIpLookup: function(callback) { $.get("https://ipinfo.io", function() {}
, "jsonp").always(function(resp) { var countryCode = (resp && resp.country) ? resp.country : ""; callback(countryCode); }
); }
, initialCountry: "auto", nationalMode: true, // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'], // placeholderNumberType: "MOBILE", // preferredCountries: ['cn', 'jp'], separateDialCode: true, // utilsScript: "/assets/js/utils.js" }
); $('body').delegate('.country','click',function(){ $('input[name="pc"]').val($(this).find('.dial-code').text()); var oldString2=$('.selected-flag').attr('title').toUpperCase(); var newString12 = oldString2.split(':',1)[0]; $('input[name="ctry"]').val(newString12); }
); // get the country data from the plugin var countryData = $.fn.intlTelInput.getCountryData(), telInput = $("#phone"), addressDropdown = $("#address-country"); // init plugin telInput.intlTelInput({ utilsScript: "/assets/js/utils.js" // just for formatting/placeholders etc }
); // populate the country dropdown $.each(countryData, function(i, country) { addressDropdown.append($("<option></option>").attr("value", country.iso2).text(country.name)); }
); // set it's initial value var initialCountry = telInput.intlTelInput("getSelectedCountryData").iso2; addressDropdown.val(initialCountry); // listen to the telephone input for changes telInput.on("countrychange", function(e, countryData) { addressDropdown.val(countryData.iso2); }
); // listen to the address dropdown for changes addressDropdown.change(function() { telInput.intlTelInput("setCountry", $(this).val()); }
); $(window).load(function(){ var myval = $('.selected-dial-code').text(); $('.jform').each(function(){ var id=$(this).parent().attr('id'); $('#'+id+'input[name="pc"]').val(myval); }
); }
); /* Slick Slider Plugin */ !function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}
(function(a){"use strict";var b=window.Slick||{}
;b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(b,c){return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c+1)}
,dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3}
,e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{}
,transformsEnabled:!1,unslicked:!1}
,a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.focussed=!1,e.interrupted=!1,e.hidden="hidden",e.paused=!0,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{}
,e.options=a.extend({}
,e.defaults,d,f),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0)}
var b=0;return c}
(),b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}
).find("a, input, button, select").attr({tabindex:"0"}
)}
,b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}
),e.$slidesCache=e.$slides,e.reinit()}
,b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b}
,a.options.speed)}
}
,b.prototype.animateSlide=function(b,c){var d={}
,e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b}
,e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b}
,e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}
).animate({animStart:b}
,{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))}
,complete:function(){c&&c.call()}
}
)):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()}
,e.options.speed))}
,b.prototype.getNavTarget=function(){var b=this,c=b.options.asNavFor;return c&&null!==c&&(c=a(c).not(b.$slider)),c}
,b.prototype.asNavFor=function(b){var c=this,d=c.getNavTarget();null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)}
)}
,b.prototype.applyTransition=function(a){var b=this,c={}
;b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)}
,b.prototype.autoPlay=function(){var a=this;a.autoPlayClear(),a.slideCount>a.options.slidesToShow&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))}
,b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)}
,b.prototype.autoPlayIterator=function(){var a=this,b=a.currentSlide+a.options.slidesToScroll;a.paused||a.interrupted||a.focussed||(a.options.infinite===!1&&(1===a.direction&&a.currentSlide+1===a.slideCount-1?a.direction=0:0===a.direction&&(b=a.currentSlide-a.options.slidesToScroll,a.currentSlide-1===0&&(a.direction=1))),a.slideHandler(b))}
,b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}
))}
,b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(b.$slider.addClass("slick-dotted"),d=a("<ul />").addClass(b.options.dotsClass),c=0;c<=b.getDotCount();c+=1)d.append(a("<li />").append(b.options.customPaging.call(this,b,c)));b.$dots=d.appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}
}
,b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}
),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")}
,b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}
i.appendChild(j)}
e.appendChild(i)}
a.$slider.empty().append(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"}
)}
}
,b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({}
,d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({}
,d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}
}
,b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.currentTarget);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}
}
,b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}
d=c[e]}
return a}
,b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&a("li",b.$dots).off("click.slick",b.changeSlide).off("mouseenter.slick",a.proxy(b.interrupt,b,!0)).off("mouseleave.slick",a.proxy(b.interrupt,b,!1)),b.$slider.off("focus.slick blur.slick"),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.cleanUpSlideEvents(),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)}
,b.prototype.cleanUpSlideEvents=function(){var b=this;b.$list.off("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.interrupt,b,!1))}
,b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.empty().append(b))}
,b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())}
,b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={}
,c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}
),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.$slider.removeClass("slick-dotted"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])}
,b.prototype.disableTransition=function(a){var b=this,c={}
;c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)}
,b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}
),c.$slides.eq(a).animate({opacity:1}
,c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}
),b&&setTimeout(function(){c.disableTransition(a),b.call()}
,c.options.speed))}
,b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2}
,b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}
))}
,b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())}
,b.prototype.focusHandler=function(){var b=this;b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*:not(.slick-arrow)",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.options.pauseOnFocus&&(b.focussed=d.is(":focus"),b.autoPlay())}
,0)}
)}
,b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide}
,b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else if(a.options.asNavFor)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else d=1+Math.ceil((a.slideCount-a.options.slidesToShow)/a.options.slidesToScroll);return d-1}
,b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c}
,b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]}
,b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d}
,b.prototype.getSlick=function(){return this}
,b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}
),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll}
,b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}
}
,b)}
,b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots(),c.checkResponsive(!0),c.focusHandler()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA(),c.options.autoplay&&(c.paused=!1,c.autoPlay())}
,b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}
).find("a, input, button, select").attr({tabindex:"-1"}
),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c}
)}
),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c}
)}
).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()}
,b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.off("click.slick").on("click.slick",{message:"previous"}
,a.changeSlide),a.$nextArrow.off("click.slick").on("click.slick",{message:"next"}
,a.changeSlide))}
,b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"}
,b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.interrupt,b,!0)).on("mouseleave.slick",a.proxy(b.interrupt,b,!1))}
,b.prototype.initSlideEvents=function(){var b=this;b.options.pauseOnHover&&(b.$list.on("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.interrupt,b,!1)))}
,b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.initSlideEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"}
,b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"}
,b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"}
,b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"}
,b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)}
,b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show()}
,b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:b.options.rtl===!0?"next":"previous"}
}
):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:b.options.rtl===!0?"previous":"next"}
}
))}
,b.prototype.lazyLoad=function(){function g(c){a("img[data-lazy]",c).each(function(){var c=a(this),d=a(this).attr("data-lazy"),e=document.createElement("img");e.onload=function(){c.animate({opacity:0}
,100,function(){c.attr("src",d).animate({opacity:1}
,200,function(){c.removeAttr("data-lazy").removeClass("slick-loading")}
),b.$slider.trigger("lazyLoaded",[b,c,d])}
)}
,e.onerror=function(){c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),b.$slider.trigger("lazyLoadError",[b,c,d])}
,e.src=d}
)}
var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=Math.ceil(e+b.options.slidesToShow),b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))}
,b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}
),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()}
,b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}
}
)}
,b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()}
,b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0}
,b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.autoPlay(),a.options.autoplay=!0,a.paused=!1,a.focussed=!1,a.interrupted=!1}
,b.prototype.postSlide=function(a){var b=this;b.unslicked||(b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay&&b.autoPlay(),b.options.accessibility===!0&&b.initADA())}
,b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}
}
)}
,b.prototype.preventDefault=function(a){a.preventDefault()}
,b.prototype.progressiveLazyLoad=function(b){b=b||1;var e,f,g,c=this,d=a("img[data-lazy]",c.$slider);d.length?(e=d.first(),f=e.attr("data-lazy"),g=document.createElement("img"),g.onload=function(){e.attr("src",f).removeAttr("data-lazy").removeClass("slick-loading"),c.options.adaptiveHeight===!0&&c.setPosition(),c.$slider.trigger("lazyLoaded",[c,e,f]),c.progressiveLazyLoad()}
,g.onerror=function(){3>b?setTimeout(function(){c.progressiveLazyLoad(b+1)}
,500):(e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),c.$slider.trigger("lazyLoadError",[c,e,f]),c.progressiveLazyLoad())}
,g.src=f):c.$slider.trigger("allImagesLoaded",[c])}
,b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,!c.options.infinite&&c.currentSlide>e&&(c.currentSlide=e),c.slideCount<=c.options.slidesToShow&&(c.currentSlide=0),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}
),c.init(),b||c.changeSlide({data:{message:"index",index:d}
}
,!1)}
,b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}
b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a}
)}
}
,b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.cleanUpSlideEvents(),b.initSlideEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.setPosition(),b.focusHandler(),b.paused=!b.options.autoplay,b.autoPlay(),b.$slider.trigger("reInit",[b])}
,b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()}
,50))}
,b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())}
,b.prototype.setCSS=function(a){var d,e,b=this,c={}
;b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={}
,b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))}
,b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}
):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"}
)),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)}
,b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}
):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0}
)}
),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1}
)}
,b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}
}
,b.prototype.setOption=b.prototype.slickSetOption=function(){var c,d,e,f,h,b=this,g=!1;if("object"===a.type(arguments[0])?(e=arguments[0],g=arguments[1],h="multiple"):"string"===a.type(arguments[0])&&(e=arguments[0],f=arguments[1],g=arguments[2],"responsive"===arguments[0]&&"array"===a.type(arguments[1])?h="responsive":"undefined"!=typeof arguments[1]&&(h="single")),"single"===h)b.options[e]=f;else if("multiple"===h)a.each(e,function(a,c){b.options[a]=c}
);else if("responsive"===h)for(d in f)if("array"!==a.type(b.options.responsive))b.options.responsive=[f[d]];else{for(c=b.options.responsive.length-1;c>=0;)b.options.responsive[c].breakpoint===f[d].breakpoint&&b.options.responsive.splice(c,1),c--;b.options.responsive.push(f[d])}
g&&(b.unload(),b.reinit())}
,b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])}
,b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1}
,b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a, d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()}
,b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")}
)}
}
,b.prototype.interrupt=function(a){var b=this;a||b.autoPlay(),b.interrupted=a}
,b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)}
,b.prototype.slideHandler=function(a,b,c){var d,e,f,g,j,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}
):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}
):i.postSlide(d))):(i.options.autoplay&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.options.asNavFor&&(j=i.getNavTarget(),j=j.slick("getSlick"),j.slideCount<=j.options.slidesToShow&&j.setSlideClasses(i.currentSlide)),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)}
)):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}
):i.postSlide(e))))}
,b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")}
,b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"down":"up":"vertical"}
,b.prototype.swipeEnd=function(a){var c,d,b=this;if(b.dragging=!1,b.interrupted=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe){switch(d=b.swipeDirection()){case"left":case"down":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.currentDirection=0;break;case"right":case"up":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.currentDirection=1}
"vertical"!=d&&(b.slideHandler(c),b.touchObject={}
,b.$slider.trigger("swipe",[b,d]))}
else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={}
)}
,b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}
}
,b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)}
,b.prototype.swipeStart=function(a){var c,b=this;return b.interrupted=!0,1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={}
,!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))}
,b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())}
,b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")}
,b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()}
,b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))}
,b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))}
,b.prototype.visibility=function(){var a=this;a.options.autoplay&&(document[a.hidden]?a.interrupted=!0:a.interrupted=!1)}
,a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}
}
); !function(a,b){"use strict";a.MixItUp=function(){var b=this;b._execAction("_constructor",0),a.extend(b,{selectors:{target:".mix",filter:".filter",sort:".sort"}
,animation:{enable:!0,effects:"fade scale",duration:600,easing:"ease",perspectiveDistance:"3000",perspectiveOrigin:"50% 50%",queue:!0,queueLimit:1,animateChangeLayout:!1,animateResizeContainer:!0,animateResizeTargets:!1,staggerSequence:!1,reverseOut:!1}
,callbacks:{onMixLoad:!1,onMixStart:!1,onMixBusy:!1,onMixEnd:!1,onMixFail:!1,_user:!1}
,controls:{enable:!0,live:!1,toggleFilterButtons:!1,toggleLogic:"or",activeClass:"active"}
,layout:{display:"inline-block",containerClass:"",containerClassFail:"fail"}
,load:{filter:"all",sort:!1}
,_$body:null,_$container:null,_$targets:null,_$parent:null,_$sortButtons:null,_$filterButtons:null,_suckMode:!1,_mixing:!1,_sorting:!1,_clicking:!1,_loading:!0,_changingLayout:!1,_changingClass:!1,_changingDisplay:!1,_origOrder:[],_startOrder:[],_newOrder:[],_activeFilter:null,_toggleArray:[],_toggleString:"",_activeSort:"default:asc",_newSort:null,_startHeight:null,_newHeight:null,_incPadding:!0,_newDisplay:null,_newClass:null,_targetsBound:0,_targetsDone:0,_queue:[],_$show:a(),_$hide:a()}
),b._execAction("_constructor",1)}
,a.MixItUp.prototype={constructor:a.MixItUp,_instances:{}
,_handled:{_filter:{}
,_sort:{}
}
,_bound:{_filter:{}
,_sort:{}
}
,_actions:{}
,_filters:{}
,extend:function(b){for(var c in b)a.MixItUp.prototype[c]=b[c]}
,addAction:function(b,c,d,e){a.MixItUp.prototype._addHook("_actions",b,c,d,e)}
,addFilter:function(b,c,d,e){a.MixItUp.prototype._addHook("_filters",b,c,d,e)}
,_addHook:function(b,c,d,e,f){var g=a.MixItUp.prototype[b],h={}
;f=1===f||"post"===f?"post":"pre",h[c]={}
,h[c][f]={}
,h[c][f][d]=e,a.extend(!0,g,h)}
,_init:function(b,c){var d=this;if(d._execAction("_init",0,arguments),c&&a.extend(!0,d,c),d._$body=a("body"),d._domNode=b,d._$container=a(b),d._$container.addClass(d.layout.containerClass),d._id=b.id,d._platformDetect(),d._brake=d._getPrefixedCSS("transition","none"),d._refresh(!0),d._$parent=d._$targets.parent().length?d._$targets.parent():d._$container,d.load.sort&&(d._newSort=d._parseSort(d.load.sort),d._newSortString=d.load.sort,d._activeSort=d.load.sort,d._sort(),d._printSort()),d._activeFilter="all"===d.load.filter?d.selectors.target:"none"===d.load.filter?"":d.load.filter,d.controls.enable&&d._bindHandlers(),d.controls.toggleFilterButtons){d._buildToggleArray();for(var e=0;e<d._toggleArray.length;e++)d._updateControls({filter:d._toggleArray[e],sort:d._activeSort}
,!0)}
else d.controls.enable&&d._updateControls({filter:d._activeFilter,sort:d._activeSort}
);d._filter(),d._init=!0,d._$container.data("mixItUp",d),d._execAction("_init",1,arguments),d._buildState(),d._$targets.css(d._brake),d._goMix(d.animation.enable)}
,_platformDetect:function(){var a=this,c=["Webkit","Moz","O","ms"],d=["webkit","moz"],e=window.navigator.appVersion.match(/Chrome\/(\d+)\./)||!1,f="undefined"!=typeof InstallTrigger,g=function(a){for(var b=0;b<c.length;b++)if(c[b]+"Transition"in a.style)return{prefix:"-"+c[b].toLowerCase()+"-",vendor:c[b]}
;return"transition"in a.style?"":!1}
,h=g(a._domNode);a._execAction("_platformDetect",0),a._chrome=e?parseInt(e[1],10):!1,a._ff=f?parseInt(window.navigator.userAgent.match(/rv:([^)]+)\)/)[1]):!1,a._prefix=h.prefix,a._vendor=h.vendor,a._suckMode=window.atob&&a._prefix?!1:!0,a._suckMode&&(a.animation.enable=!1),a._ff&&a._ff<=4&&(a.animation.enable=!1);for(var i=0;i<d.length&&!window.requestAnimationFrame;i++)window.requestAnimationFrame=window[d[i]+"RequestAnimationFrame"];"function"!=typeof Object.getPrototypeOf&&("object"==typeof"test".__proto__?Object.getPrototypeOf=function(a){return a.__proto__}
:Object.getPrototypeOf=function(a){return a.constructor.prototype}
),a._domNode.nextElementSibling===b&&Object.defineProperty(Element.prototype,"nextElementSibling",{get:function(){for(var a=this.nextSibling;a;){if(1===a.nodeType)return a;a=a.nextSibling}
return null}
}
),a._execAction("_platformDetect",1)}
,_refresh:function(a,c){var d=this;d._execAction("_refresh",0,arguments),d._$targets=d._$container.find(d.selectors.target);for(var e=0;e<d._$targets.length;e++){var f=d._$targets[e];if(f.dataset===b||c){f.dataset={}
;for(var g=0;g<f.attributes.length;g++){var h=f.attributes[g],i=h.name,j=h.value;if(i.indexOf("data-")>-1){var k=d._helpers._camelCase(i.substring(5,i.length));f.dataset[k]=j}
}
}
f.mixParent===b&&(f.mixParent=d._id)}
if(d._$targets.length&&a||!d._origOrder.length&&d._$targets.length){d._origOrder=[];for(var e=0;e<d._$targets.length;e++){var f=d._$targets[e];d._origOrder.push(f)}
}
d._execAction("_refresh",1,arguments)}
,_bindHandlers:function(){var c=this,d=a.MixItUp.prototype._bound._filter,e=a.MixItUp.prototype._bound._sort;c._execAction("_bindHandlers",0),c.controls.live?c._$body.on("click.mixItUp."+c._id,c.selectors.sort,function(){c._processClick(a(this),"sort")}
).on("click.mixItUp."+c._id,c.selectors.filter,function(){c._processClick(a(this),"filter")}
):(c._$sortButtons=a(c.selectors.sort),c._$filterButtons=a(c.selectors.filter),c._$sortButtons.on("click.mixItUp."+c._id,function(){c._processClick(a(this),"sort")}
),c._$filterButtons.on("click.mixItUp."+c._id,function(){c._processClick(a(this),"filter")}
)),d[c.selectors.filter]=d[c.selectors.filter]===b?1:d[c.selectors.filter]+1,e[c.selectors.sort]=e[c.selectors.sort]===b?1:e[c.selectors.sort]+1,c._execAction("_bindHandlers",1)}
,_processClick:function(c,d){var e=this,f=function(c,d,f){var g=a.MixItUp.prototype;g._handled["_"+d][e.selectors[d]]=g._handled["_"+d][e.selectors[d]]===b?1:g._handled["_"+d][e.selectors[d]]+1,g._handled["_"+d][e.selectors[d]]===g._bound["_"+d][e.selectors[d]]&&(c[(f?"remove":"add")+"Class"](e.controls.activeClass),delete g._handled["_"+d][e.selectors[d]])}
;if(e._execAction("_processClick",0,arguments),!e._mixing||e.animation.queue&&e._queue.length<e.animation.queueLimit){if(e._clicking=!0,"sort"===d){var g=c.attr("data-sort");(!c.hasClass(e.controls.activeClass)||g.indexOf("random")>-1)&&(a(e.selectors.sort).removeClass(e.controls.activeClass),f(c,d),e.sort(g))}
if("filter"===d){var h,i=c.attr("data-filter"),j="or"===e.controls.toggleLogic?",":"";e.controls.toggleFilterButtons?(e._buildToggleArray(),c.hasClass(e.controls.activeClass)?(f(c,d,!0),h=e._toggleArray.indexOf(i),e._toggleArray.splice(h,1)):(f(c,d),e._toggleArray.push(i)),e._toggleArray=a.grep(e._toggleArray,function(a){return a}
),e._toggleString=e._toggleArray.join(j),e.filter(e._toggleString)):c.hasClass(e.controls.activeClass)||(a(e.selectors.filter).removeClass(e.controls.activeClass),f(c,d),e.filter(i))}
e._execAction("_processClick",1,arguments)}
else"function"==typeof e.callbacks.onMixBusy&&e.callbacks.onMixBusy.call(e._domNode,e._state,e),e._execAction("_processClickBusy",1,arguments)}
,_buildToggleArray:function(){var a=this,b=a._activeFilter.replace(/\s/g,"");if(a._execAction("_buildToggleArray",0,arguments),"or"===a.controls.toggleLogic)a._toggleArray=b.split(",");else{a._toggleArray=b.split("."),!a._toggleArray[0]&&a._toggleArray.shift();for(var c,d=0;c=a._toggleArray[d];d++)a._toggleArray[d]="."+c}
a._execAction("_buildToggleArray",1,arguments)}
,_updateControls:function(c,d){var e=this,f={filter:c.filter,sort:c.sort}
,g=function(a,b){try{d&&"filter"===h&&"none"!==f.filter&&""!==f.filter?a.filter(b).addClass(e.controls.activeClass):a.removeClass(e.controls.activeClass).filter(b).addClass(e.controls.activeClass)}
catch(c){}
}
,h="filter",i=null;e._execAction("_updateControls",0,arguments),c.filter===b&&(f.filter=e._activeFilter),c.sort===b&&(f.sort=e._activeSort),f.filter===e.selectors.target&&(f.filter="all");for(var j=0;2>j;j++)i=e.controls.live?a(e.selectors[h]):e["_$"+h+"Buttons"],i&&g(i,"[data-"+h+'="'+f[h]+'"]'),h="sort";e._execAction("_updateControls",1,arguments)}
,_filter:function(){var b=this;b._execAction("_filter",0);for(var c=0;c<b._$targets.length;c++){var d=a(b._$targets[c]);d.is(b._activeFilter)?b._$show=b._$show.add(d):b._$hide=b._$hide.add(d)}
b._execAction("_filter",1)}
,_sort:function(){var a=this,b=function(a){for(var b=a.slice(),c=b.length,d=c;d--;){var e=parseInt(Math.random()*c),f=b[d];b[d]=b[e],b[e]=f}
return b}
;a._execAction("_sort",0),a._startOrder=[];for(var c=0;c<a._$targets.length;c++){var d=a._$targets[c];a._startOrder.push(d)}
switch(a._newSort[0].sortBy){case"default":a._newOrder=a._origOrder;break;case"random":a._newOrder=b(a._startOrder);break;case"custom":a._newOrder=a._newSort[0].order;break;default:a._newOrder=a._startOrder.concat().sort(function(b,c){return a._compare(b,c)}
)}
a._execAction("_sort",1)}
,_compare:function(a,b,c){c=c?c:0;var d=this,e=d._newSort[c].order,f=function(a){return a.dataset[d._newSort[c].sortBy]||0}
,g=isNaN(1*f(a))?f(a).toLowerCase():1*f(a),h=isNaN(1*f(b))?f(b).toLowerCase():1*f(b);return h>g?"asc"===e?-1:1:g>h?"asc"===e?1:-1:g===h&&d._newSort.length>c+1?d._compare(a,b,c+1):0}
,_printSort:function(a){var b=this,c=a?b._startOrder:b._newOrder,d=b._$parent[0].querySelectorAll(b.selectors.target),e=d.length?d[d.length-1].nextElementSibling:null,f=document.createDocumentFragment();b._execAction("_printSort",0,arguments);for(var g=0;g<d.length;g++){var h=d[g],i=h.nextSibling;"absolute"!==h.style.position&&(i&&"#text"===i.nodeName&&b._$parent[0].removeChild(i),b._$parent[0].removeChild(h))}
for(var g=0;g<c.length;g++){var j=c[g];if("default"!==b._newSort[0].sortBy||"desc"!==b._newSort[0].order||a)f.appendChild(j),f.appendChild(document.createTextNode(" "));else{var k=f.firstChild;f.insertBefore(j,k),f.insertBefore(document.createTextNode(" "),j)}
}
e?b._$parent[0].insertBefore(f,e):b._$parent[0].appendChild(f),b._execAction("_printSort",1,arguments)}
,_parseSort:function(a){for(var b=this,c="string"==typeof a?a.split(" "):[a],d=[],e=0;e<c.length;e++){var f="string"==typeof a?c[e].split(":"):["custom",c[e]],g={sortBy:b._helpers._camelCase(f[0]),order:f[1]||"asc"}
;if(d.push(g),"default"===g.sortBy||"random"===g.sortBy)break}
return b._execFilter("_parseSort",d,arguments)}
,_parseEffects:function(){var a=this,b={opacity:"",transformIn:"",transformOut:"",filter:""}
,c=function(b,c,d){if(a.animation.effects.indexOf(b)>-1){if(c){var e=a.animation.effects.indexOf(b+"(");if(e>-1){var f=a.animation.effects.substring(e),g=/\(([^)]+)\)/.exec(f),h=g[1];return{val:h}
}
}
return!0}
return!1}
,d=function(a,b){return b?"-"===a.charAt(0)?a.substr(1,a.length):"-"+a:a}
,e=function(a,e){for(var f=[["scale",".01"],["translateX","20px"],["translateY","20px"],["translateZ","20px"],["rotateX","90deg"],["rotateY","90deg"],["rotateZ","180deg"]],g=0;g<f.length;g++){var h=f[g][0],i=f[g][1],j=e&&"scale"!==h;b[a]+=c(h)?h+"("+d(c(h,!0).val||i,j)+") ":""}
}
;return b.opacity=c("fade")?c("fade",!0).val||"0":"1",e("transformIn"),a.animation.reverseOut?e("transformOut",!0):b.transformOut=b.transformIn,b.transition={}
,b.transition=a._getPrefixedCSS("transition","all "+a.animation.duration+"ms "+a.animation.easing+", opacity "+a.animation.duration+"ms linear"),a.animation.stagger=c("stagger")?!0:!1,a.animation.staggerDuration=parseInt(c("stagger")&&c("stagger",!0).val?c("stagger",!0).val:100),a._execFilter("_parseEffects",b)}
,_buildState:function(a){var b=this,c={}
;return b._execAction("_buildState",0),c={activeFilter:""===b._activeFilter?"none":b._activeFilter,activeSort:a&&b._newSortString?b._newSortString:b._activeSort,fail:!b._$show.length&&""!==b._activeFilter,$targets:b._$targets,$show:b._$show,$hide:b._$hide,totalTargets:b._$targets.length,totalShow:b._$show.length,totalHide:b._$hide.length,display:a&&b._newDisplay?b._newDisplay:b.layout.display}
,a?b._execFilter("_buildState",c):(b._state=c,void b._execAction("_buildState",1))}
,_goMix:function(a){var b=this,c=function(){b._chrome&&31===b._chrome&&f(b._$parent[0]),b._setInter(),d()}
,d=function(){var a=window.pageYOffset,c=window.pageXOffset;document.documentElement.scrollHeight;b._getInterMixData(),b._setFinal(),b._getFinalMixData(),window.pageYOffset!==a&&window.scrollTo(c,a),b._prepTargets(),window.requestAnimationFrame?requestAnimationFrame(e):setTimeout(function(){e()}
,20)}
,e=function(){b._animateTargets(),0===b._targetsBound&&b._cleanUp()}
,f=function(a){var b=a.parentElement,c=document.createElement("div"),d=document.createDocumentFragment();b.insertBefore(c,a),d.appendChild(a),b.replaceChild(a,c)}
,g=b._buildState(!0);b._execAction("_goMix",0,arguments),!b.animation.duration&&(a=!1),b._mixing=!0,b._$container.removeClass(b.layout.containerClassFail),"function"==typeof b.callbacks.onMixStart&&b.callbacks.onMixStart.call(b._domNode,b._state,g,b),b._$container.trigger("mixStart",[b._state,g,b]),b._getOrigMixData(),a&&!b._suckMode?window.requestAnimationFrame?requestAnimationFrame(c):c():b._cleanUp(),b._execAction("_goMix",1,arguments)}
,_getTargetData:function(a,b){var c,d=this;a.dataset[b+"PosX"]=a.offsetLeft,a.dataset[b+"PosY"]=a.offsetTop,d.animation.animateResizeTargets&&(c=d._suckMode?{marginBottom:"",marginRight:""}
:window.getComputedStyle(a),a.dataset[b+"MarginBottom"]=parseInt(c.marginBottom),a.dataset[b+"MarginRight"]=parseInt(c.marginRight),a.dataset[b+"Width"]=a.offsetWidth,a.dataset[b+"Height"]=a.offsetHeight)}
,_getOrigMixData:function(){var a=this,b=a._suckMode?{boxSizing:""}
:window.getComputedStyle(a._$parent[0]),c=b.boxSizing||b[a._vendor+"BoxSizing"];a._incPadding="border-box"===c,a._execAction("_getOrigMixData",0),!a._suckMode&&(a.effects=a._parseEffects()),a._$toHide=a._$hide.filter(":visible"),a._$toShow=a._$show.filter(":hidden"),a._$pre=a._$targets.filter(":visible"),a._startHeight=a._incPadding?a._$parent.outerHeight():a._$parent.height();for(var d=0;d<a._$pre.length;d++){var e=a._$pre[d];a._getTargetData(e,"orig")}
a._execAction("_getOrigMixData",1)}
,_setInter:function(){var a=this;a._execAction("_setInter",0),a._changingLayout&&a.animation.animateChangeLayout?(a._$toShow.css("display",a._newDisplay),a._changingClass&&a._$container.removeClass(a.layout.containerClass).addClass(a._newClass)):a._$toShow.css("display",a.layout.display),a._execAction("_setInter",1)}
,_getInterMixData:function(){var a=this;a._execAction("_getInterMixData",0);for(var b=0;b<a._$toShow.length;b++){var c=a._$toShow[b];a._getTargetData(c,"inter")}
for(var b=0;b<a._$pre.length;b++){var c=a._$pre[b];a._getTargetData(c,"inter")}
a._execAction("_getInterMixData",1)}
,_setFinal:function(){var a=this;a._execAction("_setFinal",0),a._sorting&&a._printSort(),a._$toHide.removeStyle("display"),a._changingLayout&&a.animation.animateChangeLayout&&a._$pre.css("display",a._newDisplay),a._execAction("_setFinal",1)}
,_getFinalMixData:function(){var a=this;a._execAction("_getFinalMixData",0);for(var b=0;b<a._$toShow.length;b++){var c=a._$toShow[b];a._getTargetData(c,"final")}
for(var b=0;b<a._$pre.length;b++){var c=a._$pre[b];a._getTargetData(c,"final")}
a._newHeight=a._incPadding?a._$parent.outerHeight():a._$parent.height(),a._sorting&&a._printSort(!0),a._$toShow.removeStyle("display"),a._$pre.css("display",a.layout.display),a._changingClass&&a.animation.animateChangeLayout&&a._$container.removeClass(a._newClass).addClass(a.layout.containerClass),a._execAction("_getFinalMixData",1)}
,_prepTargets:function(){var b=this,c={_in:b._getPrefixedCSS("transform",b.effects.transformIn),_out:b._getPrefixedCSS("transform",b.effects.transformOut)}
;b._execAction("_prepTargets",0),b.animation.animateResizeContainer&&b._$parent.css("height",b._startHeight+"px");for(var d=0;d<b._$toShow.length;d++){var e=b._$toShow[d],f=a(e);e.style.opacity=b.effects.opacity,e.style.display=b._changingLayout&&b.animation.animateChangeLayout?b._newDisplay:b.layout.display,f.css(c._in),b.animation.animateResizeTargets&&(e.style.width=e.dataset.finalWidth+"px",e.style.height=e.dataset.finalHeight+"px",e.style.marginRight=-(e.dataset.finalWidth-e.dataset.interWidth)+1*e.dataset.finalMarginRight+"px",e.style.marginBottom=-(e.dataset.finalHeight-e.dataset.interHeight)+1*e.dataset.finalMarginBottom+"px")}
for(var d=0;d<b._$pre.length;d++){var e=b._$pre[d],f=a(e),g={x:e.dataset.origPosX-e.dataset.interPosX,y:e.dataset.origPosY-e.dataset.interPosY}
,c=b._getPrefixedCSS("transform","translate("+g.x+"px,"+g.y+"px)");f.css(c),b.animation.animateResizeTargets&&(e.style.width=e.dataset.origWidth+"px",e.style.height=e.dataset.origHeight+"px",e.dataset.origWidth-e.dataset.finalWidth&&(e.style.marginRight=-(e.dataset.origWidth-e.dataset.interWidth)+1*e.dataset.origMarginRight+"px"),e.dataset.origHeight-e.dataset.finalHeight&&(e.style.marginBottom=-(e.dataset.origHeight-e.dataset.interHeight)+1*e.dataset.origMarginBottom+"px"))}
b._execAction("_prepTargets",1)}
,_animateTargets:function(){var b=this;b._execAction("_animateTargets",0),b._targetsDone=0,b._targetsBound=0,b._$parent.css(b._getPrefixedCSS("perspective",b.animation.perspectiveDistance+"px")).css(b._getPrefixedCSS("perspective-origin",b.animation.perspectiveOrigin)),b.animation.animateResizeContainer&&b._$parent.css(b._getPrefixedCSS("transition","height "+b.animation.duration+"ms ease")).css("height",b._newHeight+"px");for(var c=0;c<b._$toShow.length;c++){var d=b._$toShow[c],e=a(d),f={x:d.dataset.finalPosX-d.dataset.interPosX,y:d.dataset.finalPosY-d.dataset.interPosY}
,g=b._getDelay(c),h={}
;d.style.opacity="";for(var i=0;2>i;i++){var j=0===i?j=b._prefix:"";b._ff&&b._ff<=20&&(h[j+"transition-property"]="all",h[j+"transition-timing-function"]=b.animation.easing+"ms",h[j+"transition-duration"]=b.animation.duration+"ms"),h[j+"transition-delay"]=g+"ms",h[j+"transform"]="translate("+f.x+"px,"+f.y+"px)"}
(b.effects.transform||b.effects.opacity)&&b._bindTargetDone(e),b._ff&&b._ff<=20?e.css(h):e.css(b.effects.transition).css(h)}
for(var c=0;c<b._$pre.length;c++){var d=b._$pre[c],e=a(d),f={x:d.dataset.finalPosX-d.dataset.interPosX,y:d.dataset.finalPosY-d.dataset.interPosY}
,g=b._getDelay(c);(d.dataset.finalPosX!==d.dataset.origPosX||d.dataset.finalPosY!==d.dataset.origPosY)&&b._bindTargetDone(e),e.css(b._getPrefixedCSS("transition","all "+b.animation.duration+"ms "+b.animation.easing+" "+g+"ms")),e.css(b._getPrefixedCSS("transform","translate("+f.x+"px,"+f.y+"px)")),b.animation.animateResizeTargets&&(d.dataset.origWidth-d.dataset.finalWidth&&1*d.dataset.finalWidth&&(d.style.width=d.dataset.finalWidth+"px",d.style.marginRight=-(d.dataset.finalWidth-d.dataset.interWidth)+1*d.dataset.finalMarginRight+"px"),d.dataset.origHeight-d.dataset.finalHeight&&1*d.dataset.finalHeight&&(d.style.height=d.dataset.finalHeight+"px",d.style.marginBottom=-(d.dataset.finalHeight-d.dataset.interHeight)+1*d.dataset.finalMarginBottom+"px"))}
b._changingClass&&b._$container.removeClass(b.layout.containerClass).addClass(b._newClass);for(var c=0;c<b._$toHide.length;c++){for(var d=b._$toHide[c],e=a(d),g=b._getDelay(c),k={}
,i=0;2>i;i++){var j=0===i?j=b._prefix:"";k[j+"transition-delay"]=g+"ms",k[j+"transform"]=b.effects.transformOut,k.opacity=b.effects.opacity}
e.css(b.effects.transition).css(k),(b.effects.transform||b.effects.opacity)&&b._bindTargetDone(e)}
b._execAction("_animateTargets",1)}
,_bindTargetDone:function(b){var c=this,d=b[0];c._execAction("_bindTargetDone",0,arguments),d.dataset.bound||(d.dataset.bound=!0,c._targetsBound++,b.on("webkitTransitionEnd.mixItUp transitionend.mixItUp",function(e){(e.originalEvent.propertyName.indexOf("transform")>-1||e.originalEvent.propertyName.indexOf("opacity")>-1)&&a(e.originalEvent.target).is(c.selectors.target)&&(b.off(".mixItUp"),d.dataset.bound="",c._targetDone())}
)),c._execAction("_bindTargetDone",1,arguments)}
,_targetDone:function(){var a=this;a._execAction("_targetDone",0),a._targetsDone++,a._targetsDone===a._targetsBound&&a._cleanUp(),a._execAction("_targetDone",1)}
,_cleanUp:function(){var b=this,c=b.animation.animateResizeTargets?"transform opacity width height margin-bottom margin-right":"transform opacity",d=function(){b._$targets.removeStyle("transition",b._prefix)}
;b._execAction("_cleanUp",0),b._changingLayout?b._$show.css("display",b._newDisplay):b._$show.css("display",b.layout.display),b._$targets.css(b._brake),b._$targets.removeStyle(c,b._prefix).removeAttr("data-inter-pos-x data-inter-pos-y data-final-pos-x data-final-pos-y data-orig-pos-x data-orig-pos-y data-orig-height data-orig-width data-final-height data-final-width data-inter-width data-inter-height data-orig-margin-right data-orig-margin-bottom data-inter-margin-right data-inter-margin-bottom data-final-margin-right data-final-margin-bottom"),b._$hide.removeStyle("display"),b._$parent.removeStyle("height transition perspective-distance perspective perspective-origin-x perspective-origin-y perspective-origin perspectiveOrigin",b._prefix),b._sorting&&(b._printSort(),b._activeSort=b._newSortString,b._sorting=!1),b._changingLayout&&(b._changingDisplay&&(b.layout.display=b._newDisplay,b._changingDisplay=!1),b._changingClass&&(b._$parent.removeClass(b.layout.containerClass).addClass(b._newClass),b.layout.containerClass=b._newClass,b._changingClass=!1),b._changingLayout=!1),b._refresh(),b._buildState(),b._state.fail&&b._$container.addClass(b.layout.containerClassFail),b._$show=a(),b._$hide=a(),window.requestAnimationFrame&&requestAnimationFrame(d),b._mixing=!1,"function"==typeof b.callbacks._user&&b.callbacks._user.call(b._domNode,b._state,b),"function"==typeof b.callbacks.onMixEnd&&b.callbacks.onMixEnd.call(b._domNode,b._state,b),b._$container.trigger("mixEnd",[b._state,b]),b._state.fail&&("function"==typeof b.callbacks.onMixFail&&b.callbacks.onMixFail.call(b._domNode,b._state,b),b._$container.trigger("mixFail",[b._state,b])),b._loading&&("function"==typeof b.callbacks.onMixLoad&&b.callbacks.onMixLoad.call(b._domNode,b._state,b),b._$container.trigger("mixLoad",[b._state,b])),b._queue.length&&(b._execAction("_queue",0),b.multiMix(b._queue[0][0],b._queue[0][1],b._queue[0][2]),b._queue.splice(0,1)),b._execAction("_cleanUp",1),b._loading=!1}
,_getPrefixedCSS:function(a,b,c){var d=this,e={}
,f="",g=-1;for(g=0;2>g;g++)f=0===g?d._prefix:"",c?e[f+a]=f+b:e[f+a]=b;return d._execFilter("_getPrefixedCSS",e,arguments)}
,_getDelay:function(a){var b=this,c="function"==typeof b.animation.staggerSequence?b.animation.staggerSequence.call(b._domNode,a,b._state):a,d=b.animation.stagger?c*b.animation.staggerDuration:0;return b._execFilter("_getDelay",d,arguments)}
,_parseMultiMixArgs:function(a){for(var b=this,c={command:null,animate:b.animation.enable,callback:null}
,d=0;d<a.length;d++){var e=a[d];null!==e&&("object"==typeof e||"string"==typeof e?c.command=e:"boolean"==typeof e?c.animate=e:"function"==typeof e&&(c.callback=e))}
return b._execFilter("_parseMultiMixArgs",c,arguments)}
,_parseInsertArgs:function(b){for(var c=this,d={index:0,$object:a(),multiMix:{filter:c._state.activeFilter}
,callback:null}
,e=0;e<b.length;e++){var f=b[e];"number"==typeof f?d.index=f:"object"==typeof f&&f instanceof a?d.$object=f:"object"==typeof f&&c._helpers._isElement(f)?d.$object=a(f):"object"==typeof f&&null!==f?d.multiMix=f:"boolean"!=typeof f||f?"function"==typeof f&&(d.callback=f):d.multiMix=!1}
return c._execFilter("_parseInsertArgs",d,arguments)}
,_execAction:function(a,b,c){var d=this,e=b?"post":"pre";if(!d._actions.isEmptyObject&&d._actions.hasOwnProperty(a))for(var f in d._actions[a][e])d._actions[a][e][f].call(d,c)}
,_execFilter:function(a,b,c){var d=this;if(d._filters.isEmptyObject||!d._filters.hasOwnProperty(a))return b;for(var e in d._filters[a])return d._filters[a][e].call(d,c)}
,_helpers:{_camelCase:function(a){return a.replace(/-([a-z])/g,function(a){return a[1].toUpperCase()}
)}
,_isElement:function(a){return window.HTMLElement?a instanceof HTMLElement:null!==a&&1===a.nodeType&&"string"===a.nodeName}
}
,isMixing:function(){var a=this;return a._execFilter("isMixing",a._mixing)}
,filter:function(){var a=this,b=a._parseMultiMixArgs(arguments);a._clicking&&(a._toggleString=""),a.multiMix({filter:b.command}
,b.animate,b.callback)}
,sort:function(){var a=this,b=a._parseMultiMixArgs(arguments);a.multiMix({sort:b.command}
,b.animate,b.callback)}
,changeLayout:function(){var a=this,b=a._parseMultiMixArgs(arguments);a.multiMix({changeLayout:b.command}
,b.animate,b.callback)}
,multiMix:function(){var a=this,c=a._parseMultiMixArgs(arguments);if(a._execAction("multiMix",0,arguments),a._mixing)a.animation.queue&&a._queue.length<a.animation.queueLimit?(a._queue.push(arguments),a.controls.enable&&!a._clicking&&a._updateControls(c.command),a._execAction("multiMixQueue",1,arguments)):("function"==typeof a.callbacks.onMixBusy&&a.callbacks.onMixBusy.call(a._domNode,a._state,a),a._$container.trigger("mixBusy",[a._state,a]),a._execAction("multiMixBusy",1,arguments));else{a.controls.enable&&!a._clicking&&(a.controls.toggleFilterButtons&&a._buildToggleArray(),a._updateControls(c.command,a.controls.toggleFilterButtons)),a._queue.length<2&&(a._clicking=!1),delete a.callbacks._user,c.callback&&(a.callbacks._user=c.callback);var d=c.command.sort,e=c.command.filter,f=c.command.changeLayout;a._refresh(),d&&(a._newSort=a._parseSort(d),a._newSortString=d,a._sorting=!0,a._sort()),e!==b&&(e="all"===e?a.selectors.target:e,a._activeFilter=e),a._filter(),f&&(a._newDisplay="string"==typeof f?f:f.display||a.layout.display,a._newClass=f.containerClass||"",(a._newDisplay!==a.layout.display||a._newClass!==a.layout.containerClass)&&(a._changingLayout=!0,a._changingClass=a._newClass!==a.layout.containerClass,a._changingDisplay=a._newDisplay!==a.layout.display)),a._$targets.css(a._brake),a._goMix(c.animate^a.animation.enable?c.animate:a.animation.enable),a._execAction("multiMix",1,arguments)}
}
,insert:function(){var a=this,b=a._parseInsertArgs(arguments),c="function"==typeof b.callback?b.callback:null,d=document.createDocumentFragment(),e=function(){return a._refresh(),a._$targets.length?b.index<a._$targets.length||!a._$targets.length?a._$targets[b.index]:a._$targets[a._$targets.length-1].nextElementSibling:a._$parent[0].children[0]}
();if(a._execAction("insert",0,arguments),b.$object){for(var f=0;f<b.$object.length;f++){var g=b.$object[f];d.appendChild(g),d.appendChild(document.createTextNode(" "))}
a._$parent[0].insertBefore(d,e)}
a._execAction("insert",1,arguments),"object"==typeof b.multiMix&&a.multiMix(b.multiMix,c)}
,prepend:function(){var a=this,b=a._parseInsertArgs(arguments);a.insert(0,b.$object,b.multiMix,b.callback)}
,append:function(){var a=this,b=a._parseInsertArgs(arguments);a.insert(a._state.totalTargets,b.$object,b.multiMix,b.callback)}
,getOption:function(a){var c=this,d=function(a,c){for(var d=c.split("."),e=d.pop(),f=d.length,g=1,h=d[0]||c;(a=a[h])&&f>g;)h=d[g],g++;return a!==b?a[e]!==b?a[e]:a:void 0}
;return a?c._execFilter("getOption",d(c,a),arguments):c}
,setOptions:function(b){var c=this;c._execAction("setOptions",0,arguments),"object"==typeof b&&a.extend(!0,c,b),c._execAction("setOptions",1,arguments)}
,getState:function(){var a=this;return a._execFilter("getState",a._state,a)}
,forceRefresh:function(){var a=this;a._refresh(!1,!0)}
,destroy:function(b){var c=this,d=a.MixItUp.prototype._bound._filter,e=a.MixItUp.prototype._bound._sort;c._execAction("destroy",0,arguments),c._$body.add(a(c.selectors.sort)).add(a(c.selectors.filter)).off(".mixItUp");for(var f=0;f<c._$targets.length;f++){var g=c._$targets[f];b&&(g.style.display=""),delete g.mixParent}
c._execAction("destroy",1,arguments),d[c.selectors.filter]&&d[c.selectors.filter]>1?d[c.selectors.filter]--:1===d[c.selectors.filter]&&delete d[c.selectors.filter],e[c.selectors.sort]&&e[c.selectors.sort]>1?e[c.selectors.sort]--:1===e[c.selectors.sort]&&delete e[c.selectors.sort],delete a.MixItUp.prototype._instances[c._id]}
}
,a.fn.mixItUp=function(){var c,d=arguments,e=[],f=function(b,c){var d=new a.MixItUp,e=function(){return("00000"+(16777216*Math.random()<<0).toString(16)).substr(-6).toUpperCase()}
;d._execAction("_instantiate",0,arguments),b.id=b.id?b.id:"MixItUp"+e(),d._instances[b.id]||(d._instances[b.id]=d,d._init(b,c)),d._execAction("_instantiate",1,arguments)}
;return c=this.each(function(){if(d&&"string"==typeof d[0]){var c=a.MixItUp.prototype._instances[this.id];if("isLoaded"===d[0])e.push(c?!0:!1);else{var g=c[d[0]](d[1],d[2],d[3]);g!==b&&e.push(g)}
}
else f(this,d[0])}
),e.length?e.length>1?e:e[0]:c}
,a.fn.removeStyle=function(c,d){return d=d?d:"",this.each(function(){for(var e=this,f=c.split(" "),g=0;g<f.length;g++)for(var h=0;4>h;h++){switch(h){case 0:var i=f[g];break;case 1:var i=a.MixItUp.prototype._helpers._camelCase(i);break;case 2:var i=d+f[g];break;case 3:var i=a.MixItUp.prototype._helpers._camelCase(d+f[g])}
if(e.style[i]!==b&&"unknown"!=typeof e.style[i]&&e.style[i].length>0&&(e.style[i]=""),!d&&1===h)break}
e.attributes&&e.attributes.style&&e.attributes.style!==b&&""===e.attributes.style.value&&e.attributes.removeNamedItem("style")}
)}
}
(jQuery); 