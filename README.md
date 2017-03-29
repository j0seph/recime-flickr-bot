# flickr-sample-bot

Flickr Photo bot

### Steps to deploy the bot:

* Set your flickr API_KEY:

```
  recime-cli config set API_KEY=PASTE_YOUR_API_KEY
```

* Configure Platform:

```
  recime-cli platform config facebook|telegram|wechat

```

It will ask you to paste your access token.


* Deploy:

```
  recime-cli deploy
```
