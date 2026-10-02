"""2026-10-02 · the opening's state model (idempotent; applied to index.html).

Loading the HOME page always plays the full 5,000 ms sequence, whatever the navigation type
(first visit, revisit, reload, hard reload, bookmark/direct URL, a full-page Back/Forward) and
whatever the cache or service-worker state: the clock never waits on the network. A deep link to
any other page shows the identity card only until the platform is ready. Navigation inside the app
never shows the opening. A page restored from the back-forward cache is shown exactly as it was
left (the opening is not replayed: nothing is reloaded)."""
import os
P = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), 'index.html')
s = open(P, encoding='utf-8').read()
def rep(a, b):
    global s
    if b in s and a not in s: return
    assert s.count(a) == 1, a[:90]; s = s.replace(a, b)
rep('''   says so. A reload, a Back/Forward step or a link to one page shows the same
   identity still and leaves as soon as the platform is ready; so does a
   reduced-motion preference, after 1.5 s. No timers, no storage, no network. */''',
'''   says so. THE STATE MODEL: loading the home page plays the full sequence
   every time (first visit, revisit, reload, bookmark, direct URL, a full-page
   Back/Forward), whatever is cached, because nothing here waits on the network.
   A deep link to another page shows the identity still only until the platform
   is ready. Navigation inside the app never shows it, and a page restored from
   the back-forward cache is shown as it was left. Reduced motion shows the still
   for 1.5 s. No timers, no storage, no network. */''')
rep(''' var again=false;
 try{var n=performance.getEntriesByType("navigation")[0];again=!!n&&(n.type==="reload"||n.type==="back_forward")}catch(e){}
 var h=(location.hash||"").replace(/^#\\/?/,"");
 var reduced=false;try{reduced=!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion:reduce)").matches)}catch(e){}
 if(again||(h&&!/^home(\\/|$)/.test(h)))I.mode="cover";''',
''' I.nav="navigate";try{var n=performance.getEntriesByType("navigation")[0];if(n)I.nav=n.type}catch(e){}
 var h=(location.hash||"").replace(/^#\\/?/,"");
 I.route=(!h||/^home(\\/|$)/.test(h))?"home":"deep";
 var reduced=false;try{reduced=!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion:reduce)").matches)}catch(e){}
 window.addEventListener("pageshow",function(e){if(e.persisted)I.restored=true});
 if(I.route!=="home")I.mode="cover";''')
rep('''T("Opening · a reload, Back/Forward or a link to one page does not replay the sequence",
   /reload/.test(clock)&&/back_forward/.test(clock)&&/I\\.mode="cover"/.test(clock));''',
'''T("Opening · the home page plays the full sequence on every kind of load; only a deep link to another page skips it",
   /I\\.route=/.test(clock)&&/if\\(I\\.route!=="home"\\)I\\.mode="cover"/.test(clock)&&!/type==="reload"/.test(clock)&&!/again\\|\\|/.test(clock));''')
open(P, 'w', encoding='utf-8').write(s); print('ok')
