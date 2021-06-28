# frozen_string_literal: true

# C1
# CONFECTION
class Confection
  def prepare
    'Baking at 350 degrees for 25 minutes.'
  end
end

# CUPCAKE
class Cupcake < Confection
  def prepare
    "#{super} Applying frosting"
  end
end

# BANANA CAKE
class BananaCake < Confection
end

cupcake = Cupcake.new
puts 'Cupcake'
print cupcake.prepare
puts ''

puts 'Banana Cake'
banana_cake = BananaCake.new
print banana_cake.prepare
puts ''
