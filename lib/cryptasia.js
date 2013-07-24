/*
(The MIT License)
Copyright (c) 2012 Unseen Studios
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: 
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var $$ = function (id) { return document.getElementById(id); };

var on = function (element, event, listener) {
  if (!element) { return; }
  if (element.addEventListener) {
    element.addEventListener(event, listener, false);
  } else {
    element.attachEvent('on' + event, listener);
  }
};

var service  = $$('service'),
    phrase   = $$('passphrase'),
    form     = $$('form'),
    d_clip_button = $$('d_clip_button'),
    d_clip_container = $$('d_clip_container');

// From detectmobilebrowsers.com
var ismobile = (function (a, b) { return (/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))); })(navigator.userAgent || navigator.vendor || window.opera);
var hasflash = typeof (swfobject) === 'object' && swfobject.hasFlashPlayerVersion("9.0.0");
if (hasflash) {
    var noflash = $$('noflash'); noflash.parentNode.removeChild(noflash);
    var setWord = function (value) { word.value = value; }
} else {
    d_clip_container.style.display = 'none';
    var flash = $$('flash'); flash.parentNode.removeChild(flash);
    var setWord = function (value) {
        var len = value.length;
        var front = (len > 18 ? 18 : len) / 3;
        var back = len - front;
        var size = word.style.fontSize.length > 0 ? parseInt(word.style.fontSize) : 18;
        var spacing = word.style.letterSpacing.length > 0 ? parseInt(word.style.letterSpacing) : -1;
        var height = word.offsetHeight;

        word.value = value;
        while (word.scrollWidth > word.offsetWidth) {
            word.style.fontSize = (--size) + 'px';
        }
        word.style.lineHeight = word.style.height = height + 'px';
    };

}
var word = $$('word');
if (ismobile) {
    on(service, 'focus', function () {
        // make the mobilebuffer bigger (so we can scroll down) and put the page's top edge to the top of the service input
        var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],top=form.offsetTop-1,
            mobilebuffer = $$('mobilebuffer');
        mobilebuffer.style.height = ((w.innerHeight||e.clientHeight||g.clientHeight)+top-mobilebuffer.offsetTop) + 'px';
        window.scroll(0, top);
    });
}

function onNoService() {
    document.getElementById('missing').style.display = 'block';
    service.style.backgroundColor = '#F54747';
    d_clip_container.style.backgroundColor = 'gray';
    word.style.backgroundColor = 'gray';
}
function onTypingService() {
    d_clip_container.style.backgroundColor = '';
    word.style.backgroundColor = '';
    service.style.backgroundColor = '';
    word.value = '';
}
function serviceSelected() {
    onTypingService();
    service.style.backgroundColor = '#B0F7B0';
}

var lastCalculatedPhrase = '';
var lastCalculatedService = '';
function phraseImageUrl () {
    "use strict";
    var vault_settings = { phrase: phrase.value, length: 5, allow: '=>?@[A-Z]', require: '' };
    var img = (new Vault(vault_settings)).generate('').split('');

    var w = 1 + (img[1].charCodeAt() % 10),
        x = 800, //document.body.offsetWidth,
        y = hasflash ? form.offsetHeight : (word.offsetTop-form.offsetTop),
        z = ["animals", "city", "food", "nature", "technics", "transport"];
    z = z[img[3].charCodeAt() % z.length];
    return 'url(http://lorempixel.com/' + x + '/' + y + '/' + z + '/' + w + ')';
}

function updatePhraseImage () {
    "use strict";

    if (phrase.value.length <= 1) { return; }

    // Compute the password & update the phrase if this is a valid service
    if (typeof (service_password_settings[service.value]) === 'object') {

        word.style.backgroundColor = '';
        try {
            var settings = service_password_settings[service.value],
            vault_settings = {
                allow: settings.allow,
                require: settings.require,
                phrase: phrase.value,
                length: settings.pwlen
            };
            setWord((new Vault(vault_settings)).generate(settings.key));
            if (typeof (clip) === 'object') { clip.setText(word.value); }
            phrase.style.backgroundColor = '#B0F7B0';
            word.style.backgroundColor = '#B0F7B0';
        } catch (e) {
            word.value = 'Oops! ' + e.message;
            word.style.backgroundColor = '#F54747';
        }

        if (phrase.value != lastCalculatedPhrase) {
            form.style.backgroundImage = phraseImageUrl();
        }

        lastCalculatedPhrase = phrase.value;
    } else {
        // can't make a password with an unknown service
        onNoService();
    }

    lastCalculatedService = service.value;
}

function setUpdatePhraseImageTimeout () {
    "use strict";
    if (lastCalculatedPhrase === phrase.value && lastCalculatedService === service.value) { return; }
    if (updatePhraseImageTimeout !== null) {
        clearTimeout(updatePhraseImageTimeout);
        updatePhraseImageTimeout = null;
    }
    if (lastCalculatedPhrase !== phrase.value) {
        form.style.backgroundImage = '';
        phrase.style.backgroundColor = '';
        lastCalculatedPhrase = '';
    }
    word.value = '';
    word.style.backgroundColor = '';
    updatePhraseImageTimeout = setTimeout(updatePhraseImage, ismobile ? 1200 : 600);
}

on(phrase, 'blur', function () {
    if (updatePhraseImageTimeout !== null) {
        clearTimeout(updatePhraseImageTimeout);
        updatePhraseImageTimeout = null;
    }
    updatePhraseImage();
});
var updatePhraseImageTimeout = null;

var update = function () {
    setUpdatePhraseImageTimeout();
};

on(service, 'keydown', onTypingService);

on(service, 'keyup', function (e) {
    if (e.keyCode === 13) {
        as_json.oP['autoselect'] = 1;
        if (!ismobile) { phrase.focus(); }
    }
});

on(phrase, 'change', function (e) { update();  });
on(phrase, 'keyup', function (e) { update(); });
if (!ismobile) {
    on(phrase, 'keydown', function (e) {
        if (e.keyCode === 13) {
            // pretend that this is a tab
            word.focus(); word.select();
            return false;
        }
    });
}

on(service, 'focus', function (e) {
    as_json.oP['autoselect'] = 0;
});
on(phrase, 'focus', function (e) {
    as_json.oP['autoselect'] = 1;
});
on(service, 'blur', function (e) {
    setUpdatePhraseImageTimeout();
    as_json.oP['autoselect'] = 1;
});


var options = {
    script: 'http://spreadsheets.google.com/a/google.com/tq?key=0AulC2n1jPiyzdGdrdFhndE80b1NlbG5Ua3lUcU5LWHc&tq=',
    varname: "input",
    json: true,
    shownoresults: true,
    maxresults: 6,
    next: phrase,
    callback: function (obj) {
        serviceSelected();
    }
};
var as_json = new _b.AutoSuggest('service', options);

if (hasflash) {

    // Initialize ZeroClipboard for copying the password
    ZeroClipboard.setMoviePath('//s3.amazonaws.com/www.cryptasia.com/lib/ZeroClipboard.swf');
    var clip = new ZeroClipboard.Client();
    clip.setHandCursor(true);
    clip.glue('d_clip_button', 'd_clip_container');

    on(window, 'resize', function () { clip.reposition(); });

    clip.addEventListener('complete', function (client, text) {
        if (typeof (service_password_settings[service.value]) !== 'object') { return; }
        document.location = service_password_settings[service.value].url;
        d_clip_button.innerHTML = '<i>copied</i>';
        setTimeout(function () {
            d_clip_button.innerHTML = 'copy+go';
        }, 1000);
    });

} else {
    on($$('mobilego'), 'click', function () {
        if (typeof (service_password_settings[service.value]) === 'object') {
            word.value = '';
            document.location = service_password_settings[service.value].url;
        }
    });
}

if (!ismobile) { service.focus(); }

( function () {
    // If the url has a query at the end of it, this is the source
    // of the user ID (like ?id=userid) 
    var query = document.URL.split('?'), url, user = '', request_url;
    if (query.length == 2) {
        var key_value = query[1].split('=');
        if (key_value.length === 2) {
            if (key_value[0] === 'id') {
                user = key_value[1];
            }
        }
    } else {
        var url = (document.URL+'/').split('/').slice(0,4);
        if (url[2] === 'www.cryptasia.com') { user = url[3]; }
    }
    loadScriptFromURL('https://s3.amazonaws.com/www.cryptasia.com/data/'+user+'.js');

    if (user !== '') {
        $$('user').innerText = user;
        $$('main').style.display = 'none';
        $$('welcome').style.display = 'inline-block';
    }

    setWord(''); // sometimes browsers keep this around, which is bad
}());
