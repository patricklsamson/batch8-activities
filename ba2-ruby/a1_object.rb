# ACTIVITY 2 - A1

class Aircraft
  def initialize(airline, manufacturer, model)
    @airline = airline
    @manufacturer = manufacturer
    @model = model
  end

  def land
    puts "#{@airline} #{@manufacturer} #{@model}, you now have permission to land."
  end
end

pal = Aircraft.new('Philippine Airlines', 'Boeing', 'PAL-2022')
pal.land
