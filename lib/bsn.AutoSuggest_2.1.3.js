/*
 *  Author:		Timothy Groves - http://www.brandspankingnew.net
 *  Modified by Unseen Studios - http://unseenstudios.com  for Cryptasia - http://crypt.asia
 */

_b = {};
_b.Autosuggest = {};

_b.AutoSuggest = function (id, param) {
    // no DOM - give up!
    //
    if (!document.getElementById)
        return 0;

    // get field via DOM
    this.fld = _b.DOM.gE(id);

    if (!this.fld)
        return 0;

    // init variables
    this.sInp = "";
    this.nInpC = 0;
    this.aSug = [];
    this.iHigh = 0;

    // parameters object
    this.oP = param ? param : {};

    // defaults	
    var k, def = {
        autoselect: 0,
        minchars: 1,
        meth: "get",
        varname: "input",
        className: "autosuggest",
        timeout: 2500,
        delay: 0,
        offsety: -5,
        shownoresults: true,
        noresults: "No matching service!",
        maxheight: 250,
        cache: false, // can't cache because we don't match exactly
        maxentries: 25
    };
    for (k in def) {
        if (typeof (this.oP[k]) != typeof (def[k])) { this.oP[k] = def[k]; }
    }

    // set keyup handler for field
    // and prevent autocomplete from client
    var p = this;

    // NOTE: not using addEventListener because UpArrow fired twice in Safari
    //_b.DOM.addEvent( this.fld, 'keyup', function(ev){ return pointer.onKeyPress(ev); } );

    this.fld.onkeydown = function (ev) { return p.onKeyPress(ev); };
    this.fld.onkeyup = function (ev) { return p.onKeyUp(ev); };

    this.fld.setAttribute("autocomplete", "off");
};

_b.AutoSuggest.prototype.onKeyPress = function (ev) {
    var key = (window.event) ? window.event.keyCode : ev.keyCode;

    this.fld.style.backgroundColor = '';

    // set responses to keydown events in the field
    // this allows the user to use the arrow keys to scroll through the results
    // ESCAPE clears the list
    // TAB sets the current highlighted value
    //
    var RETURN = 13;
    var TAB = 9;
    var ESC = 27;
    var ARRUP = 38;
    var ARRDN = 40;

    var bubble = 1;

    switch (key) {
        case TAB:
            bubble = 0;
        case RETURN:
            if (!this.setHighlightedValue()) {
                this.getSuggestions(this.fld.value);
            }
            break;

        case ESC:
            this.clearSuggestions();
            break;

        case ARRUP:
            this.changeHighlight(key);
            bubble = 0;
            break;


        case ARRDN:
            this.changeHighlight(key);
            bubble = 0;
            break;


        default:
    }

    return bubble;
};

_b.AutoSuggest.prototype.onKeyUp = function (ev) {
    var key = (window.event) ? window.event.keyCode : ev.keyCode;



    // set responses to keydown events in the field
    // this allows the user to use the arrow keys to scroll through the results
    // ESCAPE clears the list
    // TAB sets the current highlighted value
    //
    var bubble = 1;

    this.getSuggestions(this.fld.value);

    return bubble;
};

_b.AutoSuggest.prototype.getSuggestions = function (val) {
    // if input stays the same, do nothing
    if (val == this.sInp) {
        return 0;
    }

    // kill list
    //
//    _b.DOM.remE(this.idAs);


    this.sInp = val;


    // input length is less than the min required to trigger a request
    // do nothing
    //
    if (val.length < this.oP.minchars) {
        this.aSug = [];
        this.nInpC = val.length;
        return 0;
    }




    var ol = this.nInpC; // old length
    this.nInpC = val.length ? val.length : 0;


    // if caching enabled, and user is typing (ie. length of input is increasing)
    // filter results out of aSuggestions from last request
    var l = this.aSug.length;
    if (this.nInpC > ol && l && l < this.oP.maxentries && this.oP.cache) {
        var arr = [];
        for (var i = 0; i < l; i++) {
            if (this.aSug[i].value.toLowerCase().indexOf(val.toLowerCase()) >= 0)
                arr.push(this.aSug[i]);
        }

        this.aSug = arr;

        this.createList(this.aSug);

        return false;
    } else {
        // do new request
        var pointer = this;
        var input = this.sInp;
        clearTimeout(this.ajID);
        if (this.oP.delay) {
            this.ajID = setTimeout(function () { pointer.doAjaxRequest(input) }, this.oP.delay);
        } else {
            this.ajID = pointer.doAjaxRequest(input);
        }
    }

    return false;
};



// make async request for js
function loadScriptFromURL(url) {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = url;
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
}

