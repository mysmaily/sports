class ProductsController < ApplicationController
  def show
    @products = Product.find(params[:id])
    @photos = @products.photos.all
  end
end
