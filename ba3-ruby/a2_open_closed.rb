# ACTIVITY 2.1 - A2

class Player
  def initialize(name, ign)
    @name = name
    @ign = ign
  end

  def rank(rank)
    puts "#{@name} with in-game name of #{@ign} has #{rank.rank}."
  end
end

class Herald < Player
  def rank
    '0 to 720 MMR'
  end
end

class Legend < Player
  def rank
    '3360 to 4080 MMR'
  end
end

class Immortal < Player
  def rank
    '6000+ MMR'
  end
end

class Unranked < Player
  def rank
    'no mmr'
  end
end

player = Player.new('John Doe', 'sologamer')
rank = Herald.new('John Doe', 'sologamer')
player.rank(rank)
