/*
Copyright (c) 2012 Unseen Studios.  All rights reserved.  If you want to use this file, ask us.
THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var onGetSuggestions = function (input) {

    // Replace GOOGLE_URL_KEY below with the key from your Google spreadsheet in order to use a GoogleDoc as a data source.
    // You CAN use a private GoogleDoc as a data source!  That just means you have to be logged in to your Google account in order to access it.  So don't use Cryptasia to generate your Google password. :)
    // The format of the GoogleDoc should be:
    //   Column A:  URL to navigate to when "copy+go" is clicked
    //   Column B:  Name
    //   Column C:  Length
    //   Column D:  Characters to allow.  Ranges like [a-z][A-Z][0-9] are allowed.  DO NOT USE SPACES.
    //   Column E:  Characters to require.  Separate required sets by spaces.  Same ranges as in Column D are allowed.
    //   Column F:  Key to use for generating password.  If multiple lines have the same key, they make the same password!
    //   Column G:  Name to search for.  Usually a lowercase keyword.
    //   Column H (optional): notes!

    loadScriptFromURL('https://spreadsheets.google.com/a/google.com/tq?key=' + GOOGLE_URL_KEY + '&tq=' + encodeURIComponent("SELECT A,B,C,D,E,F WHERE lower(G) like '" + input + "%' OR lower(B) like '" + input + "%'"));
  }

// Uncomment this line and replace <YOUR_HOST> below to force the page to redirect to HTTPS protocol.
//if (document.location.protocol !== 'https:') { window.location = 'https://<YOUR_HOST>/index.html?id=karlgluck'; }