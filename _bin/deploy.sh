#!/bin/bash

eval $(ssh-agent -s)
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "$SSH_KNOWN_HOSTS" > ~/.ssh/known_hosts
chmod 644 ~/.ssh/known_hosts
echo "${OVH_PRIVATE}" | tr -d '\r' | ssh-add - > /dev/null

if [ -n $GITHUB_REF_NAME ]
then
  if [ "$GITHUB_REF_NAME" == "main" ]
  then
    echo "Building main site"
    JEKYLL_ENV=production bundle exec jekyll build -d public
    rsync -rvzc --exclude '.htaccess' --delete -e 'ssh -p 45333' public/ $WEBHOST_OVH:drach-main/public/
    rsync -rvzc --delete -e 'ssh -p 45333' public/.htaccess $WEBHOST_OVH:drach-main/
  elif [ "$GITHUB_REF_NAME" == "staging" ]
  then
    echo "Building staging site"
    JEKYLL_ENV=staging bundle exec jekyll build -d public
    rsync -rvzc --exclude '.htaccess' --delete -e 'ssh -p 45333' public/ $WEBHOST_OVH:drach-staging/public/
    rsync -rvzc --delete -e 'ssh -p 45333' public/.htaccess $WEBHOST_OVH:drach-staging/
  else
    echo "Not acting on branch ${GITHUB_REF_NAME}"
  fi
else
  echo "No branch specified"
fi
