#!/bin/bash

eval $(ssh-agent -s)
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "$SSH_KNOWN_HOSTS" > ~/.ssh/known_hosts
chmod 644 ~/.ssh/known_hosts
echo "${OVH_PRIVATE}" | tr -d '\r' | ssh-add - > /dev/null
JEKYLL_ENV=production bundle exec jekyll build -d public
rsync -rvzc --exclude '.htaccess' --delete -e 'ssh -p 45333' public/ $WEBHOST_OVH:drach-main/public/
rsync -rvzc --delete -e 'ssh -p 45333' public/.htaccess $WEBHOST_OVH:drach-main/
