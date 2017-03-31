---
layout: default
title:  "Flickr Photos Bot"
date:   2017-03-30 17:50:00
categories: index
---

# Getting Started

This bot shows you images tagged in flickr for a given person or location. Example of messages that can be sent to it are:

```
"Where is San Francico?" => Returns the photo of San Francisco
"Who is Steve Jobs?" => Returns photo of Steve Jobs
```

If you have an idea for improvement, want to fix some issues or just have an idea for a new feature, fork the git repository here:

<!-- Place this tag where you want the button to render. -->
<a class="github-button" href="https://github.com/Recime/recime-flickr-bot/fork" data-icon="octicon-repo-forked" data-style="mega" data-count-aria-label="# forks on GitHub" aria-label="Fork Recime/recime-flickr-bot on GitHub">Fork on Github</a>

# Setup

Once you have cloned the repo and have created configured `Recime` Command Line Tool. You can test it by following the instructions below:

## Set Flickr API KEY

In order to make photos queries in flickr, first get your flickr API key from:  
[`https://www.flickr.com/services/apps/create/`](https://www.flickr.com/services/apps/create/).

Once you have it, you can later on paste it in your search query along with the query text you have extracted from keywords

Now, type the following command:


```
  recime-cli config set API_KEY=PASTE_YOUR_API_KEY
```

## Configure Bot Platform

Configure your bot by typing the following command:


```
  recime-cli platform config facebook|telegram|wechat

```

Now copy/paste your platform specific Access Token you have have copied earlier.


## Deploy

```
  recime-cli deploy

```

This will build the bot, install any missing dependencies and give you the live url of the bot:

```
bash-3.2$ recime-cli deploy                                                                
INFO: Installing dependencies.                                                                                                                                       
> alan-turing@1.0.1 preinstall /steve/bot/Turing                      
> npm install -g typescript                                                                                                                                          
/usr/local/bin/tsc -> /usr/local/lib/node_modules/typescript/bin/tsc                       
/usr/local/bin/tsserver -> /usr/local/lib/node_modules/typescript/bin/tsserver             
/usr/local/lib                                                                             
└── typescript@2.0.8                                                                                                                                                       
> alan-turing@1.0.1 build /Users/newrecimeuser/Source/Recime/bot/Turing                           
> tsc                                                                                                                                                                             
INFO: Preparing.                                                                           
INFO: Compressing.                                                                         
INFO: Preparing to upload.                                                                 
28.18 KB / 28.18 KB [#########################################################] 100.00% 0s
INFO: Finalizing.                                                                          
\                                                                                          
=> https://us-west-1-bot.recime.io/bot/50d122fd3204e67f3a6452ba28b522da/v1                                

INFO: Bot publish successful.                                                                                                                                           
For any questions and feedback, please reach us at hello@recime.io.                                                                                            
bash-3.2$

```

Make sure to save your bot URL. After you have successfully deployed the bot, it is time to execute it.

Please check out the [Recime Documenation](https://docs.recime.io) on how to get your free account, build and deploy your first bot.
