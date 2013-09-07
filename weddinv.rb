class Weddinv < Sinatra::Base
  configure do
    Mongoid.load! './config/mongoid.yml'
    Rabl.register!
    Rabl.configure do |config|
      config.include_json_root = false
    end
  end

  get '/api/invitations', provides: [:json] do
    @invitations = Invitation.all
    rabl :'invitations/index'
  end

  # - Show an invitation - #
  get '/api/invitations/:id', provides: [:json] do
    @invitation = get_invitation params[:id]
    rabl :'invitations/show'
  end

  # - Create an invitation - #
  post '/api/invitations', provides: [:json] do
    Logger.new($stdout).info invitation_param
    @invitation = Invitation.create invitation_param
    rabl :'invitations/show'
  end

  # - Accept an invitation - #
  post '/api/invitations/:id/accept', provides: [:json] do
    @invitation = get_invitation params[:id]
    @invitation.accept!
    rabl :'invitations/show'
  end

  # - Reject an invitation - #
  post '/api/invitations/:id/reject', provides: [:json] do
    @invitation = get_invitation params[:id]
    @invitation.reject!
    rabl :'invitations/show'
  end

  get '/*' do
    File.read File.join 'public', 'index.html'
  end

  def get_invitation id
    Invitation.find id
  end

  def invitation_param
    @invitation_param ||= json['invitation']
  end

  def json
    @request_body ||= request.body.rewind
    @json         ||= JSON.parse(request.body.read)
  end
end
