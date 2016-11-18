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
    for (var i = 0; i < links.length; i++) {
        // See if the link matches our watch list.
        if (links[i].href.match(watch_list_regex)) {
            //console.log(links[i])
            if (links[i].fakenewsmarked == "true") {
                // This link has already been processed.
                continue;
            }
            // Add a [Misleading] tag to the dom.
            console.log('Marking link as Misleading: ' + links[i].href);
            links[i].fakenewsmarked = 'true';
           var striped_lines_box = document.createElement('div');
            striped_lines_box.style.cssText = "background-image: url(https://i.imgur.com/m5Wjo7h.png); width: 100%;padding:0 10px;text-align:center; clear:both; display:inline-block;";

          var inner_text = document.createElement('span');
          inner_text.textContent = "Possibly Misleading Content";
          inner_text.style.cssText = "font-family: 'Lucida Console', Monaco, monospace; color: white; margin: auto; background: black; display: inline-block; height:100%; width: auto; text-align: center; font-size: 14px;padding: 4px;";

          striped_lines_box.appendChild(inner_text);
            // Go up 3 parents so that the tag is more visible in a reasonable place.
            // This is very specific to Facebook's current dom layout.
            //links[i].parentElement.parentElement.parentElement.appendChild(inner_text);
            var getParentsUntil = function(elem, parent, selector) {
                var parents = [];
                if (parent) {
                    var parentType = parent.charAt(0);
                }
                if (selector) {
                    var selectorType = selector.charAt(0);
                }
                // Get matches
                for (; elem && elem !== document; elem = elem.parentNode) {
                    // Check if parent has been reached
                    if (parent) {
                        // If parent is a class
                        if (parentType === '.') {
                            if (elem.classList.contains(parent.substr(1))) {
                                break;
                            }
                        }
                        // If parent is an ID
                        if (parentType === '#') {
                            if (elem.id === parent.substr(1)) {
                                break;
                            }
                        }
                        // If parent is a data attribute
                        if (parentType === '[') {
                            if (elem.hasAttribute(parent.substr(1, parent.length - 1))) {
                                break;
                            }
                        }
                        // If parent is a tag
                        if (elem.tagName.toLowerCase() === parent) {
                            break;
                        }
                    }
                    if (selector) {
                        // If selector is a class
                        if (selectorType === '.') {
                            if (elem.classList.contains(selector.substr(1))) {
                                parents.push(elem);
                            }
                        }
                        // If selector is an ID
                        if (selectorType === '#') {
                            if (elem.id === selector.substr(1)) {
                                parents.push(elem);
                            }
                        }
                        // If selector is a data attribute
                        if (selectorType === '[') {
                            if (elem.hasAttribute(selector.substr(1, selector.length - 1))) {
                                parents.push(elem);
                            }
                        }
                        // If selector is a tag
                        if (elem.tagName.toLowerCase() === selector) {
                            parents.push(elem);
                        }
                    } else {
                        parents.push(elem);
                    }
                }
                // Return parents if any exist
                if (parents.length === 0) {
                    return null ;
                } else {
                    return parents;
                }
            };
            var parentsUntil = getParentsUntil(links[i], '.userContentWrapper');
            console.log(parentsUntil);
            parentsUntil[parentsUntil.length - 1].style.cssText = "opacity: 0.5";
            parentsUntil[parentsUntil.length - 1].appendChild(striped_lines_box);
        }
    }
}
// Process the page once a second.
setInterval(TagLinks, 1000);
