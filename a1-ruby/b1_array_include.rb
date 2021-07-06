# frozen_string_literal: true

# ACTIVITY 1 - B1
arr = [1, 3, 5, 7, 9, 11]
number = 3

# OLD CODE
# arr.include?(number)

arr.each do |n|
  puts true if n == number
end
