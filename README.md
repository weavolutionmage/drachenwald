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

### Jekyll
- - - - -

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

Now visit http://127.0.0.1:4000/j/ in your browser and you should see the front page of the website. If you are seeing a HTTP 404 Not Found error, try http://127.0.0.1:4000/.

If you see an error about SSL, make sure you are using an URL that starts with HTTP, not HTTPS.

Make changes and submit them back
=================================

__NOTE: All your filenames must use lower case only.__ Mixed case filenames introduce errors in systems that are case sensitive. Avoid entirely by using only lower case.

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

Git References
============
* [GitLab's command-line cheatsheet, if you haven't used command lines before](https://gitlab.com/help/gitlab-basics/command-line-commands.md)
* [Git's own documentation](https://git-scm.com/book/en/v2)
* [Another cheat sheet for Git commands](https://git-scm.com/docs/giteveryday)
* [Git the simple guide](https://rogerdudler.github.io/git-guide/)

# Ruby and Jekyll Troubleshooting: when stuff just doesn't work

This anecdotal checklist is for people new to using command line tools, Ruby and Jekyll. 
It's based on using these tools on a creaking Toshiba laptop, with Win10 Home, and also in a Windows-based work setting with more modern hardware. YMMV.

## Installing Ruby in a Windows environment
Ruby requires a directory 'path' that has no spaces in it. So unfortunately, installing it in 'Program Files' with the rest of your applications won't work. You need a path that has no gaps. 

At home, this requirement meant installing Ruby on C:\ drive, the same 'level' as my 'Windows' and 'Program Files' directories.

At work, where I don't have permissions to add or change anything on my C:\ drive, it meant installing Ruby at the highest 'level' within my user profile.

## Installing Jekyll gems
Each Git directory (aka repository, containing website content) requires *its own set of gems*, including the Jekyll-related ones that generate the site. So for example, if you are working both on the Drachenwald website, and a shire website, both stored on GitLab, you need to install the Jekyll bundle once in each directory.

This is a *different location* from where you install Ruby.

If you try to run Jekyll using 'bundle exec jekyll serve' when the gems aren't there, Ruby will tell you she can't find the gems and doesn't recognise the command.

So from your Git Bash shell, `cd` (change directory) to the cloned directories of each site, then run 
`gem install bundler`
then
`bundle install`

## Jekyll says it cannot build because it's missing a gem

Sometimes...gems have 'dependencies' - they need another gem buddy in order to run.  

And they need a *specific version* of their buddy to work. 

You can track down individual gems in https://rubygems.org/ and add them to the bundle (entering the command from the correct directory location).

`gem install <name of gem you want>`

Alternately you can update all the gems. This option takes a little longer, and requires admin privileges. 
`gem update --system` 

## Jekyll doesn't build and throws a peculiar error

You saved your content, added it, committed it, and pushed it. You run 'bundle exec jekyll serve' but it gives you an  error. Here's an example:

`Liquid Exception: Could not find document 'offices/herald/drachenwaldawardsorders.md' in tag 'link'. Make sure the document exists and the path is correct. in heraldsbeforetheinternet.md`

Check: which directory are you in? You can only run Jekyll from the 'top' of the directory for your site, so for the Drachenwald website it's 
` $ `[your_directories_path`]/git/sca-drachenwald.gitlab.io`>

## Jekyll doesn't build and throws an error, with a filename, a line and column location of the error

~~~~
YAML Exception reading C:/Users/eabrown/git/sca-drachenwald.gitlab.io/offices/herald/zenofgoodcourtguidance.md: (<unknown>): mapping values are not allowed in this context at line 2 column 29
~~~~~~~
Jekyll is picky about the syntax that tells it what is text, and what is an instruction. 

It especially needs clear 'front matter' - the first few lines of every file, marked off with 3 hyphens above and below, where you specify the file name, the file title, the file path, which page template to use when building the html. 
Typically you have to open the file, go to the point where the character is wrong, and change it. Save, add, commit, try again.

Example: a colon (:) is part of the syntax for Jekyll. 
If you put a colon in a page title (eg. a page title of 'Drachenwald: where you persona comes from'), Jekyll is wondering where tf its instructions are. 
So for any page titles that need colons, enter the whole title within double quotes ("Drachenwald: where your persona comes from"). The quotes tell Jekyll not to pay any attention to this particular colon.

## Jekyll runs ok and builds on your machine, but *none of your stuff* is there 

Check: are you running Jekyll in the right branch? 
Git allows you to 'branch' (start a separate copy) of the site, for you to work on, and add back into the main copy ('merge') later. If you save your work in one branch, but run Jekyll from another, your work won't appear. Cue panic...

In Git Bash: look at the branch name. Check and see where your work is and move to it, to see your changes.

## Jekyll References

<https://guides.rubygems.org/rubygems-basics/#installing-gems>  

<https://jekyllrb.com/tutorials/convert-site-to-jekyll/>


