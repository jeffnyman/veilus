# Veilus

Veilus is a web application that has been designed to provide mini-applications, all of which can be used as the basis for spec workshop writing exercises. It's equally possible to use these applications as the basis for assessing automation.

Some of the pages here are protected and thus require signing in via the login pull down at the top of the interface. The current username/password for this is admin/admin.

## Running a Local Version

To run a local version, get the repo. You can [download a zip](https://github.com/jeffnyman/veilus/archive/main.zip) or clone the repo using:

    git clone https://github.com/jeffnyman/veilus

From the project directory, run the following to get the necessary components:

    bundle install

You can run Veilus as a pure Ruby app:

    bundle exec ruby app.rb

Or you can run Veilus as a Rack application:

    bundle exec rackup config.ru
