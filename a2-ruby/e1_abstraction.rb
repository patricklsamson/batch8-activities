# frozen_string_literal: true

# E1
# BMI
class Person
  def initialize(name, mass, mass_pounds, height, height_feet)
    @name = name
    @mass = mass
    @mass_pounds = mass_pounds
    @height = height
    @height_feet = height_feet
  end

  def bmi
    puts "#{@name}'s BMI is #{(mass / height**2).round(2)}."
  end

  private

  def mass
    @mass_pounds ? (@mass * 0.4536).round : @mass
  end

  def height
    @height_feet ? (@height * 0.3048).round(1) : @height
  end
end

student = Person.new('Patrick', 157, true, 5.58, true)
student.bmi
