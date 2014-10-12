class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def get_language
    Settings.locale.languages.inject([]) do |arr, lang|
      arr << {code: lang.code.downcase, display_name: lang.display_name}
    end
  end
  
end
