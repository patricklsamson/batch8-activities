# frozen_string_literal: true

# CODING EXERCISE 3
input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15]

if input.empty?
  p input
else
  positive = input.select { |n| n > 0 }
  negative = input.select { |n| n < 0 }
  p [].push(positive.count, negative.sum)
end