_b.AutoSuggest.prototype.doAjaxRequest = function (input) {
    // check that saved input is still the value of the field
    if (input != this.fld.value)
        return false;

    onGetSuggestions(input.toLowerCase());
};


_b.AutoSuggest.prototype.createList = function (arr) {
    var pointer = this;

    // reset the list removal timeout
    this.killTimeout();
    this.toID = setTimeout(function () { pointer.clearSuggestions() }, this.oP.timeout);

    // If the list is already processed, stop the list from flashing
    this.lastList = arr;

    // get rid of old list
    _b.DOM.remE(this.idAs);

    if (document.activeElement !== this.fld) {
        // invoke the callback always
        if (arr.length > 0 && (typeof (this.oP.callback) == "function")) { this.oP.callback(arr[0]); }
        return false;
    }


    // if no results, and shownoresults is false, do nothing
    if (arr.length == 0 && !this.oP.shownoresults)
        return false;


    // create holding div
    var div = _b.DOM.cE("div", { id: this.idAs, className: this.oP.className });

    var hcorner = _b.DOM.cE("div", { className: "as_corner" });
    var hbar = _b.DOM.cE("div", { className: "as_bar" });
    var header = _b.DOM.cE("div", { className: "as_header" });
    header.appendChild(hcorner);
    header.appendChild(hbar);
    div.appendChild(header);




    // create and populate ul
    var ul = _b.DOM.cE("ul", { id: "as_ul" });




    // loop throught arr of suggestions
    // creating an LI element for each suggestion
    for (var i = 0; i < arr.length; i++) {
        // format output with the input enclosed in a EM element
        // (as HTML, not DOM)
        var val = arr[i].value;
        var st = val.toLowerCase().indexOf(this.sInp.toLowerCase());
        var output = val.substring(0, st) + "<em>" + val.substring(st, st + this.sInp.length) + "</em>" + val.substring(st + this.sInp.length);


        var span = _b.DOM.cE("span", {}, output, true);
        if (arr[i].info != "") {
            var br = _b.DOM.cE("br", {});
            span.appendChild(br);
            var small = _b.DOM.cE("small", {}, arr[i].info);
            span.appendChild(small);
        }

        var a = _b.DOM.cE("a", { href: "#" });

        var tl = _b.DOM.cE("span", { className: "tl" }, " ");
        var tr = _b.DOM.cE("span", { className: "tr" }, " ");
        a.appendChild(tl);
        a.appendChild(tr);

        a.appendChild(span);

        a.name = i + 1;
        a.onclick = function () { pointer.setHighlightedValue(); pointer.focusNext(); return false; };
        a.onmouseover = function () { pointer.setHighlight(this.name); };

        var li = _b.DOM.cE("li", {}, a);

        ul.appendChild(li);
    }


    // no results
    if (arr.length == 0 && this.oP.shownoresults) {
        var li = _b.DOM.cE("li", { className: "as_warning" }, this.oP.noresults);
        ul.appendChild(li);
    }


    div.appendChild(ul);

    var fcorner = _b.DOM.cE("div", { className: "as_corner" });
    var fbar = _b.DOM.cE("div", { className: "as_bar" });
    var footer = _b.DOM.cE("div", { className: "as_footer" });
    footer.appendChild(fcorner);
    footer.appendChild(fbar);
    div.appendChild(footer);

    // get position of target textfield
    // position holding div below it
    // set width of holding div to width of field
    var pos = _b.DOM.getPos(this.fld);

    div.style.left = pos.x + "px";
    div.style.top = (pos.y + this.fld.offsetHeight + this.oP.offsety) + "px";
    div.style.width = this.fld.offsetWidth + "px";

    // highlight the first item
    this.iHigh = 0;

    // set mouseover functions for div
    // when mouse pointer leaves div, set a timeout to remove the list after an interval
    // when mouse enters div, kill the timeout so the list won't be removed
    div.onmouseover = function () { pointer.killTimeout() };
    div.onmouseout = function () { pointer.resetTimeout() };

    // add DIV to document
    document.getElementsByTagName("body")[0].appendChild(div);


    // highlight the first item
    this.setHighlight(1);
};















_b.AutoSuggest.prototype.changeHighlight = function (key) {
    var list = _b.DOM.gE("as_ul");
    if (!list)
        return false;

    var n;

    if (key == 40)
        n = this.iHigh + 1;
    else if (key == 38)
        n = this.iHigh - 1;


    if (n > list.childNodes.length)
        n = list.childNodes.length;
    if (n < 1)
        n = 1;


    this.setHighlight(n);
};



