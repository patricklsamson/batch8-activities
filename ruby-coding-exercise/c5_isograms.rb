# frozen_string_literal: true

# CODING EXERCISE 5

def is_isogram(string)
  boolean = true

  string.downcase.chars.each do |char|
    boolean = false if string.downcase.chars.index(char) != string.downcase.chars.rindex(char)
  end

  puts boolean
end

is_isogram('Dermatoglyphics')
is_isogram('aba')
is_isogram('moOse')
