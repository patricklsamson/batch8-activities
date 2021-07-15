# CODING EXERCISE 1

def square?(num)
  if num.negative?
    puts false
  else
    puts (num.to_i**0.5 % 1).zero?
  end
end

numbers = [-1, 0, 3, 4, 25, 26]

numbers.each { |n| puts square?(n) }
