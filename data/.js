/*
Copyright (c) 2012 Unseen Studios.  All rights reserved.  If you want to use this file, ask us.
THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var cryptasia = {};
cryptasia.ALL         = '[a-z][A-Z][0-9]()[]{}-_!"#\'$%&*+,./:;<=>?@\\^|~`';
cryptasia.ALPHANUM    = '[a-z][A-Z][0-9]';
var service_password_settings = {
'Gmail (Google)':{
'url':'http://www.gmail.com',
'pwlen':'100',
'allow':cryptasia.ALL,
'require':'',
'search':['gmail.com'],
'key':'google.com'
},
'Groupon':{
'url':'https://www.groupon.com/login',
'pwlen':'40',
'allow':cryptasia.ALL,
'require':'',
'search':['groupon.com'],
'key':'groupon.com'
},
'g+ (Google)':{
'url':'http://plus.google.com',
'pwlen':'100',
'allow':cryptasia.ALL,
'require':'',
'search':['g+'],
'key':'google.com'
},
'Google':{
'url':'https://accounts.google.com',
'pwlen':'100',
'allow':cryptasia.ALL,
'require':'',
'search':['google.com'],
'key':'google.com'
},
'Godaddy':{
'url':'http://www.godaddy.com',
'pwlen':'30',
'allow': cryptasia.ALPHANUM + '()[]{}-_!"#\'$%&*+,./:;<=>?@\\^|~`',
'require': '[a-z] [A-Z] [0-9]',
'search':['godaddy.com'],
'key':'godaddy.com'
},
'Ask.com':{
'url':'http://www.ask.com/',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['ask.com'],
'key':'ask.com'
},
'American Express':{
'url':'https://www.americanexpress.com/',
'pwlen':'20',
'allow':'[a-z][A-Z][0-9]%&_?#=-',
'require':'[a-z][A-Z] [0-9]',
'search':['amex', 'americanexpress.com'],
'key':'americanexpress.com'
},
'Amazon':{
'url':'http://www.amazon.com',
'pwlen':'50',
'allow':cryptasia.ALL,
'require':'',
'search':['amazon.com'],
'key':'amazon.com'
},
'Amazon Web Services (Amazon)':{
'url':'http://aws.amazon.com/console/',
'pwlen':'50',
'allow':cryptasia.ALL,
'require':'',
'search':['aws'],
'key':'amazon.com'
},
'AVG':{
'url':'https://myaccount.avg.com/us-en/my-account-login',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['avg.com'],
'key':'avg.com'
},
'AOL':{
'url':'https://my.screenname.aol.com/_cqr/login/login.psp',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['aol.com', 'aim'],
'key':'aol.com'
},
'Bing':{
'url':'http://www.bing.com',
'pwlen':'16',
'allow':cryptasia.ALL,
'require':'',
'search':['bing'],
'key':'home.live.com'
},
'Blogger':{
'url':'https://accounts.google.com/ServiceLogin?service=blogger&continue=http://www.blogger.com/home',
'pwlen':'100',
'allow':cryptasia.ALL,
'require':'',
'search':['blogger', 'blogspot'],
'key':'google.com'
},
'Citi Credit Cards':{
'url':'https://www.citicards.com/',
'pwlen':'32',
'allow':cryptasia.ALPHANUM,
'require':'[a-z][A-Z] [0-9]',
'search':['citicards.com'],
'key':'citicards.com'
},
'Craigslist':{
'url':'https://accounts.craigslist.org/login',
'pwlen':'40',
'allow':cryptasia.ALL,
'require':'',
'search':['craigslist.org'],
'key':'craigslist.org'
},
'CNN':{
'url':'http://www.cnn.com/?is_LR=1',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['cnn.com'],
'key':'cnn.com'
},
'Digg':{
'url':'http://digg.com/',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['digg.com'],
'key':'digg.com'
},
/*'Dropbox':{ // removed because zxcvbn locks up when entering long pw
'url':'https://www.dropbox.com/login',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['dropbox.com'],
'key':'dropbox.com'
},*/
'deviantART':{
'url':'https://www.deviantart.com/users/login',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['deviantart.com'],
'key':'deviantart.com'
},
'Dailymotion':{
'url':'http://www.dailymotion.com/us',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['dailymotion.com'],
'key':'dailymotion.com'
},
'DomainTools':{
'url':'https://secure.domaintools.com/log-in/',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['domaintools.com'],
'key':'domaintools.com'
},
'Drupal':{
'url':'http://drupal.org/user',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['drupal.org'],
'key':'drupal.org'
},
'Fidelity':{
'url':'https://oltx.fidelity.com/ftgw/fbc/ofsummary/defaultPage',
'pwlen':'12',
'allow':cryptasia.ALPHANUM,
'require':'',
'search':['fidelity.com'],
'key':'fidelity.com'
},
'Facebook':{
'url':'http://www.facebook.com',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['facebook.com'],
'key':'facebook.com'
},
'Flickr':{
'url':'https://login.yahoo.com/config/login?.src=flickrsignin',
'pwlen':'64',
'allow':cryptasia.ALL,
'require':'',
'search':['flickr.com'],
'key':'yahoo.com'
},
'Files Tube':{
'url':'http://www.filestube.com/account/login.html',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['filestube.com'],
'key':'filestube.com'
},
'Hotmail':{
'url':'https://signup.live.com/signup.aspx?wa=wsignin1.0&rpsnv=11&ct=1280795923&rver=5.5.4177.0&wp=MBI&wreply=http:%2F%2Fmail.live.com%2F&id=251248&mkt=en-us&bk=1280795923&rollrs=12&lic=1',
'pwlen':'16',
'allow':cryptasia.ALL,
'require':'',
'search':['hotmail'],
'key':'home.live.com'
},
'Huffington Post':{
'url':'http://www.huffingtonpost.com/',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['huffingtonpost.com'],
'key':'huffingtonpost.com'
},
'Hacker News (Y Combinator)':{
'url':'http://news.ycombinator.com/newslogin?whence=news',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['hacker news'],
'key':'news.ycombinator.com'
},
'Imgur':{
'url':'https://imgur.com/signin',
'pwlen':'254',
'allow':cryptasia.ALL,
'require':'',
'search':['imgur.com'],
'key':'imgur.com'
},
/*'IMDB':{
'url':'https://secure.imdb.com/register-imdb/login',
'pwlen':'64',
'allow':'',
'require':'',
'search':['imdb'],
'key':'imdb.com'
},*/
'ImageShack':{
'url':'http://imageshack.us/',
'pwlen':'16',
'allow':cryptasia.ALPHANUM,
'require':'',
'search':['imageshack.us'],
'key':'imageshack.us'
},
'LinkedIn':{
'url':'http://www.linkedin.com',
'pwlen':'250',
'allow':cryptasia.ALL,
'require':'',
'search':['linkedin.com'],
'key':'linkedin.com'
},
'LiveJournal.com':{
'url':'http://www.livejournal.com/',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['livejournal.com'],
'key':'livejournal.com'
},
'MSN':{
'url':'https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=11&ct=1340845315&rver=6.1.6206.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fhome.live.com%2F&lc=1033&id=251248&cbcxt=hom&mkt=en-US',
'pwlen':'16',
'allow':cryptasia.ALL,
'require':'',
'search':['msn'],
'key':'home.live.com'
},
/*'MySpace':{
'url':'https://www.myspace.com/signup',
'pwlen':'50',
'allow':'',
'require':'',
'search':['myspace.com'],
'key':'myspace.com'
},*/
'New York Times':{
'url':'https://myaccount.nytimes.com/auth/login',
'pwlen':'15',
'allow':cryptasia.ALPHANUM,
'require':'-_.',
'search':['nytimes.com'],
'key':'nytimes.com'
},
'Other (a basic 16-letter password)':{
'url':'#',
'pwlen':'16',
'allow':cryptasia.ALPHANUM,
'require':'',
'search':['other'],
'key':'other'
},
'Picasa (Google)':{
'url':'http://picasaweb.google.com',
'pwlen':'100',
'allow':cryptasia.ALL,
'require':'',
'search':['google.com'],
'key':'google.com'
},
'Pinterest':{
'url':'https://pinterest.com/login/?next=%2F',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['pinterest.com'],
'key':'pinterest.com'
},
'Reddit':{
'url':'https://ssl.reddit.com/login',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['reddit.com'],
'key':'reddit.com'
},
'SourceForge':{
'url':'https://sourceforge.net/account/login.php',
'pwlen':'32',
'allow':cryptasia.ALPHANUM,
'require':'',
'search':['sourceforge.net'],
'key':'sourceforge.net'
},
'Stack Overflow':{
'url':'http://stackoverflow.com/users/login',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['stackoverflow.com'],
'key':'stackoverflow.com'
},
/*'Skype':{
'url':'https://login.skype.com/account/login-form',
'pwlen':'20',
'allow':'',
'require':'',
'search':['skype.com'],
'key':'skype.com'
},*/
/*'StumbleUpon':{
'url':'https://www.stumbleupon.com/login',
'pwlen':'16',
'allow':'',
'require':'',
'search':['stumbleupon.com'],
'key':'stumbleupon.com'
},*/
/*'Scribd':{
'url':'http://www.scribd.com/',
'pwlen':'40',
'allow':'',
'require':'',
'search':['scribd.com'],
'key':'scribd.com'
},*/
'Twitter':{
'url':'http://twitter.com',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['twitter.com'],
'key':'twitter.com'
},
'Tumblr':{
'url':'https://www.tumblr.com/login',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['tumblr.com'],
'key':'tumblr.com'
},
'Tripadvisor':{
'url':'http://www.tripadvisor.com/',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['tripadvisor.com'],
'key':'tripadvisor.com'
},
/*'Target':{
'url':'https://www-secure.target.com/EverestLogin',
'pwlen':'20',
'allow':'',
'require':'',
'search':['target.com'],
'key':'target.com'
},*/
'Vimeo':{
'url':'http://vimeo.com/log_in',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['vimeo.com'],
'key':'vimeo.com'
},
'Windows Live':{
'url':'https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=11&ct=1340845315&rver=6.1.6206.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fhome.live.com%2F&lc=1033&id=251248&cbcxt=hom&mkt=en-US',
'pwlen':'16',
'allow':cryptasia.ALL,
'require':'',
'search':['windows', 'live'],
'key':'home.live.com'
},
'Wikipedia':{
'url':'http://commons.wikimedia.org/w/index.php?title=Special:UserLogin&returnto=Main+Page&returntoquery=type%3Dsignup',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['wikipedia'],
'key':'wikipedia.org'
},
'Wordpress':{
'url':'https://en.wordpress.com/wp-login.php',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['wordpress'],
'key':'wordpress.com'
},
'Weather Channel':{
'url':'https://registration.weather.com/ursa/login',
'pwlen':'257',
'allow':cryptasia.ALL,
'require':'',
'search':['weather'],
'key':'weather.com'
},
/*'Walmart':{
'url':'https://www.walmart.com/cservice/ya_index.gsp',
'pwlen':'11',
'allow':'',
'require':'',
'search':['walmart.com'],
'key':'walmart.com'
},*/
/*'Wall Street Journal':{
'url':'http://online.wsj.com/home-page',
'pwlen':'15',
'allow':'',
'require':'',
'search':['wall street journal', 'wsj'],
'key':'online.wsj.com'
},*/
'YouTube (Google)':{
'url':'https://accounts.google.com/ServiceLogin?service=youtube',
'pwlen':'100',
'allow':cryptasia.ALL,
'require':'',
'search':['youtube.com'],
'key':'google.com'
},
'Yahoo':{
'url':'http://www.yahoo.com',
'pwlen':'64',
'allow':cryptasia.ALL,
'require':'',
'search':['yahoo.com'],
'key':'yahoo.com'
},
'Yelp':{
'url':'http://www.yelp.com/login',
'pwlen':'16',
'allow':cryptasia.ALL,
'require':'',
'search':['yelp.com'],
'key':'yelp.com'
}
};

var onGetSuggestions = function (input) {
    "use strict";
    var services = [], sn, match, search, i;
    for (sn in service_password_settings) {
        search = service_password_settings[sn].search;
        search.push(sn.toLowerCase());
        for (match in search) {
            if (input === search[match].substring(0, input.length)) {
                services.push(sn);
            }
        }
    } 
    services = eliminateDuplicates(services);
    as_json.aSug = [];
    for (i in services) { as_json.aSug.push({ 'id': i, 'value': services[i], 'info': '' }); }
    as_json.idAs = "as_" + as_json.fld.id;
    if (as_json.oP.autoselect && as_json.aSug.length) {
        as_json.iHigh = 1;
        as_json.setHighlightedValue();
    } else {
        as_json.createList(as_json.aSug);
    }
};

function eliminateDuplicates(arr) {
  var i,
      len=arr.length,
      out=[],
      obj={};

  for (i=0;i<len;i++) {
    obj[arr[i]]=0;
  }
  for (i in obj) {
    out.push(i);
  }
  return out;
}