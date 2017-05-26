# [Distraction Free Facebook Messenger](https://chrome.google.com/webstore/detail/distraction-free-facebook/ipkbhlfkopeokhpbhgmlonagpppedfej) ![Analytics](https://ga-beacon.appspot.com/UA-47724303-2/docs/readme?pixel)

Distraction Free Facebook Messenger is a Chrome Extension that removes all of the temptation from Facebook Messenger.

## Feedback:

We always love feedback! Please note that this is still beta! 

Feel free to tweet me at [@jonathanjleung](http://twitter.com/jonathanjleung) or email me at [me@jonl.org](mailto:me@jonl.org) at any time.

Also, definitely file [issues](https://github.com/jonleung/distraction-free-facebook-messenger/issues) and [pull requests](https://github.com/jonleung/distraction-free-facebook-messenger/fork)!

[![Down](http://i.imgur.com/GCvIjTK.png)](https://chrome.google.com/webstore/detail/distraction-free-facebook/ipkbhlfkopeokhpbhgmlonagpppedfej)

## Screenshots

### *Start with clutter:*
![Screenshot](https://i.imgur.com/QI8pP4V.png)

### *Remove all of the temptations:*
![Screenshot](https://i.imgur.com/XfTZhEX.png)

### *Cleanup complete:*
![Screenshot](https://i.imgur.com/u2tA9vx.png)

## Features:

- no popup notifications
- no top bar (no notifications or friend requests)
- no sidebar mini-newsfeed
- all links to profiles and other facebook pages have been disabled
- all additional info found via hovering has been disabled

## Security:

TLDR:
- Yes there are analytics.
- Yes they are anonymous identified (it is NOT tied any kind of Facebook data). 
- No, no analytics can read anything on the messenger webpage.

Yes there are analytics services in the code. It may seem that this may compromise the privacy of your facebook messenger data. However, if you look at how the code is written, the analytics are in your background scripts. This is separated and indepdendent from the content scripts portion which is the part that actually interacts the Facebook Messenger page. Therefore, the analytics cannot see any of the Facebook data.

[![Mobile Analytics](http://cdn.mxpnl.com/site_media/images/partner/badge_light.png)](https://mixpanel.com/f/partner)
