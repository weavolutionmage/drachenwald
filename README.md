# sca-drachenwald.gitlab.io

This is the source code for the website of the Kingdom of Drachenwald in the Society for Creative Anachronism. You are welcome to submit changes as merge requests through Gitlab. For individual pages, this can be done through the Gitlab interface. If you would like to make more substantial changes, follow these instructions to get a local copy of the code, build the website on your machine, and submit changes back.

Overview for the internet-uninitiated, with some terminology
======================

The web artificers store the site content in [GitLab][], and use [Git][], a version-control software, to download copies to their local machines, work on the content, view/test new content on their machines, then save them back to GitLab. 

The GitLab account and storage is free. A condition of free accounts is that they are public and open source - anyone can search for the content and view it, code and all. Anyone with a GitLab account can submit changes or edits. The web artificers control the final published changes, to prevent malicious changes.

Web artificers work on the content itself (the words) using source code editors. 
The text is written using [Markdown] conventions, and saved as text files with .md suffix. Markdown is almost like writing email in plain text. 

They use assorted graphics software to crop and resize photos.   

To create the site, the web artificers use [Ruby][] a programming language, together with [Jekyll][] a Ruby 'gem' (a library of prewritten code, with specific chunks of instructions). Ruby has thousands of gems available, written by geeks who love to code, to make the magic of the internet happen.

Jekyll does the hard work of turning your words into webpages. 

The web artificers are using a theme designed for Jekyll called [Minimal Mistakes]. Like a template in word processing or spreadsheets, a theme makes sure that all the pages have a similar layout, font, line spacing, and behaviour, so they don't have to re-create this for every page individually. 

Contributing at the 'code-face' requires time to download and install software, learn how to use it, and learn the order of publishing events (called the workflow). There are many guides, tutorials and cheatsheets available to help. Not to mention Pelicans.

[Gitlab]: https://gitlab.com/
[Git]: https://git-scm.com/
[Ruby]: https://www.ruby-lang.org/en/
[Jekyll]: https://jekyllrb.com/
[Minimal mistakes]: https://mademistakes.com/work/minimal-mistakes-jekyll-theme/
[Markdown]: https://daringfireball.net/projects/markdown/syntax


Software needed
===============
These instructions assume you have full permissions on your own machine to download, install and run software.

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

- - - - -
 Jekyll

If you have not used Jekyll before, [see the Jekyll website for a ground-up intro](https://jekyllrb.com/tutorials/convert-site-to-jekyll/#what-is-a-jekyll-website).

**TL;dr**: 

* You create content: mainly text in Markdown. 
* Add images or data. 
* Save content in appropriate folders.  
* Commit (and push) the content to GitLab, using Git commands
* Run Jekyll from the command line.  

Jekyll creates the HTML versions of the pages, following the instructions in the theme to provide the layout, formatting and navigation. **You don't need to edit any HTML manually.**
- - - - -

Set yourself up on GitLab with an SSH key
=========================

Set up an account on [GitLab](https://gitlab.com/).

Create an SSH key and add the public key to your GitLab profile. [Instructions on GitLab.](https://docs.gitlab.com/ee/ssh/)


Choose an editor to view and edit the content of the site
================================
**Notepad++** is plain and simple. [Notepad++](https://notepad-plus-plus.org/)

**Visual Studio Code** is slightly whizzier, and helps you work through some of the downloading and uploading steps in Git as well. [Download Visual Studio code](https://code.visualstudio.com/)

You now have all the tools to start copying the site from GitLab, and editing it on your own machine.

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

References
============
* [GitLab's command-line cheatsheet, if you haven't used command lines before]https://gitlab.com/help/gitlab-basics/command-line-commands.md
* [Git's own documentation](https://git-scm.com/book/en/v2)
* [Another cheat sheet for Git commands](https://git-scm.com/docs/giteveryday)
* [Git the simple guide](https://rogerdudler.github.io/git-guide/)


