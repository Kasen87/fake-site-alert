// Add a tag to all anchor text which leads to a watch listed site.

// A regular expression which matches any links that are suspect.
// There are three parts to this regex, the first matches
// http://<beginning of domain name> or https://<beginning of domain name>
// The second is a giant "or" section which matches the main domain and any
// subdirectories that are needed.
// The third is a single / to end the domain page.
var watch_list_regex = /https?:\/\/([^\/]*\.)?(100percentfedup\.com|21stcenturywire\.com|70news\.wordpress\.com|abcnews\.com\.co|activistpost\.com|addictinginfo\.org|americannewsx\.com|samericannews\.com|anonews\.co|associatedmediacoverage\.com|beforeitsnews\.com|beingliberal\.org|bigamericannews\.com|bigpzone\.com|bipartisanreport\.com|www\.bizpacreview\.com|bluenationreview\.com|www\.breitbart\.com|thebostontribune\.com|cap-news\.com|christwire\.org|chronicle\.su|civictribune\.com|coasttocoastam\.com|collectiveevolution|consciouslifenews\.com|conservativeoutfitters\.com|wideawakeamerica\.com|countdowntozerotime\.com|counterpsyops\.com|creambmp\.com|dailybuzzlive\.com|dailycurrant\.com|dailywire\.com|dcclothesline\.com|dcgazette\.com|denverguardian\.com|derfmagazine\.com|disclose\.tv|drudgereport\.com\.co|duffleblog\.com|duhprogressive\.com|embols\.com|empireherald\.com|empirenews\.com|endingthefed\.com|enduringvision\.com|fprnradio\.com|thefreethoughtproject\.com|geoengineeringwatch\.org|govtslaves\.info|gulagbound\.com|hangthebankers\.com|humansarefree\.com|huzlers\.com|ifyouonlynews\.com|infowars\.com|intellihub\.com|inquisitor\.com|jonesreport\.com|lewrockwell\.com|liberalamerica\.org|libertytalk\.fm|libertyunyielding\.com|libertyvideos\.org|mediamass\.net|megynkelly\.us|msnbc\.com\.co|msnbc\.website|nahadaily\.com|nationalreport\.net|naturalnews\.com|nbc-news\.net|ncscooper\.com|newcenturytimes\.com|newsexaminer\.net|news-hound\.com|newsbiscuit\.com|newsbuzzdaily\.com|newslo\.com|newsmutiny\.com|newswatch28\.com|opposingviews\.com|newswire-24\.com|now8news\.com|nowtheendbegins\.com|occupydemocrats\.com|www\.pakalertpress\.com|politicalblindspot\.com|politicalears\.com|politicalo\.com|politicususa\.com|prisonplanet\.com|private-eye\.co\.uk|projectveritas\.com|react365\.com|realfarmacy\.com|realnewsrightnow\.com|redflagnews\.com|redstate\.com|rilenews\.com|satiratribune\.com|theblaze\.com|thefreethoughtproject\.com|newyorker\.com\/humor\/borowitz-report|other98\.com|www\.reporter\.bz|www\.thestatelyharold\.com|www\.thedailysheeple\.com|www\.thenewsnerd\.com|therundownlive\.com|theuspatriot\.com|truthfrequencyradio\.com|twitchy\.com|unconfirmedsources\.com|usasupreme\.com|blastingnews\.com|usuncut\.com|www\.veteranstoday\.com|wakingupwisconsin\.com|winningdemocrats\.com|witscience\.org|www\.wnd\.com|worldnewsdailyreport\.com|worldtruth\.tv|zerohedge\.com)\//;

// A function to clean up all links in the page.
var TagLinks = function() {
  var links = document.getElementsByTagName("a");
  // Loop over all links in the page.
  for (var i=0; i < links.length; i++) {
    // See if the link matches our watch list.
    if (links[i].href.match(watch_list_regex)) {
      console.log(links[i])
      if (links[i].lastChild.class == "fake-news-tag") {
        // This link has already been processed.
        continue;
      }
      // Add a [Misleading] tag to the dom.
      console.log('Marking link as Misleading: ' + links[i].href);
      links[i].fakenewsmarked = 'true';
      var inner_text = document.createElement('span');
      inner_text.textContent = "[Misleading]";
      inner_text.style.cssText = "font-family: 'Lucida Console', Monaco, monospace; font-size: 18px; color: red; font-weight: bold";
      // Go up 3 parents so that the tag is more visible in a reasonable place.
      // This is very specific to Facebook's current dom layout.
      links[i].parentElement.parentElement.parentElement.appendChild(inner_text);

      // Add an element as the last child which serves to make sure we only
      // process this link once.
      var hidden = document.createElement('div');
      hidden.textContent = "";
      hidden.style.cssText = "display: none";
      hidden.class = "fake-news-tag";
      links[i].appendChild(hidden);
    }
  }
}

// Process the page once a second.
setInterval(TagLinks, 1000);
