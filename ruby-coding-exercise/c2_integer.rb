# frozen_string_literal: true

# CODING EXERCISE 2
arr = [34, 15, 88, 2]
smallest = arr[0]

arr.each do |n|
  smallest = n if n < smallest
end

puts smallest

arr2 = [34, -345, -1, 100]
smallest2 = arr2[0]

arr2.each do |n|
  smallest2 = n if n < smallest2
end

puts smallest2
