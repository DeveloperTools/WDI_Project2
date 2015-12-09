class League < ActiveRecord::Base
  self.table_name = 'leagues'
  has_many :teams, class_name: :Draft, foreign_key: :league_name
end
