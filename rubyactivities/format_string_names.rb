# PROBLEM 9

def list(names)
  result = ''

  names.each_with_index do |name, index|
    result += if index < names.count - 2
                "#{name[:name]}, "
              elsif index == names.count - 2
                "#{name[:name]} "
              elsif names.count == 1
                name[:name]
              else
                "& #{name[:name]}"
              end
  end

  p result
end

list([{ name: 'Bart' }, { name: 'Lisa' }, { name: 'Maggie' }])
list([{ name: 'Bart' }, { name: 'Lisa' }])
list([{ name: 'Bart' }])
list([])
