# sca-drachenwald.gitlab.io

This is the source code for the website of the Kingdom of Drachenwald in the Society for Creative Anachronism. You are welcome to submit changes as merge requests through Gitlab. For individual pages, this can be done through the Gitlab interface. If you would like to make more substantial changes, follow these instructions to get a local copy of the code, build the website on your machine, and submit changes back.

Software needed
===============

macOS
-----

**git:** Type `git` at the comment line; if it's not already installed, you will be prompted to install Xcode Command Line Tools.

**Docker:** Download and run [Docker Desktop](https://www.docker.com/products/docker-desktop).

Windows 10 Pro
--------------

**git:** Download and install [Git for Windows](https://git-scm.com/download/win).

**Windows 10 Pro:** Download and run [Docker Desktop](https://www.docker.com/products/docker-desktop).

Windows 10 Home and previous
----------------------------

**git:** Download and install [Git for Windows](https://git-scm.com/download/win).

**Ruby and Jekyll:** Install using the [instructions on the Jekyll site](https://jekyllrb.com/docs/installation/windows/).

Set up GitLab and SSH
=====================

Set up an account on [GitLab](https://gitlab.com/).

Create an SSH key and add the public key to your GitLab profile. [Instructions on GitLab.](https://docs.gitlab.com/ee/ssh/)

Get your clone of the website
=============================

**Windows:** Open Git Bash from your start menu.

**macOS:** Open a terminal window.

Go to the [project page on GitLab](https://gitlab.com/sca-drachenwald/sca-drachenwald.gitlab.io). Click on "Clone" and copy the link for "Clone with SSH".

In your command line window, run:

```
git clone git@gitlab.com:sca-drachenwald/sca-drachenwald.gitlab.io.git

cd sca-drachenwald
```

Start the Jekyll development server
===================================

**If you installed Docker Desktop earlier,** type:

```
docker-compose up
```

Wait for this to install the needed Docker image and libraries. (This will be faster on subsequent runs.)

**If you installed the Ruby environment earlier, type:**

```
bundle install

bundle exec jekyll serve
````

Now visit https://127.0.0.1:4000/j/ in your browser and you should see the front page of the website.

Make changes and submit them back
=================================

To get the latest changes from GitLab:

```
git pull
```

To create a new branch (which acts as a parallel universe copy of the site) for your changes, and switch to it:

```
git branch <branch name>
git checkout <branch name>
```

When you make changes, to commit them and push them to GitLab:

```
git add .
git commit -m "<message for the git log>"
git push
```

Once you've pushed changes in your own branch, go to GitLab and create a Merge Request (this is an item in the sidebar menu.)

If you keep using the same branch for future changes, bring it up to date with the staging branch by frequently running:

```
git checkout staging
git pull
git checkout <branch name>
git pull
git merge staging
```

A good editor, with Git support is [Visual Studio Code](https://code.visualstudio.com/).