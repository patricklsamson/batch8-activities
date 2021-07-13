# ACTIVITY 2 - F1

class Vehicle
  def initialize(brand_name, brand_model)
    @brand_name = brand_name
    @brand_model = brand_model
  end

  def wheels(vehicle)
    puts "We now introduce you our brand new #{vehicle.wheels}, #{@brand_name} #{@brand_model}!"
  end
end

class Motorcycle < Vehicle
  def wheels
    'two-wheels'
  end
end

class Car < Vehicle
  def wheels
    'four-wheels'
  end
end

motorcycle = Vehicle.new('Suzuki', 'Raider R150')
two_wheels = Motorcycle.new('Suzuki', 'Raider R150')
motorcycle.wheels(two_wheels)

car = Vehicle.new('Suzuki', 'Swift')
four_wheels = Car.new('Suzuki', 'Swift')
car.wheels(four_wheels)
