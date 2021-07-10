# ACTIVITY 1 - B4
arr = [6, 3, 1, 8, 4, 2, 10, 65, 102]

arr.each do |n|
  puts [].push(n) if (n.to_i % 2).zero?
end