_b.AutoSuggest.prototype.setHighlight = function (n) {
    var list = _b.DOM.gE("as_ul");
    if (!list)
        return false;

    if (this.iHigh > 0)
        this.clearHighlight();

    this.iHigh = Number(n);

    list.childNodes[this.iHigh - 1].className = "as_highlight";


};


_b.AutoSuggest.prototype.clearHighlight = function () {
    var list = _b.DOM.gE("as_ul");
    if (!list)
        return false;

    if (this.iHigh > 0) {
        list.childNodes[this.iHigh - 1].className = "";
        this.iHigh = 0;
    }
};

_b.AutoSuggest.prototype.focusNext = function () {
    if (this.oP.next !== null) { this.oP.next.focus(); }
}

_b.AutoSuggest.prototype.setHighlightedValue = function () {
    if (!this.iHigh || this.aSug.length < this.iHigh) return 0;
    this.sInp = this.fld.value = this.aSug[this.iHigh - 1].value;

    this.clearSuggestions();

    // pass selected object to callback function, if exists
    if (typeof (this.oP.callback) == "function") {
        this.oP.callback(this.aSug[this.iHigh - 1]);
    }

    return 1;
};













_b.AutoSuggest.prototype.killTimeout = function () {
    clearTimeout(this.toID);
};

_b.AutoSuggest.prototype.resetTimeout = function () {
    clearTimeout(this.toID);
    var pointer = this;
    this.toID = setTimeout(function () { pointer.clearSuggestions() }, 1000);
};


_b.AutoSuggest.prototype.clearSuggestions = function () {
    this.killTimeout();

    var ele = _b.DOM.gE(this.idAs);
    var pointer = this;
    if (ele) {
        _b.DOM.remE(pointer.idAs);
    }
};


// DOM PROTOTYPE _____________________________________________
_b.DOM = {};

// create element
_b.DOM.cE = function (type, attr, cont, html) {
    var ne = document.createElement(type);
    if (!ne)
        return 0;

    for (var a in attr)
        ne[a] = attr[a];

    var t = typeof (cont);

    if (t == "string" && !html)
        ne.appendChild(document.createTextNode(cont));
    else if (t == "string" && html)
        ne.innerHTML = cont;
    else if (t == "object")
        ne.appendChild(cont);

    return ne;
};

/* get element */
_b.DOM.gE = function (e) {
    var t = typeof (e);
    if (t == "undefined")
        return 0;
    else if (t == "string") {
        var re = document.getElementById(e);
        if (!re)
            return 0;
        else if (typeof (re.appendChild) != "undefined")
            return re;
        else
            return 0;
    }
    else if (typeof (e.appendChild) != "undefined")
        return e;
    else
        return 0;
};

/* remove element */
_b.DOM.remE = function (ele) {
    var e = this.gE(ele);

    if (!e)
        return 0;
    else if (e.parentNode.removeChild(e))
        return true;
    else
        return 0;
};

/* get position */
_b.DOM.getPos = function (e) {
    var e = this.gE(e);

    var obj = e;

    var curleft = 0;
    if (obj.offsetParent) {
        while (obj.offsetParent) {
            curleft += obj.offsetLeft;
            obj = obj.offsetParent;
        }
    }
    else if (obj.x)
        curleft += obj.x;

    var obj = e;

    var curtop = 0;
    if (obj.offsetParent) {
        while (obj.offsetParent) {
            curtop += obj.offsetTop;
            obj = obj.offsetParent;
        }
    }
    else if (obj.y)
        curtop += obj.y;

    return { x: curleft, y: curtop };
};



// This function gets called when the js loads in response to the query
// from a Google sheet.
var service_password_settings = {};
var google = { visualization: { Query: { setResponse: function (data) {
    try {
        var table = data.table;
        as_json.aSug = [];
        for (var i = 0; i < table.rows.length; i++) {
            var row = table.rows[i];
            for (var j = 0; j < row.c.length; j++) { row.c[j].value = (typeof (row.c[j].f) !== 'undefined') ? row.c[j].f : row.c[j].v; }

            var service = row.c[1].value; // the nice service name
            as_json.aSug.push({ 'id': i, 'value': service, 'info': '' });
            service_password_settings[service] = {
                'url': row.c[0].value,
                'pwlen': parseInt(row.c[2].value, 10),
                'allow': row.c[3].value,
                'require': row.c[4].value,
                'key': row.c[5].value
            };
        }

        as_json.idAs = "as_" + as_json.fld.id;

        if (as_json.oP.autoselect && table.rows.length) {
            as_json.iHigh = 1;
            as_json.setHighlightedValue();
        } else {
            as_json.createList(as_json.aSug);
        }
    } catch (err) {
    }
}
}
}
};
