class ProductsController < ApplicationController
  def show
    @products = Product.friendly.find(params[:id])
    @photos = @products.photos.all
  end
end
