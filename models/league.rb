class League < ActiveRecord::Base
  self.table_name = 'leagues'
  has_many :accounts, class_name: :Draft, foreign_key: :team_owner
  has_many :teams, class_name: :Draft, foreign_key: :team_name
end
