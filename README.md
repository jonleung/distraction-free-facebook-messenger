# [Distraction Free Facebook Messenger](https://chrome.google.com/webstore/detail/distraction-free-facebook/ipkbhlfkopeokhpbhgmlonagpppedfej) ![Analytics](https://ga-beacon.appspot.com/UA-47724303-2/docs/readme?pixel)

Distraction Free Facebook Messenger is a Chrome Extension that removes all of the temptation from Facebook Messenger.

*Please note that this is in beta! Please file [issues](https://github.com/jonleung/distraction-free-facebook-messenger/issues) and [pull requests](https://github.com/jonleung/distraction-free-facebook-messenger/fork)!*

[![Down](http://i.imgur.com/GCvIjTK.png)](https://chrome.google.com/webstore/detail/distraction-free-facebook/ipkbhlfkopeokhpbhgmlonagpppedfej)

## Screenshots

### *Start with clutter:*
![Screenshot](https://lh4.googleusercontent.com/EPZlDXzQjrs4YOzk16W_RmIQ4g2_EnpghjkTouZmUg-mkPTsdeftofrtqvnSL4ZUkbVzStHs-yY=s640-h400-e365-rw)

### *Remove all of the temptations:*
![Screenshot](https://lh3.googleusercontent.com/iSzwWllRIgz6RW5oh4dqPUS2HLV_4M8Jca971_XcXPwO0C3Sf0LVkef2nJF3RCheS2vR5hg_=s640-h400-e365-rw)

### *Cleanup complete:*
![Screenshot](https://lh3.googleusercontent.com/EMLOFRI_iR4ib4G4f2y_24JDOdenJS93IFOAjvlHQGB-8EAMlz-DdbMQIfXVYCwgaBgPiH8M=s640-h400-e365-rw)

## Features:

- no popup notifications
- no top bar (no notifications or friend requests)
- no sidebar mini-newsfeed
- all links to profiles and other facebook pages have been disabled
- all additional info found via hovering has been disabled

## Problems & Feedback:

*Please note that this is in beta! Please file [issues](https://github.com/jonleung/distraction-free-facebook-messenger/issues) and [pull requests](https://github.com/jonleung/distraction-free-facebook-messenger/fork)!*

## Security:

TLDR:
- Yes there are analytics.
- Yes they are anonymous identified (it is NOT tied any kind of Facebook data). 
- No, no analytics can read anything on the messenger webpage.

Yes there are analytics services in the code. It may seem that this may comprimise the privacy of your facebook messenger data. However, if you look at how the code is written, the analytics are in your background scripts. This is separated and indepdendent from the content scripts portion which is the part that actually interacts the Facebook Messenger page. Therefore, the analytics cannot see any of the Facebook data.