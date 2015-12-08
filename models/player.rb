class Player < ActiveRecord::Base
  self.table_name = 'master'
  has_many :batting_records, class_name: :Batter, foreign_key: :playerid
  has_many :pitching_records, class_name: :Pitcher, foreign_key: :playerid

end

class Batter < ActiveRecord::Base
  self.table_name = 'batting'
end

class Pitcher < ActiveRecord::Base
  self.table_name = 'pitching'
end
