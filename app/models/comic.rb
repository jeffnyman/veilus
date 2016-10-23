class Comic
  include DataMapper::Resource

  property :id,           Serial
  property :created_at,   DateTime
  property :updated_at,   DateTime

  property :series,       String
  property :volume,       Integer
  property :name,         String
  property :issue,        Integer
  property :publisher,    String
  property :story_arc,    String
  property :cover_date,   Date
  property :description,  Text

  def cover_date=(date)
    super Date.strptime(date, '%m/%d/%Y')
  end
end