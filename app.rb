class App < Sinatra::Base
  configure do
    Mongoid.load! './config/mongoid.yml'
    Rabl.register!
    Rabl.configure do |config|
      config.include_json_root = false
    end
  end

  get '/api/invitations/:id', provides: [:json] do
    @invitation = Invitation.find params[:id]
    rabl :'invitations/show'
  end

  get '/*' do
    File.read File.join 'public', 'index.html'
  end
end
