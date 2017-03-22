module AppHelpers
  def title(value = nil)
    @title = value if value
    @title ? "Veilus - #{@title}" : "Veilus"
  end

  def authorized?
    session[:tester]
  end

  def admin_authorized?
    session[:admin]
  end

  def protected!
    unless authorized? || admin_authorized?
      flash[:error] = "You have to be logged in to access this content."
      redirect to('/')
    end
  end

  def admin_protected!
    unless admin_authorized?
      flash[:error] = "This content requires admin access."
      redirect to('/')
    end
  end
end
