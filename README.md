# Veilus

Veilus is a web application that has been designed to allow testing of the [Symbiote](https://github.com/jnyman/symbiote) test framework. That said, it could be used by any automation frameworks.

Some of the pages here are protected and thus require signing in via the login pull down at the top of the interface. The current username/password for this is admin/admin.

## Running a Local Version

To run a local version, get the repo. You can [download a zip](https://github.com/jnyman/veilus/archive/master.zip) or clone the repo using:

    git clone https://github.com/jnyman/veilus

From the project directory, run the following to get the necessary components:

    bundle install

You can run Veilus as a pure Ruby app:

    bundle exec ruby app.rb

Or you can run Veilus as a Rack application:

    bundle exec rackup config.ru
