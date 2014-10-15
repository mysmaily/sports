class CategoriesController < ApplicationController
  def show
    @categories = Category.friendly.find(params[:id])
    @products = @categories.products.all
  end
end