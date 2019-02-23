FROM jekyll/builder
VOLUME ["/build"]
WORKDIR /build
EXPOSE 4000
ENV LC_ALL="C.UTF-8"
ENV LANG="en_US.UTF-8"
ENV LANGUAGE="en_US.UTF-8"
CMD bundle install && bundle exec jekyll serve --watch --host 0.0.0.0