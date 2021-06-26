# frozen_string_literal: true

# B2
def num_check(num)
  if num.negative?
    puts 'Number cannot be negative.'
  else
    case num

    when 0..50
      puts "#{num} is between 0 and 50."
    when 51..100
      puts "#{num} is between 51 and 100."
    else
      puts "#{num} is above 100."
    end
  end
end

puts 'Give a number.'
num_check(gets.chomp.to_i)
