# ACTIVITY 2 - D1

class Person
  def initialize(name, mass, height)
    @name = name
    @mass = mass
    @height = height
  end

  def bmi
    puts "#{@name}'s BMI is #{(@mass / @height**2).round(2)}."
  end
end

student = Person.new('Patrick', 71, 1.7)
student.bmi
