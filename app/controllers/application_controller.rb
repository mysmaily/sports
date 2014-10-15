class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :query_data

  def get_language
    Settings.locale.languages.inject([]) do |arr, lang|
      arr << {code: lang.code.downcase, display_name: lang.display_name}
    end
  end

  def query_data
    @categorys = Category.all
    @products = Product.where(:home => true).paginate(:page => params[:all], :per_page => Settings.data.perpage)
  end
  
end
