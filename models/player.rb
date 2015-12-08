class Player < ActiveRecord::Base
  self.table_name = 'master'
end

class Batter < ActiveRecord::Base
  self.table_name = 'batting'
end

class Pitcher < ActiveRecord::Base
  self.table_name = 'pitching'
end
