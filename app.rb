#!/usr/bin/env ruby

require 'sinatra/base'
require 'sinatra/reloader'
require 'sinatra/flash'

require 'dm-core'
require 'dm-timestamps'
require 'dm-validations'
require 'dm-migrations'

require_relative 'app/helpers/app_helper'
require_relative 'app/helpers/comic_helpers'
require_relative 'app/helpers/overlord_helpers'

require_relative 'app/models/trigger'
require_relative 'app/models/timer'
require_relative 'app/models/bomb'
require_relative 'app/models/comic'

module Project
  class Veilus < Sinatra::Base
    register Sinatra::Reloader
    register Sinatra::Flash

    helpers AppHelpers
    helpers ComicHelpers
    helpers OverlordHelpers

    configure do
      enable :sessions
      enable :logging
      enable :dump_errors
      enable :method_override

      set :server, :puma
      set :name, "Veilus"
      set :views, "app/views"
      set :username, "admin"
      set :password, "admin"
      set :start_time, Time.now
      set :session_secret, "spatially foliated hypersurface with temporal coordinates"
    end

    #before do
    #  last_modified settings.start_time
    #  etag settings.start_time.to_s
    #  cache_control :public, :must_revalidate
    #end

    configure :development do
      DataMapper::Logger.new($stdout, :debug)
      DataMapper.setup(:default, "sqlite3://#{Dir.pwd}/app/databases/comic.db")
      DataMapper.finalize.auto_upgrade!
    end

    configure :production do
      DataMapper.setup(:default, ENV['DATABASE_URL'])
    end

    get '/' do
      erb :index, layout: :initial
    end

    post '/' do
      if params[:username] == settings.username && params[:password] == settings.password
        session[:admin] = true
        flash[:notice] = "You are now logged in as #{params[:username]}."
        session[:current_user] = params[:username]
        redirect to('/home')
      else
        if params[:username].empty?
          flash[:error] = "No login name was specified."
        else
          flash[:error] = "Unable to login as #{params[:username]}."
        end
        redirect to('/')
      end
    end

    get '/home/?' do
      #protected!
      title 'Home'
      erb :home
    end

    get '/logout' do
      session.clear
      flash[:notice] = 'You have been logged out.'
      redirect to('/')
    end

    get '/stardate/?' do
      #protected!
      title 'Stardate Calculator'
      erb :stardate
    end

    get '/planets/?' do
      #protected!
      title 'Planet Weight Calculator'
      erb :planets
    end

    get '/warp/?' do
      #protected!
      title 'Warp Factor Calculator'
      erb :warp
    end

    get '/warcraft/?' do
      #protected!
      title 'World of Warcraft'
      erb :warcraft
    end

    # Start: Practice

    get '/practice/?' do
      title 'Practice Page'
      erb :practice
    end

    get '/practice/drag_and_drop' do
      title 'Practice - Drag and Drop'
      erb :'practice/drag_and_drop'
    end

    get '/practice/js_alerts' do
      title 'Practice - JavaScript Alerts'
      erb :'practice/js_alerts'
    end

    get '/practice/dynamic_controls' do
      title 'Practice - Dynamic Controls'
      erb :'practice/dynamic_controls'
    end

    get '/practice/dynamic_events' do
      title 'Practice - Dynamic Events'
      erb :'practice/dynamic_events'
    end

    # Finish: Practice

    # Start: Overlord
    get '/overlord/?' do
      #protected!
      title 'Project Overlord'
      erb :overlord
    end

    post '/overlord' do
      session[:activate] = params[:activation_code]
      session[:deactivate] = params[:deactivation_code]
      session[:countdown] = params[:countdown_value]

      redirect to('/bomb')
    end

    post '/set/:seconds' do
      @bomb = session[:bomb]
      timer.reset(params[:seconds].to_i)
    end

    get '/enter/:code?' do
      @bomb = session[:bomb]

      if trigger.valid?(params[:code])
        trigger_bomb_state(trigger, timer)
      else
        flash[:invalid_code] = 'The code must be four numeric characters.'
      end

      redirect to('/bomb')
    end

    get '/bomb' do
      @bomb = session[:bomb] || provide_bomb
      session[:bomb] = @bomb
      erb :'overlord/bomb'
    end

    def trigger
      @bomb.components[:trigger]
    end

    def timer
      @bomb.components[:timer]
    end

    # Finish: Overlord

    # Start: Comics

    get '/comics/?' do
      protected!
      title 'Comic Library'
      get_comics
      erb :comics
    end

    get '/comics/new' do
      protected!
      title 'Add a Comic'
      @comic = Comic.new
      erb :'comics/comic_new'
    end

    post '/comics' do
      if create_comic
        flash[:notice] = "Comic successfully added."
        redirect to("/comics/#{@comic.id}")
      else
        error = @comic.errors.values.map { |e| e.to_s }
        flash[:error] = "Unable to add the comic. (#{error})"
        redirect('/comics/new')
      end
    end

    get '/comics/:id' do
      protected!
      @comic = find_comic
      erb :'comics/comic_show'
    end

    get '/comics/:id/edit' do
      protected!
      @comic = find_comic
      erb :'comics/comic_edit'
    end

    put '/comics/:id' do
      comic = find_comic
      # Note: This could be changed to comic.update(params[:comic])
      # if the jQuery validation is changed to look for id.
      params.reject! {|k,v| %w"_method splat captures".include? k}
      if comic.update(params)
        flash[:notice] = "Comic successfully updated."
      else
        error = comic.errors.values.map { |e| e.to_s }
        flash[:error] = "Unable to update the comic. (#{error})"
      end
      redirect to("/comics/#{comic.id}")
    end

    delete '/comics/:id' do
      comic = find_comic
      if comic.destroy
        flash[:notice] = "Comic deleted."
        redirect to('/comics')
      else
        error = comic.errors.values.map { |e| e.to_s }
        flash[:error] = "Unable to delete the comic. (#{error})"
        redirect to("/comics/#{comic.id}")
      end
    end

    # Finish: Comics
  end
end

Project::Veilus.run! port: 9292 if __FILE__ == $PROGRAM_NAME
