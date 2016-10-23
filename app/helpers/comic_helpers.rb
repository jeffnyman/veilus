module ComicHelpers
  def create_comic
    # Note: This could be changed to Comic.create(params[:comic])
    # if the jQuery validation is changed to look for id.
    @comic = Comic.new(params)
    @comic.save
    @comic
  end

  def get_comics
    @comics = Comic.all
  end

  def find_comic
    Comic.get(params[:id])
  end
end