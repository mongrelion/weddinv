class WeddinvApp < Sinatra::Base
  use Rack::Session::Pool, expire_after: 1800
  set :session_secret, 'a6fc2b4d2b1f6790676a9fff6d77cb2341825c150d22d1a06d24290071b443d4'

  configure do
    Mongoid.load! './config/mongoid.yml'
    Mongoid.raise_not_found_error = false

    Rabl.register!
    Rabl.configure do |config|
      config.include_json_root = false
    end
  end

  # - Sessions - #
  get '/api/user', provides: [:json] do
    if user_signed_in?
      halt_ok
    else
      halt_forbidden
    end
  end

  post '/api/login', provides: [:json] do
    if @user = User.authenticate(json['username'], json['password'])
      session[:user_id] = @user.id
      halt_ok
    else
      halt_forbidden
    end
  end

  post '/api/logout', provides: [:json] do
    session.delete :user_id
    halt_ok
  end

  get '/api/invitations', provides: [:json] do
    user_required do
      @invitations = Invitation.all
      rabl :'invitations/index'
    end
  end

  # - Create an invitation - #
  post '/api/invitations', provides: [:json] do
    user_required do
      @invitation = Invitation.create invitation_param
      rabl :'invitations/show'
    end
  end

  # - Show an invitation - #
  get '/api/invitations/:id', provides: [:json] do
    @invitation = get_invitation params[:id]
    rabl :'invitations/show'
  end

  # - Update an invitation - #
  put '/api/invitations/:id', provides: [:json] do
    user_required do
      if @invitation = get_invitation(params[:id])
        @invitation.update_attributes invitation_param
      end
    end
  end

  # - Destroy an invitation - #
  delete '/api/invitations/:id', provides: [:json] do
    user_required do
      if @invitation = get_invitation(params[:id])
        @invitation.destroy
      end
      halt_ok
    end
  end

  # - Accept an invitation - #
  post '/api/invitations/:id/accept', provides: [:json] do
    @invitation = get_invitation params[:id]
    @invitation.accept! invitation_param[:attending_plus_one_count]
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
    @invitation_param ||= Invitation.params_hash json
  end

  def json
    @request_body ||= request.body.rewind
    @json         ||= JSON.parse(request.body.read) rescue {}
  end

  def halt_ok
    halt 200
  end

  def halt_forbidden
    halt 403
  end

  def current_user
    @current_user ||= User.find session[:user_id] if user_signed_in?
  end

  def user_signed_in?
    session[:user_id].present?
  end

  def user_required &blk
    if user_signed_in?
      yield
    else
      halt_forbidden
    end
  end
end
