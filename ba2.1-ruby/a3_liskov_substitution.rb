# ACTIVITY 2.1 - A3

class Avion
  def initialize(first_name, last_name)
    @first_name = first_name
    @last_name = last_name
  end

  def enrollment_type(type)
    puts "#{@first_name} #{@last_name} has enrolled for #{type.enrollment_type}."
  end
end

class FullPayment < Avion
  def enrollment_type
    'full payment'
  end
end

class ISA < Avion
  def enrollment_type
    'ISA'
  end
end

student = Avion.new('Jane', 'Doe')
type = FullPayment.new('Jane', 'Doe')
student.enrollment_type(type)
