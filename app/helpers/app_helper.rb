module AppHelpers
  def title(value = nil)
    @title = value if value
    @title ? "Veilus - #{@title}" : "Veilus"
  end

  def authorized?
    session[:admin]
  end

  def protected!
    unless authorized?
      flash[:error] = "You have to be logged in to access secure content."
      redirect to('/')
    end
  end
end