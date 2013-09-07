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

  # - Create an invitation - #
  post '/api/invitations', provides: [:json] do
    @invitation = Invitation.create invitation_param
    rabl :'invitations/show'
  end

  # - Show an invitation - #
  get '/api/invitations/:id', provides: [:json] do
    @invitation = get_invitation params[:id]
    rabl :'invitations/show'
  end

  # - Update an invitation - #
  put '/api/invitations/:id', provides: [:json] do
    if @invitation = get_invitation(params[:id])
      @invitation.update_attributes invitation_param
    end
  end

  # - Destroy an invitation - #
  delete '/api/invitations/:id', provides: [:json] do
    if @invitation = get_invitation(params[:id])
      @invitation.destroy
    end
    halt 204
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
