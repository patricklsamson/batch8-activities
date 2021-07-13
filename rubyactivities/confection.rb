# ACTIVITY 2 - C1

class Confection
  def prepare
    'Baking at 350 degrees for 25 minutes.'
  end
end

class Cupcake < Confection
  def prepare
    "#{super} Applying frosting"
  end
end

class BananaCake < Confection
end

cupcake = Cupcake.new
puts 'Cupcake:'
print cupcake.prepare
puts ''

puts 'Banana Cake:'
banana_cake = BananaCake.new
print banana_cake.prepare
puts ''
