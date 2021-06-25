# frozen_string_literal: true

# 4A

puts 'How old are you?'

age = gets.chomp.to_i

# OLD CODE

# years = [10, 20, 30, 40]

# years.each do |y|

#   puts "In #{y} years you will be:"

#   puts age + y

# end

(1..4).each do |i|
  puts "In #{i * 10} years you will be:"

  puts i * 10 + age
end
