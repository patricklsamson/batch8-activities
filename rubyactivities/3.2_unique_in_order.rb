# CODING EXERCISE 6

def unique_in_order(array)
  i = 0
  result = []
  array_type = array.instance_of?(String) ? array.chars : array

  array_type.each do
    result.push(array_type[i]) if array_type[i] != array_type[i + 1]
    i += 1
  end

  p result
end

unique_in_order('AAAABBBCCDAABBB')
unique_in_order('ABBCcAD')
unique_in_order([1, 2, 2, 3, 3])
