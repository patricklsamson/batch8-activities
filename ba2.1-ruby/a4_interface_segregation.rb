# ACTIVITY 2.1 - A4

class Enrollee
  def initialize(first_name, last_name)
    @first_name = first_name
    @last_name = last_name
  end

  def enrollment_type(type)
    puts "#{@first_name} #{@last_name} has enrolled for #{type.enrollment_type}."
  end
end

class FullPayment < Enrollee
  def enrollment_type
    'full payment'
  end
end

class ISA < Enrollee
  def enrollment_type
    'ISA'
  end
end

student = Avion.new('Jane', 'Doe')
type = ISA.new('Jane', 'Doe')
student.enrollment_type(type)
