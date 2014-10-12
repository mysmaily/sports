class PageController < ApplicationController
  def index
    @article_last = Article.last
    @articles = Article.all.paginate(:page => params[:all], :per_page => Settings.data.perpage)
  end
end
