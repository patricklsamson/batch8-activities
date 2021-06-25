# frozen_string_literal: true

arr = ['What did you eat?', 'How are you?', 'Where have you been?', 'When is your birthday?', 'Are you having fun?']

entry = ''

while entry != 'STOP'
  puts arr[rand(arr.length)]
  entry = gets.chomp
end
